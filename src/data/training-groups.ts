import type { TrainingGroup } from '@/types';
import { getExerciseImage, getExerciseGuidance as getGuidance } from '@/data/exercises';

// ==========================================
// GRUPOS DE ENTRENAMIENTO PREDEFINIDOS
// ==========================================

export const trainingGroups: Record<string, TrainingGroup> = {
  grupo1: {
    nombre: 'GRUPO 1 - Piernas + Glúteos',
    ejercicios: [
      {
        nombre: 'Prensa de Piernas',
        esMancuerna: false,
        grupoMuscular: 'Piernas',
      },
      {
        nombre: 'Abductora Máquina',
        esMancuerna: false,
        grupoMuscular: 'Glúteos',
      },
      {
        nombre: 'Aductora Máquina',
        esMancuerna: false,
        grupoMuscular: 'Piernas',
      },
      {
        nombre: 'Patada de Glúteo en Máquina',
        esMancuerna: false,
        grupoMuscular: 'Glúteos',
      },
      {
        nombre: 'Extensión de Cuádriceps',
        esMancuerna: false,
        grupoMuscular: 'Piernas',
      },
      {
        nombre: 'RDL / Peso Muerto Rumano',
        esMancuerna: false,
        grupoMuscular: 'Glúteos',
      },
    ],
    opcionales: [
      {
        nombre: 'Hip Thrust',
        esMancuerna: false,
        grupoMuscular: 'Glúteos',
      },
      {
        nombre: 'Abdominales en Máquina',
        esMancuerna: false,
        grupoMuscular: 'Core',
      },
    ],
  },
  grupo2: {
    nombre: 'GRUPO 2 - Upper Push',
    ejercicios: [
      {
        nombre: 'Press Militar',
        esMancuerna: false,
        grupoMuscular: 'Hombros',
      },
      { nombre: 'Press Banca', esMancuerna: false, grupoMuscular: 'Pecho' },
      {
        nombre: 'Elevación Lateral',
        esMancuerna: true,
        grupoMuscular: 'Hombros',
      },
      {
        nombre: 'Fondos en Máquina',
        esMancuerna: false,
        grupoMuscular: 'Tríceps',
      },
    ],
    opcionales: [
      {
        nombre: 'Press Inclinado',
        esMancuerna: false,
        grupoMuscular: 'Pecho',
      },
      {
        nombre: 'Extensión de Tríceps en Polea',
        esMancuerna: false,
        grupoMuscular: 'Tríceps',
      },
      {
        nombre: 'Abdominales en Máquina',
        esMancuerna: false,
        grupoMuscular: 'Core',
      },
    ],
  },
  grupo3: {
    nombre: 'GRUPO 3 - Piernas Quad Dominante',
    ejercicios: [
      { nombre: 'Sentadilla', esMancuerna: false, grupoMuscular: 'Piernas' },
      {
        nombre: 'Prensa de Piernas',
        esMancuerna: false,
        grupoMuscular: 'Piernas',
      },
      {
        nombre: 'Extensión de Cuádriceps',
        esMancuerna: false,
        grupoMuscular: 'Piernas',
      },
      {
        nombre: 'Aductora Máquina',
        esMancuerna: false,
        grupoMuscular: 'Piernas',
      },
    ],
    opcionales: [
      {
        nombre: 'Sentadilla Hack',
        esMancuerna: false,
        grupoMuscular: 'Piernas',
      },
      {
        nombre: 'Zancadas con Barra',
        esMancuerna: false,
        grupoMuscular: 'Piernas',
      },
      {
        nombre: 'Abdominales en Máquina',
        esMancuerna: false,
        grupoMuscular: 'Core',
      },
    ],
  },
  grupo4: {
    nombre: 'GRUPO 4 - Espalda + Bíceps',
    ejercicios: [
      {
        nombre: 'Jalón al Pecho',
        esMancuerna: false,
        grupoMuscular: 'Espalda',
      },
      {
        nombre: 'Remo en Máquina',
        esMancuerna: false,
        grupoMuscular: 'Espalda',
      },
      {
        nombre: 'Remo Mancuerna',
        esMancuerna: true,
        grupoMuscular: 'Espalda',
      },
      {
        nombre: 'Curl Martillo',
        esMancuerna: true,
        grupoMuscular: 'Bíceps',
      },
      {
        nombre: 'Curl Martillo Cross-body',
        esMancuerna: true,
        grupoMuscular: 'Bíceps',
      },
    ],
    opcionales: [
      {
        nombre: 'Pull-Over en Polea',
        esMancuerna: false,
        grupoMuscular: 'Espalda',
      },
      {
        nombre: 'Abdominales en Máquina',
        esMancuerna: false,
        grupoMuscular: 'Core',
      },
    ],
  },
  grupo5: {
    nombre: 'GRUPO 5 - Hombro + Tríceps (aislamiento)',
    ejercicios: [
      {
        nombre: 'Elevación Lateral',
        esMancuerna: true,
        grupoMuscular: 'Hombros',
      },
      {
        nombre: 'Elevación Frontal / Y-Raise',
        esMancuerna: true,
        grupoMuscular: 'Hombros',
      },
      {
        nombre: 'Pájaros (rear delts)',
        esMancuerna: true,
        grupoMuscular: 'Hombros',
      },
      {
        nombre: 'Fondos en Máquina',
        esMancuerna: false,
        grupoMuscular: 'Tríceps',
      },
      {
        nombre: 'Extensión de Tríceps en Polea',
        esMancuerna: false,
        grupoMuscular: 'Tríceps',
      },
    ],
    opcionales: [
      {
        nombre: 'Face Pull',
        esMancuerna: false,
        grupoMuscular: 'Hombros',
      },
      {
        nombre: 'Abdominales en Máquina',
        esMancuerna: false,
        grupoMuscular: 'Core',
      },
    ],
  },
};

