# Plan de Implementacion - Sistema de Gamificacion GymMate

## Resumen Ejecutivo

Este documento detalla la implementacion completa del sistema de gamificacion para GymMate, inspirado en apps como Symmetry y basado en estandares de fuerza de la industria.

El sistema consta de **DOS componentes independientes pero integrados**:

1. **Nivel General de Cuenta (1-100)**: Basado en XP acumulado por actividad
2. **Rango por Grupo Muscular**: Basado en estandares de fuerza (ratio 1RM vs peso corporal)

---

## PARTE 1: NIVEL GENERAL DE CUENTA (1-100)

### 1.1 Sistema de XP

#### Fuentes de XP

| Actividad | XP Base | Notas |
|-----------|---------|-------|
| Completar entrenamiento | 50 | Siempre se otorga |
| Volumen (primeros 5,000 kg) | 1 XP / 200 kg | Max 25 XP |
| Volumen (5,001 - 10,000 kg) | 1 XP / 400 kg | Max 12 XP |
| Volumen (10,001 - 20,000 kg) | 1 XP / 800 kg | Max 12 XP |
| Volumen (20,001+ kg) | 1 XP / 1,600 kg | Max 6 XP |
| **Total volumen maximo** | - | **55 XP** |

#### XP por PRs

| Tipo de PR | Descripcion | XP |
|------------|-------------|-----|
| Micro PR | +1-2 kg o +1 rep | 30 XP |
| PR Menor | +3-5 kg o +2-3 reps | 60 XP |
| PR Solido | +6-10 kg o +4-5 reps | 100 XP |
| PR Mayor | +11-15 kg | 150 XP |
| PR Excepcional | +16+ kg | 250 XP |

#### Bonos de Consistencia

| Racha | Bonus XP | Frecuencia |
|-------|----------|------------|
| 3 dias consecutivos | 25 XP | Una vez por racha |
| 7 dias consecutivos | 75 XP | Una vez por racha |
| 14 dias consecutivos | 150 XP | Una vez por racha |
| 30 dias consecutivos | 350 XP | Una vez por racha |
| 60 dias consecutivos | 750 XP | Una vez por racha |
| 90 dias consecutivos | 1,200 XP | Una vez por racha |

#### Logros Especiales (Una sola vez)

| Logro | XP | Condicion |
|-------|-----|-----------|
| Primera sesion | 100 | Completar primer entrenamiento |
| Explorador | 150 | Usar 10 ejercicios diferentes |
| Dedicado | 300 | 25 sesiones totales |
| Veterano | 600 | 100 sesiones totales |
| Leyenda | 1,500 | 500 sesiones totales |
| Titan | 3,000 | 1,000 sesiones totales |
| Volumen 100K | 200 | 100,000 kg acumulados |
| Volumen 500K | 500 | 500,000 kg acumulados |
| Volumen 1M | 1,000 | 1,000,000 kg acumulados |
| Volumen 5M | 2,500 | 5,000,000 kg acumulados |
| Volumen 10M | 5,000 | 10,000,000 kg acumulados |

#### XP por Subir Rango Muscular

| Nuevo Rango Alcanzado | XP |
|-----------------------|-----|
| Bronce | 25 |
| Plata | 50 |
| Oro | 100 |
| Platino | 150 |
| Esmeralda | 250 |
| Diamante | 400 |
| Campeon | 600 |
| Simetrico | 1000 |

---

### 1.2 Proyeccion de XP Anual

**Usuario tipico (4 sesiones/semana, volumen promedio 8,000 kg/sesion):**

| Fuente | Calculo | XP/Ano |
|--------|---------|--------|
| Entrenamientos base | 200 x 50 | 10,000 |
| Volumen | 200 x 40 avg | 8,000 |
| PRs | 40 x 80 avg | 3,200 |
| Rachas | ~6 rachas | 2,000 |
| Logros primer ano | Variable | 1,500 |
| Subir rangos | ~5 rangos | 500 |
| **TOTAL ANO 1** | | **~25,000 XP** |

**Anos siguientes (menos logros nuevos):** ~22,000-24,000 XP/ano

---

### 1.3 Tabla de Niveles (1-100)

El nivel de cuenta es simplemente un numero del 1 al 100. No tiene titulos especiales.
Los titulos (Hierro, Bronce, etc.) son exclusivamente para los **rangos por grupo muscular**.

**Formula de XP por nivel:**
- Niveles 1-20: Progresion lineal suave
- Niveles 21-50: Progresion moderada
- Niveles 51-80: Progresion pronunciada
- Niveles 81-100: Progresion elite

| Nivel | XP Requerido | XP Acumulado | Tiempo Aprox |
|-------|--------------|--------------|--------------|
| 1 | 0 | 0 | Inicio |
| 5 | 400 | 1,000 | 2 semanas |
| 10 | 600 | 3,500 | 1 mes |
| 15 | 800 | 7,000 | 2 meses |
| 20 | 1,000 | 12,000 | 3 meses |
| 25 | 1,200 | 18,500 | 5 meses |
| 30 | 1,400 | 26,500 | 7 meses |
| 35 | 1,600 | 36,000 | 10 meses |
| 40 | 1,800 | 47,000 | **1 ano** |
| 50 | 2,200 | 73,500 | 1.6 anos |
| 60 | 2,600 | 106,000 | 2.3 anos |
| 70 | 3,000 | 144,500 | **3 anos** |
| 80 | 3,400 | 189,000 | 3.7 anos |
| 90 | 3,800 | 239,500 | 4.3 anos |
| 100 | 4,200 | 296,000 | **~4-5 anos** |

