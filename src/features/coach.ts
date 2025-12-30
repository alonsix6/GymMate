import type { ExerciseData, HistorySession } from '@/types';
import { getHistory, getPR } from '@/utils/storage';
import { refreshIcons } from '@/utils/icons';

// ==========================================
// COACH MESSAGE TYPES
// ==========================================

type CoachMessageType = 'info' | 'tip' | 'pr-alert' | 'pr-close' | 'success' | 'motivation';

interface CoachMessage {
  type: CoachMessageType;
  message: string;
  subtext?: string;
  icon: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  iconBgClass: string;
}

// ==========================================
// COACH STATE
// ==========================================

let sessionStartTime: number | null = null;
let lastTipTime: number = 0;
const TIP_INTERVAL = 120000; // 2 minutes between tips

const TIPS = [
  'Recuerda mantener una buena técnica en cada repetición.',
  'Respira: exhala en el esfuerzo, inhala en la bajada.',
  'Mantén el core activado para proteger tu espalda.',
  'Si te sientes muy fatigado, reduce el peso.',
  'Hidrátate entre series para mantener el rendimiento.',
  'El rango completo de movimiento maximiza las ganancias.',
  'Controla la fase excéntrica (bajada) para más estímulo.',
  'Escucha a tu cuerpo, descansa si lo necesitas.',
];

// ==========================================
// MESSAGE BUILDERS
// ==========================================

function getMessageConfig(type: CoachMessageType): Omit<CoachMessage, 'message' | 'subtext'> {
  switch (type) {
    case 'pr-alert':
      return {
        type,
        icon: 'trophy',
        bgClass: 'bg-gradient-to-r from-yellow-500/20 via-amber-500/15 to-orange-500/20',
        borderClass: 'border-yellow-500/40',
        textClass: 'text-yellow-400',
        iconBgClass: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      };
    case 'pr-close':
      return {
        type,
        icon: 'target',
        bgClass: 'bg-gradient-to-r from-amber-500/15 to-yellow-500/15',
        borderClass: 'border-amber-500/30',
        textClass: 'text-amber-400',
        iconBgClass: 'bg-amber-500/20',
      };
    case 'success':
      return {
        type,
        icon: 'check-circle',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
        textClass: 'text-emerald-400',
        iconBgClass: 'bg-emerald-500/20',
      };
    case 'motivation':
      return {
        type,
        icon: 'flame',
        bgClass: 'bg-gradient-to-r from-orange-500/15 to-red-500/15',
        borderClass: 'border-orange-500/30',
        textClass: 'text-orange-400',
        iconBgClass: 'bg-orange-500/20',
      };
    case 'tip':
      return {
        type,
        icon: 'lightbulb',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30',
        textClass: 'text-purple-400',
        iconBgClass: 'bg-purple-500/20',
      };
    case 'info':
    default:
      return {
        type,
        icon: 'bot',
        bgClass: 'bg-accent/10',
        borderClass: 'border-accent/20',
        textClass: 'text-accent',
        iconBgClass: 'bg-accent/20',
      };
  }
}

// ==========================================
// COACH ENGINE
// ==========================================

export function initCoachSession(): void {
  sessionStartTime = Date.now();
  lastTipTime = Date.now();
}

export function updateCoachOnSessionLoad(groupName: string, ejercicios: ExerciseData[]): void {
  initCoachSession();

  const history = getHistory();
  const groupHistory = history.filter(
    (s: HistorySession) => s.type !== 'cardio' && s.grupo === groupName
  );

  if (groupHistory.length > 0) {
    const lastSession = groupHistory[0];
    const lastVolume = lastSession.volumenTotal || 0;

    if (lastVolume > 0) {
      showCoachMessage({
        ...getMessageConfig('info'),
        message: `Última sesión de ${groupName}: ${lastVolume.toLocaleString()}kg de volumen.`,
        subtext: '¿Lo superamos hoy?',
      });
      return;
    }
  }

  // Default message for new groups or no history
  const exerciseCount = ejercicios.length;
  showCoachMessage({
    ...getMessageConfig('info'),
    message: `${exerciseCount} ejercicios listos. Ingresa tus datos.`,
    subtext: 'El coach te guiará durante la sesión.',
  });
}

