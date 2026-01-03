// ==========================================
// MUSCLE RANK SYSTEM
// ==========================================

import type {
  StrengthRank,
  GamificationMuscleGroup,
  MuscleRankData,
  MuscleRanks,
  ExerciseStrength,
  RankColorInfo,
} from '@/types/gamification';
import type { PRData } from '@/types';
import {
  RANK_THRESHOLDS,
  RANK_COLORS,
  RANK_ORDER,
  RANK_UP_XP,
  EXERCISE_MULTIPLIERS,
  DEFAULT_EXERCISE_MULTIPLIER,
  MUSCLE_GROUP_MAP,
  DEFAULT_BODYWEIGHT,
} from './constants';
import { estimateOneRM } from './xp';

/**
 * Obtiene el multiplicador de un ejercicio
 */
export function getExerciseMultiplier(exerciseName: string): number {
  return EXERCISE_MULTIPLIERS[exerciseName] ?? DEFAULT_EXERCISE_MULTIPLIER;
}

/**
 * Convierte un grupo muscular del sistema a grupo de gamificacion
 */
export function toGamificationMuscle(systemMuscle: string): GamificationMuscleGroup | null {
  return MUSCLE_GROUP_MAP[systemMuscle] ?? null;
}

/**
 * Determina el rango basado en el ratio ajustado
 */
export function getRankFromRatio(adjustedRatio: number): StrengthRank {
  for (const threshold of RANK_THRESHOLDS) {
    if (adjustedRatio >= threshold.minRatio && adjustedRatio < threshold.maxRatio) {
      return threshold.rank;
    }
  }
  // Si supera todos los umbrales, es Simetrico
  return 'Simetrico';
}

/**
 * Obtiene el color de un rango
 */
export function getRankColor(rank: StrengthRank): RankColorInfo {
  return RANK_COLORS[rank];
}

/**
 * Compara dos rangos y retorna:
 * - positivo si rank1 > rank2
 * - negativo si rank1 < rank2
 * - 0 si son iguales
 */
export function compareRanks(rank1: StrengthRank, rank2: StrengthRank): number {
  const index1 = RANK_ORDER.indexOf(rank1);
  const index2 = RANK_ORDER.indexOf(rank2);
  return index1 - index2;
}

/**
 * Verifica si hubo un rank up
 */
export function didRankUp(oldRank: StrengthRank, newRank: StrengthRank): boolean {
  return compareRanks(newRank, oldRank) > 0;
}

/**
 * Obtiene el XP por subir a un rango
 */
export function getRankUpXP(newRank: StrengthRank): number {
  return RANK_UP_XP[newRank];
}

/**
 * Calcula la fuerza de un ejercicio individual
 */
