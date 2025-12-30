# GymMate v4.0 - Tu Compañero Personal de Entrenamiento

**Progressive Web App profesional para gestionar entrenamientos con seguimiento completo de volumen, PRs, historial, cardio, medidas corporales y análisis inteligente.**

## Novedades en v4.0

- **ML Insights** - Análisis inteligente en hero section (rachas, tendencias, PRs cercanos, músculos descuidados)
- **Medidas Corporales** - Tracking de peso, cuello, pecho, cintura, cadera, brazos, muslos con cálculo de grasa corporal (método Navy)
- **RPE Post-Sesión** - Selector estilo Apple Watch para calificar intensidad (1-10)
- **AI Coach Dinámico** - Mensajes contextuales durante el entrenamiento
- **Ejercicios Personalizados** - Crea tus propios ejercicios en el workout builder
- **Historial Expandido** - Hasta 200 sesiones guardadas (antes 30)

---

## Características Principales

### Entrenamiento de Pesas

- 5 Grupos de entrenamiento completos (Piernas, Upper Push/Pull, etc.)
- Cálculo automático de volumen (`sets × reps × peso`)
- Regla de mancuernas: peso × 2 automático
- Resumen dinámico por grupo muscular
- Ejercicios opcionales diferenciados
- Timer de descanso integrado (1-5 minutos)
- Tracking automático de Personal Records
- Guardado automático de borradores (draft)

### Cardio & HIIT

- **Tabata**: 20s trabajo / 10s descanso × 8 rondas
- **EMOM**: Every Minute On the Minute
- **AMRAP**: As Many Reps As Possible
- **Circuit**: Ejercicios en secuencia con descansos
- **Pyramid**: Intervalos ascendentes y descendentes (20s → 30s → 40s → 30s → 20s)
- **Custom**: Configura tu propio intervalo
- **ForTime**: Completa el workout lo más rápido posible

### Historial y Estadísticas

- Hasta 200 entrenamientos guardados
- Historial unificado de pesas y cardio
- Exportación a Excel con datos completos
- RPE tracking por sesión
- 4 gráficos interactivos con Chart.js:
  - Tendencia de volumen
  - Distribución muscular
  - Progreso de peso
  - Comparativa semanal

### Perfil y Medidas Corporales

- Datos personales (nombre, edad, género, peso, altura)
- Medidas corporales detalladas (cuello, pecho, cintura, cadera, brazos, muslos)
- Cálculo automático de grasa corporal (método Navy)
- Historial de mediciones (hasta 100)
- Sincronización automática del peso con perfil

### Calculadoras Fitness

- **1RM Calculator**: Epley, Brzycki, Lombardi (promedio)
- **Calorías**: TDEE con Mifflin-St Jeor
- **Peso Progresivo**: Sugerencias ACSM/NSCA

---

## Tecnologías

| Categoría | Tecnología |
|-----------|------------|
| Build Tool | Vite 5.x |
| Lenguaje | TypeScript 5.x |
| Estilos | Tailwind CSS 3.4 (local, no CDN) |
| Iconos | Lucide Icons |
| Gráficos | Chart.js 4.x |
| Excel | SheetJS (xlsx) |
| PWA | vite-plugin-pwa + Workbox |
| Tests | Vitest |
| Fonts | Inter + Oswald (Google Fonts) |

---

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/alonsix6/GymMate.git
cd GymMate

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build
npm run preview

# Tests
npm test
```

---

## Estructura del Proyecto

```
GymMate/
├── src/
│   ├── main.ts              # Entry point
│   ├── styles/main.css      # Tailwind + custom CSS
│   ├── types/index.ts       # TypeScript types
│   ├── constants/index.ts   # App constants
│   ├── state/session.ts     # Session state management
│   ├── data/
│   │   ├── training-groups.ts  # Rutinas predefinidas
│   │   └── cardio-exercises.ts # Ejercicios cardio
│   ├── features/
│   │   ├── workout.ts       # Lógica de entrenamiento
│   │   ├── cardio.ts        # Módulo cardio completo
│   │   ├── timer.ts         # Timer de descanso
│   │   ├── history.ts       # Historial y stats
│   │   ├── charts.ts        # Gráficos Chart.js
│   │   ├── calculators.ts   # Calculadoras fitness
│   │   ├── profile.ts       # Perfil y medidas corporales
│   │   └── coach.ts         # AI Coach dinámico
│   ├── ui/
│   │   ├── navigation.ts    # Navegación y tabs
│   │   ├── modals.ts        # Sistema de modales
│   │   └── components.ts    # Componentes reutilizables
│   ├── utils/
│   │   ├── storage.ts       # localStorage helpers
│   │   ├── icons.ts         # Lucide icons system
│   │   ├── calculations.ts  # Cálculos matemáticos
│   │   └── insights.ts      # ML Insights engine
│   └── tests/
│       └── calculations.test.ts
├── public/
│   ├── icon-192.png
│   └── icon-512.png
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Estructura de Datos (localStorage)

