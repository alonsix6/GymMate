import type { CardioExercise } from '@/types';

// ==========================================
// BASE DE DATOS DE EJERCICIOS CARDIO
// ==========================================

export const cardioExercises: Record<string, CardioExercise> = {
  Burpees: {
    difficulty: 5,
    calories: 12,
    muscles: ['Todo el cuerpo'],
    desc: 'De pie → plancha → push-up → salto. Máxima intensidad.',
  },
  'Mountain Climbers': {
    difficulty: 4,
    calories: 10,
    muscles: ['Core', 'Hombros'],
    desc: 'Plancha alta, lleva rodillas al pecho alternadas rápido.',
  },
  'Jumping Jacks': {
    difficulty: 3,
    calories: 8,
    muscles: ['Cardio', 'Piernas'],
    desc: 'Salta abriendo piernas y brazos arriba simultáneamente.',
  },
  'High Knees': {
    difficulty: 3,
    calories: 9,
    muscles: ['Piernas', 'Cardio'],
    desc: 'Corre en el lugar elevando rodillas al máximo.',
  },
  'Kettlebell Swings': {
    difficulty: 4,
    calories: 12,
    muscles: ['Glúteos', 'Core', 'Hombros'],
    desc: 'Balanceo explosivo desde cadera hasta altura de hombros. Usa las caderas.',
  },
  'Russian Twists': {
    difficulty: 3,
    calories: 6,
    muscles: ['Oblicuos', 'Core'],
    desc: 'Sentado, torso inclinado, rota de lado a lado. Pies arriba para más dificultad.',
  },
  Plank: {
    difficulty: 3,
    calories: 4,
    muscles: ['Core completo'],
    desc: 'Posición push-up sobre antebrazos. Cuerpo recto, core apretado.',
  },
  'Jump Squats': {
    difficulty: 4,
    calories: 11,
    muscles: ['Piernas', 'Glúteos'],
    desc: 'Sentadilla profunda + salto explosivo. Aterriza suave.',
  },
  'Box Jumps': {
    difficulty: 4,
    calories: 10,
    muscles: ['Piernas', 'Explosividad'],
    desc: 'Salta sobre una caja/plataforma. Aterriza suave, baja controlado.',
  },
  'Battle Ropes': {
    difficulty: 4,
    calories: 11,
    muscles: ['Hombros', 'Core', 'Cardio'],
    desc: 'Ondas alternadas con cuerdas. Mantén ritmo constante.',
  },
  Sprints: {
    difficulty: 4,
    calories: 13,
    muscles: ['Piernas', 'Cardio'],
    desc: 'Carrera a máxima velocidad.',
  },
  'Bicycle Crunches': {
    difficulty: 3,
    calories: 5,
    muscles: ['Core', 'Oblicuos'],
    desc: 'Acostado, lleva codo a rodilla opuesta alternando.',
  },
};

// ==========================================
// BASE DE DATOS DE EJERCICIOS PERSONALIZABLES
// ==========================================

