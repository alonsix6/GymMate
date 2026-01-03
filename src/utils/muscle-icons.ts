// ==========================================
// ICONOS SVG DE GRUPOS MUSCULARES
// Estilo: línea limpia, minimalista
// ==========================================

/**
 * Iconos SVG para grupos musculares
 * Cada icono usa viewBox 24x24 y stroke para consistencia
 */
const MUSCLE_SVG_ICONS: Record<string, string> = {
  // Pecho - silueta de pectorales
  chest: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 4C8 4 5 6 4 9c-.5 1.5-.5 3 0 4.5.8 2.5 3 4 6 4.5h4c3-.5 5.2-2 6-4.5.5-1.5.5-3 0-4.5C19 6 16 4 12 4z"/>
      <path d="M12 4v14"/>
      <path d="M8 8c1 1.5 2 2.5 4 3"/>
      <path d="M16 8c-1 1.5-2 2.5-4 3"/>
    </svg>
  `,

  // Espalda - silueta de dorsales
  back: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3c-3 0-5.5 1-7 3-1 1.5-1.5 3.5-1 6 .5 3 2 5.5 4 7l2 2h4l2-2c2-1.5 3.5-4 4-7 .5-2.5 0-4.5-1-6-1.5-2-4-3-7-3z"/>
      <path d="M12 3v18"/>
      <path d="M8 7c-.5 2-1 4-.5 7"/>
      <path d="M16 7c.5 2 1 4 .5 7"/>
    </svg>
  `,

  // Hombros - silueta de deltoides
  shoulders: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 12c0-4 2-7 4-8 1.5-.7 3-.7 4 0 1-.7 2.5-.7 4 0 2 1 4 4 4 8"/>
      <circle cx="6" cy="12" r="2"/>
      <circle cx="18" cy="12" r="2"/>
      <path d="M8 12h8"/>
      <path d="M12 4v5"/>
    </svg>
  `,

  // Bíceps - brazo flexionado
  biceps: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 18c-1-1-2-3-2-5 0-3 2-5 4-5h1"/>
      <path d="M9 8c2-3 5-4 7-3 1.5.5 2.5 2 3 4s0 4-1 5"/>
      <path d="M18 14c-1 2-3 4-6 4-2 0-4-1-5-3"/>
      <ellipse cx="13" cy="10" rx="3" ry="2"/>
    </svg>
  `,

  // Tríceps - brazo extendido/desde atrás
  triceps: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 4c-2 0-3 1.5-3 3.5S6 11 8 12"/>
      <path d="M8 12v7c0 1 .5 2 2 2h4c1.5 0 2-1 2-2v-7"/>
      <path d="M16 4c2 0 3 1.5 3 3.5S18 11 16 12"/>
      <path d="M10 8h4"/>
      <path d="M12 4v4"/>
    </svg>
  `,

  // Piernas - silueta de pierna/cuádriceps
  legs: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 3c-1 0-2 1-2 2.5 0 2 1 4 1.5 6.5.5 3 0 5-.5 7-.5 1.5 0 2.5 1 2.5"/>
      <path d="M16 3c1 0 2 1 2 2.5 0 2-1 4-1.5 6.5-.5 3 0 5 .5 7 .5 1.5 0 2.5-1 2.5"/>
      <path d="M9 8c1 1 2 1.5 3 1.5s2-.5 3-1.5"/>
      <path d="M10 14h4"/>
    </svg>
  `,

  // Glúteos
  glutes: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 8c-1 2-1.5 4-1 6 .5 2.5 2 4.5 4 5.5 1 .5 2 .5 3 .5"/>
      <path d="M18 8c1 2 1.5 4 1 6-.5 2.5-2 4.5-4 5.5-1 .5-2 .5-3 .5"/>
      <path d="M12 5v15"/>
      <path d="M8 10c1.5 1 2.5 2 4 2s2.5-1 4-2"/>
    </svg>
  `,

  // Core/Abdominales
  core: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="7" y="4" width="10" height="16" rx="2"/>
      <line x1="7" y1="8" x2="17" y2="8"/>
      <line x1="7" y1="12" x2="17" y2="12"/>
      <line x1="7" y1="16" x2="17" y2="16"/>
      <line x1="12" y1="4" x2="12" y2="20"/>
    </svg>
  `,

  // Push - empuje (pecho + hombros + tríceps)
  push: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="6" r="2"/>
      <path d="M12 8v4"/>
      <path d="M8 12h8"/>
      <path d="M6 12l-2 4v4"/>
      <path d="M18 12l2 4v4"/>
      <path d="M10 12v8"/>
      <path d="M14 12v8"/>
      <path d="M4 16h3"/>
      <path d="M17 16h3"/>
    </svg>
  `,

  // Pull - tirón (espalda + bíceps)
  pull: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v3"/>
      <path d="M7 10h10"/>
      <path d="M5 6l2 4"/>
      <path d="M19 6l-2 4"/>
      <path d="M7 10c-1 2-2 4-2 6v4"/>
      <path d="M17 10c1 2 2 4 2 6v4"/>
      <path d="M10 10v10"/>
      <path d="M14 10v10"/>
    </svg>
  `,
};

