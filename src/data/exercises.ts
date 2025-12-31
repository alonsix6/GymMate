import type { MuscleGroup } from '@/types';

// ==========================================
// COMPREHENSIVE EXERCISE DATABASE
// ==========================================

export interface ExerciseInfo {
  nombre: string;
  esMancuerna: boolean;
  grupoMuscular: MuscleGroup;
  descripcion?: string;
  imageUrl?: string;
}

// Base URL for exercise images
const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

// ==========================================
// PIERNAS (LEGS)
// ==========================================

export const exercisesPiernas: ExerciseInfo[] = [
  {
    nombre: 'Prensa de Piernas',
    esMancuerna: false,
    grupoMuscular: 'Piernas',
    imageUrl: `${IMG_BASE}/Leg_Press/1.jpg`,
  },
  {
    nombre: 'Extensión de Cuádriceps',
    esMancuerna: false,
    grupoMuscular: 'Piernas',
    imageUrl: `${IMG_BASE}/Leg_Extensions/1.jpg`,
  },
  {
    nombre: 'Sentadilla',
    esMancuerna: false,
    grupoMuscular: 'Piernas',
    imageUrl: `${IMG_BASE}/Barbell_Full_Squat/1.jpg`,
  },
  {
    nombre: 'Sentadilla Hack',
    esMancuerna: false,
    grupoMuscular: 'Piernas',
    imageUrl: `${IMG_BASE}/Hack_Squat/1.jpg`,
  },
  {
    nombre: 'Zancadas con Barra',
    esMancuerna: false,
    grupoMuscular: 'Piernas',
    imageUrl: `${IMG_BASE}/Barbell_Lunge/1.jpg`,
  },
  {
    nombre: 'Aductora Máquina',
    esMancuerna: false,
    grupoMuscular: 'Piernas',
    imageUrl: `${IMG_BASE}/Thigh_Adductor/1.jpg`,
  },
  {
    nombre: 'Sentadilla Sumo',
    esMancuerna: false,
    grupoMuscular: 'Piernas',
    descripcion: 'Sentadilla con piernas muy separadas (doble ancho de hombros), puntas de pies hacia afuera a 45°. Baja manteniendo rodillas alineadas con los pies. Trabaja más aductores e interior de muslo.',
  },
  {
    nombre: 'Sentadilla Búlgara',
    esMancuerna: true,
    grupoMuscular: 'Piernas',
    descripcion: 'Pie trasero elevado en banco. Desciende flexionando rodilla delantera hasta 90°. Mantén torso erguido. Trabaja cuádriceps y glúteo de forma unilateral.',
  },
  {
    nombre: 'Sentadilla Goblet',
    esMancuerna: true,
    grupoMuscular: 'Piernas',
    descripcion: 'Sostén mancuerna vertical contra el pecho. Pies separados ancho de hombros. Baja hasta muslos paralelos manteniendo espalda recta y codos entre rodillas.',
  },
  {
    nombre: 'Zancadas con Mancuernas',
    esMancuerna: true,
    grupoMuscular: 'Piernas',
    descripcion: 'Mancuernas a los lados. Da paso adelante largo, baja hasta rodilla trasera casi toque suelo. Empuja con talón delantero para volver. Alterna piernas.',
  },
  {
    nombre: 'Step Ups',
    esMancuerna: true,
    grupoMuscular: 'Piernas',
    descripcion: 'Sube a cajón/banco con una pierna, extiende completamente arriba. Baja controlado con misma pierna. Mantén torso erguido. Trabaja cuádriceps y glúteos.',
  },
  {
    nombre: 'Curl Femoral Tumbado',
    esMancuerna: false,
    grupoMuscular: 'Piernas',
    descripcion: 'Tumbado boca abajo en máquina. Flexiona rodillas llevando talones hacia glúteos. Contrae isquiotibiales arriba. Baja controlado sin rebotar.',
  },
  {
    nombre: 'Curl Femoral Sentado',
    esMancuerna: false,
    grupoMuscular: 'Piernas',
    descripcion: 'Sentado en máquina con rodilla alineada al eje de rotación. Flexiona rodillas bajando el peso. Contrae isquiotibiales. Regresa controlado.',
  },
  {
    nombre: 'Elevación de Talones (Gemelos)',
    esMancuerna: false,
    grupoMuscular: 'Piernas',
    descripcion: 'De pie en máquina o escalón. Eleva talones contrayendo pantorrillas al máximo. Pausa arriba 1 segundo. Baja estirando completamente.',
  },
  {
    nombre: 'Gemelos Sentado',
    esMancuerna: false,
    grupoMuscular: 'Piernas',
    descripcion: 'Sentado en máquina con rodillas flexionadas. Eleva talones contrayendo sóleo. Pausa arriba. Baja estirando completamente el tobillo.',
  },
  {
    nombre: 'Prensa de Gemelos',
    esMancuerna: false,
    grupoMuscular: 'Piernas',
    descripcion: 'En máquina de prensa, coloca puntas de pies en borde inferior de plataforma. Extiende y flexiona tobillos con piernas casi rectas.',
  },
];