export const exerciseDatabase = {
  pecho: [
    {
      name: 'Press de banca',
      desc: 'Ejercicio básico para pecho',
      variants: ['Barra', 'Mancuernas', 'Máquina Smith'],
    },
    {
      name: 'Press inclinado',
      desc: 'Trabaja pecho superior',
      variants: ['Barra', 'Mancuernas'],
    },
    {
      name: 'Press declinado',
      desc: 'Enfoca pecho inferior',
      variants: ['Barra', 'Mancuernas'],
    },
    {
      name: 'Aperturas',
      desc: 'Aislamiento de pecho',
      variants: ['Mancuernas', 'Poleas', 'Máquina'],
    },
    {
      name: 'Fondos en paralelas',
      desc: 'Compuesto para pecho y tríceps',
      variants: ['Peso corporal', 'Con lastre'],
    },
    {
      name: 'Pullover',
      desc: 'Expansión de caja torácica',
      variants: ['Mancuerna', 'Polea', 'Máquina'],
    },
  ],
  espalda: [
    {
      name: 'Jalón al pecho',
      desc: 'Dorsales y ancho de espalda',
      variants: ['Agarre ancho', 'Agarre cerrado', 'Neutro'],
    },
    {
      name: 'Remo con barra',
      desc: 'Grosor de espalda',
      variants: ['Pronado', 'Supino', 'Pendlay'],
    },
    {
      name: 'Remo sentado',
      desc: 'Espalda media',
      variants: ['Polea', 'Máquina', 'Mancuerna'],
    },
    {
      name: 'Dominadas',
      desc: 'Dorsales completos',
      variants: ['Peso corporal', 'Asistidas', 'Con lastre'],
    },
    {
      name: 'Remo con mancuerna',
      desc: 'Unilateral para espalda',
      variants: ['A una mano', 'Seal row'],
    },
    {
      name: 'Peso muerto',
      desc: 'Espalda baja y general',
      variants: ['Convencional', 'Sumo', 'Rumano'],
    },
  ],
  hombros: [
    {
      name: 'Press militar',
      desc: 'Hombros completos',
      variants: ['Barra', 'Mancuernas', 'Máquina'],
    },
    {
      name: 'Elevación lateral',
      desc: 'Deltoides medial',
      variants: ['Mancuernas', 'Poleas', 'Máquina'],
    },
    {
      name: 'Elevación frontal',
      desc: 'Deltoides anterior',
      variants: ['Mancuernas', 'Barra', 'Disco'],
    },
    {
      name: 'Pájaros',
      desc: 'Deltoides posterior',
      variants: ['Mancuernas', 'Máquina', 'Polea'],
    },
    {
      name: 'Press Arnold',
      desc: 'Rotación completa de hombro',
      variants: ['Mancuernas'],
    },
  ],
  biceps: [
    {
      name: 'Curl con barra',
      desc: 'Bíceps completo',
      variants: ['Barra recta', 'Barra Z', 'Polea'],
    },
    {
      name: 'Curl con mancuernas',
      desc: 'Trabajo bilateral',
      variants: ['Alternado', 'Simultáneo', 'Martillo'],
    },
    {
      name: 'Curl predicador',
      desc: 'Aislamiento de bíceps',
      variants: ['Barra', 'Mancuernas', 'Máquina'],
    },
    {
      name: 'Curl concentrado',
      desc: 'Pico del bíceps',
      variants: ['Mancuerna'],
    },
  ],
  triceps: [
    {
      name: 'Press francés',
      desc: 'Cabeza larga del tríceps',
      variants: ['Barra', 'Mancuernas', 'Barra Z'],
    },
    {
      name: 'Extensión con cuerda',
      desc: 'Tríceps con polea',
      variants: ['Cuerda', 'Barra'],
    },
    {
      name: 'Fondos en banco',
      desc: 'Tríceps con peso corporal',
      variants: ['Peso corporal', 'Con disco'],
    },
    {
      name: 'Patada de tríceps',
      desc: 'Aislamiento unilateral',
      variants: ['Mancuerna', 'Polea'],
    },
  ],
  piernas: [
    {
      name: 'Sentadilla',
      desc: 'Ejercicio rey de piernas',
      variants: ['Barra libre', 'Smith', 'Hack', 'Búlgara'],
    },
    {
      name: 'Prensa',
      desc: 'Cuádriceps y glúteos',
      variants: ['45°', 'Horizontal', 'Vertical'],
    },
    {
      name: 'Extensión de cuádriceps',
      desc: 'Aislamiento de cuádriceps',
      variants: ['Máquina'],
    },
    {
      name: 'Curl femoral',
      desc: 'Isquiotibiales',
      variants: ['Acostado', 'Sentado', 'De pie'],
    },
    {
      name: 'Zancada',
      desc: 'Unilateral para piernas',
      variants: ['Con barra', 'Con mancuernas', 'Caminando'],
    },
  ],
  gluteos: [
    {
      name: 'Hip thrust',
      desc: 'Ejercicio principal para glúteos',
      variants: ['Barra', 'Mancuerna', 'Máquina'],
    },
    {
      name: 'Peso muerto rumano',
      desc: 'Glúteos y femorales',
      variants: ['Barra', 'Mancuernas'],
    },
    {
      name: 'Patada de glúteo',
      desc: 'Aislamiento',
      variants: ['Polea', 'Máquina', 'Peso corporal'],
    },
    {
      name: 'Abducción de cadera',
      desc: 'Glúteo medio',
      variants: ['Máquina', 'Polea', 'Banda'],
    },
  ],
  core: [
    {
      name: 'Plancha',
      desc: 'Estabilización core',
      variants: ['Frontal', 'Lateral', 'Con elevación'],
    },
    {
      name: 'Crunch',
      desc: 'Abdomen superior',
      variants: ['En suelo', 'En banco', 'Con polea'],
    },
    {
      name: 'Elevación de piernas',
      desc: 'Abdomen inferior',
      variants: ['Colgado', 'En suelo', 'En banco'],
    },
    {
      name: 'Russian twist',
      desc: 'Oblicuos',
      variants: ['Con disco', 'Con balón medicinal'],
    },
  ],
};

// ==========================================
// HELPERS
// ==========================================

export function getCardioExerciseNames(): string[] {
  return Object.keys(cardioExercises);
}

export function getCardioExerciseInfo(name: string): CardioExercise | null {
  return cardioExercises[name] || null;
}