// ==========================================
// URLs DE IMÁGENES DE EJERCICIOS
// ==========================================

export const exerciseGifs: Record<string, string> = {
  // GRUPO 1 - Piernas + Glúteos
  'Prensa de Piernas':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/1.jpg',
  'Abductora Máquina':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hip_Abduction_Machine/1.jpg',
  'Aductora Máquina':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Thigh_Adductor/1.jpg',
  'Patada de Glúteo en Máquina':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Kickback/1.jpg',
  'Extensión de Cuádriceps':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/1.jpg',
  'RDL / Peso Muerto Rumano':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Romanian_Deadlift/1.jpg',
  'Hip Thrust':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/1.jpg',
  'Abdominales en Máquina':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Ab_Crunch_Machine/1.jpg',

  // GRUPO 2 - Upper Push
  'Press Militar':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Shoulder_Press/1.jpg',
  'Press Banca':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/1.jpg',
  'Elevación Lateral':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/1.jpg',
  'Fondos en Máquina':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dips_-_Triceps_Version/1.jpg',
  'Press Inclinado':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg',
  'Extensión de Tríceps en Polea':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown/1.jpg',

  // GRUPO 3 - Piernas Quad Dominante
  Sentadilla:
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Full_Squat/1.jpg',
  'Sentadilla Hack':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hack_Squat/1.jpg',
  'Zancadas con Barra':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Lunge/1.jpg',

  // GRUPO 4 - Espalda + Bíceps
  'Jalón al Pecho':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/1.jpg',
  'Remo en Máquina':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/1.jpg',
  'Remo Mancuerna':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/1.jpg',
  'Curl Martillo':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/1.jpg',
  'Curl Martillo Cross-body':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cross_Body_Hammer_Curl/1.jpg',
  'Pull-Over en Polea':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight-Arm_Pulldown/1.jpg',

  // GRUPO 5 - Hombros + Tríceps
  'Elevación Frontal / Y-Raise':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Dumbbell_Raise/1.jpg',
  'Pájaros (rear delts)':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Bent-Over_Rear_Delt_Raise/1.jpg',
  'Face Pull':
    'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Face_Pull/1.jpg',
};

// ==========================================
// HELPER PARA OBTENER GRUPO
// ==========================================

export function getTrainingGroup(grupoId: string): TrainingGroup | null {
  return trainingGroups[grupoId] || null;
}

// Get exercise GIF from new database, with fallback to legacy
export function getExerciseGif(exerciseName: string): string | null {
  // Try new database first
  const newImage = getExerciseImage(exerciseName);
  if (newImage) return newImage;

  // Fallback to legacy exerciseGifs
  return exerciseGifs[exerciseName] || null;
}

// Re-export for use in components
export const getExerciseGuidance = getGuidance;
