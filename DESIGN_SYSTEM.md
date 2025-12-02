# 🎨 GymMate - Sistema de Diseño Dark Mode Premium

## 📋 Índice
1. [Filosofía de Diseño](#filosofía-de-diseño)
2. [Paleta de Colores](#paleta-de-colores)
3. [Tipografía](#tipografía)
4. [Componentes](#componentes)
5. [Efectos Visuales](#efectos-visuales)
6. [Espaciado y Layout](#espaciado-y-layout)
7. [Interacciones y Animaciones](#interacciones-y-animaciones)
8. [Iconografía](#iconografía)
9. [Buenas Prácticas](#buenas-prácticas)

---

## 🎯 Filosofía de Diseño

**GymMate** utiliza una estética **Dark Mode Premium** con énfasis en:
- **Alto contraste** para facilitar la lectura durante entrenamientos
- **Efectos glassmorphism** para profundidad y modernidad
- **Gradientes vibrantes** que transmiten energía y motivación
- **Diseño Mobile-First** optimizado para uso en gimnasio

---

## 🎨 Paleta de Colores

### Colores Principales

```css
/* Background */
--dark-bg: #0f172a;        /* Slate 900 - Fondo principal de la app */
--dark-surface: #1e293b;   /* Slate 800 - Superficies elevadas, inputs */

/* Acentos Primarios */
--accent-blue: #2563eb;    /* Blue 600 - Acento principal */
--accent-purple: #7c3aed;  /* Purple 600 - Acento secundario */
--accent-cyan: #22d3ee;    /* Cyan 400 - Highlights y estados activos */

/* Gradientes */
primary-gradient: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
secondary-gradient: linear-gradient(to right, #2563eb, #7c3aed);
```

### Colores de Texto

```css
/* Jerarquía de texto */
text-white       /* Títulos principales, texto importante */
text-gray-300    /* Labels, texto secundario */
text-gray-400    /* Descripciones, subtítulos */
text-gray-500    /* Texto terciario, hints */
```

### Colores Funcionales

```css
/* Success */
--success: #22c55e;        /* Green 500 */
bg-green-500/10            /* Background con opacidad */
border-green-500           /* Bordes de éxito */

/* Warning/Calories */
--warning: #f97316;        /* Orange 500 */
bg-orange-500/10
border-orange-500

/* Error/Danger */
--error: #ef4444;          /* Red 500 */
bg-red-500/10
border-red-500

/* Info */
--info: #3b82f6;           /* Blue 500 */
bg-blue-500/10
border-blue-500
```

### Colores con Opacidad

Para fondos translúcidos y efectos de overlay:
```css
rgba(30, 41, 59, 0.7)      /* Glass card background */
rgba(255, 255, 255, 0.05)  /* Border sutil */
rgba(255, 255, 255, 0.10)  /* Border input */
rgba(37, 99, 235, 0.2)     /* Glow effect */
```

---

## ✍️ Tipografía

### Fuentes

```html
<!-- Google Fonts CDN -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
/* Configuración Tailwind */
fontFamily: {
  'sans': ['Inter', 'sans-serif'],      /* Cuerpo, párrafos, UI general */
  'display': ['Oswald', 'sans-serif'],  /* Títulos de impacto, headers */
}
```

### Uso de Fuentes

| Elemento | Fuente | Peso | Clase Tailwind | Ejemplo |
|----------|--------|------|----------------|---------|
| Títulos principales | Oswald | 700 | `font-display font-bold uppercase` | "PIERNAS + GLÚTEOS" |
| Títulos secciones | Oswald | 600 | `font-display font-semibold uppercase` | "RUTINAS DISPONIBLES" |
| Texto general | Inter | 400-500 | `font-sans` | Párrafos, descripciones |
| Labels | Inter | 600 | `font-semibold` | "Selecciona Ejercicio:" |
| Botones | Inter | 600 | `font-semibold` | "COMENZAR ENTRENAMIENTO" |

### Escala Tipográfica

```css
/* Títulos */
text-3xl    /* 30px - Nombre usuario en header */
text-2xl    /* 24px - Títulos de sección */
text-xl     /* 20px - Subtítulos */
text-lg     /* 18px - Títulos de tarjeta */

/* Cuerpo */
text-base   /* 16px - Texto normal */
text-sm     /* 14px - Texto secundario */
text-xs     /* 12px - Hints, descripciones pequeñas */
```

---

## 🧩 Componentes

### Glass Card

**El componente principal del sistema de diseño.**

```css
.glass-card {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 1rem; /* 16px */
}
```

**Uso en HTML:**
```html
<div class="glass-card p-6">
    <!-- Contenido -->
</div>
```

**Cuándo usar:**
- Tarjetas de contenido principal
- Secciones de formulario
- Contenedores de resultados
- Modales y popups

---

### Botones

#### Botón Primario (CTA Principal)

```html
<button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-500/30 active:scale-95 transition-transform">
    COMENZAR ENTRENAMIENTO
</button>
```

**Características:**
- Gradiente blue-600 → purple-600
- Sombra con opacidad para efecto "glow"
- `active:scale-95` para feedback táctil
- Padding vertical generoso (py-4)
- Texto en uppercase con font-semibold

#### Botones Secundarios (por color funcional)

**Exportar/Success:**
```html
<button class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg shadow-green-500/30 active:scale-95 transition-transform">
    📥 Exportar a Excel
</button>
```

**Calcular/Warning:**
```html
<button class="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-orange-500/30 active:scale-95 transition-transform">
    Calcular
</button>
```

**Cancelar/Neutral:**
```html
<button class="bg-dark-surface border border-white/10 hover:bg-dark-surface/80 text-gray-300 font-bold py-3 rounded-xl active:scale-95 transition-transform">
    Cancelar
</button>
```

---

### Inputs y Selects

```html
<!-- Input de texto/número -->
<input
    type="text"
    class="w-full px-4 py-2 bg-dark-surface border border-white/10 rounded-lg text-white focus:border-blue-500"
    placeholder="Ej: 70"
>

<!-- Select dropdown -->
<select class="w-full px-4 py-2 bg-dark-surface border border-white/10 rounded-lg text-white focus:border-blue-500">
    <option value="">-- Elige una opción --</option>
    <option value="1">Opción 1</option>
</select>

<!-- Label -->
<label class="block text-sm font-semibold text-gray-300 mb-2">
    Nombre del campo:
</label>
```

**Características:**
- Background: `bg-dark-surface`
- Border sutil: `border-white/10`
- Focus state con color de acento
- Placeholder con color legible
- Height mínimo 44px para touch targets

---

### Tarjetas de Rutina/Seleccionables

```html
<div class="glass-card p-4 flex items-center justify-between active:scale-95 transition-transform cursor-pointer" data-grupo="grupo1">
    <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-2xl">
            🦵
        </div>
        <div>
            <p class="font-semibold">Piernas + Glúteos</p>
            <p class="text-xs text-gray-400">4 días/sem</p>
        </div>
    </div>
    <i class="ph-bold ph-caret-right text-gray-400"></i>
</div>
```

**Características:**
- Glass card como base
- Icono en contenedor con color temático (`bg-{color}-500/10`)
- Información jerárquica (título + subtítulo)
- Indicador visual de navegación (flecha)
- Efecto scale en active state

---

### Quick Actions Grid

```html
<div class="glass-card p-4 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer" data-action="calculators">
    <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
        <i class="ph-bold ph-calculator text-purple-400 text-2xl"></i>
    </div>
    <span class="text-sm font-medium">1RM Calc</span>
</div>
```

**Layout del grid:**
```html
<section class="grid grid-cols-2 gap-4">
    <!-- 4 items -->
</section>
```

---

### Cajas de Resultados

```html
<div class="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-lg backdrop-blur-sm">
    <p class="text-sm text-gray-300 mb-2">
        <strong>Mejor registro:</strong> <span id="result">150kg x 8</span>
    </p>
    <div class="grid grid-cols-3 gap-3 mt-4">
        <div class="text-center">
            <p class="text-xs text-gray-400">Epley</p>
            <p class="text-2xl font-bold gradient-text">187.5</p>
            <p class="text-xs text-gray-500">kg</p>
        </div>
        <!-- Más columnas -->
    </div>
</div>
```

**Características:**
- Fondo con opacidad del color funcional (`bg-{color}-500/10`)
- Border izquierdo de 4px con color sólido
- Backdrop blur sutil
- Grid para layout de resultados
- Texto con jerarquía visual clara

---

## ✨ Efectos Visuales

### Glassmorphism

**Aplicación principal:**
```css
.glass-card {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
}
```

### Efecto Glow

**Para elementos destacados (Hero section):**

```html
<div class="relative glass-card overflow-hidden">
    <div class="glow-bg"></div>
    <div class="relative z-10">
        <!-- Contenido -->
    </div>
</div>
```

```css
.glow-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(37, 99, 235, 0.2), transparent 70%);
    filter: blur(40px);
    z-index: -1;
}
```

### Gradient Text

**Para títulos especiales:**

```html
<h2 class="gradient-text">PIERNAS + GLÚTEOS</h2>
```

```css
.gradient-text {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

### Avatar Ring Gradient

**Para avatares con borde gradiente:**

```html
<div class="ring-gradient">
    <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
        💪
    </div>
</div>
```

```css
.ring-gradient {
    position: relative;
}

.ring-gradient::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    z-index: -1;
}
```

---

## 📏 Espaciado y Layout

### Sistema de Espaciado

| Tamaño | Valor | Uso |
|--------|-------|-----|
| `gap-3` | 12px | Entre tarjetas pequeñas |
| `gap-4` | 16px | Grid de Quick Actions |
| `gap-6` | 24px | Entre secciones principales |
| `p-4` | 16px | Padding interno de tarjetas |
| `p-6` | 24px | Padding de secciones importantes |
| `mb-4` | 16px | Margen bottom estándar |
| `mb-6` | 24px | Margen bottom entre secciones |

### Layout Principal

```html
<body class="bg-dark-bg min-h-screen pb-32 font-sans">
    <header class="px-6 pt-8 pb-6">
        <!-- Header content -->
    </header>

    <main class="px-6 space-y-6">
        <!-- Secciones con space-y-6 -->
    </main>

    <nav class="bottom-nav">
        <!-- Navigation -->
    </nav>
</body>
```

**Nota:** `pb-32` en body para compensar la altura del bottom nav + FAB.

---

## 🎭 Interacciones y Animaciones

### Estados Interactivos

#### Scale en Active

**Aplicar a TODOS los elementos clicables:**

```css
active:scale-95
transition-transform
```

```html
<button class="... active:scale-95 transition-transform">
    Botón
</button>

<div class="... active:scale-95 transition-transform cursor-pointer">
    Tarjeta clickeable
</div>
```

#### Hover States

```css
/* Botones */
hover:from-blue-500 hover:to-purple-500

/* Fondos */
hover:bg-dark-surface/80

/* Texto */
hover:text-white
```

### Transiciones Globales

```css
* {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Fade In

```css
.fade-in {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
```

---

## 🎨 Iconografía

### Phosphor Icons

```html
<!-- CDN -->
<script src="https://unpkg.com/@phosphor-icons/web"></script>

<!-- Uso -->
<i class="ph-bold ph-house text-xl"></i>
<i class="ph-bold ph-calculator text-purple-400 text-2xl"></i>
<i class="ph-bold ph-caret-right text-gray-400"></i>
```

**Variantes:**
- `ph` - Regular
- `ph-bold` - Bold (recomendado para UI)
- `ph-fill` - Filled

**Tamaños comunes:**
- `text-xl` (20px) - Navigation icons
- `text-2xl` (24px) - Quick Actions
- `text-3xl` (30px) - FAB central

### Colores de Iconos

```css
/* Neutros */
text-gray-400    /* Iconos secundarios */
text-white       /* Iconos activos */

/* Temáticos (en Quick Actions) */
text-purple-400  /* Calculadora */
text-cyan-400    /* Historial */
text-blue-400    /* Progreso */
text-yellow-400  /* PRs */
```

---

## 🏗️ Bottom Navigation

### Estructura con FAB Central

```html
<nav class="bottom-nav">
    <div class="bottom-nav-item active" data-nav="home">
        <i class="ph-bold ph-house text-xl"></i>
        <span>Inicio</span>
    </div>
    <div class="bottom-nav-item" data-nav="charts">
        <i class="ph-bold ph-chart-line text-xl"></i>
        <span>Gráficos</span>
    </div>
    <div class="fab" id="fabButton">
        <i class="ph-bold ph-plus text-white text-3xl"></i>
    </div>
    <div class="bottom-nav-item" data-nav="history">
        <i class="ph-bold ph-clock-counter-clockwise text-xl"></i>
        <span>Historial</span>
    </div>
    <div class="bottom-nav-item" data-nav="profile">
        <i class="ph-bold ph-user text-xl"></i>
        <span>Perfil</span>
    </div>
</nav>
```

### Estilos

```css
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.75rem 0 1.5rem 0;
    padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
    z-index: 100;
}

.bottom-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: #9ca3af;
    cursor: pointer;
    flex: 1;
    padding: 0.5rem;
}

.bottom-nav-item.active {
    color: var(--accent-cyan);
}

.bottom-nav-item:active {
    transform: scale(0.95);
}

.fab {
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
    margin-top: -32px;
    cursor: pointer;
}

.fab:active {
    transform: scale(0.95);
}

.fab::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    opacity: 0.5;
    filter: blur(8px);
    z-index: -1;
}
```

---

## ✅ Buenas Prácticas

### 1. Siempre usar Glass Card

**❌ Evitar:**
```html
<div class="bg-white rounded-xl shadow-lg p-4">
```

**✅ Preferir:**
```html
<div class="glass-card p-4">
```

---

### 2. Colores de Texto Apropiados

**❌ Evitar:**
```html
<h2 class="text-gray-900">Título</h2>
<p class="text-gray-600">Descripción</p>
```

**✅ Preferir:**
```html
<h2 class="text-white">Título</h2>
<p class="text-gray-400">Descripción</p>
```

---

### 3. Siempre Agregar Feedback Táctil

**❌ Evitar:**
```html
<button class="bg-blue-500 text-white p-4">
    Click aquí
</button>
```

**✅ Preferir:**
```html
<button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 active:scale-95 transition-transform">
    Click aquí
</button>
```

---

### 4. Inputs con Estilos Consistentes

**❌ Evitar:**
```html
<input class="border-2 border-gray-300 rounded-lg">
```

**✅ Preferir:**
```html
<input class="bg-dark-surface border border-white/10 rounded-lg text-white focus:border-blue-500">
```

---

### 5. Usar Uppercase para Títulos Display

**❌ Evitar:**
```html
<h2 class="font-display">Calculadora de 1rm</h2>
```

**✅ Preferir:**
```html
<h2 class="font-display font-bold uppercase">Calculadora de 1RM</h2>
```

---

### 6. Sombras con Opacidad en Botones

**❌ Evitar:**
```html
<button class="shadow-lg">Botón</button>
```

**✅ Preferir:**
```html
<button class="shadow-lg shadow-blue-500/30">Botón</button>
```

---

### 7. Modales Consistentes

**❌ Evitar:**
```html
<div class="modal">
    <div class="bg-white rounded-xl">
        <!-- Contenido -->
    </div>
</div>
```

**✅ Preferir:**
```html
<div class="modal">
    <div class="glass-card">
        <!-- Contenido -->
    </div>
</div>
```

---

### 8. Touch Targets Mínimos

**Todos los elementos interactivos deben tener mínimo 44x44px:**

```css
input, button, select {
    min-height: 44px;
}
```

```html
<button class="py-3 px-4">  <!-- py-3 = 12px * 2 + line-height > 44px -->
    Botón
</button>
```

---

## 📱 Responsive Design

### Mobile First

Diseñar primero para mobile, luego escalar:

```html
<!-- Mobile: 1 columna -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Desktop: 2 columnas -->
</div>
```

### Breakpoints

```css
/* Mobile: Default */
/* Tablet: md: (768px) */
/* Desktop: lg: (1024px) */
```

---

## 🚀 Checklist de Implementación

Cuando agregues nuevas funcionalidades, verifica:

- [ ] Usa `glass-card` para contenedores principales
- [ ] Títulos con `font-display font-bold uppercase`
- [ ] Texto secundario en `text-gray-400`
- [ ] Inputs con `bg-dark-surface border border-white/10`
- [ ] Botones con gradiente y `shadow-lg shadow-{color}-500/30`
- [ ] Feedback táctil `active:scale-95 transition-transform`
- [ ] Iconos Phosphor con `ph-bold`
- [ ] Touch targets mínimo 44px
- [ ] Modales con `glass-card`
- [ ] Resultados con fondo `bg-{color}-500/10`

---

## 📚 Recursos

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Phosphor Icons](https://phosphoricons.com/)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [Google Fonts - Oswald](https://fonts.google.com/specimen/Oswald)

---

**Versión:** 1.0.0
**Última actualización:** Diciembre 2025
**Autor:** GymMate Design Team
