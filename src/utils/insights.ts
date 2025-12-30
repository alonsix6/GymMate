import type { HistorySession, ExerciseData } from '@/types';
import { getHistory, getPRs } from '@/utils/storage';

// ==========================================
// INSIGHT TYPES
// ==========================================

export interface Insight {
  type: InsightType;
  priority: number; // 1-10, higher = more important
  message: string;
  subtext?: string;
  icon: string;
  gradient: string;
  accentGradient: string;
  textClass: string;
}

type InsightType =
  | 'draft'
  | 'streak-fire'
  | 'streak-risk'
  | 'volume-up'
  | 'volume-down'
  | 'muscle-neglected'
  | 'pr-close'
  | 'consistency'
  | 'best-week'
  | 'comeback'
  | 'new-user'
  | 'on-fire'
  | 'default';

// ==========================================
// INSIGHT GENERATOR
// ==========================================

export function generateInsight(hasDraft: boolean, stats: {
  totalWorkouts: number;
  streak: number;
  daysSinceLastWorkout: number;
}): Insight {
  const history = getHistory();
  const prs = getPRs();

  // Priority order - most important first
  const insights: Insight[] = [];

  // 1. Draft pending (highest priority)
  if (hasDraft) {
    insights.push({
      type: 'draft',
      priority: 10,
      message: 'Tienes un entrenamiento pendiente',
      subtext: 'Continúa donde lo dejaste',
      icon: 'play-circle',
      gradient: 'from-orange-600/30 via-amber-600/20 to-yellow-600/20',
      accentGradient: 'from-orange-500 to-amber-500',
      textClass: 'text-orange-400',
    });
  }

  // 2. Streak at risk (1 day left)
  if (stats.streak >= 3 && stats.daysSinceLastWorkout === 1) {
    insights.push({
      type: 'streak-risk',
      priority: 9,
      message: `Entrena hoy para mantener tu racha de ${stats.streak} días`,
      subtext: 'No pierdas el impulso',
      icon: 'alert-triangle',
      gradient: 'from-amber-600/30 via-orange-600/20 to-red-600/20',
      accentGradient: 'from-amber-500 to-orange-500',
      textClass: 'text-amber-400',
    });
  }

  // 3. Fire streak (5+ days)
  if (stats.streak >= 5) {
    insights.push({
      type: 'streak-fire',
      priority: 8,
      message: `${stats.streak} días de racha - ¡Imparable!`,
      subtext: 'Tu consistencia está dando resultados',
      icon: 'flame',
      gradient: 'from-orange-600/30 via-red-600/20 to-pink-600/20',
      accentGradient: 'from-orange-500 to-red-500',
      textClass: 'text-orange-400',
    });
  }

  // 4. Volume comparison (this week vs last week)
  const volumeInsight = analyzeVolumetrend(history);
  if (volumeInsight) {
    insights.push(volumeInsight);
  }

  // 5. Neglected muscle group
  const neglectedInsight = analyzeNeglectedMuscles(history);
  if (neglectedInsight) {
    insights.push(neglectedInsight);
  }

  // 6. Close to PR
  const prInsight = analyzePRProximity(history, prs);
  if (prInsight) {
    insights.push(prInsight);
  }

  // 7. Best week ever
  const bestWeekInsight = analyzeBestWeek(history);
  if (bestWeekInsight) {
    insights.push(bestWeekInsight);
  }

  // 8. Consistency achievement
  if (stats.totalWorkouts > 0 && stats.totalWorkouts % 10 === 0) {
    insights.push({
      type: 'consistency',
      priority: 6,
      message: `¡${stats.totalWorkouts} entrenamientos completados!`,
      subtext: 'Cada sesión cuenta',
      icon: 'award',
      gradient: 'from-purple-600/30 via-indigo-600/20 to-blue-600/20',
      accentGradient: 'from-purple-500 to-indigo-500',
      textClass: 'text-purple-400',
    });
  }

  // 9. Comeback after absence
  if (stats.daysSinceLastWorkout > 7 && stats.totalWorkouts > 0) {
    insights.push({
      type: 'comeback',
      priority: 5,
      message: 'Es momento de volver',
      subtext: `Hace ${stats.daysSinceLastWorkout} días de tu última sesión`,
      icon: 'refresh-cw',
      gradient: 'from-purple-600/30 via-indigo-600/20 to-blue-600/20',
      accentGradient: 'from-purple-500 to-indigo-500',
      textClass: 'text-purple-400',
    });
  }

  // 10. New user
  if (stats.totalWorkouts === 0) {
    insights.push({
      type: 'new-user',
      priority: 4,
      message: 'Comienza tu transformación hoy',
      subtext: 'Elige una rutina para empezar',
      icon: 'rocket',
      gradient: 'from-cyan-600/30 via-blue-600/20 to-indigo-600/20',
      accentGradient: 'from-cyan-500 to-blue-500',
      textClass: 'text-cyan-400',
    });
  }

  // 11. Good streak (3-4 days)
  if (stats.streak >= 3 && stats.streak < 5) {
    insights.push({
      type: 'streak-fire',
      priority: 4,
      message: `Racha de ${stats.streak} días - ¡Sigue así!`,
      subtext: 'La constancia es la clave',
      icon: 'trending-up',
      gradient: 'from-green-600/30 via-emerald-600/20 to-teal-600/20',
      accentGradient: 'from-green-500 to-emerald-500',
      textClass: 'text-emerald-400',
    });
  }

  // 12. Recently trained
  if (stats.daysSinceLastWorkout <= 1 && stats.totalWorkouts > 0) {
    insights.push({
      type: 'on-fire',
      priority: 3,
      message: '¡Estás en racha!',
      subtext: 'Mantén el ritmo',
      icon: 'zap',
      gradient: 'from-emerald-600/30 via-green-600/20 to-teal-600/20',
      accentGradient: 'from-emerald-500 to-green-500',
      textClass: 'text-emerald-400',
    });
  }

  // Default fallback
  insights.push({
    type: 'default',
    priority: 1,
    message: '¡Vamos a entrenar!',
    subtext: 'Tu siguiente sesión te espera',
    icon: 'dumbbell',
    gradient: 'from-blue-600/30 via-indigo-600/20 to-purple-600/20',
    accentGradient: 'from-blue-500 to-indigo-500',
    textClass: 'text-blue-400',
  });

  // Sort by priority and return highest
  insights.sort((a, b) => b.priority - a.priority);
  return insights[0];
}