// ==========================================
// GLÚTEOS (GLUTES)
// ==========================================

export const exercisesGluteos: ExerciseInfo[] = [
  {
    nombre: 'Abductora Máquina',
    esMancuerna: false,
    grupoMuscular: 'Glúteos',
    imageUrl: `${IMG_BASE}/Hip_Abduction_Machine/1.jpg`,
  },
  {
    nombre: 'Patada de Glúteo en Máquina',
    esMancuerna: false,
    grupoMuscular: 'Glúteos',
    imageUrl: `${IMG_BASE}/Cable_Kickback/1.jpg`,
  },
  {
    nombre: 'RDL / Peso Muerto Rumano',
    esMancuerna: false,
    grupoMuscular: 'Glúteos',
    imageUrl: `${IMG_BASE}/Barbell_Romanian_Deadlift/1.jpg`,
  },
  {
    nombre: 'Hip Thrust',
    esMancuerna: false,
    grupoMuscular: 'Glúteos',
    imageUrl: `${IMG_BASE}/Barbell_Hip_Thrust/1.jpg`,
  },
  {
    nombre: 'Peso Muerto Convencional',
    esMancuerna: false,
    grupoMuscular: 'Glúteos',
    descripcion: 'Barra en el suelo, agarre ancho de hombros. Espalda recta, pecho arriba. Levanta extendiendo caderas y rodillas simultáneamente. Bloquea arriba apretando glúteos.',
  },
  {
    nombre: 'Peso Muerto Sumo',
    esMancuerna: false,
    grupoMuscular: 'Glúteos',
    descripcion: 'Piernas muy separadas, puntas afuera. Agarre estrecho entre piernas. Levanta empujando rodillas hacia afuera. Más énfasis en aductores y glúteos.',
  },
  {
    nombre: 'Buenos Días',
    esMancuerna: false,
    grupoMuscular: 'Glúteos',
    descripcion: 'Barra en trapecios, pies ancho de hombros. Flexiona cadera manteniendo espalda recta hasta torso casi paralelo al suelo. Sube contrayendo glúteos e isquios.',
  },
  {
    nombre: 'Puente de Glúteo',
    esMancuerna: false,
    grupoMuscular: 'Glúteos',
    descripcion: 'Tumbado boca arriba, rodillas flexionadas, pies en suelo. Eleva caderas apretando glúteos hasta cuerpo forme línea recta. Pausa arriba y baja controlado.',
  },
  {
    nombre: 'Patada de Glúteo en Polea',
    esMancuerna: false,
    grupoMuscular: 'Glúteos',
    descripcion: 'Tobillera conectada a polea baja. De pie, estira pierna hacia atrás sin arquear espalda. Contrae glúteo arriba. Regresa controlado.',
  },
  {
    nombre: 'Abducción en Polea',
    esMancuerna: false,
    grupoMuscular: 'Glúteos',
    descripcion: 'Tobillera conectada a polea baja. De pie lateral a máquina, lleva pierna hacia afuera contra resistencia. Trabaja glúteo medio. Controla el regreso.',
  },
];

// ==========================================
// PECHO (CHEST)
// ==========================================