export function calculateExerciseStrength(
  exerciseName: string,
  muscleGroup: GamificationMuscleGroup,
  weight: number,
  reps: number,
  bodyweight: number
): ExerciseStrength {
  const estimated1RM = estimateOneRM(weight, reps);
  const safeBodyweight = bodyweight > 0 ? bodyweight : DEFAULT_BODYWEIGHT;
  const bodyweightRatio = estimated1RM / safeBodyweight;
  const multiplier = getExerciseMultiplier(exerciseName);
  const adjustedRatio = bodyweightRatio / multiplier;
  const rank = getRankFromRatio(adjustedRatio);

  return {
    exerciseName,
    muscleGroup,
    estimated1RM,
    bodyweightRatio,
    adjustedRatio,
    rank,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Crea un MuscleRankData inicial (Hierro)
 */
export function createInitialMuscleRankData(): MuscleRankData {
  return {
    rank: 'Hierro',
    ratio: 0,
    bestExercise: '',
    bestRatio: 0,
    exerciseCount: 0,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Crea el estado inicial de todos los rangos musculares
 */
export function createInitialMuscleRanks(): MuscleRanks {
  return {
    pecho: createInitialMuscleRankData(),
    espalda: createInitialMuscleRankData(),
    hombros: createInitialMuscleRankData(),
    biceps: createInitialMuscleRankData(),
    triceps: createInitialMuscleRankData(),
    piernas: createInitialMuscleRankData(),
    gluteos: createInitialMuscleRankData(),
    core: createInitialMuscleRankData(),
  };
}

/**
 * Calcula el rango de un grupo muscular basado en todos los ejercicios
 * Usa el MEJOR ejercicio del grupo, no el promedio
 */
export function calculateMuscleRank(
  exerciseStrengths: ExerciseStrength[]
): MuscleRankData {
  if (exerciseStrengths.length === 0) {
    return createInitialMuscleRankData();
  }

  // Encontrar el ejercicio con mejor ratio ajustado
  let best = exerciseStrengths[0];
  for (const strength of exerciseStrengths) {
    if (strength.adjustedRatio > best.adjustedRatio) {
      best = strength;
    }
  }

  // Calcular promedio para referencia
  const avgRatio =
    exerciseStrengths.reduce((sum, s) => sum + s.adjustedRatio, 0) /
    exerciseStrengths.length;

  return {
    rank: best.rank,
    ratio: avgRatio,
    bestExercise: best.exerciseName,
    bestRatio: best.adjustedRatio,
    exerciseCount: exerciseStrengths.length,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Actualiza todos los rangos musculares basado en los PRs
 */
export function calculateAllMuscleRanks(
  prs: Record<string, PRData>,
  exerciseToMuscle: Record<string, GamificationMuscleGroup>,
  bodyweight: number
): {
  muscleRanks: MuscleRanks;
  exerciseStrengths: Record<string, ExerciseStrength>;
} {
  const safeBodyweight = bodyweight > 0 ? bodyweight : DEFAULT_BODYWEIGHT;
  const exerciseStrengths: Record<string, ExerciseStrength> = {};

  // Agrupar ejercicios por musculo
  const muscleExercises: Record<GamificationMuscleGroup, ExerciseStrength[]> = {
    pecho: [],
    espalda: [],
    hombros: [],
    biceps: [],
    triceps: [],
    piernas: [],
    gluteos: [],
    core: [],
  };

  // Calcular fuerza de cada ejercicio
  for (const [exerciseName, prData] of Object.entries(prs)) {
    const muscle = exerciseToMuscle[exerciseName];
    if (!muscle) continue;

    const strength = calculateExerciseStrength(
      exerciseName,
      muscle,
      prData.peso,
      prData.reps,
      safeBodyweight
    );

    exerciseStrengths[exerciseName] = strength;
    muscleExercises[muscle].push(strength);
  }

  // Calcular rango de cada musculo
  const muscleRanks: MuscleRanks = {
    pecho: calculateMuscleRank(muscleExercises.pecho),
    espalda: calculateMuscleRank(muscleExercises.espalda),
    hombros: calculateMuscleRank(muscleExercises.hombros),
    biceps: calculateMuscleRank(muscleExercises.biceps),
    triceps: calculateMuscleRank(muscleExercises.triceps),
    piernas: calculateMuscleRank(muscleExercises.piernas),
    gluteos: calculateMuscleRank(muscleExercises.gluteos),
    core: calculateMuscleRank(muscleExercises.core),
  };

  return { muscleRanks, exerciseStrengths };
}

/**
 * Detecta cambios de rango entre dos estados
 */
export function detectRankChanges(
  oldRanks: MuscleRanks,
  newRanks: MuscleRanks
): Array<{
  muscle: GamificationMuscleGroup;
  from: StrengthRank;
  to: StrengthRank;
  xp: number;
}> {
  const changes: Array<{
    muscle: GamificationMuscleGroup;
    from: StrengthRank;
    to: StrengthRank;
    xp: number;
  }> = [];

  const muscles: GamificationMuscleGroup[] = [
    'pecho', 'espalda', 'hombros', 'biceps',
    'triceps', 'piernas', 'gluteos', 'core',
  ];

  for (const muscle of muscles) {
    const oldRank = oldRanks[muscle].rank;
    const newRank = newRanks[muscle].rank;

    if (didRankUp(oldRank, newRank)) {
      changes.push({
        muscle,
        from: oldRank,
        to: newRank,
        xp: getRankUpXP(newRank),
      });
    }
  }

  return changes;
}

/**
 * Obtiene todos los rangos ordenados
 */
export function getAllRanksOrdered(): StrengthRank[] {
  return [...RANK_ORDER];
}

/**
 * Obtiene el siguiente rango
 */
export function getNextRank(currentRank: StrengthRank): StrengthRank | null {
  const index = RANK_ORDER.indexOf(currentRank);
  if (index === -1 || index >= RANK_ORDER.length - 1) {
    return null;
  }
  return RANK_ORDER[index + 1];
}

/**
 * Calcula el ratio necesario para el siguiente rango
 */
export function getRatioForNextRank(currentRank: StrengthRank): number | null {
  const nextRank = getNextRank(currentRank);
  if (!nextRank) return null;

  const threshold = RANK_THRESHOLDS.find(t => t.rank === nextRank);
  return threshold?.minRatio ?? null;
}

/**
 * Calcula el progreso hacia el siguiente rango (0-100%)
 */
export function calculateRankProgress(
  currentRatio: number,
  currentRank: StrengthRank
): number {
  const threshold = RANK_THRESHOLDS.find(t => t.rank === currentRank);
  if (!threshold) return 0;

  const nextRank = getNextRank(currentRank);
  if (!nextRank) return 100; // Ya es el maximo

  const nextThreshold = RANK_THRESHOLDS.find(t => t.rank === nextRank);
  if (!nextThreshold) return 0;

  const range = nextThreshold.minRatio - threshold.minRatio;
  const progress = currentRatio - threshold.minRatio;

  return Math.min(100, Math.max(0, (progress / range) * 100));
}
