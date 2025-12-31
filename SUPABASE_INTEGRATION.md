# Supabase Integration Guide - GymMate

**Documento de referencia para la futura integración de cloud sync y autenticación.**

---

## Índice

1. [Visión General](#visión-general)
2. [Arquitectura Propuesta](#arquitectura-propuesta)
3. [Configuración de Supabase](#configuración-de-supabase)
4. [Schema de Base de Datos](#schema-de-base-de-datos)
5. [Autenticación con Google](#autenticación-con-google)
6. [Estrategia de Sincronización](#estrategia-de-sincronización)
7. [Migración de localStorage](#migración-de-localstorage)
8. [Cambios en la UI](#cambios-en-la-ui)
9. [Fases de Implementación](#fases-de-implementación)
10. [Dependencias Necesarias](#dependencias-necesarias)

---

## Visión General

### Objetivos

- **Cloud Sync**: Sincronizar entrenamientos entre dispositivos
- **Google Login**: Autenticación simple con un click
- **Backup Automático**: Nunca perder datos de entrenamiento
- **Modo Offline**: Funcionar sin conexión y sincronizar después

### Stack Técnico

| Componente | Tecnología |
|------------|------------|
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| Auth Provider | Google OAuth 2.0 |
| Sync Strategy | Hybrid (localStorage cache + cloud source) |
| Client | @supabase/supabase-js |

---

## Arquitectura Propuesta

### Flujo Híbrido

```
┌─────────────────────────────────────────────────────────┐
│                    Usuario                               │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    GymMate PWA                           │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │ localStorage│◄──►│  SyncEngine │◄──►│  Supabase   │  │
│  │   (Cache)   │    │             │    │   Client    │  │
│  └─────────────┘    └─────────────┘    └─────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Supabase                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │    Auth     │    │  PostgreSQL │    │     RLS     │  │
│  │   (Google)  │    │   (Data)    │    │  (Security) │  │
│  └─────────────┘    └─────────────┘    └─────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Principios

1. **Offline-First**: localStorage siempre funciona
2. **Cloud as Source of Truth**: Cloud tiene la versión definitiva
3. **Conflict Resolution**: Last-write-wins con timestamp
4. **Progressive Enhancement**: Sin cuenta = funciona igual que ahora

---

## Configuración de Supabase

### 1. Crear Proyecto

1. Ir a [supabase.com](https://supabase.com)
2. Crear nuevo proyecto
3. Guardar las credenciales:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

### 2. Variables de Entorno

```env
# .env.local
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Cliente Supabase

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

---

## Schema de Base de Datos

### Tablas

```sql
-- Usuarios (extendiendo auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  age INTEGER,
  gender TEXT CHECK (gender IN ('male', 'female')),
  weight DECIMAL(5,2),
  height DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sesiones de entrenamiento
CREATE TABLE public.workout_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  session_id TEXT NOT NULL, -- ID local para sync
  date DATE NOT NULL,
  type TEXT CHECK (type IN ('weights', 'cardio')) DEFAULT 'weights',
  grupo TEXT,
  volumen_total INTEGER DEFAULT 0,
  volumen_por_grupo JSONB DEFAULT '{}',
  rpe JSONB,
  saved_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, session_id)
);

-- Ejercicios por sesión
CREATE TABLE public.workout_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.workout_sessions(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  sets INTEGER DEFAULT 0,
  reps INTEGER DEFAULT 0,
  peso DECIMAL(6,2) DEFAULT 0,
  volumen INTEGER DEFAULT 0,
  es_mancuerna BOOLEAN DEFAULT FALSE,
  grupo_muscular TEXT,
  completado BOOLEAN DEFAULT FALSE,
  orden INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sesiones de cardio (stats)
CREATE TABLE public.cardio_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  session_id TEXT NOT NULL,
  date DATE NOT NULL,
  mode TEXT NOT NULL,
  total_time INTEGER DEFAULT 0,
  rounds_completed INTEGER DEFAULT 0,
  work_time INTEGER DEFAULT 0,
  rest_time INTEGER DEFAULT 0,
  config JSONB DEFAULT '{}',
  saved_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, session_id)
);

-- Personal Records
CREATE TABLE public.personal_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  exercise_name TEXT NOT NULL,
  peso DECIMAL(6,2) NOT NULL,
  sets INTEGER NOT NULL,
  reps INTEGER NOT NULL,
  volumen INTEGER NOT NULL,
  achieved_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, exercise_name)
);

-- Medidas corporales
CREATE TABLE public.body_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  date DATE NOT NULL,
  weight DECIMAL(5,2),
  neck DECIMAL(5,2),
  chest DECIMAL(5,2),
  waist DECIMAL(5,2),
  hips DECIMAL(5,2),
  left_arm DECIMAL(5,2),
  right_arm DECIMAL(5,2),
  left_thigh DECIMAL(5,2),
  right_thigh DECIMAL(5,2),
  body_fat DECIMAL(4,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ejercicios personalizados
CREATE TABLE public.custom_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  muscle_group TEXT NOT NULL,
  is_dumbbell BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, name)
);
```

### Row Level Security (RLS)

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cardio_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_exercises ENABLE ROW LEVEL SECURITY;

-- Políticas: usuarios solo ven sus propios datos
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage own workouts" ON public.workout_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own exercises" ON public.workout_exercises
  FOR ALL USING (
    session_id IN (
      SELECT id FROM public.workout_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own cardio" ON public.cardio_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own PRs" ON public.personal_records
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own measurements" ON public.body_measurements
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own custom exercises" ON public.custom_exercises
  FOR ALL USING (auth.uid() = user_id);
```

### Funciones y Triggers

```sql
-- Auto-update de updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER workout_sessions_updated_at
  BEFORE UPDATE ON public.workout_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

---

## Autenticación con Google

### 1. Configurar Google OAuth en Supabase

1. Ir a Supabase Dashboard → Authentication → Providers
2. Habilitar Google
3. Crear credenciales en [Google Cloud Console](https://console.cloud.google.com)
4. Configurar OAuth consent screen
5. Agregar redirect URI: `https://xxxxx.supabase.co/auth/v1/callback`

### 2. Implementación en GymMate

```typescript
// src/features/auth.ts
import { supabase } from '@/lib/supabase';

export async function signInWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('Error signing in:', error.message);
    throw error;
  }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null);
  });
}
```

### 3. UI del Login

```typescript
// Botón de login en el header o perfil
function renderAuthButton(): string {
  const user = getCurrentUser();

  if (user) {
    return `
      <div class="flex items-center gap-3">
        <img src="${user.user_metadata.avatar_url}"
             class="w-8 h-8 rounded-full"
             alt="Avatar">
        <span class="text-sm">${user.user_metadata.full_name}</span>
        <button onclick="signOut()" class="text-status-error">
          ${icon('log-out', 'sm')}
        </button>
      </div>
    `;
  }

  return `
    <button onclick="signInWithGoogle()"
            class="btn-secondary flex items-center gap-2">
      <img src="/google-icon.svg" class="w-5 h-5" alt="Google">
      Iniciar sesión con Google
    </button>
  `;
}
```

---

## Estrategia de Sincronización

### Flujo de Sync

```typescript
// src/lib/sync.ts

interface SyncStatus {
  lastSync: Date | null;
  pending: number;
  syncing: boolean;
}

class SyncEngine {
  private status: SyncStatus = {
    lastSync: null,
    pending: 0,
    syncing: false,
  };

  // Sync al guardar sesión
  async syncWorkoutSession(session: SessionData): Promise<void> {
    const user = await getCurrentUser();

    if (!user) {
      // Sin usuario, solo localStorage
      return;
    }

    try {
      // 1. Upsert sesión
      const { data: dbSession, error } = await supabase
        .from('workout_sessions')
        .upsert({
          user_id: user.id,
          session_id: session.sessionId,
          date: session.date,
          grupo: session.grupo,
          volumen_total: session.volumenTotal,
          volumen_por_grupo: session.volumenPorGrupo,
          rpe: session.rpe,
          saved_at: session.savedAt,
        }, {
          onConflict: 'user_id,session_id',
        })
        .select()
        .single();

      if (error) throw error;

      // 2. Sync ejercicios
      await this.syncExercises(dbSession.id, session.ejercicios);

      this.status.lastSync = new Date();
    } catch (error) {
      console.error('Sync error:', error);
      this.status.pending++;
      // Guardar en queue para retry
      this.queueForRetry(session);
    }
  }

  // Full sync al iniciar sesión
  async fullSync(): Promise<void> {
    const user = await getCurrentUser();
    if (!user) return;

    this.status.syncing = true;

    try {
      // 1. Obtener datos del cloud
      const cloudData = await this.fetchAllFromCloud(user.id);

      // 2. Obtener datos locales
      const localData = this.getLocalData();

      // 3. Merge (cloud wins en conflictos)
      const merged = this.mergeData(localData, cloudData);

      // 4. Actualizar localStorage
      this.updateLocalStorage(merged);

      // 5. Push datos locales nuevos al cloud
      await this.pushLocalOnlyToCloud(merged.localOnly);

      this.status.lastSync = new Date();
    } finally {
      this.status.syncing = false;
    }
  }

  private mergeData(local: any, cloud: any) {
    // Last-write-wins basado en savedAt timestamp
    const merged = new Map();

    // Procesar cloud data (tiene prioridad)
    for (const session of cloud.sessions) {
      merged.set(session.session_id, {
        ...session,
        source: 'cloud',
      });
    }

    // Agregar local data que no existe en cloud
    const localOnly = [];
    for (const session of local.sessions) {
      if (!merged.has(session.sessionId)) {
        localOnly.push(session);
      }
    }

    return {
      sessions: Array.from(merged.values()),
      localOnly,
    };
  }
}

export const syncEngine = new SyncEngine();
```

### Sync Automático

```typescript
// En main.ts o app initialization
import { syncEngine } from '@/lib/sync';
import { onAuthStateChange } from '@/features/auth';

// Sync cuando el usuario inicia sesión
onAuthStateChange(async (user) => {
  if (user) {
    await syncEngine.fullSync();
  }
});

// Sync cuando la app vuelve a estar online
window.addEventListener('online', () => {
  syncEngine.retryPending();
});

// Sync periódico (cada 5 minutos si hay conexión)
setInterval(() => {
  if (navigator.onLine) {
    syncEngine.syncPending();
  }
}, 5 * 60 * 1000);
```

---

## Migración de localStorage

### Flujo de Migración al Primer Login

```typescript
// src/lib/migration.ts

export async function migrateLocalDataToCloud(userId: string): Promise<{
  migrated: number;
  failed: number;
}> {
  const results = { migrated: 0, failed: 0 };

  // 1. Migrar historial de entrenamientos
  const history = getHistory();
  for (const session of history) {
    try {
      await supabase.from('workout_sessions').insert({
        user_id: userId,
        session_id: session.sessionId || `migrated_${Date.now()}_${results.migrated}`,
        date: session.date,
        type: session.type || 'weights',
        grupo: session.grupo,
        volumen_total: session.volumenTotal,
        volumen_por_grupo: session.volumenPorGrupo,
        rpe: session.rpe,
        saved_at: session.savedAt || new Date().toISOString(),
      });
      results.migrated++;
    } catch (error) {
      console.error('Migration error:', error);
      results.failed++;
    }
  }

  // 2. Migrar PRs
  const prs = getAllPRs();
  for (const [exercise, pr] of Object.entries(prs)) {
    try {
      await supabase.from('personal_records').upsert({
        user_id: userId,
        exercise_name: exercise,
        peso: pr.peso,
        sets: pr.sets,
        reps: pr.reps,
        volumen: pr.volumen,
        achieved_at: pr.date,
      }, {
        onConflict: 'user_id,exercise_name',
      });
    } catch (error) {
      console.error('PR migration error:', error);
    }
  }

  // 3. Migrar perfil
  const profile = getProfile();
  if (profile) {
    await supabase.from('profiles').update({
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      weight: profile.weight,
      height: profile.height,
    }).eq('id', userId);
  }

  // 4. Migrar medidas corporales
  const measurements = getMeasurementsHistory();
  for (const measurement of measurements) {
    try {
      await supabase.from('body_measurements').insert({
        user_id: userId,
        date: measurement.date,
        weight: measurement.weight,
        neck: measurement.neck,
        chest: measurement.chest,
        waist: measurement.waist,
        hips: measurement.hips,
        left_arm: measurement.leftArm,
        right_arm: measurement.rightArm,
        left_thigh: measurement.leftThigh,
        right_thigh: measurement.rightThigh,
        body_fat: measurement.bodyFat,
      });
    } catch (error) {
      console.error('Measurement migration error:', error);
    }
  }

  // 5. Migrar ejercicios personalizados
  const customExercises = getCustomExercises();
  for (const exercise of customExercises) {
    try {
      await supabase.from('custom_exercises').insert({
        user_id: userId,
        name: exercise.name,
        muscle_group: exercise.muscleGroup,
        is_dumbbell: exercise.isDumbbell,
      });
    } catch (error) {
      // Ignore duplicates
    }
  }

  return results;
}
```

### UI de Migración

```typescript
// Modal que aparece después del primer login
function showMigrationModal(): void {
  const history = getHistory();
  const hasLocalData = history.length > 0;

  if (!hasLocalData) return;

  showModal(`
    <div class="text-center">
      <div class="text-4xl mb-4">${icon('cloud-upload', 'xl')}</div>
      <h2 class="text-xl font-bold mb-2">¿Migrar tus datos?</h2>
      <p class="text-secondary mb-4">
        Encontramos ${history.length} entrenamientos guardados localmente.
        ¿Quieres subirlos a la nube?
      </p>
      <div class="flex gap-3 justify-center">
        <button onclick="startMigration()" class="btn-primary">
          ${icon('upload')} Sí, migrar todo
        </button>
        <button onclick="skipMigration()" class="btn-secondary">
          Empezar de cero
        </button>
      </div>
    </div>
  `);
}

async function startMigration(): Promise<void> {
  showLoadingModal('Migrando datos...');

  const user = await getCurrentUser();
  const results = await migrateLocalDataToCloud(user.id);

  hideModal();

  showToast(
    `Migración completada: ${results.migrated} sesiones`,
    'success'
  );

  // Limpiar localStorage antiguo
  clearOldLocalStorage();
}
```

---

## Cambios en la UI

### 1. Header con Estado de Sync

```typescript
function renderSyncStatus(): string {
  const status = syncEngine.getStatus();

  if (!getCurrentUser()) {
    return `
      <button onclick="signInWithGoogle()" class="text-secondary">
        ${icon('cloud-off', 'sm')} Sin sincronizar
      </button>
    `;
  }

  if (status.syncing) {
    return `
      <span class="text-accent animate-pulse">
        ${icon('refresh-cw', 'sm', 'animate-spin')} Sincronizando...
      </span>
    `;
  }

  if (status.pending > 0) {
    return `
      <span class="text-status-warning">
        ${icon('cloud', 'sm')} ${status.pending} pendientes
      </span>
    `;
  }

  return `
    <span class="text-status-success">
      ${icon('cloud-check', 'sm')} Sincronizado
    </span>
  `;
}
```

### 2. Perfil con Cuenta

```typescript
function renderProfileWithAuth(): string {
  const user = getCurrentUser();
  const profile = getProfile();

  return `
    <div class="card p-6">
      ${user ? `
        <div class="flex items-center gap-4 mb-6">
          <img src="${user.user_metadata.avatar_url}"
               class="w-16 h-16 rounded-full">
          <div>
            <h2 class="text-xl font-bold">${user.user_metadata.full_name}</h2>
            <p class="text-secondary">${user.email}</p>
            <button onclick="signOut()" class="text-status-error text-sm mt-1">
              Cerrar sesión
            </button>
          </div>
        </div>
      ` : `
        <button onclick="signInWithGoogle()"
                class="w-full btn-secondary mb-6 flex items-center justify-center gap-2">
          <img src="/google-icon.svg" class="w-5 h-5">
          Iniciar sesión para sincronizar
        </button>
      `}

      <!-- Resto del perfil -->
      ${renderProfileForm(profile)}
    </div>
  `;
}
```

### 3. Indicador Offline

```typescript
// Mostrar cuando no hay conexión
function renderOfflineIndicator(): void {
  if (!navigator.onLine) {
    document.body.insertAdjacentHTML('afterbegin', `
      <div id="offline-banner"
           class="fixed top-0 left-0 right-0 bg-status-warning/20
                  text-status-warning text-center py-2 text-sm z-50">
        ${icon('wifi-off', 'sm')} Sin conexión - Los cambios se guardarán localmente
      </div>
    `);
  }
}

window.addEventListener('offline', renderOfflineIndicator);
window.addEventListener('online', () => {
  document.getElementById('offline-banner')?.remove();
  syncEngine.retryPending();
});
```

---

## Fases de Implementación

### Fase 1: Setup Base (1-2 días)

- [ ] Crear proyecto en Supabase
- [ ] Configurar tablas y RLS
- [ ] Instalar `@supabase/supabase-js`
- [ ] Crear cliente Supabase en `src/lib/supabase.ts`
- [ ] Agregar variables de entorno

### Fase 2: Autenticación (1-2 días)

- [ ] Configurar Google OAuth en Supabase
- [ ] Implementar `src/features/auth.ts`
- [ ] Agregar botón de login en UI
- [ ] Manejar estado de autenticación
- [ ] Mostrar avatar y nombre del usuario

### Fase 3: Sync Engine (2-3 días)

- [ ] Implementar `src/lib/sync.ts`
- [ ] Sync al guardar sesión
- [ ] Retry queue para errores
- [ ] Indicador de estado de sync
- [ ] Manejo de conflictos

### Fase 4: Migración (1-2 días)

- [ ] Implementar `src/lib/migration.ts`
- [ ] Modal de migración post-login
- [ ] Progress indicator
- [ ] Limpieza de localStorage antiguo

### Fase 5: Full Sync (1-2 días)

- [ ] Sync completo al iniciar sesión
- [ ] Merge de datos local/cloud
- [ ] Sync periódico en background
- [ ] Sync al volver online

### Fase 6: Polish (1 día)

- [ ] Indicador offline
- [ ] Manejo de errores elegante
- [ ] Loading states
- [ ] Tests de sync

**Tiempo total estimado: 7-12 días**

---

## Dependencias Necesarias

```bash
npm install @supabase/supabase-js
```

### Package.json

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0"
  }
}
```

### TypeScript Types

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

---

## Consideraciones de Seguridad

1. **RLS Obligatorio**: Nunca deshabilitar Row Level Security
2. **Anon Key**: Es público, la seguridad viene de RLS
3. **No guardar tokens**: Supabase maneja la sesión automáticamente
4. **Validar datos**: Sanitizar inputs antes de enviar al server

---

## Recursos

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth with Google](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [TypeScript Support](https://supabase.com/docs/reference/typescript-support)

---

**Última actualización:** Diciembre 2025