export const exercisesPecho: ExerciseInfo[] = [
  {
    nombre: 'Press Banca',
    esMancuerna: false,
    grupoMuscular: 'Pecho',
    imageUrl: `${IMG_BASE}/Barbell_Bench_Press_-_Medium_Grip/1.jpg`,
  },
  {
    nombre: 'Press Inclinado',
    esMancuerna: false,
    grupoMuscular: 'Pecho',
    imageUrl: `${IMG_BASE}/Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg`,
  },
  {
    nombre: 'Press Banca Mancuernas',
    esMancuerna: true,
    grupoMuscular: 'Pecho',
    descripcion: 'Tumbado en banco plano, mancuernas a los lados del pecho. Empuja hacia arriba juntando mancuernas arriba. Baja controlado abriendo codos a 45°.',
  },
  {
    nombre: 'Press Inclinado Mancuernas',
    esMancuerna: true,
    grupoMuscular: 'Pecho',
    descripcion: 'Banco inclinado 30-45°. Mancuernas a los lados del pecho. Empuja hacia arriba. Énfasis en pecho superior. Baja controlado.',
  },
  {
    nombre: 'Press Declinado',
    esMancuerna: false,
    grupoMuscular: 'Pecho',
    descripcion: 'Banco declinado 15-30°. Barra o mancuernas desde pecho bajo. Empuja hacia arriba. Trabaja porción inferior del pectoral.',
  },
  {
    nombre: 'Aperturas con Mancuernas',
    esMancuerna: true,
    grupoMuscular: 'Pecho',
    descripcion: 'Tumbado en banco, mancuernas arriba con codos ligeramente flexionados. Abre brazos en arco amplio hasta sentir estiramiento. Cierra contrayendo pecho.',
  },
  {
    nombre: 'Aperturas en Polea',
    esMancuerna: false,
    grupoMuscular: 'Pecho',
    descripcion: 'De pie entre poleas altas. Lleva manos juntas frente al pecho en movimiento de abrazo. Mantén codos ligeramente flexionados. Contrae al centro.',
  },
  {
    nombre: 'Cruce de Poleas Bajo',
    esMancuerna: false,
    grupoMuscular: 'Pecho',
    descripcion: 'Poleas desde abajo. Lleva manos hacia arriba y al centro frente al pecho. Trabaja pecho superior. Mantén contracción arriba.',
  },
  {
    nombre: 'Press en Máquina',
    esMancuerna: false,
    grupoMuscular: 'Pecho',
    descripcion: 'Sentado en máquina de press, empuja hacia adelante extendiendo brazos. Mantén espalda contra respaldo. Regresa controlado.',
  },
  {
    nombre: 'Flexiones',
    esMancuerna: false,
    grupoMuscular: 'Pecho',
    descripcion: 'Manos separadas ancho de hombros, cuerpo recto. Baja hasta pecho casi toque suelo. Empuja hasta extensión completa. Core activo todo el tiempo.',
  },
  {
    nombre: 'Fondos en Paralelas (Pecho)',
    esMancuerna: false,
    grupoMuscular: 'Pecho',
    descripcion: 'En barras paralelas, inclina torso hacia adelante. Baja flexionando codos hasta 90° o más. Empuja arriba. Inclinación activa más pecho que tríceps.',
  },
];

// ==========================================
// ESPALDA (BACK)
// ==========================================