**Nota:** Con entrenamiento muy dedicado (5+ sesiones/semana, muchos PRs), se puede alcanzar nivel 100 en ~4 anos.

### 1.4 Visualizacion del Nivel

El nivel se muestra como un numero simple con barra de progreso:

```
Nivel 42
████████████░░░░░░  12,450 / 15,000 XP
```

El color de la barra puede variar segun el rango de nivel:
- Niveles 1-25: Gris/Blanco
- Niveles 26-50: Azul
- Niveles 51-75: Morado
- Niveles 76-99: Dorado
- Nivel 100: Gradiente especial

---

## PARTE 2: RANGO POR GRUPO MUSCULAR

### 2.1 Sistema de Rangos de Fuerza (9 Rangos)

Basado en estandares de fuerza de [Strength Level](https://strengthlevel.com/), [Symmetric Strength](https://symmetricstrength.com/), y la app Symmetry.

Cada grupo muscular tiene su propio rango con titulo y emblema distintivo.

#### Los 9 Rangos y sus Colores

```typescript
const RANK_COLORS = {
  hierro:    { fill: '#6B7280', glow: 'none' },           // Gris
  bronce:    { fill: '#92400E', glow: 'rgba(146,64,14,0.3)' },   // Bronce
  plata:     { fill: '#9CA3AF', glow: 'rgba(156,163,175,0.4)' }, // Plata
  oro:       { fill: '#F59E0B', glow: 'rgba(245,158,11,0.5)' },  // Dorado
  platino:   { fill: '#EF4444', glow: 'rgba(239,68,68,0.5)' },   // Rojo
  esmeralda: { fill: '#10B981', glow: 'rgba(16,185,129,0.5)' },  // Verde esmeralda
  diamante:  { fill: '#8B5CF6', glow: 'rgba(139,92,246,0.6)' },  // Morado
  campeon:   { fill: '#F97316', glow: 'rgba(249,115,22,0.6)' },  // Naranja
  simetrico: { fill: '#3B82F6', glow: 'rgba(59,130,246,0.7)' },  // Azul brillante
};
```

#### Rangos y Ratios (1RM vs Peso Corporal)

| # | Rango | Ratio Min | Ratio Max | Color | Hex | Glow |
|---|-------|-----------|-----------|-------|-----|------|
| 1 | Hierro | 0 | 0.3x | Gris | #6B7280 | none |
| 2 | Bronce | 0.3x | 0.5x | Bronce | #92400E | rgba(146,64,14,0.3) |
| 3 | Plata | 0.5x | 0.7x | Plata | #9CA3AF | rgba(156,163,175,0.4) |
| 4 | Oro | 0.7x | 0.9x | Dorado | #F59E0B | rgba(245,158,11,0.5) |
| 5 | Platino | 0.9x | 1.1x | Rojo | #EF4444 | rgba(239,68,68,0.5) |
| 6 | Esmeralda | 1.1x | 1.3x | Verde | #10B981 | rgba(16,185,129,0.5) |
| 7 | Diamante | 1.3x | 1.6x | Morado | #8B5CF6 | rgba(139,92,246,0.6) |
| 8 | Campeon | 1.6x | 2.0x | Naranja | #F97316 | rgba(249,115,22,0.6) |
| 9 | Simetrico | 2.0x | infinito | Azul | #3B82F6 | rgba(59,130,246,0.7) |

#### Ajustes por Tipo de Ejercicio

Los ratios base aplican a ejercicios de empuje (press banca, press hombro). Para otros ejercicios se aplican multiplicadores:

| Tipo de Ejercicio | Multiplicador | Ejemplo |
|-------------------|---------------|---------|
| Press (Banca, Hombro) | 1.0x | Base |
| Sentadilla | 1.25x | Ratio x 1.25 |
| Peso Muerto | 1.5x | Ratio x 1.5 |
| Curl/Extension | 0.4x | Ratio x 0.4 |
| Press Piernas | 2.0x | Ratio x 2.0 |
| Remo/Jalon | 0.8x | Ratio x 0.8 |

**Ejemplo con peso corporal 75kg:**

| Ejercicio | 1RM | Ratio Base | Ajustado | Rango |
|-----------|-----|------------|----------|-------|
| Press Banca | 90kg | 1.2x | 1.2x | Avanzado |
| Sentadilla | 120kg | 1.6x | 1.28x (1.6/1.25) | Avanzado |
| Press Piernas | 180kg | 2.4x | 1.2x (2.4/2.0) | Avanzado |
| Peso Muerto | 140kg | 1.87x | 1.25x (1.87/1.5) | Avanzado |
| Curl Biceps | 40kg | 0.53x | 1.33x (0.53/0.4) | Avanzado |

---

### 2.2 Calculo de Rango por Grupo Muscular

Cada grupo muscular tiene su rango basado en el **promedio ponderado** de los ejercicios que lo trabajan:

```
Rango_Musculo = Promedio(Rangos_Ejercicios_Del_Musculo)
```

**Grupos Musculares:**

| Grupo | Ejercicios Principales |
|-------|------------------------|
| Pecho | Press banca, Press inclinado, Aperturas |
| Espalda | Peso muerto, Remo, Jalon, Dominadas |
| Hombros | Press militar, Elevaciones laterales |
| Biceps | Curl biceps, Curl martillo |
| Triceps | Extensiones, Press cerrado, Fondos |
| Piernas | Sentadilla, Press piernas, Extension, Curl femoral |
| Gluteos | Hip thrust, Peso muerto rumano, Zancadas |
| Core | Plancha (tiempo), Crunch (reps) |

---

### 2.3 Calculo del 1RM

Se utiliza la **formula de Epley** para estimar el 1RM a partir de los datos registrados:

```
1RM = peso × (1 + reps/30)
```

**Ejemplo:**
- Peso: 80kg
- Reps: 8
- 1RM = 80 × (1 + 8/30) = 80 × 1.267 = 101.3kg

---

## PARTE 3: DISENO VISUAL

### 3.1 Badge de Nivel General (SVG)

El nivel de cuenta es simplemente un numero del 1 al 100. El badge muestra el numero con un estilo visual que varia segun el rango de nivel.

#### Colores del Badge segun Nivel

| Niveles | Color del Badge | Hex |
|---------|-----------------|-----|
| 1-25 | Gris/Blanco | #9CA3AF |
| 26-50 | Azul | #3B82F6 |
| 51-75 | Morado | #8B5CF6 |
| 76-99 | Dorado | #F59E0B |
| 100 | Gradiente Especial | #3B82F6 -> #8B5CF6 |

#### Especificaciones SVG

- **Tamano base:** 48x48px (escalable)
- **Viewbox:** 0 0 48 48
- **Fuente:** Bold, centrada
- **Borde:** Sutil con color del rango

#### Ejemplo SVG - Badge de Nivel

```svg
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="level-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1F2937"/>
      <stop offset="100%" style="stop-color:#111827"/>
    </linearGradient>
  </defs>
  <!-- Fondo circular -->
  <circle cx="24" cy="24" r="22" fill="url(#level-bg)" stroke="#3B82F6" stroke-width="2"/>
  <!-- Numero de nivel -->
  <text x="24" y="30" text-anchor="middle" fill="#3B82F6" font-size="18" font-weight="bold">42</text>
</svg>
```

#### Badge Nivel 100 (Especial)

```svg
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="level100-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6"/>
      <stop offset="100%" style="stop-color:#8B5CF6"/>
    </linearGradient>
    <filter id="level100-glow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Fondo con glow -->
  <circle cx="24" cy="24" r="22" fill="#111827" stroke="url(#level100-border)"
          stroke-width="3" filter="url(#level100-glow)"/>
  <!-- Numero 100 -->
  <text x="24" y="29" text-anchor="middle" fill="url(#level100-border)"
        font-size="14" font-weight="bold">100</text>
</svg>
```

---

### 3.2 Emblemas de Rango Muscular (SVG)

Cada uno de los 9 rangos tiene un emblema distintivo con glow effect:

| # | Rango | Forma | Elementos | Color | Glow |
|---|-------|-------|-----------|-------|------|
| 1 | Hierro | Circulo simple | Borde basico | #6B7280 | none |
| 2 | Bronce | Hexagono | 1 marca interior | #92400E | rgba(146,64,14,0.3) |
| 3 | Plata | Octogono | Brillo sutil | #9CA3AF | rgba(156,163,175,0.4) |
| 4 | Oro | Escudo | Corona pequena | #F59E0B | rgba(245,158,11,0.5) |
| 5 | Platino | Estrella 5 puntas | Rayos | #EF4444 | rgba(239,68,68,0.5) |
| 6 | Esmeralda | Estrella 6 puntas | Gema central | #10B981 | rgba(16,185,129,0.5) |
| 7 | Diamante | Estrella 8 puntas | Facetas brillantes | #8B5CF6 | rgba(139,92,246,0.6) |
| 8 | Campeon | Estrella 10 puntas | Corona + fuego | #F97316 | rgba(249,115,22,0.6) |
| 9 | Simetrico | Estrella 12 puntas | Aura completa + efectos | #3B82F6 | rgba(59,130,246,0.7) |

#### Ejemplo SVG - Emblema Diamante

```svg
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="diamante-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#A78BFA"/>
      <stop offset="100%" style="stop-color:#8B5CF6"/>
    </linearGradient>
    <filter id="diamante-glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Glow background -->
  <circle cx="32" cy="32" r="28" fill="rgba(139,92,246,0.2)"/>
  <!-- Estrella 8 puntas -->
  <polygon points="32,4 38,24 58,24 42,36 48,56 32,44 16,56 22,36 6,24 26,24"
           fill="url(#diamante-grad)" filter="url(#diamante-glow)"/>
  <!-- Facetas -->
  <path d="M32 16 L40 32 L32 48 L24 32 Z" fill="rgba(255,255,255,0.2)"/>
</svg>
```

#### Ejemplo SVG - Emblema Simetrico (Maximo Rango)

```svg
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="simetrico-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#60A5FA"/>
      <stop offset="50%" style="stop-color:#3B82F6"/>
      <stop offset="100%" style="stop-color:#2563EB"/>
    </linearGradient>
    <filter id="simetrico-glow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="pulse">
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"/>
    </filter>
  </defs>
  <!-- Aura externa -->
  <circle cx="32" cy="32" r="30" fill="rgba(59,130,246,0.3)" filter="url(#simetrico-glow)"/>
  <!-- Estrella 12 puntas -->
  <path d="M32 2 L35 20 L48 8 L40 22 L58 20 L44 30 L60 38 L44 38 L52 54 L38 42 L38 60 L32 46 L26 60 L26 42 L12 54 L20 38 L4 38 L20 30 L6 20 L24 22 L16 8 L29 20 Z"
        fill="url(#simetrico-grad)" filter="url(#simetrico-glow)"/>
  <!-- Centro brillante -->
  <circle cx="32" cy="32" r="8" fill="white" opacity="0.3"/>
</svg>
```

---

### 3.3 Mapa Corporal SVG

Vista frontal simplificada del cuerpo con zonas coloreables:

```svg
<svg viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Cabeza (no coloreable) -->
  <circle cx="100" cy="30" r="25" fill="#374151"/>

  <!-- Hombros -->
  <ellipse id="muscle-hombros-izq" cx="55" cy="75" rx="20" ry="15" fill="#6B7280"/>
  <ellipse id="muscle-hombros-der" cx="145" cy="75" rx="20" ry="15" fill="#6B7280"/>

  <!-- Pecho -->
  <path id="muscle-pecho" d="M70 80 Q100 70 130 80 L130 120 Q100 130 70 120 Z" fill="#6B7280"/>

  <!-- Biceps -->
  <ellipse id="muscle-biceps-izq" cx="40" cy="120" rx="12" ry="30" fill="#6B7280"/>
  <ellipse id="muscle-biceps-der" cx="160" cy="120" rx="12" ry="30" fill="#6B7280"/>

  <!-- Triceps (parte posterior, visible lateral) -->
  <ellipse id="muscle-triceps-izq" cx="35" cy="125" rx="8" ry="25" fill="#6B7280"/>
  <ellipse id="muscle-triceps-der" cx="165" cy="125" rx="8" ry="25" fill="#6B7280"/>

  <!-- Core/Abdomen -->
  <rect id="muscle-core" x="75" y="125" width="50" height="60" rx="10" fill="#6B7280"/>

  <!-- Espalda (visible en los lados) -->
  <path id="muscle-espalda-izq" d="M65 85 L55 130 L65 130 Z" fill="#6B7280"/>
  <path id="muscle-espalda-der" d="M135 85 L145 130 L135 130 Z" fill="#6B7280"/>

  <!-- Gluteos -->
  <ellipse id="muscle-gluteos-izq" cx="80" cy="200" rx="25" ry="20" fill="#6B7280"/>
  <ellipse id="muscle-gluteos-der" cx="120" cy="200" rx="25" ry="20" fill="#6B7280"/>

  <!-- Piernas (Cuadriceps) -->
  <path id="muscle-piernas-izq" d="M60 220 L50 320 L80 320 L90 220 Z" fill="#6B7280"/>
  <path id="muscle-piernas-der" d="M110 220 L120 320 L150 320 L140 220 Z" fill="#6B7280"/>
</svg>
```

**Coloreado dinamico:** Cada elemento `id="muscle-*"` se colorea segun el rango del grupo muscular usando los colores definidos en 2.1.

---

## PARTE 4: ESTRUCTURA DE DATOS

### 4.1 Nuevos Tipos TypeScript

```typescript
// src/types/gamification.ts

// ===== NIVEL GENERAL =====

interface PlayerStats {
  totalXP: number;
  level: number;               // 1-100, sin titulos
  currentLevelXP: number;      // XP en el nivel actual
  xpToNextLevel: number;       // XP necesario para subir
  createdAt: string;           // Fecha inicio
  lastUpdated: string;
}

// El nivel de cuenta no tiene titulos, solo es un numero 1-100

interface XPTransaction {
  id: string;
  amount: number;
  source: XPSource;
  description: string;
  timestamp: string;
  sessionId?: string;
}

type XPSource =
  | 'workout_complete'
  | 'volume'
  | 'pr_micro' | 'pr_minor' | 'pr_solid' | 'pr_major' | 'pr_exceptional'
  | 'streak_3' | 'streak_7' | 'streak_14' | 'streak_30' | 'streak_60' | 'streak_90'
  | 'achievement'
  | 'rank_up';

// ===== RANGO MUSCULAR =====

interface MuscleRanks {
  pecho: MuscleRankData;
  espalda: MuscleRankData;
  hombros: MuscleRankData;
  biceps: MuscleRankData;
  triceps: MuscleRankData;
  piernas: MuscleRankData;
  gluteos: MuscleRankData;
  core: MuscleRankData;
}

interface MuscleRankData {
  rank: StrengthRank;
  ratio: number;              // Ratio promedio ajustado
  bestExercise: string;       // Ejercicio con mejor ratio
  bestRatio: number;
  exerciseCount: number;      // Cuantos ejercicios contribuyen
  lastUpdated: string;
}

type StrengthRank =
  | 'Hierro' | 'Bronce' | 'Plata' | 'Oro' | 'Platino'
  | 'Esmeralda' | 'Diamante' | 'Campeon' | 'Simetrico';

interface ExerciseStrength {
  exerciseName: string;
  muscleGroup: MuscleGroup;
  estimated1RM: number;
  bodyweightRatio: number;
  adjustedRatio: number;      // Despues de aplicar multiplicador
  rank: StrengthRank;
  lastUpdated: string;
}

// ===== LOGROS =====

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  icon: string;               // Nombre del icono SVG
  xpReward: number;
  unlockedAt?: string;        // undefined = no desbloqueado
  progress?: number;          // Para logros con progreso
  target?: number;
}

type AchievementCategory =
  | 'sesiones' | 'volumen' | 'prs' | 'rachas' | 'rangos' | 'especial';

// ===== ESTADO COMPLETO =====

interface GamificationState {
  playerStats: PlayerStats;
  muscleRanks: MuscleRanks;
  exerciseStrengths: Record<string, ExerciseStrength>;
  achievements: Achievement[];
  xpHistory: XPTransaction[];  // Ultimas 100 transacciones
  streakData: StreakData;
}

interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastWorkoutDate: string;
  streakMilestones: number[]; // [3, 7, 14, 30, 60, 90] ya alcanzados
}
```

---

### 4.2 Almacenamiento localStorage

```typescript
// Nuevas claves de almacenamiento
const STORAGE_KEYS = {
  GAMIFICATION: 'gymmate_gamification',  // GamificationState completo
  XP_HISTORY: 'gymmate_xp_history',      // Historial de XP (separado por tamano)
};

// Tamano estimado:
// - GamificationState: ~5-10 KB
// - XP History (100 items): ~10 KB
// Total adicional: ~20 KB (bien dentro del limite de 5MB)
```

---

### 4.3 Migracion de Datos Existentes

```typescript
// src/features/gamification/migration.ts

async function migrateExistingData(): Promise<GamificationState> {
  // 1. Cargar historial existente
  const history = JSON.parse(localStorage.getItem('gymmate_history') || '[]');
  const prs = JSON.parse(localStorage.getItem('gymmate_prs') || '{}');
  const profile = JSON.parse(localStorage.getItem('gymmate_profile') || '{}');

  // 2. Calcular XP retroactivo
  let totalXP = 0;
  const xpTransactions: XPTransaction[] = [];

  for (const session of history) {
    // XP por sesion completada
    totalXP += 50;

    // XP por volumen
    const volumeXP = calculateVolumeXP(session.volumenTotal);
    totalXP += volumeXP;

    // Registrar transaccion
    xpTransactions.push({
      id: generateId(),
      amount: 50 + volumeXP,
      source: 'workout_complete',
      description: `Sesion ${session.grupo}`,
      timestamp: session.date,
      sessionId: session.sessionId
    });
  }

  // 3. XP por PRs existentes
  for (const [exercise, prData] of Object.entries(prs)) {
    totalXP += 60; // Asumimos PR menor promedio
    xpTransactions.push({
      id: generateId(),
      amount: 60,
      source: 'pr_minor',
      description: `PR en ${exercise}`,
      timestamp: prData.date
    });
  }

  // 4. Calcular rangos musculares
  const muscleRanks = calculateMuscleRanks(prs, profile.weight || 70);

  // 5. Calcular nivel
  const level = calculateLevel(totalXP);

  // 6. Verificar logros
  const achievements = checkAchievements(history, prs, totalXP);

  return {
    playerStats: {
      totalXP,
      level: level.level,
      title: level.title,
      currentLevelXP: level.currentXP,
      xpToNextLevel: level.xpToNext,
      createdAt: history[history.length - 1]?.date || new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    },
    muscleRanks,
    exerciseStrengths: calculateExerciseStrengths(prs, profile.weight || 70),
    achievements,
    xpHistory: xpTransactions.slice(-100),
    streakData: calculateStreakData(history)
  };
}
```

---

## PARTE 5: ARQUITECTURA DE MODULOS

### 5.1 Estructura de Archivos

```
src/
├── features/
│   └── gamification/
│       ├── index.ts              # Exportaciones publicas
│       ├── state.ts              # Estado y persistencia
│       ├── xp.ts                 # Calculos de XP
│       ├── levels.ts             # Sistema de niveles
│       ├── muscle-ranks.ts       # Rangos por musculo
│       ├── achievements.ts       # Sistema de logros
│       ├── migration.ts          # Migracion de datos existentes
│       └── constants.ts          # Tablas de XP, niveles, ratios
│
├── ui/
│   └── gamification/
│       ├── level-badge.ts        # Componente de insignia de nivel
│       ├── muscle-map.ts         # Mapa corporal SVG
│       ├── rank-emblem.ts        # Emblemas de rango
│       ├── xp-bar.ts             # Barra de progreso XP
│       ├── level-modal.ts        # Modal de detalles de nivel
│       └── achievements-view.ts  # Vista de logros
│
├── assets/
│   └── gamification/
│       ├── level-badge.svg       # Badge generico para mostrar nivel (numero)
│       ├── rank-emblems/         # SVGs de emblemas de rango (9 rangos)
│       │   ├── hierro.svg
│       │   ├── bronce.svg
│       │   ├── plata.svg
│       │   ├── oro.svg
│       │   ├── platino.svg
│       │   ├── esmeralda.svg
│       │   ├── diamante.svg
│       │   ├── campeon.svg
│       │   └── simetrico.svg
│       ├── muscle-map.svg        # Mapa corporal base
│       └── achievements/         # Iconos de logros
│           ├── first-session.svg
│           ├── streak-7.svg
│           └── ...
│
└── types/
    └── gamification.ts           # Tipos TypeScript
```

---

### 5.2 Funciones Principales

```typescript
// src/features/gamification/index.ts

// ===== INICIALIZACION =====
export function initGamification(): void;
export function migrateExistingData(): Promise<void>;

// ===== XP =====
export function addXP(amount: number, source: XPSource, description: string): void;
export function calculateSessionXP(session: HistorySession): number;
export function getPlayerStats(): PlayerStats;

// ===== NIVELES (1-100, sin titulos) =====
export function getCurrentLevel(): number;
export function getLevelProgress(): { current: number; max: number; percentage: number };
export function getXPForLevel(level: number): number;
export function getLevelBarColor(level: number): string; // Color segun rango de nivel

// ===== RANGOS MUSCULARES =====
export function getMuscleRanks(): MuscleRanks;
export function getExerciseRank(exerciseName: string): StrengthRank;
export function updateMuscleRanks(prs: Record<string, PRData>, bodyweight: number): void;
export function getRankColor(rank: StrengthRank): string;

// ===== LOGROS =====
export function getAchievements(): Achievement[];
export function checkAndUnlockAchievements(): Achievement[]; // Retorna nuevos desbloqueados
export function getAchievementProgress(id: string): { current: number; target: number };

// ===== UI HELPERS =====
export function renderLevelBadge(level: number): string;  // SVG con numero
export function getRankEmblemSVG(rank: StrengthRank): string;
export function getRankColor(rank: StrengthRank): { fill: string; glow: string };
export function getMuscleMapColors(): Record<MuscleGroup, { fill: string; glow: string }>;
```

---

## PARTE 6: INTEGRACION CON UI EXISTENTE

### 6.1 Ubicacion de Elementos

```
+--------------------------------------------------+
|  [Logo]  GymMate          [Nivel 42] [XP Bar]    |  <- Header
+--------------------------------------------------+
|                                                  |
|  +--------------------------------------------+  |
|  |  HERO CARD (Home)                          |  |
|  |  [Mapa Corporal Mini]  Nivel 42 - Atleta   |  |
|  |                        12,450 / 15,000 XP  |  |
|  |  Tap para ver detalles                     |  |
|  +--------------------------------------------+  |
|                                                  |
|  ... resto del contenido ...                     |
|                                                  |
+--------------------------------------------------+
|  [Home] [Workout] [Charts] [History] [Profile]   |  <- Bottom Nav
+--------------------------------------------------+
```

### 6.2 Modal de Detalles de Nivel

Al tocar el nivel en el header o hero card:

```
+--------------------------------------------------+
|                 NIVEL Y PROGRESO                  |
+--------------------------------------------------+
|                                                  |
|     [Icono Grande Nivel 42]                      |
|                                                  |
|          ATLETA II                               |
|          Nivel 42                                |
|                                                  |
|     ████████████████░░░░░░  12,450 / 15,000 XP   |
|                                                  |
+--------------------------------------------------+
|                                                  |
|  RANGOS MUSCULARES                               |
|                                                  |
|  +--------------------------------------------+  |
|  |        [Mapa Corporal Completo]            |  |
|  |        (colores por rango)                 |  |
|  +--------------------------------------------+  |
|                                                  |
|  Pecho      [=====Oro=======]    0.85x         |
|  Espalda    [===Esmeralda===]    1.25x         |
|  Piernas    [====Diamante===]    1.55x         |
|  Hombros    [=====Oro=======]    0.78x         |
|  Biceps     [====Plata======]    0.55x         |
|  Triceps    [=====Oro=======]    0.72x         |
|  Gluteos    [===Esmeralda===]    1.20x         |
|  Core       [====Bronce=====]    0.35x         |
|                                                  |
+--------------------------------------------------+
|                                                  |
|  GUIA DE NIVELES DE CUENTA                       |
|                                                  |
|  El nivel de cuenta (1-100) refleja tu          |
|  dedicacion y consistencia en el tiempo.        |
|  Se sube ganando XP por entrenamientos,         |
|  PRs, rachas y logros.                          |
|                                                  |
|  Nivel 100 = ~4 anos de entrenamiento dedicado  |
|                                                  |
+--------------------------------------------------+
|                                                  |
|  GUIA DE RANGOS MUSCULARES                       |
|                                                  |
|  [Hierro]     < 0.3x peso corporal              |
|  [Bronce]     0.3x - 0.5x                       |
|  [Plata]      0.5x - 0.7x                       |
|  [Oro]        0.7x - 0.9x                       |
|  [Platino]    0.9x - 1.1x                       |
|  [Esmeralda]  1.1x - 1.3x                       |
|  [Diamante]   1.3x - 1.6x                       |
|  [Campeon]    1.6x - 2.0x                       |
|  [Simetrico]  > 2.0x                            |
|                                                  |
+--------------------------------------------------+
|               [Cerrar]                           |
+--------------------------------------------------+
```

---

### 6.3 Integracion con AI Coach

```typescript
// Nuevos tipos de mensaje para el Coach
type CoachMessageType =
  | 'pr-alert' | 'pr-close' | 'success' | 'motivation' | 'tip' | 'info'
  | 'xp-gained'        // Nuevo: "+120 XP por esta sesion"
  | 'level-up'         // Nuevo: "Subiste a nivel 43!"
  | 'rank-up'          // Nuevo: "Tu pecho subio a Avanzado!"
  | 'achievement';     // Nuevo: "Logro desbloqueado: Veterano"

// Prioridades actualizadas
const MESSAGE_PRIORITIES = {
  'level-up': 10,      // Maxima prioridad
  'rank-up': 9,
  'achievement': 9,
  'pr-alert': 8,
  'xp-gained': 4,      // Baja prioridad, informativo
  // ... resto igual
};
```

---

## PARTE 7: FLUJO DE IMPLEMENTACION

### Fase 1: Fundamentos (Semana 1)

1. **Crear estructura de archivos**
   - Crear carpetas y archivos base
   - Definir tipos TypeScript

2. **Implementar constantes y tablas**
   - Tabla de XP por nivel
   - Ratios de fuerza por ejercicio
   - Colores y configuracion

3. **Implementar estado y persistencia**
   - Funciones de guardar/cargar
   - Migracion de datos existentes

### Fase 2: Logica Core (Semana 2)

4. **Sistema de XP**
   - Calculo de XP por sesion
   - Calculo de XP por PRs
   - Transacciones de XP

5. **Sistema de Niveles**
   - Calculo de nivel desde XP
   - Deteccion de level-up
   - Titulos y progreso

6. **Rangos Musculares**
   - Calculo de 1RM estimado
   - Calculo de ratios ajustados
   - Asignacion de rangos

### Fase 3: Assets Visuales (Semana 3)

7. **Crear iconos SVG de niveles**
   - 10 iconos base (uno por titulo)
   - Variantes con numero de nivel

8. **Crear emblemas de rango**
   - 6 emblemas (uno por rango)
   - Version mini para listas

9. **Crear mapa corporal SVG**
   - Disenar vista frontal
   - Implementar coloreado dinamico

### Fase 4: Componentes UI (Semana 4)

10. **Componente de nivel en header**
    - Badge con nivel actual
    - Mini barra de XP

11. **Hero card actualizado**
    - Mapa corporal mini
    - Info de nivel
    - Tap para modal

12. **Modal de detalles**
    - Vista completa de nivel
    - Mapa corporal grande
    - Guias de niveles y rangos

### Fase 5: Integracion (Semana 5)

13. **Integracion con workout.ts**
    - Calcular XP al guardar sesion
    - Detectar cambios de rango

14. **Integracion con coach.ts**
    - Mensajes de XP ganado
    - Alertas de level-up
    - Alertas de rank-up

15. **Sistema de logros**
    - Verificacion de condiciones
    - Desbloqueo y notificacion

### Fase 6: Pruebas y Pulido (Semana 6)

16. **Testing**
    - Probar migracion con datos reales
    - Verificar calculos de XP
    - Verificar rangos musculares

17. **Optimizacion**
    - Lazy loading de SVGs
    - Cacheo de calculos

18. **Documentacion**
    - Comentarios en codigo
    - Guia de usuario

---

## PARTE 8: INTEGRIDAD DE DATOS Y NUEVOS EJERCICIOS

### 8.1 Principio de No Perdida de Datos

El sistema de gamificacion NUNCA debe perder datos. Toda la informacion existente y futura debe integrarse correctamente.

#### Fuentes de Datos Existentes

```typescript
// Datos que YA existen y deben ser leidos
const EXISTING_DATA_SOURCES = {
  'gymmate_history': HistorySession[],     // Todas las sesiones pasadas
  'gymmate_prs': Record<string, PRData>,   // PRs por ejercicio
  'gymmate_profile': ProfileData,          // Peso corporal del usuario
  'gymmate_custom_exercises': Exercise[],  // Ejercicios personalizados
};
```

#### Flujo de Datos

```
                    ┌─────────────────────────┐
                    │   gymmate_history       │
                    │   (sesiones pasadas)    │
                    └───────────┬─────────────┘
                                │
                                ▼
┌─────────────────┐    ┌─────────────────────────┐    ┌─────────────────┐
│ gymmate_profile │───▶│   MOTOR DE GAMIFICACION │◀───│   gymmate_prs   │
│ (peso corporal) │    │                         │    │ (records)       │
└─────────────────┘    └───────────┬─────────────┘    └─────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
            ┌───────────┐  ┌───────────┐  ┌───────────┐
            │ XP Total  │  │ Nivel 1-  │  │ Rangos    │
            │ + History │  │ 100       │  │ Musculares│
            └───────────┘  └───────────┘  └───────────┘
```

### 8.2 Manejo de Nuevos Ejercicios

Cuando el usuario agrega un ejercicio nuevo (personalizado o del catalogo):

```typescript
function handleNewExercise(exercise: Exercise): void {
  // 1. Determinar grupo muscular
  const muscleGroup = exercise.grupoMuscular;

  // 2. Si tiene sets/reps/peso, calcular 1RM estimado
  if (exercise.peso > 0 && exercise.reps > 0) {
    const estimated1RM = exercise.peso * (1 + exercise.reps / 30);

    // 3. Obtener peso corporal del perfil
    const profile = getProfile();
    const bodyweight = profile.weight || 70;

    // 4. Calcular ratio
    const ratio = estimated1RM / bodyweight;

    // 5. Aplicar multiplicador segun tipo de ejercicio
    const multiplier = getExerciseMultiplier(exercise.nombre);
    const adjustedRatio = ratio / multiplier;

    // 6. Determinar rango
    const rank = getRankFromRatio(adjustedRatio);

    // 7. Actualizar rango del grupo muscular
    updateMuscleGroupRank(muscleGroup, {
      exerciseName: exercise.nombre,
      ratio: adjustedRatio,
      rank: rank
    });
  }
}
```

### 8.3 Mapeo Ejercicio -> Grupo Muscular

```typescript
const EXERCISE_MUSCLE_MAP: Record<string, MuscleGroup> = {
  // Pecho
  'Press banca': 'Pecho',
  'Press inclinado': 'Pecho',
  'Press declinado': 'Pecho',
  'Aperturas': 'Pecho',
  'Fondos': 'Pecho', // Tambien triceps

  // Espalda
  'Peso muerto': 'Espalda',
  'Remo con barra': 'Espalda',
  'Remo con mancuerna': 'Espalda',
  'Jalon al pecho': 'Espalda',
  'Dominadas': 'Espalda',
  'Pullover': 'Espalda',

  // Hombros
  'Press militar': 'Hombros',
  'Elevaciones laterales': 'Hombros',
  'Elevaciones frontales': 'Hombros',
  'Pajaros': 'Hombros',
  'Face pull': 'Hombros',

  // Biceps
  'Curl biceps': 'Biceps',
  'Curl martillo': 'Biceps',
  'Curl concentrado': 'Biceps',
  'Curl predicador': 'Biceps',

  // Triceps
  'Extension triceps': 'Triceps',
  'Press frances': 'Triceps',
  'Patada triceps': 'Triceps',
  'Fondos en banco': 'Triceps',

  // Piernas
  'Sentadilla': 'Piernas',
  'Prensa': 'Piernas',
  'Extension de cuadriceps': 'Piernas',
  'Curl femoral': 'Piernas',
  'Zancadas': 'Piernas',

  // Gluteos
  'Hip thrust': 'Gluteos',
  'Peso muerto rumano': 'Gluteos',
  'Patada de gluteo': 'Gluteos',
  'Puente de gluteo': 'Gluteos',

  // Core
  'Plancha': 'Core',
  'Crunch': 'Core',
  'Russian twist': 'Core',
  'Elevacion de piernas': 'Core',
};

// Para ejercicios no mapeados, usar el grupoMuscular del ejercicio
function getMuscleGroup(exercise: Exercise): MuscleGroup {
  return EXERCISE_MUSCLE_MAP[exercise.nombre] || exercise.grupoMuscular;
}
```

### 8.4 Multiplicadores por Tipo de Ejercicio

Los ratios "normalizados" permiten comparar ejercicios diferentes:

```typescript
const EXERCISE_MULTIPLIERS: Record<string, number> = {
  // Ejercicios de empuje (base 1.0x)
  'Press banca': 1.0,
  'Press inclinado': 1.0,
  'Press militar': 1.0,

  // Sentadillas (mas fuertes que press)
  'Sentadilla': 1.25,
  'Sentadilla frontal': 1.1,

  // Peso muerto (el mas fuerte)
  'Peso muerto': 1.5,
  'Peso muerto rumano': 1.3,

  // Prensa (maquina = mas peso)
  'Prensa': 2.0,
  'Prensa 45': 2.0,

  // Ejercicios de aislamiento (menos peso)
  'Curl biceps': 0.4,
  'Extension triceps': 0.35,
  'Elevaciones laterales': 0.2,

  // Ejercicios de traccion
  'Remo con barra': 0.8,
  'Jalon al pecho': 0.75,
  'Dominadas': 0.9, // Peso corporal + extra

  // Hip thrust (fuerte en gluteos)
  'Hip thrust': 1.4,
};

// Default para ejercicios no listados
function getExerciseMultiplier(exerciseName: string): number {
  return EXERCISE_MULTIPLIERS[exerciseName] || 1.0;
}
```

### 8.5 Recalculo al Cambiar Peso Corporal

Cuando el usuario actualiza su peso en el perfil:

```typescript
function onBodyweightChange(newWeight: number): void {
  // 1. Obtener todos los PRs
  const prs = getAllPRs();

  // 2. Recalcular todos los ratios
  for (const [exercise, prData] of Object.entries(prs)) {
    const estimated1RM = prData.peso * (1 + prData.reps / 30);
    const ratio = estimated1RM / newWeight;
    const multiplier = getExerciseMultiplier(exercise);
    const adjustedRatio = ratio / multiplier;
    const newRank = getRankFromRatio(adjustedRatio);

    // 3. Actualizar ejercicio
    updateExerciseStrength(exercise, {
      estimated1RM,
      bodyweightRatio: ratio,
      adjustedRatio,
      rank: newRank
    });
  }

  // 4. Recalcular rangos musculares
  recalculateAllMuscleRanks();
}
```

---

## PARTE 9: CONSIDERACIONES TECNICAS

### 9.1 Performance

- **Calculos pesados:** Cachear resultados de calculos de rango
- **SVGs:** Usar sprites o inline para evitar requests
- **localStorage:** Separar historial de XP del estado principal

### 9.2 Compatibilidad

- **Navegadores:** SVG soportado en todos los navegadores modernos
- **Fallbacks:** Usar colores solidos si SVG falla
- **Accesibilidad:** Alt text para iconos, ARIA labels

### 9.3 Escalabilidad

- **Nuevos ejercicios:** Sistema permite agregar ejercicios sin cambios
- **Nuevos logros:** Array extensible de achievements
- **Nuevos niveles:** Tabla de niveles facilmente ampliable

---

## PARTE 10: RESUMEN DE ARCHIVOS A CREAR

| Archivo | Proposito | Prioridad |
|---------|-----------|-----------|
| `src/types/gamification.ts` | Tipos TypeScript | Alta |
| `src/features/gamification/constants.ts` | Tablas y configuracion | Alta |
| `src/features/gamification/state.ts` | Estado y persistencia | Alta |
| `src/features/gamification/xp.ts` | Calculos de XP | Alta |
| `src/features/gamification/levels.ts` | Sistema de niveles | Alta |
| `src/features/gamification/muscle-ranks.ts` | Rangos musculares | Alta |
| `src/features/gamification/achievements.ts` | Sistema de logros | Media |
| `src/features/gamification/migration.ts` | Migracion de datos | Alta |
| `src/features/gamification/index.ts` | Exportaciones | Alta |
| `src/ui/gamification/level-badge.ts` | Componente badge | Media |
| `src/ui/gamification/muscle-map.ts` | Mapa corporal | Media |
| `src/ui/gamification/rank-emblem.ts` | Emblemas | Media |
| `src/ui/gamification/xp-bar.ts` | Barra XP | Media |
| `src/ui/gamification/level-modal.ts` | Modal detalles | Media |
| `src/assets/gamification/*.svg` | Assets visuales | Media |

---

## PARTE 10: METRICAS DE EXITO

### KPIs a Monitorear

1. **Engagement**
   - Sesiones por semana (aumentar 20%)
   - Tiempo en app (aumentar 15%)

2. **Retencion**
   - Usuarios activos a 30 dias (aumentar 25%)
   - Rachas promedio (aumentar de 3 a 5 dias)

3. **Progresion**
   - PRs por usuario/mes (aumentar 10%)
   - Nivel promedio despues de 1 mes (target: nivel 15+)

---

**Documento creado:** 2026-01-03
**Version:** 1.0
**Estado:** Pendiente de aprobacion para implementacion