/**
 * Iconos específicos para los grupos de entrenamiento
 */
const GROUP_SVG_ICONS: Record<string, string> = {
  // GRUPO 1 - Piernas + Glúteos
  grupo1: MUSCLE_SVG_ICONS.legs,

  // GRUPO 2 - Upper Push (Pecho + Hombros + Tríceps)
  grupo2: MUSCLE_SVG_ICONS.push,

  // GRUPO 3 - Piernas Quad Dominante
  grupo3: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 3c-1.5 0-2.5 1-2.5 2.5 0 2 .5 4 1 7 .5 3.5.5 6 0 8-.3 1.5.5 2.5 1.5 2.5"/>
      <path d="M15 3c1.5 0 2.5 1 2.5 2.5 0 2-.5 4-1 7-.5 3.5-.5 6 0 8 .3 1.5-.5 2.5-1.5 2.5"/>
      <ellipse cx="9" cy="10" rx="1.5" ry="3"/>
      <ellipse cx="15" cy="10" rx="1.5" ry="3"/>
    </svg>
  `,

  // GRUPO 4 - Espalda + Bíceps
  grupo4: MUSCLE_SVG_ICONS.pull,

  // GRUPO 5 - Hombro + Tríceps
  grupo5: MUSCLE_SVG_ICONS.shoulders,
};

/**
 * Renderiza un icono de músculo como SVG
 * @param muscle - Nombre del músculo (chest, back, shoulders, biceps, triceps, legs, glutes, core)
 * @param size - Tamaño en pixels (default 24)
 * @param className - Clases CSS adicionales
 */
export function muscleIcon(
  muscle: string,
  size: number = 24,
  className: string = ''
): string {
  const normalizedMuscle = muscle.toLowerCase().replace(/[áéíóú]/g, (match) => {
    const map: Record<string, string> = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' };
    return map[match] || match;
  });

  // Map Spanish names to English keys
  const muscleMap: Record<string, string> = {
    pecho: 'chest',
    espalda: 'back',
    hombros: 'shoulders',
    biceps: 'biceps',
    triceps: 'triceps',
    piernas: 'legs',
    gluteos: 'glutes',
    core: 'core',
    push: 'push',
    pull: 'pull',
  };

  const key = muscleMap[normalizedMuscle] || normalizedMuscle;
  const svg = MUSCLE_SVG_ICONS[key];

  if (!svg) {
    // Fallback a un icono genérico de dumbbell
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" class="${className}" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="10" width="4" height="4" rx="1"/>
      <rect x="18" y="10" width="4" height="4" rx="1"/>
      <line x1="6" y1="12" x2="18" y2="12"/>
      <rect x="6" y="8" width="2" height="8" rx="0.5"/>
      <rect x="16" y="8" width="2" height="8" rx="0.5"/>
    </svg>`;
  }

  // Inject size and class into SVG
  return svg
    .replace('<svg', `<svg width="${size}" height="${size}" class="${className}"`)
    .trim();
}

/**
 * Renderiza un icono de grupo de entrenamiento
 * @param groupId - ID del grupo (grupo1, grupo2, etc.)
 * @param size - Tamaño en pixels (default 24)
 * @param className - Clases CSS adicionales
 */
export function groupIcon(
  groupId: string,
  size: number = 24,
  className: string = ''
): string {
  const svg = GROUP_SVG_ICONS[groupId] || MUSCLE_SVG_ICONS.legs;

  return svg
    .replace('<svg', `<svg width="${size}" height="${size}" class="${className}"`)
    .trim();
}

/**
 * Obtiene todos los iconos de músculos disponibles
 */
export function getAvailableMuscleIcons(): string[] {
  return Object.keys(MUSCLE_SVG_ICONS);
}

/**
 * Obtiene todos los iconos de grupos disponibles
 */
export function getAvailableGroupIcons(): string[] {
  return Object.keys(GROUP_SVG_ICONS);
}

// Export raw SVGs for direct use if needed
export { MUSCLE_SVG_ICONS, GROUP_SVG_ICONS };