export const exercisesEspalda: ExerciseInfo[] = [
  {
    nombre: 'Jalón al Pecho',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    imageUrl: `${IMG_BASE}/Wide-Grip_Lat_Pulldown/1.jpg`,
  },
  {
    nombre: 'Remo en Máquina',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    imageUrl: `${IMG_BASE}/Seated_Cable_Rows/1.jpg`,
  },
  {
    nombre: 'Remo Mancuerna',
    esMancuerna: true,
    grupoMuscular: 'Espalda',
    imageUrl: `${IMG_BASE}/One-Arm_Dumbbell_Row/1.jpg`,
  },
  {
    nombre: 'Pull-Over en Polea',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    imageUrl: `${IMG_BASE}/Straight-Arm_Pulldown/1.jpg`,
  },
  {
    nombre: 'Jalón Agarre Cerrado',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    descripcion: 'Barra V o agarre estrecho. Tira hacia el pecho inferior manteniendo codos pegados al cuerpo. Aprieta escápulas abajo. Trabaja más la parte baja del dorsal.',
  },
  {
    nombre: 'Jalón Tras Nuca',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    descripcion: 'Agarre ancho, tira barra detrás de la cabeza hasta base del cuello. Requiere buena movilidad de hombros. Trabaja dorsal ancho completo.',
  },
  {
    nombre: 'Remo con Barra',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    descripcion: 'Inclinado 45°, espalda recta. Tira barra hacia abdomen bajo apretando escápulas. Mantén core activo. Baja controlado estirando dorsales.',
  },
  {
    nombre: 'Remo en Polea Baja',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    descripcion: 'Sentado, pies en plataforma. Tira agarre hacia abdomen, codos cerca del cuerpo. Aprieta escápulas atrás. Estira completamente al frente.',
  },
  {
    nombre: 'Remo T-Bar',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    descripcion: 'Barra anclada en esquina con agarre V. Inclinado, espalda recta. Tira hacia el pecho bajo. Trabaja espalda media y dorsales.',
  },
  {
    nombre: 'Remo en Máquina Hammer',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    descripcion: 'Pecho contra soporte, agarre independiente. Tira hacia atrás apretando escápulas. Permite trabajo unilateral para corregir desbalances.',
  },
  {
    nombre: 'Dominadas',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    descripcion: 'Colgado de barra, agarre prono ancho de hombros. Tira cuerpo hasta barbilla sobre barra. Baja controlado. Ejercicio compuesto fundamental.',
  },
  {
    nombre: 'Dominadas Agarre Neutro',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    descripcion: 'Agarre paralelo (palmas enfrentadas). Tira hasta barbilla sobre barra. Menos estrés en hombros que agarre prono. Trabaja también bíceps.',
  },
  {
    nombre: 'Pull-Over con Mancuerna',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    descripcion: 'Tumbado transversal en banco, mancuerna sobre pecho. Baja detrás de cabeza con codos ligeramente flexionados. Sube contrayendo dorsales.',
  },
  {
    nombre: 'Encogimientos de Hombros',
    esMancuerna: false,
    grupoMuscular: 'Espalda',
    descripcion: 'De pie con barra o mancuernas. Eleva hombros hacia orejas sin flexionar codos. Contrae trapecios arriba. Baja controlado.',
  },
];

// ==========================================
// HOMBROS (SHOULDERS)
// ==========================================

export const exercisesHombros: ExerciseInfo[] = [
  {
    nombre: 'Press Militar',
    esMancuerna: false,
    grupoMuscular: 'Hombros',
    imageUrl: `${IMG_BASE}/Barbell_Shoulder_Press/1.jpg`,
  },
  {
    nombre: 'Elevación Lateral',
    esMancuerna: true,
    grupoMuscular: 'Hombros',
    imageUrl: `${IMG_BASE}/Side_Lateral_Raise/1.jpg`,
  },
  {
    nombre: 'Elevación Frontal / Y-Raise',
    esMancuerna: true,
    grupoMuscular: 'Hombros',
    imageUrl: `${IMG_BASE}/Front_Dumbbell_Raise/1.jpg`,
  },
  {
    nombre: 'Pájaros (rear delts)',
    esMancuerna: true,
    grupoMuscular: 'Hombros',
    imageUrl: `${IMG_BASE}/Seated_Bent-Over_Rear_Delt_Raise/1.jpg`,
  },
  {
    nombre: 'Face Pull',
    esMancuerna: false,
    grupoMuscular: 'Hombros',
    imageUrl: `${IMG_BASE}/Face_Pull/1.jpg`,
  },
  {
    nombre: 'Press Arnold',
    esMancuerna: true,
    grupoMuscular: 'Hombros',
    descripcion: 'Sentado, mancuernas frente al pecho con palmas hacia ti. Mientras subes, rota muñecas hasta palmas hacia adelante arriba. Trabaja los tres deltoides.',
  },
  {
    nombre: 'Press Mancuernas Sentado',
    esMancuerna: true,
    grupoMuscular: 'Hombros',
    descripcion: 'Sentado con respaldo, mancuernas a altura de hombros. Empuja hacia arriba hasta extensión casi completa. Baja controlado a posición inicial.',
  },
  {
    nombre: 'Elevación Lateral en Polea',
    esMancuerna: false,
    grupoMuscular: 'Hombros',
    descripcion: 'De pie lateral a polea baja. Eleva brazo hasta horizontal manteniendo codo ligeramente flexionado. Tensión constante del cable.',
  },
  {
    nombre: 'Pájaros en Máquina',
    esMancuerna: false,
    grupoMuscular: 'Hombros',
    descripcion: 'Sentado en máquina pec deck invertida. Abre brazos hacia atrás contrayendo deltoides posterior. Regresa controlado.',
  },
  {
    nombre: 'Remo al Mentón',
    esMancuerna: false,
    grupoMuscular: 'Hombros',
    descripcion: 'Barra con agarre estrecho. Eleva hacia el mentón, codos hacia afuera y arriba. Trabaja deltoides y trapecios. No subas demasiado si hay molestia.',
  },
  {
    nombre: 'Vuelos Inversos en Banco',
    esMancuerna: true,
    grupoMuscular: 'Hombros',
    descripcion: 'Tumbado boca abajo en banco inclinado. Eleva mancuernas lateralmente con codos ligeramente flexionados. Trabaja deltoides posterior.',
  },
];

