// ==========================================
// SISTEMA DE NORMALIZACIÓN DE EJERCICIOS
// ==========================================
// Maneja alias y variaciones de nombres para que el sistema
// reconozca ejercicios como el mismo aunque tengan nombres diferentes

// Mapa de nombres canónicos (nombre normalizado -> nombre oficial)
const EXERCISE_ALIASES: Record<string, string> = {
  // RDL variaciones
  'rdl': 'RDL / Peso Muerto Rumano',
  'peso muerto rumano': 'RDL / Peso Muerto Rumano',
  'rdl / peso muerto rumano': 'RDL / Peso Muerto Rumano',

  // Prensa variaciones
  'prensa': 'Prensa de Piernas',
  'prensa de piernas': 'Prensa de Piernas',
  'press de piernas': 'Prensa de Piernas',

  // Jalón variaciones
  'jalón pecho': 'Jalón al Pecho',
  'jalon pecho': 'Jalón al Pecho',
  'jalón al pecho': 'Jalón al Pecho',
  'jalon al pecho': 'Jalón al Pecho',

  // Elevación frontal variaciones
  'elevación frontal': 'Elevación Frontal / Y-Raise',
  'elevacion frontal': 'Elevación Frontal / Y-Raise',
  'y-raise': 'Elevación Frontal / Y-Raise',
  'elevación frontal / y-raise': 'Elevación Frontal / Y-Raise',

  // Curl Martillo variaciones
  'curl martillo': 'Curl Martillo',

  // Curl Martillo Cross-body variaciones
  'curl martillo cross-body': 'Curl Martillo Cross-body',
  'curl martillo crossbody': 'Curl Martillo Cross-body',
  'curl martillo cross body': 'Curl Martillo Cross-body',

  // Abductora variaciones
  'abductora': 'Abductora Máquina',
  'abductora maquina': 'Abductora Máquina',
  'abductora máquina': 'Abductora Máquina',
  'abducción': 'Abductora Máquina',
  'abduccion': 'Abductora Máquina',

  // Aductora variaciones
  'aductora': 'Aductora Máquina',
  'aductora maquina': 'Aductora Máquina',
  'aductora máquina': 'Aductora Máquina',
  'aducciones': 'Aductora Máquina',
  'aducción': 'Aductora Máquina',
  'aduccion': 'Aductora Máquina',

  // Fondos variaciones
  'fondos en paralelas': 'Fondos en Máquina',
  'fondos en máquina': 'Fondos en Máquina',
  'fondos en maquina': 'Fondos en Máquina',

  // Press Francés -> Fondos en Máquina (según cambios anteriores)
  'press francés': 'Fondos en Máquina',
  'press frances': 'Fondos en Máquina',

  // Remo variaciones
  'remo con barra': 'Remo en Máquina',
  'remo en máquina': 'Remo en Máquina',
  'remo en maquina': 'Remo en Máquina',
};

/**
 * Convierte un nombre a Title Case (primera letra de cada palabra en mayúscula)
 */
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Normaliza un nombre de ejercicio para que variaciones del mismo
 * ejercicio sean reconocidas como iguales.
 *
 * @param name - Nombre del ejercicio (puede ser cualquier variación)
 * @returns Nombre canónico/oficial del ejercicio
 */
export function normalizeExerciseName(name: string): string {
  if (!name) return name;

  // Convertir a minúsculas para buscar en el mapa
  const lowercaseName = name.toLowerCase().trim();

  // Buscar en alias
  if (EXERCISE_ALIASES[lowercaseName]) {
    return EXERCISE_ALIASES[lowercaseName];
  }

  // Si no hay alias, normalizar a Title Case para consistencia
  // Esto hace que "curl martillo" y "Curl Martillo" sean iguales
  return toTitleCase(name.trim());
}

/**
 * Compara dos nombres de ejercicios para determinar si son el mismo
 */
export function isSameExercise(name1: string, name2: string): boolean {
  return normalizeExerciseName(name1) === normalizeExerciseName(name2);
}

/**
 * Migra PRs antiguos a nombres normalizados
 */
export function migratePRsToNormalizedNames(prs: Record<string, unknown>): Record<string, unknown> {
  const migratedPRs: Record<string, unknown> = {};

  for (const [exerciseName, prData] of Object.entries(prs)) {
    const normalizedName = normalizeExerciseName(exerciseName);

    // Si ya existe un PR con el nombre normalizado, mantener el mejor
    if (migratedPRs[normalizedName]) {
      const existingPR = migratedPRs[normalizedName] as { weight?: number };
      const newPR = prData as { weight?: number };

      // Mantener el PR con mayor peso
      if ((newPR.weight || 0) > (existingPR.weight || 0)) {
        migratedPRs[normalizedName] = prData;
      }
    } else {
      migratedPRs[normalizedName] = prData;
    }
  }

  return migratedPRs;
}

/**
 * Migra historial a nombres normalizados
 */
export function migrateHistoryExerciseNames<T extends { ejercicios?: Array<{ nombre: string }> }>(
  history: T[]
): T[] {
  return history.map(session => {
    if (session.ejercicios) {
      return {
        ...session,
        ejercicios: session.ejercicios.map(ejercicio => ({
          ...ejercicio,
          nombre: normalizeExerciseName(ejercicio.nombre),
        })),
      };
    }
    return session;
  });
}
