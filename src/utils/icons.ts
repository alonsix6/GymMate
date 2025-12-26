import { createIcons, icons } from 'lucide';

// ==========================================
// MAPEO DE EMOJIS A LUCIDE ICONS
// ==========================================

export const ICON_MAP = {
  // Entrenamiento & Fitness
  workout: 'dumbbell',
  strength: 'dumbbell',
  exercise: 'dumbbell',
  fire: 'flame',
  cardio: 'flame',
  hiit: 'zap',
  trophy: 'trophy',
  pr: 'trophy',
  award: 'award',
  target: 'target',
  goal: 'target',

  // Acciones principales
  save: 'save',
  delete: 'trash-2',
  edit: 'edit',
  add: 'plus',
  remove: 'minus',
  play: 'play',
  pause: 'pause',
  stop: 'circle-dot',
  timer: 'timer',
  clock: 'clock',
  refresh: 'refresh-cw',
  reset: 'rotate-ccw',

  // Navegación
  home: 'home',
  back: 'arrow-left',
  forward: 'arrow-right',
  up: 'arrow-up',
  down: 'arrow-down',
  menu: 'menu',
  more: 'more-vertical',
  chevronRight: 'chevron-right',
  chevronLeft: 'chevron-left',
  chevronDown: 'chevron-down',
  chevronUp: 'chevron-up',

  // Stats & Charts
  stats: 'bar-chart-3',
  chart: 'line-chart',
  trending: 'trending-up',
  activity: 'activity',
  progress: 'trending-up',

  // Datos
  calendar: 'calendar',
  date: 'calendar',
  history: 'history',
  download: 'download',
  upload: 'upload',
  export: 'download',

  // Usuario
  user: 'user',
  profile: 'user',
  settings: 'settings',

  // Estados
  success: 'check-circle',
  error: 'x-circle',
  warning: 'alert-triangle',
  info: 'info',
  help: 'help-circle',
  check: 'check',
  close: 'x',
  loading: 'loader-2',

  // Tema
  darkMode: 'moon',
  lightMode: 'sun',

  // Notificaciones
  bell: 'bell',
  sound: 'volume-2',
  mute: 'volume-x',

  // Misc
  search: 'search',
  filter: 'filter',
  eye: 'eye',
  eyeOff: 'eye-off',
  heart: 'heart',
  bookmark: 'bookmark',
  flag: 'flag',
  triangle: 'triangle',

  // Anatomía (representación abstracta)
  legs: 'activity',
  glutes: 'target',
  chest: 'heart',
  backMuscle: 'arrow-left',
  shoulders: 'arrow-up',
  biceps: 'dumbbell',
  triceps: 'dumbbell',
  core: 'circle-dot',

  // Rest
  rest: 'clock',
} as const;

// ==========================================
// FUNCIÓN PARA CREAR ICONOS
// ==========================================

export function initializeIcons(): void {
  createIcons({
    icons,
    attrs: {
      class: 'lucide-icon',
      'stroke-width': 2,
      'aria-hidden': 'true',
    },
  });
}

// ==========================================
// FUNCIÓN HELPER PARA GENERAR ICONO HTML
// ==========================================

export function icon(
  name: keyof typeof ICON_MAP | string,
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md',
  className: string = ''
): string {
  const iconName = ICON_MAP[name as keyof typeof ICON_MAP] || name;
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  }[size];

  return `<i data-lucide="${iconName}" class="${sizeClass} ${className}" aria-hidden="true"></i>`;
}

// ==========================================
// COMPONENTE DE ICONO INLINE
// ==========================================

export function iconInline(
  name: keyof typeof ICON_MAP | string,
  className: string = ''
): string {
  const iconName = ICON_MAP[name as keyof typeof ICON_MAP] || name;
  return `<i data-lucide="${iconName}" class="inline-block w-4 h-4 ${className}" aria-hidden="true"></i>`;
}

// ==========================================
// REFRESH ICONS DESPUÉS DE RENDER
// ==========================================

export function refreshIcons(): void {
  requestAnimationFrame(() => {
    createIcons({
      icons,
      attrs: {
        class: 'lucide-icon',
        'stroke-width': 2,
        'aria-hidden': 'true',
      },
    });
  });
}

// ==========================================
// ICONOS POR GRUPO MUSCULAR
// ==========================================

export const MUSCLE_ICONS: Record<string, string> = {
  Glúteos: 'target',
  Piernas: 'footprints',
  Pecho: 'heart',
  Espalda: 'move-horizontal',
  Hombros: 'move-up',
  Bíceps: 'dumbbell',
  Tríceps: 'hand',
  Core: 'circle-dot',
};

export function getMuscleIcon(muscleGroup: string): string {
  return MUSCLE_ICONS[muscleGroup] || 'dumbbell';
}

// ==========================================
// ICONOS POR GRUPO DE ENTRENAMIENTO
// ==========================================

export const GROUP_ICONS: Record<string, { icon: string; color: string }> = {
  grupo1: { icon: 'footprints', color: 'text-blue-400' },
  grupo2: { icon: 'arrow-up-from-line', color: 'text-green-400' },
  grupo3: { icon: 'scan-line', color: 'text-purple-400' },
  grupo4: { icon: 'move-horizontal', color: 'text-orange-400' },
  grupo5: { icon: 'circle-dot', color: 'text-pink-400' },
};

export function getGroupIcon(groupId: string): { icon: string; color: string } {
  return GROUP_ICONS[groupId] || { icon: 'dumbbell', color: 'text-accent' };
}