// ==========================================
// BÍCEPS
// ==========================================

export const exercisesBiceps: ExerciseInfo[] = [
  {
    nombre: 'Curl Martillo',
    esMancuerna: true,
    grupoMuscular: 'Bíceps',
    imageUrl: `${IMG_BASE}/Hammer_Curls/1.jpg`,
  },
  {
    nombre: 'Curl Martillo Cross-body',
    esMancuerna: true,
    grupoMuscular: 'Bíceps',
    imageUrl: `${IMG_BASE}/Cross_Body_Hammer_Curl/1.jpg`,
  },
  {
    nombre: 'Curl con Barra',
    esMancuerna: false,
    grupoMuscular: 'Bíceps',
    descripcion: 'De pie, barra con agarre supino. Flexiona codos llevando barra hacia hombros. Mantén codos fijos a los lados. Baja controlado.',
  },
  {
    nombre: 'Curl con Barra Z',
    esMancuerna: false,
    grupoMuscular: 'Bíceps',
    descripcion: 'Como curl con barra pero usando barra EZ. Agarre más natural para muñecas. Flexiona codos contrayendo bíceps. Baja controlado.',
  },
  {
    nombre: 'Curl Mancuernas Alterno',
    esMancuerna: true,
    grupoMuscular: 'Bíceps',
    descripcion: 'De pie, mancuernas a los lados. Alterna flexión de cada brazo con supinación (rotando palma hacia arriba). Mantén codo fijo.',
  },
  {
    nombre: 'Curl Concentrado',
    esMancuerna: true,
    grupoMuscular: 'Bíceps',
    descripcion: 'Sentado, codo apoyado en parte interna del muslo. Flexiona brazo llevando mancuerna hacia hombro. Aislamiento puro de bíceps.',
  },
  {
    nombre: 'Curl en Banco Inclinado',
    esMancuerna: true,
    grupoMuscular: 'Bíceps',
    descripcion: 'Tumbado en banco inclinado 45°, brazos colgando. Flexiona ambos brazos simultáneamente. Estiramiento máximo del bíceps en posición inicial.',
  },
  {
    nombre: 'Curl en Polea',
    esMancuerna: false,
    grupoMuscular: 'Bíceps',
    descripcion: 'Polea baja con barra o cuerda. Flexiona codos manteniendo brazos fijos a los lados. Tensión constante durante todo el movimiento.',
  },
  {
    nombre: 'Curl Predicador',
    esMancuerna: false,
    grupoMuscular: 'Bíceps',
    descripcion: 'Brazos apoyados en banco predicador. Flexiona codos llevando barra hacia hombros. Elimina impulso, aislamiento total de bíceps.',
  },
  {
    nombre: 'Curl Spider',
    esMancuerna: true,
    grupoMuscular: 'Bíceps',
    descripcion: 'Tumbado boca abajo en banco inclinado, brazos colgando vertical. Flexiona llevando mancuernas hacia hombros. Aislamiento sin impulso.',
  },
];