// ==========================================
// ANALYSIS FUNCTIONS
// ==========================================

function analyzeVolumetrend(history: HistorySession[]): Insight | null {
  const weightSessions = history.filter(s => s.type !== 'cardio' && s.volumenTotal);

  if (weightSessions.length < 4) return null;

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const thisWeek = weightSessions.filter(s => {
    const date = new Date(s.savedAt || s.date);
    return date >= oneWeekAgo;
  });

  const lastWeek = weightSessions.filter(s => {
    const date = new Date(s.savedAt || s.date);
    return date >= twoWeeksAgo && date < oneWeekAgo;
  });

  if (lastWeek.length === 0) return null;

  const thisWeekVolume = thisWeek.reduce((sum, s) => sum + (s.volumenTotal || 0), 0);
  const lastWeekVolume = lastWeek.reduce((sum, s) => sum + (s.volumenTotal || 0), 0);

  const percentChange = ((thisWeekVolume - lastWeekVolume) / lastWeekVolume) * 100;

  if (percentChange >= 10) {
    return {
      type: 'volume-up',
      priority: 7,
      message: `Tu volumen subió ${Math.round(percentChange)}% esta semana`,
      subtext: `${formatVolume(thisWeekVolume)}kg vs ${formatVolume(lastWeekVolume)}kg`,
      icon: 'trending-up',
      gradient: 'from-emerald-600/30 via-green-600/20 to-teal-600/20',
      accentGradient: 'from-emerald-500 to-green-500',
      textClass: 'text-emerald-400',
    };
  }

  if (percentChange <= -15) {
    return {
      type: 'volume-down',
      priority: 6,
      message: `Volumen ${Math.abs(Math.round(percentChange))}% menor esta semana`,
      subtext: '¿Todo bien? Descansa si lo necesitas',
      icon: 'activity',
      gradient: 'from-amber-600/30 via-yellow-600/20 to-orange-600/20',
      accentGradient: 'from-amber-500 to-yellow-500',
      textClass: 'text-amber-400',
    };
  }

  return null;
}

