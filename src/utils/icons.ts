import { createIcons } from 'lucide';

// Tree-shaking: Solo importamos los iconos que usamos
import {
  Dumbbell,
  Flame,
  Zap,
  Trophy,
  Award,
  Target,
  Save,
  Trash2,
  Edit,
  Plus,
  Minus,
  Play,
  Pause,
  CircleDot,
  Timer,
  Clock,
  RefreshCw,
  RotateCcw,
  Home,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Menu,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  BarChart3,
  LineChart,
  TrendingUp,
  Activity,
  Calendar,
  History,
  Download,
  Upload,
  User,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  Check,
  X,
  Loader2,
  Moon,
  Sun,
  Bell,
  Volume2,
  VolumeX,
  Search,
  Filter,
  Eye,
  EyeOff,
  Heart,
  Bookmark,
  Flag,
  Triangle,
  Footprints,
  MoveHorizontal,
  MoveUp,
  Hand,
  ArrowUpFromLine,
  ScanLine,
  Layers,
  ListChecks,
  LogOut,
  PlusCircle,
  Circle,
  Calculator,
} from 'lucide';

// Mapa de iconos usados para tree-shaking
const usedIcons = {
  dumbbell: Dumbbell,
  flame: Flame,
  zap: Zap,
  trophy: Trophy,
  award: Award,
  target: Target,
  save: Save,
  'trash-2': Trash2,
  edit: Edit,
  plus: Plus,
  minus: Minus,
  play: Play,
  pause: Pause,
  'circle-dot': CircleDot,
  timer: Timer,
  clock: Clock,
  'refresh-cw': RefreshCw,
  'rotate-ccw': RotateCcw,
  home: Home,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  menu: Menu,
  'more-vertical': MoreVertical,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'bar-chart-3': BarChart3,
  'line-chart': LineChart,
  'trending-up': TrendingUp,
  activity: Activity,
  calendar: Calendar,
  history: History,
  download: Download,
  upload: Upload,
  user: User,
  settings: Settings,
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  'alert-triangle': AlertTriangle,
  info: Info,
  'help-circle': HelpCircle,
  check: Check,
  x: X,
  'loader-2': Loader2,
  moon: Moon,
  sun: Sun,
  bell: Bell,
  'volume-2': Volume2,
  'volume-x': VolumeX,
  search: Search,
  filter: Filter,
  eye: Eye,
  'eye-off': EyeOff,
  heart: Heart,
  bookmark: Bookmark,
  flag: Flag,
  triangle: Triangle,
  footprints: Footprints,
  'move-horizontal': MoveHorizontal,
  'move-up': MoveUp,
  hand: Hand,
  'arrow-up-from-line': ArrowUpFromLine,
  'scan-line': ScanLine,
  layers: Layers,
  'list-checks': ListChecks,
  'log-out': LogOut,
  'plus-circle': PlusCircle,
  circle: Circle,
  calculator: Calculator,
};

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
    icons: usedIcons,
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
  // Pequeño delay para asegurar que el DOM esté actualizado
  requestAnimationFrame(() => {
    createIcons({
      icons: usedIcons,
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