// ==========================================
// TRÍCEPS
// ==========================================

export const exercisesTriceps: ExerciseInfo[] = [
  {
    nombre: 'Fondos en Máquina',
    esMancuerna: false,
    grupoMuscular: 'Tríceps',
    imageUrl: `${IMG_BASE}/Dips_-_Triceps_Version/1.jpg`,
  },
  {
    nombre: 'Extensión de Tríceps en Polea',
    esMancuerna: false,
    grupoMuscular: 'Tríceps',
    imageUrl: `${IMG_BASE}/Triceps_Pushdown/1.jpg`,
  },
  {
    nombre: 'Press Francés',
    esMancuerna: false,
    grupoMuscular: 'Tríceps',
    descripcion: 'Tumbado en banco, barra sobre pecho. Flexiona codos bajando barra hacia frente sin mover brazos. Extiende contrayendo tríceps.',
  },
  {
    nombre: 'Press Francés con Mancuernas',
    esMancuerna: true,
    grupoMuscular: 'Tríceps',
    descripcion: 'Tumbado, mancuernas sobre pecho. Flexiona codos bajando mancuernas a los lados de la cabeza. Extiende contrayendo tríceps.',
  },
  {
    nombre: 'Extensión Tríceps Overhead',
    esMancuerna: true,
    grupoMuscular: 'Tríceps',
    descripcion: 'De pie o sentado, mancuerna sobre cabeza con ambas manos. Flexiona codos bajando peso detrás de cabeza. Extiende arriba.',
  },
  {
    nombre: 'Extensión Tríceps con Cuerda',
    esMancuerna: false,
    grupoMuscular: 'Tríceps',
    descripcion: 'Polea alta con cuerda. Empuja hacia abajo abriendo cuerda al final. Mantén codos fijos a los lados. Contrae tríceps abajo.',
  },
  {
    nombre: 'Patada de Tríceps',
    esMancuerna: true,
    grupoMuscular: 'Tríceps',
    descripcion: 'Inclinado con brazo paralelo al suelo. Extiende antebrazo hacia atrás contrayendo tríceps. Regresa sin mover el codo.',
  },
  {
    nombre: 'Fondos en Banco',
    esMancuerna: false,
    grupoMuscular: 'Tríceps',
    descripcion: 'Manos en banco detrás de ti, piernas extendidas. Baja flexionando codos hasta 90°. Empuja arriba contrayendo tríceps.',
  },
  {
    nombre: 'Press Cerrado',
    esMancuerna: false,
    grupoMuscular: 'Tríceps',
    descripcion: 'Press de banca con agarre estrecho (manos separadas ancho de hombros). Baja barra al pecho bajo. Empuja enfocando en tríceps.',
  },
  {
    nombre: 'Extensión Polea Invertida',
    esMancuerna: false,
    grupoMuscular: 'Tríceps',
    descripcion: 'Polea alta, agarre supino (palmas arriba). Empuja hacia abajo manteniendo codos fijos. Trabaja cabeza lateral del tríceps.',
  },
];

// ==========================================
// CORE / ABDOMINALES
// ==========================================

