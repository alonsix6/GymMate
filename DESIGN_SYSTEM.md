# GymMate - Sistema de Diseno Profesional v3.1

## Indice

1. [Filosofia de Diseno](#filosofia-de-diseno)
2. [Paleta de Colores](#paleta-de-colores)
3. [Tipografia](#tipografia)
4. [Componentes](#componentes)
5. [Iconografia](#iconografia)
6. [Espaciado y Layout](#espaciado-y-layout)
7. [Interacciones](#interacciones)
8. [Buenas Practicas](#buenas-practicas)

---

## Filosofia de Diseno

GymMate utiliza una estetica **Dark Mode Profesional** con enfasis en:

- **Alto contraste** para facilitar la lectura durante entrenamientos
- **Colores solidos** - SIN gradientes para apariencia profesional
- **Diseno Mobile-First** optimizado para uso en gimnasio
- **Lucide Icons** - Iconografia SVG consistente y profesional

### Principios Clave

1. **CERO gradientes** - Solo colores solidos
2. **CERO emojis** - Solo iconos Lucide
3. **Alto contraste** - Texto legible en cualquier condicion
4. **Feedback tactil** - Respuesta visual inmediata

---

## Paleta de Colores

### Colores Base (Sin Gradientes)

```css
:root {
  /* Background */
  --color-dark-bg: #0f172a;        /* Slate 900 - Fondo principal */
  --color-dark-surface: #1e293b;   /* Slate 800 - Superficies elevadas */
  --color-dark-border: rgba(255, 255, 255, 0.05);

  /* Acento Principal - UN solo color */
  --color-accent: #3b82f6;         /* Blue 500 */
  --color-accent-hover: #2563eb;   /* Blue 600 */

  /* Texto */
  --color-text-primary: #f1f5f9;   /* Slate 100 */
  --color-text-secondary: #94a3b8; /* Slate 400 */
  --color-text-muted: #64748b;     /* Slate 500 */

  /* Estados */
  --color-success: #22c55e;        /* Green 500 */
  --color-warning: #f59e0b;        /* Amber 500 */
  --color-error: #ef4444;          /* Red 500 */
  --color-info: #06b6d4;           /* Cyan 500 */
}
```

### Uso en Tailwind

```html
<!-- Background -->
<div class="bg-dark-bg">         <!-- #0f172a -->
<div class="bg-dark-surface">    <!-- #1e293b -->

<!-- Texto -->
<p class="text-text-primary">    <!-- #f1f5f9 -->
<p class="text-text-secondary">  <!-- #94a3b8 -->
<p class="text-text-muted">      <!-- #64748b -->

<!-- Acento -->
<button class="bg-accent">       <!-- #3b82f6 -->
<span class="text-accent">       <!-- #3b82f6 -->

<!-- Estados -->
<div class="bg-status-success">  <!-- #22c55e -->
<div class="bg-status-warning">  <!-- #f59e0b -->
<div class="bg-status-error">    <!-- #ef4444 -->
```

### Colores con Opacidad

```html
<!-- Fondos sutiles para cards de estado -->
<div class="bg-status-success/10">  <!-- 10% opacidad -->
<div class="bg-status-warning/20">  <!-- 20% opacidad -->
<div class="bg-accent/10">          <!-- 10% opacidad -->

<!-- Bordes -->
<div class="border-dark-border">    <!-- rgba(255,255,255,0.05) -->
<div class="border-accent/30">      <!-- 30% opacidad -->
```

---

## Tipografia

### Fuentes

```css
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],      /* UI general */
  display: ['Oswald', 'system-ui', 'sans-serif'],  /* Titulos de impacto */
}
```

### Uso de Fuentes

| Elemento | Fuente | Clase Tailwind |
|----------|--------|----------------|
| Titulos principales | Oswald | `font-display font-bold` |
| Texto general | Inter | `font-sans` (default) |
| Labels | Inter | `font-semibold text-sm` |
| Numeros grandes | Oswald | `font-display text-8xl` |

### Escala Tipografica

```html
<h1 class="text-2xl font-display font-bold">   <!-- 24px -->
<h2 class="text-lg font-bold">                 <!-- 18px -->
<p class="text-sm text-text-secondary">        <!-- 14px -->
<span class="text-xs text-text-muted">         <!-- 12px -->
```

---

## Componentes

### Card Base

```html
<div class="bg-dark-surface border border-dark-border rounded-xl p-4">
  <!-- Contenido -->
</div>
```

### Boton Primario

```html
<button class="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 rounded-xl active:scale-95 transition-transform">
  Texto del Boton
</button>
```

### Boton Secundario

```html
<button class="bg-dark-surface border border-dark-border text-text-secondary hover:text-text-primary py-2 px-4 rounded-lg active:scale-95 transition-transform">
  Cancelar
</button>
```

### Boton de Estado

```html
<!-- Success -->
<button class="bg-status-success text-white py-2 px-4 rounded-lg">
  Guardar
</button>

<!-- Warning -->
<button class="bg-status-warning text-dark-bg py-2 px-4 rounded-lg">
  Cardio
</button>

<!-- Error -->
<button class="bg-status-error/20 border border-status-error/30 text-status-error py-2 px-4 rounded-lg">
  Eliminar
</button>
```

### Input

```html
<input
  type="text"
  class="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-text-primary focus:border-accent focus:outline-none"
  placeholder="Placeholder"
>
```

### Select

```html
<select class="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-text-primary focus:border-accent">
  <option value="">Seleccionar...</option>
</select>
```

### Card de Rutina

```html
<div class="bg-dark-surface border border-dark-border border-l-4 border-l-blue-500 rounded-xl p-4 cursor-pointer active:scale-[0.98] transition-transform">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-lg bg-dark-bg flex items-center justify-center">
      <i data-lucide="dumbbell" class="w-6 h-6 text-accent"></i>
    </div>
    <div class="flex-1">
      <h3 class="font-bold text-text-primary text-sm">Nombre Rutina</h3>
      <p class="text-xs text-text-secondary">4 ejercicios</p>
    </div>
    <i data-lucide="chevron-right" class="w-5 h-5 text-text-muted"></i>
  </div>
</div>
```

### Box de Resultado

```html
<div class="bg-status-info/10 border-l-4 border-status-info p-4 rounded-lg">
  <p class="text-sm text-text-secondary mb-1">Titulo</p>
  <p class="text-2xl font-bold text-accent">Valor</p>
</div>
```

---

## Iconografia

### Lucide Icons

GymMate usa exclusivamente **Lucide Icons** - una biblioteca de iconos SVG profesional.

```typescript
// src/utils/icons.ts
import { createIcons, icons } from 'lucide';

// Mapeo de nombres semanticos a iconos Lucide
export const ICON_MAP = {
  workout: 'dumbbell',
  trophy: 'trophy',
  timer: 'timer',
  home: 'home',
  chart: 'line-chart',
  history: 'history',
  user: 'user',
  settings: 'settings',
  play: 'play',
  pause: 'pause',
  check: 'check',
  close: 'x',
  plus: 'plus',
  minus: 'minus',
  chevronRight: 'chevron-right',
  flame: 'flame',
  zap: 'zap',
  clock: 'clock',
  // ... 94+ iconos mapeados
};
```

### Uso de Iconos

```typescript
import { icon } from '@/utils/icons';

// Funcion helper
icon('workout', 'md', 'text-accent')
// Genera: <i data-lucide="dumbbell" class="w-5 h-5 text-accent"></i>
```

### Tamanos de Icono

| Tamano | Clase | Pixeles |
|--------|-------|---------|
| `sm` | `w-4 h-4` | 16px |
| `md` | `w-5 h-5` | 20px |
| `lg` | `w-6 h-6` | 24px |
| `xl` | `w-8 h-8` | 32px |

### Ejemplo en HTML

```html
<i data-lucide="dumbbell" class="w-6 h-6 text-accent"></i>
<i data-lucide="trophy" class="w-5 h-5 text-status-warning"></i>
<i data-lucide="check-circle" class="w-5 h-5 text-status-success"></i>
```

---

## Espaciado y Layout

### Sistema de Espaciado

| Clase | Valor | Uso |
|-------|-------|-----|
| `gap-2` | 8px | Entre elementos pequenos |
| `gap-3` | 12px | Entre tarjetas |
| `gap-4` | 16px | Entre secciones |
| `p-3` | 12px | Padding de botones |
| `p-4` | 16px | Padding de cards |
| `mb-3` | 12px | Margen entre items |
| `mb-6` | 24px | Margen entre secciones |

### Layout Principal

```html
<body class="bg-dark-bg text-text-primary">
  <main class="p-4 pb-24">
    <!-- Contenido con padding bottom para nav -->
  </main>

  <nav class="bottom-nav">
    <!-- Navegacion fija -->
  </nav>
</body>
```

### Grid de Quick Actions

```html
<div class="grid grid-cols-4 gap-3">
  <button class="bg-dark-surface border border-dark-border rounded-xl p-3 flex flex-col items-center gap-2">
    <i data-lucide="calculator" class="w-6 h-6 text-accent"></i>
    <span class="text-xs text-text-secondary">Calc</span>
  </button>
  <!-- ... mas botones -->
</div>
```

---

## Interacciones

### Feedback Tactil

Todos los elementos clickeables deben tener feedback tactil:

```html
<button class="... active:scale-95 transition-transform">
<div class="... active:scale-[0.98] transition-transform cursor-pointer">
```

### Hover States

```html
<button class="bg-accent hover:bg-accent-hover">
<a class="text-text-secondary hover:text-text-primary">
<div class="hover:bg-white/5">
```

### Focus States

```html
<input class="focus:border-accent focus:outline-none">
<button class="focus:ring-accent focus:ring-offset-0">
```

### Transiciones

```css
/* Transicion por defecto */
transition-transform  /* Para scale */
transition-all        /* Para todo */
duration-300          /* 300ms */
```

---

## Navegacion Inferior

```html
<nav class="bottom-nav">
  <div class="flex items-center justify-around">
    <div data-nav="home" class="bottom-nav-item active">
      <i data-lucide="home" class="w-5 h-5"></i>
      <span>Inicio</span>
    </div>
    <div data-nav="workout" class="bottom-nav-item">
      <i data-lucide="dumbbell" class="w-5 h-5"></i>
      <span>Entreno</span>
    </div>
    <!-- FAB central -->
    <div class="fab-button">
      <i data-lucide="plus" class="w-6 h-6 text-white"></i>
    </div>
    <!-- ... mas items -->
  </div>
</nav>
```

### Estilos Bottom Nav

```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--color-dark-border);
  padding-bottom: env(safe-area-inset-bottom);
}

.bottom-nav-item {
  color: var(--color-text-muted);
}

.bottom-nav-item.active {
  color: var(--color-accent);
}

.fab-button {
  background-color: var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}
```

---

## Buenas Practicas

### SI Hacer

```html
<!-- Colores solidos -->
<button class="bg-accent text-white">

<!-- Iconos Lucide -->
<i data-lucide="check" class="w-5 h-5"></i>

<!-- Feedback tactil -->
<button class="active:scale-95 transition-transform">

<!-- Alto contraste -->
<p class="text-text-primary">Texto principal</p>
```

### NO Hacer

```html
<!-- NO gradientes -->
<button class="bg-gradient-to-r from-blue-500 to-purple-500">

<!-- NO emojis -->
<span>Guardado exitosamente</span>

<!-- NO colores claros en dark mode -->
<p class="text-gray-900">

<!-- NO elementos sin feedback -->
<button>Click</button>
```

---

## Checklist de Implementacion

Cuando agregues nuevas funcionalidades, verifica:

- [ ] Usa `bg-dark-surface` para contenedores
- [ ] Usa `border-dark-border` para bordes
- [ ] Texto principal en `text-text-primary`
- [ ] Texto secundario en `text-text-secondary`
- [ ] Acento con `text-accent` o `bg-accent`
- [ ] Iconos de Lucide (NO emojis)
- [ ] Feedback `active:scale-95` en clickeables
- [ ] Touch targets minimo 44px
- [ ] SIN gradientes

---

## Recursos

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [Google Fonts - Oswald](https://fonts.google.com/specimen/Oswald)

---

**Version:** 3.1.0
**Ultima actualizacion:** Diciembre 2025