### Sesión de Pesas
```json
{
  "date": "2025-12-26",
  "type": "weights",
  "grupo": "GRUPO 1 - Piernas + Glúteos",
  "ejercicios": [
    {
      "nombre": "Hip Thrust",
      "sets": 3,
      "reps": 10,
      "peso": 80,
      "esMancuerna": false,
      "grupoMuscular": "Glúteos",
      "volumen": 2400,
      "completado": true
    }
  ],
  "volumenTotal": 5400,
  "volumenPorGrupo": { "Glúteos": 2400, "Piernas": 3000 }
}
```

### Sesión de Cardio
```json
{
  "date": "2025-12-26",
  "type": "cardio",
  "mode": "pyramid",
  "stats": {
    "totalTime": 185,
    "roundsCompleted": 5,
    "workTime": 150,
    "restTime": 35
  }
}
```

---

## Sistema de Diseño

### Paleta de Colores (Sin Gradientes)

```css
/* Background */
--dark-bg: #0f172a;
--dark-surface: #1e293b;
--dark-border: rgba(255, 255, 255, 0.05);

/* Acento Principal */
--accent: #3b82f6;
--accent-hover: #2563eb;

/* Texto */
--text-primary: #f1f5f9;
--text-secondary: #94a3b8;
--text-muted: #64748b;

/* Estados */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #06b6d4;
```

### Iconos (Lucide)

```typescript
import { icon } from '@/utils/icons';

// Uso
icon('workout', 'md', 'text-accent')  // → <i data-lucide="dumbbell" class="w-5 h-5 text-accent"></i>
icon('trophy', 'lg', 'text-status-warning')
```

---

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |
| `npm test` | Ejecutar tests |
| `npm run test:ui` | Tests con UI |
| `npm run test:coverage` | Coverage report |

---

## PWA Features

- Instalable como app nativa
- Funciona offline con Service Worker
- Cache inteligente con Workbox
- Auto-update de versiones
- Shortcuts para acciones rápidas

---

## Compatibilidad

- Chrome/Edge (recomendado)
- Firefox
- Safari (iOS/macOS)
- Navegadores móviles modernos

---

## Documentación Adicional

- [Sistema de Diseño](DESIGN_SYSTEM.md)
- [Guía de Calculadoras](CALCULATORS_GUIDE.md)
- [MEV/MRV Guide](MEV_MRV_GUIDE.md)
- [Features Roadmap](FEATURES.md)

---

## Changelog

### v4.0.0 (Diciembre 2025)
- ML Insights en hero section
- Medidas corporales con cálculo de grasa corporal
- RPE post-sesión estilo Apple Watch
- AI Coach dinámico contextual
- Ejercicios personalizados en workout builder
- Historial expandido a 200 sesiones

### v3.1.0 (Diciembre 2025)
- Fix: CSS no cargaba por cache de PWA
- PWA: cleanupOutdatedCaches, skipWaiting, clientsClaim
- CSS crítico inline para fallback

### v3.0.0 (Diciembre 2025)
- Migración completa a Vite + TypeScript
- Tailwind CSS local (sin CDN)
- Lucide icons reemplazando emojis
- Eliminación total de gradientes
- Módulo de Cardio & HIIT completo (7 modos)
- 21 tests unitarios con Vitest
- Arquitectura modular (16+ módulos)

### v2.1.0 (Diciembre 2025)
- Dark Mode Premium
- Chart.js integration
- Excel export

### v2.0.0 (Diciembre 2025)
- PWA inicial
- Timer de descanso
- Tracking de PRs

---

**Versión:** 4.0.0
**Desarrollado para:** Alonso
**Fecha:** Diciembre 2025