export const exercisesCore: ExerciseInfo[] = [
  {
    nombre: 'Abdominales en Máquina',
    esMancuerna: false,
    grupoMuscular: 'Core',
    imageUrl: `${IMG_BASE}/Ab_Crunch_Machine/1.jpg`,
  },
  {
    nombre: 'Crunch en Polea',
    esMancuerna: false,
    grupoMuscular: 'Core',
    descripcion: 'Arrodillado frente a polea alta con cuerda. Flexiona torso llevando codos hacia muslos. Contrae abdominales. Regresa controlado.',
  },
  {
    nombre: 'Elevación de Piernas Colgado',
    esMancuerna: false,
    grupoMuscular: 'Core',
    descripcion: 'Colgado de barra, eleva piernas rectas hasta horizontal o más. Evita balanceo. Trabaja abdomen inferior y hip flexors.',
  },
  {
    nombre: 'Elevación de Rodillas Colgado',
    esMancuerna: false,
    grupoMuscular: 'Core',
    descripcion: 'Colgado de barra, lleva rodillas hacia pecho flexionando cadera. Más fácil que piernas rectas. Trabaja abdomen inferior.',
  },
  {
    nombre: 'Russian Twist',
    esMancuerna: true,
    grupoMuscular: 'Core',
    descripcion: 'Sentado, torso inclinado atrás, pies elevados. Rota torso llevando peso de lado a lado. Trabaja oblicuos. Mantén core activo.',
  },
  {
    nombre: 'Leñador en Polea',
    esMancuerna: false,
    grupoMuscular: 'Core',
    descripcion: 'Polea alta, agarra con ambas manos. Tira diagonalmente hacia cadera opuesta rotando torso. Trabaja oblicuos y core.',
  },
  {
    nombre: 'Ab Rollout',
    esMancuerna: false,
    grupoMuscular: 'Core',
    descripcion: 'Arrodillado con rueda abdominal. Extiende hacia adelante manteniendo core activo. Regresa contrayendo abdominales. Evita arquear espalda.',
  },
  {
    nombre: 'Crunch Bicicleta',
    esMancuerna: false,
    grupoMuscular: 'Core',
    descripcion: 'Tumbado, manos detrás de cabeza. Alterna llevando codo hacia rodilla opuesta mientras extiendes otra pierna. Trabaja todo el core.',
  },
  {
    nombre: 'Dead Bug',
    esMancuerna: false,
    grupoMuscular: 'Core',
    descripcion: 'Tumbado boca arriba, brazos arriba, rodillas a 90°. Extiende brazo y pierna opuestos manteniendo espalda baja pegada al suelo.',
  },
  {
    nombre: 'Pallof Press',
    esMancuerna: false,
    grupoMuscular: 'Core',
    descripcion: 'De pie lateral a polea, agarra con ambas manos. Extiende brazos al frente resistiendo la rotación. Anti-rotación pura.',
  },
];

// ==========================================
// ALL EXERCISES COMBINED
// ==========================================

export const allExercises: ExerciseInfo[] = [
  ...exercisesPiernas,
  ...exercisesGluteos,
  ...exercisesPecho,
  ...exercisesEspalda,
  ...exercisesHombros,
  ...exercisesBiceps,
  ...exercisesTriceps,
  ...exercisesCore,
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export function getExerciseInfo(nombre: string): ExerciseInfo | undefined {
  return allExercises.find(
    (ex) => ex.nombre.toLowerCase() === nombre.toLowerCase()
  );
}

export function getExercisesByMuscle(muscle: MuscleGroup): ExerciseInfo[] {
  return allExercises.filter((ex) => ex.grupoMuscular === muscle);
}

export function getExerciseDescription(nombre: string): string | null {
  const exercise = getExerciseInfo(nombre);
  return exercise?.descripcion || null;
}

export function getExerciseImage(nombre: string): string | null {
  const exercise = getExerciseInfo(nombre);
  return exercise?.imageUrl || null;
}

// Get image URL or description for exercise guidance
export function getExerciseGuidance(nombre: string): { type: 'image' | 'text'; content: string } | null {
  const exercise = getExerciseInfo(nombre);
  if (!exercise) return null;

  if (exercise.imageUrl) {
    return { type: 'image', content: exercise.imageUrl };
  }
  if (exercise.descripcion) {
    return { type: 'text', content: exercise.descripcion };
  }
  return null;
}

// Get exercises that are NOT in the default training groups
// Used by workout builder to show additional exercise options
export function getAdditionalExercises(existingExerciseNames: string[]): ExerciseInfo[] {
  const existingNamesLower = new Set(existingExerciseNames.map(n => n.toLowerCase()));
  return allExercises.filter(ex => !existingNamesLower.has(ex.nombre.toLowerCase()));
}

// Get additional exercises grouped by muscle
export function getAdditionalExercisesByMuscle(existingExerciseNames: string[]): Record<string, ExerciseInfo[]> {
  const additional = getAdditionalExercises(existingExerciseNames);
  const grouped: Record<string, ExerciseInfo[]> = {};

  additional.forEach(ex => {
    if (!grouped[ex.grupoMuscular]) {
      grouped[ex.grupoMuscular] = [];
    }
    grouped[ex.grupoMuscular].push(ex);
  });

  return grouped;
}