function analyzeNeglectedMuscles(history: HistorySession[]): Insight | null {
  const muscleLastTrained: Record<string, Date> = {};
  const now = new Date();

  // Track last training date for each muscle group
  history.forEach(session => {
    if (session.type === 'cardio' || !session.ejercicios) return;

    const sessionDate = new Date(session.savedAt || session.date);

    session.ejercicios.forEach((ej: ExerciseData) => {
      if (ej.volumen > 0) {
        const muscle = ej.grupoMuscular;
        if (!muscleLastTrained[muscle] || sessionDate > muscleLastTrained[muscle]) {
          muscleLastTrained[muscle] = sessionDate;
        }
      }
    });
  });

  // Find most neglected muscle (trained at least once)
  let mostNeglected: { muscle: string; days: number } | null = null;

  Object.entries(muscleLastTrained).forEach(([muscle, lastDate]) => {
    const daysSince = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSince >= 10 && (!mostNeglected || daysSince > mostNeglected.days)) {
      mostNeglected = { muscle, days: daysSince };
    }
  });

  if (mostNeglected !== null) {
    const { muscle, days } = mostNeglected;
    return {
      type: 'muscle-neglected',
      priority: 6,
      message: `Hace ${days} días sin entrenar ${muscle}`,
      subtext: 'Considera incluirlo pronto',
      icon: 'alert-circle',
      gradient: 'from-violet-600/30 via-purple-600/20 to-indigo-600/20',
      accentGradient: 'from-violet-500 to-purple-500',
      textClass: 'text-violet-400',
    };
  }

  return null;
}

function analyzePRProximity(history: HistorySession[], prs: Record<string, { peso: number; reps: number }>): Insight | null {
  // Look at recent sessions to find exercises close to PR
  const recentSessions = history.slice(0, 5).filter(s => s.type !== 'cardio' && s.ejercicios);

  for (const session of recentSessions) {
    for (const ejercicio of session.ejercicios || []) {
      const pr = prs[ejercicio.nombre];
      if (!pr || ejercicio.peso === 0) continue;

      const percentage = (ejercicio.peso / pr.peso) * 100;

      if (percentage >= 90 && percentage < 100) {
        const diff = pr.peso - ejercicio.peso;
        return {
          type: 'pr-close',
          priority: 7,
          message: `Estás cerca del PR en ${ejercicio.nombre}`,
          subtext: `Faltan solo ${diff.toFixed(1)}kg para superarlo`,
          icon: 'target',
          gradient: 'from-amber-600/30 via-yellow-600/20 to-orange-600/20',
          accentGradient: 'from-amber-500 to-yellow-500',
          textClass: 'text-amber-400',
        };
      }
    }
  }

  return null;
}

function analyzeBestWeek(history: HistorySession[]): Insight | null {
  const weightSessions = history.filter(s => s.type !== 'cardio' && s.volumenTotal);

  if (weightSessions.length < 8) return null;

  // Group by week
  const weeklyVolumes: Record<string, number> = {};

  weightSessions.forEach(session => {
    const date = new Date(session.savedAt || session.date);
    const weekKey = getWeekKey(date);
    weeklyVolumes[weekKey] = (weeklyVolumes[weekKey] || 0) + (session.volumenTotal || 0);
  });

  const weeks = Object.entries(weeklyVolumes).sort((a, b) => b[1] - a[1]);

  if (weeks.length < 2) return null;

  const thisWeekKey = getWeekKey(new Date());
  const thisWeekVolume = weeklyVolumes[thisWeekKey] || 0;

  // Check if this week is the best
  if (thisWeekVolume > 0 && weeks[0][0] === thisWeekKey) {
    return {
      type: 'best-week',
      priority: 8,
      message: '¡Tu mejor semana hasta ahora!',
      subtext: `${formatVolume(thisWeekVolume)}kg de volumen total`,
      icon: 'crown',
      gradient: 'from-yellow-600/30 via-amber-600/20 to-orange-600/20',
      accentGradient: 'from-yellow-500 to-amber-500',
      textClass: 'text-yellow-400',
    };
  }

  return null;
}

// ==========================================
// HELPERS
// ==========================================

function getWeekKey(date: Date): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay()); // Start of week (Sunday)
  return d.toISOString().split('T')[0];
}

function formatVolume(volume: number): string {
  if (volume >= 1000) {
    return (volume / 1000).toFixed(1) + 'k';
  }
  return volume.toFixed(0);
}