export function updateCoachOnExerciseUpdate(
  ejercicio: ExerciseData,
  _index: number,
  _allExercises: ExerciseData[]
): void {
  // Check for PR proximity
  const pr = getPR(ejercicio.nombre);

  if (pr && ejercicio.peso > 0) {
    const prWeight = pr.peso;
    const currentWeight = ejercicio.peso;
    const percentage = (currentWeight / prWeight) * 100;

    // NEW PR!
    if (currentWeight > prWeight) {
      showCoachMessage({
        ...getMessageConfig('pr-alert'),
        message: `¡NUEVO PR en ${ejercicio.nombre}!`,
        subtext: `Anterior: ${prWeight}kg → Nuevo: ${currentWeight}kg (+${(currentWeight - prWeight).toFixed(1)}kg)`,
      });
      return;
    }

    // Close to PR (90% or more)
    if (percentage >= 90 && percentage < 100) {
      const diff = prWeight - currentWeight;
      showCoachMessage({
        ...getMessageConfig('pr-close'),
        message: `Estás a ${diff.toFixed(1)}kg de tu PR en ${ejercicio.nombre}`,
        subtext: `PR actual: ${prWeight}kg (${ejercicio.sets}x${pr.reps})`,
      });
      return;
    }
  }

  // Show last session data for this exercise if available
  const history = getHistory();
  for (const session of history) {
    if (session.type === 'cardio' || !session.ejercicios) continue;

    const histExercise = session.ejercicios.find(
      (e: ExerciseData) => e.nombre === ejercicio.nombre && e.volumen > 0
    );

    if (histExercise) {
      showCoachMessage({
        ...getMessageConfig('info'),
        message: `${ejercicio.nombre}: Última vez ${histExercise.sets}x${histExercise.reps} a ${histExercise.peso}kg`,
        subtext: pr ? `Tu PR: ${pr.peso}kg` : undefined,
      });
      return;
    }
  }

  // Check if it's time for a tip
  maybeShowTip();
}

export function updateCoachOnExerciseComplete(
  ejercicio: ExerciseData,
  completedCount: number,
  totalCount: number
): void {
  const remaining = totalCount - completedCount;

  if (remaining === 0) {
    showCoachMessage({
      ...getMessageConfig('success'),
      message: '¡Todos los ejercicios completados!',
      subtext: 'Guarda tu entrenamiento para registrar tu progreso.',
    });
  } else if (remaining <= 2) {
    showCoachMessage({
      ...getMessageConfig('motivation'),
      message: `¡Solo ${remaining === 1 ? 'queda 1 ejercicio' : `quedan ${remaining} ejercicios`}!`,
      subtext: 'Termina fuerte, ya casi lo logras.',
    });
  } else {
    showCoachMessage({
      ...getMessageConfig('success'),
      message: `${ejercicio.nombre} completado.`,
      subtext: `${completedCount}/${totalCount} ejercicios • ${remaining} restantes`,
    });
  }
}

function maybeShowTip(): void {
  const now = Date.now();

  if (now - lastTipTime > TIP_INTERVAL) {
    lastTipTime = now;
    const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];

    showCoachMessage({
      ...getMessageConfig('tip'),
      message: randomTip,
    });
  }
}

export function showCoachMessage(config: CoachMessage): void {
  const banner = document.getElementById('coachBanner');
  const iconContainer = document.getElementById('coachIcon');
  const messageEl = document.getElementById('coachMessage');
  const subtextEl = document.getElementById('coachSubtext');

  if (!banner || !iconContainer || !messageEl || !subtextEl) return;

  // Update banner styles
  banner.className = `rounded-xl p-4 mb-4 transition-all duration-300 ${config.bgClass} border ${config.borderClass}`;

  // Update icon
  iconContainer.className = `w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.iconBgClass}`;
  iconContainer.innerHTML = `<i data-lucide="${config.icon}" class="w-4 h-4 ${config.type === 'pr-alert' ? 'text-white' : config.textClass}" aria-hidden="true"></i>`;

  // Update message
  messageEl.className = `text-sm font-medium ${config.textClass}`;
  messageEl.textContent = config.message;

  // Update subtext
  if (config.subtext) {
    subtextEl.className = `text-xs mt-0.5 ${config.textClass} opacity-70`;
    subtextEl.textContent = config.subtext;
    subtextEl.classList.remove('hidden');
  } else {
    subtextEl.classList.add('hidden');
  }

  // Add animation
  banner.classList.add('animate-pulse-once');
  setTimeout(() => banner.classList.remove('animate-pulse-once'), 500);

  // Refresh icons
  refreshIcons();
}

// ==========================================
// HELPER: Get session stats
// ==========================================

export function getSessionDuration(): number {
  if (!sessionStartTime) return 0;
  return Math.floor((Date.now() - sessionStartTime) / 60000); // minutes
}
