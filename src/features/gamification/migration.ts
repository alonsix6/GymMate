// ==========================================
// DATA MIGRATION FOR GAMIFICATION
// ==========================================

import type {
  GamificationState,
  XPTransaction,
  GamificationMuscleGroup,
} from '@/types/gamification';
import type { HistorySession, PRData } from '@/types';
import { getHistory, getPRs, getProfile } from '@/utils/storage';
import { allExercises } from '@/data/exercises';
import {
  XP_WORKOUT_COMPLETE,
  PR_XP,
  DEFAULT_BODYWEIGHT,
} from './constants';
import {
  calculateVolumeXP,
  generateTransactionId,
  calculateCurrentStreak,
} from './xp';
import { calculateLevel, getLevelProgress, getLevelTitle } from './levels';
import { calculateAllMuscleRanks, toGamificationMuscle } from './muscle-ranks';
import { initializeAchievements, checkAchievements } from './achievements';
import { createInitialMuscleRanks } from './muscle-ranks';

/**
 * Construye el mapeo de ejercicio a grupo muscular
 */
function buildExerciseToMuscleMap(): Record<string, GamificationMuscleGroup> {
  const map: Record<string, GamificationMuscleGroup> = {};

  for (const exercise of allExercises) {
    const gamificationMuscle = toGamificationMuscle(exercise.grupoMuscular);
    if (gamificationMuscle) {
      map[exercise.nombre] = gamificationMuscle;
    }
  }

  return map;
}

/**
 * Migra los datos existentes a un estado de gamificacion completo
 * Esta funcion lee el historial, PRs y perfil existentes y calcula
 * todo el XP retroactivo
 */
export function migrateExistingData(): GamificationState {
  const now = new Date().toISOString();
  const history = getHistory();
  const prs = getPRs();
  const profile = getProfile();
  const bodyweight = profile.weight || DEFAULT_BODYWEIGHT;

  // Construir mapeo de ejercicios
  const exerciseToMuscle = buildExerciseToMuscleMap();

  // Agregar ejercicios del historial que no esten en el mapa
  for (const session of history) {
    if (session.ejercicios) {
      for (const ej of session.ejercicios) {
        if (!exerciseToMuscle[ej.nombre] && ej.grupoMuscular) {
          const muscle = toGamificationMuscle(ej.grupoMuscular);
          if (muscle) {
            exerciseToMuscle[ej.nombre] = muscle;
          }
        }
      }
    }
  }

  // Calcular XP retroactivo
  const { totalXP, xpTransactions } = calculateRetroactiveXP(history, prs);

  // Calcular rangos musculares
  const { muscleRanks, exerciseStrengths } = prs && Object.keys(prs).length > 0
    ? calculateAllMuscleRanks(prs, exerciseToMuscle, bodyweight)
    : { muscleRanks: createInitialMuscleRanks(), exerciseStrengths: {} };

  // Calcular nivel
  const level = calculateLevel(totalXP);
  const progress = getLevelProgress(totalXP);
  const titleInfo = getLevelTitle(level);

  // Calcular racha actual
  const currentStreak = calculateCurrentStreak(history);

  // Inicializar y verificar logros
  const initialAchievements = initializeAchievements();
  const { achievements } = checkAchievements(
    initialAchievements,
    history,
    prs,
    muscleRanks,
    currentStreak
  );

  // Construir estado completo
  const state: GamificationState = {
    version: 1,
    playerStats: {
      totalXP,
      level,
      titleInfo,
      currentLevelXP: progress.currentXP,
      xpToNextLevel: progress.maxXP,
      createdAt: history.length > 0
        ? history[history.length - 1].date
        : now,
      lastUpdated: now,
    },
    muscleRanks,
    exerciseStrengths,
    achievements,
    xpHistory: xpTransactions.slice(-100), // Ultimas 100
    streakData: {
      currentStreak,
      bestStreak: currentStreak, // Inicializar con actual
      lastWorkoutDate: history.length > 0 ? history[0].date : null,
      streakMilestones: [], // No reclamar milestones en migracion
    },
    initialized: true,
    migratedAt: now,
  };

  return state;
}

/**
 * Calcula el XP retroactivo de todo el historial
 */
function calculateRetroactiveXP(
  history: HistorySession[],
  prs: Record<string, PRData>
): {
  totalXP: number;
  xpTransactions: XPTransaction[];
} {
  const transactions: XPTransaction[] = [];
  let totalXP = 0;

  // Ordenar historial por fecha (mas antiguo primero)
  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // XP por cada sesion
  for (const session of sortedHistory) {
    // Solo sesiones de pesas
    if (session.type === 'cardio') continue;

    // XP base por completar
    totalXP += XP_WORKOUT_COMPLETE;

    // XP por volumen
    const volumeXP = calculateVolumeXP(session.volumenTotal || 0);
    totalXP += volumeXP;

    // Registrar transaccion
    transactions.push({
      id: generateTransactionId(),
      amount: XP_WORKOUT_COMPLETE + volumeXP,
      source: 'migration',
      description: `Sesion ${session.grupo || 'Entrenamiento'}`,
      timestamp: session.date,
      sessionId: session.sessionId,
    });
  }

  // XP por PRs existentes (asumimos PR menor promedio)
  const prCount = Object.keys(prs).length;
  if (prCount > 0) {
    const prXP = prCount * PR_XP.minor;
    totalXP += prXP;

    transactions.push({
      id: generateTransactionId(),
      amount: prXP,
      source: 'migration',
      description: `${prCount} PRs historicos`,
      timestamp: new Date().toISOString(),
    });
  }

  return { totalXP, xpTransactions: transactions };
}

/**
 * Verifica si la migracion es necesaria
 */
export function needsMigration(): boolean {
  try {
    const saved = localStorage.getItem('gymmate_gamification');
    if (!saved) return true;

    const state = JSON.parse(saved) as GamificationState;
    return !state.initialized;
  } catch {
    return true;
  }
}

/**
 * Obtiene el mapeo de ejercicio a grupo muscular
 * Usado para ejercicios nuevos o personalizados
 */
export function getExerciseToMuscleMap(): Record<string, GamificationMuscleGroup> {
  return buildExerciseToMuscleMap();
}

/**
 * Agrega un ejercicio personalizado al mapeo
 */
export function addCustomExerciseToMap(
  _exerciseName: string,
  muscleGroup: string
): GamificationMuscleGroup | null {
  return toGamificationMuscle(muscleGroup);
}
