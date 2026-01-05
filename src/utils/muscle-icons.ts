// ==========================================
// ICONOS SVG DE GRUPOS MUSCULARES
// Estilo: anatómico detallado, profesional
// ==========================================

/**
 * Iconos SVG para grupos musculares
 * Diseño anatómico con nivel de detalle apropiado
 */
const MUSCLE_SVG_ICONS: Record<string, string> = {
  // Pecho - vista frontal de pectorales con definición muscular
  chest: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3.5v17"/>
      <path d="M4.5 8c0-2 1.5-3.5 3.5-4 1.5-.4 3-.2 4 .5"/>
      <path d="M19.5 8c0-2-1.5-3.5-3.5-4-1.5-.4-3-.2-4 .5"/>
      <path d="M4.5 8c-.5 2-.3 4 .5 6 1 2.5 3 4 5 4.5"/>
      <path d="M19.5 8c.5 2 .3 4-.5 6-1 2.5-3 4-5 4.5"/>
      <path d="M6 9.5c1.5 1.5 3 2.5 6 3"/>
      <path d="M18 9.5c-1.5 1.5-3 2.5-6 3"/>
      <ellipse cx="8" cy="10" rx="1.5" ry="1" opacity="0.6"/>
      <ellipse cx="16" cy="10" rx="1.5" ry="1" opacity="0.6"/>
    </svg>
  `,

  // Espalda - vista posterior con dorsales y trapecios
  back: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v20"/>
      <path d="M12 4c-2 0-4 .5-5.5 2-1.2 1.2-1.8 3-1.5 5"/>
      <path d="M12 4c2 0 4 .5 5.5 2 1.2 1.2 1.8 3 1.5 5"/>
      <path d="M5 11c-.3 2 .2 4 1.5 6 1.5 2.3 3.5 3.5 5.5 4"/>
      <path d="M19 11c.3 2-.2 4-1.5 6-1.5 2.3-3.5 3.5-5.5 4"/>
      <path d="M7.5 7c-1 2.5-1 5-.5 8"/>
      <path d="M16.5 7c1 2.5 1 5 .5 8"/>
      <path d="M9 5.5l3 2 3-2"/>
      <path d="M9 17l3-1 3 1"/>
    </svg>
  `,

  // Hombros - deltoides con tres cabezas definidas
  shoulders: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 6c-1.5 0-3-.5-4-1.5C6 3 4 4 3.5 6c-.5 2 0 4 1 6"/>
      <path d="M12 6c1.5 0 3-.5 4-1.5 2-1.5 4-.5 4.5 1.5.5 2 0 4-1 6"/>
      <ellipse cx="5.5" cy="9" rx="2.5" ry="3.5"/>
      <ellipse cx="18.5" cy="9" rx="2.5" ry="3.5"/>
      <path d="M8 9h8"/>
      <path d="M12 4v4"/>
      <path d="M5 6c.5-.5 1.5-1 2.5-1"/>
      <path d="M19 6c-.5-.5-1.5-1-2.5-1"/>
      <circle cx="12" cy="5" r="1" fill="currentColor"/>
    </svg>
  `,

  // Bíceps - brazo flexionado mostrando bíceps definido
  biceps: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 19c0-2 1-4 2.5-5.5"/>
      <path d="M7.5 13.5c-1-2-.5-4 1-5.5 1-1 2.5-1.5 4-1"/>
      <path d="M12.5 7c2-1 4-.5 5.5 1 1 1 1.5 2.5 1.5 4"/>
      <path d="M19.5 12c0 2-.5 3.5-2 5-1 1-2.5 1.5-4 1.5"/>
      <ellipse cx="14" cy="9.5" rx="3.5" ry="2.5"/>
      <path d="M10 10c1 1 2 2 4 2"/>
      <path d="M14 15c-2 0-4-.5-5.5-2"/>
      <path d="M4 19h4"/>
      <path d="M16 18c1 0 2 .5 3 1"/>
    </svg>
  `,

  // Tríceps - vista posterior del brazo con tres cabezas
  triceps: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 3c-2 0-3.5 1.5-3.5 4 0 1.5.5 3 1.5 4"/>
      <path d="M16 3c2 0 3.5 1.5 3.5 4 0 1.5-.5 3-1.5 4"/>
      <path d="M6 11c-.5 2-.5 4 0 6 .5 2 1.5 3 3 4h6c1.5-1 2.5-2 3-4 .5-2 .5-4 0-6"/>
      <path d="M9 8h6"/>
      <path d="M12 3v6"/>
      <path d="M8 13c1 1 2.5 1.5 4 1.5s3-.5 4-1.5"/>
      <ellipse cx="9" cy="6" rx="1" ry="2" opacity="0.6"/>
      <ellipse cx="15" cy="6" rx="1" ry="2" opacity="0.6"/>
    </svg>
  `,

  // Piernas - cuádriceps e isquiotibiales definidos
  legs: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 2c-1.5 0-2.5 1-2.5 2.5 0 2 .5 4 1 6.5"/>
      <path d="M16 2c1.5 0 2.5 1 2.5 2.5 0 2-.5 4-1 6.5"/>
      <path d="M6.5 11c.5 3 .5 6 0 8-.3 1.5.5 2.5 1.5 2.5"/>
      <path d="M17.5 11c-.5 3-.5 6 0 8 .3 1.5-.5 2.5-1.5 2.5"/>
      <ellipse cx="8" cy="8" rx="1.5" ry="3"/>
      <ellipse cx="16" cy="8" rx="1.5" ry="3"/>
      <path d="M9.5 6c1-.5 2.5-.5 5 0"/>
      <path d="M10 14h4"/>
      <path d="M10 17h4"/>
    </svg>
  `,

  // Glúteos - vista posterior con definición muscular
  glutes: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 4v16"/>
      <path d="M5 7c-1 2-1.5 5-1 7.5.5 2.5 2 4.5 4.5 5.5 1.5.6 2.5.6 3.5.6"/>
      <path d="M19 7c1 2 1.5 5 1 7.5-.5 2.5-2 4.5-4.5 5.5-1.5.6-2.5.6-3.5.6"/>
      <ellipse cx="8" cy="12" rx="2.5" ry="4"/>
      <ellipse cx="16" cy="12" rx="2.5" ry="4"/>
      <path d="M7 9c1.5 1 3 1.5 5 1.5s3.5-.5 5-1.5"/>
    </svg>
  `,

  // Core/Abdominales - six-pack definido
  core: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v20"/>
      <rect x="6" y="3" width="12" height="18" rx="3"/>
      <line x1="6" y1="7.5" x2="18" y2="7.5"/>
      <line x1="6" y1="12" x2="18" y2="12"/>
      <line x1="6" y1="16.5" x2="18" y2="16.5"/>
      <rect x="7" y="4" width="4" height="3" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="13" y="4" width="4" height="3" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="7" y="8.5" width="4" height="3" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="13" y="8.5" width="4" height="3" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="7" y="13" width="4" height="3" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="13" y="13" width="4" height="3" rx="1" fill="currentColor" opacity="0.15"/>
    </svg>
  `,

  // Push - representación de movimiento de empuje
  push: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="4" r="2"/>
      <path d="M12 6v5"/>
      <path d="M7 11h10"/>
      <path d="M5 11l-1 4v5"/>
      <path d="M19 11l1 4v5"/>
      <path d="M9 11v9"/>
      <path d="M15 11v9"/>
      <path d="M3 15h3"/>
      <path d="M18 15h3"/>
      <path d="M2 13l3 2"/>
      <path d="M22 13l-3 2"/>
    </svg>
  `,

  // Pull - representación de movimiento de tirón
  pull: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="4" r="2"/>
      <path d="M12 6v4"/>
      <path d="M6 10h12"/>
      <path d="M4 5l2.5 5"/>
      <path d="M20 5l-2.5 5"/>
      <path d="M6 10c-1.5 3-2 5-2 7v3"/>
      <path d="M18 10c1.5 3 2 5 2 7v3"/>
      <path d="M9 10v10"/>
      <path d="M15 10v10"/>
      <path d="M3 6l2 2"/>
      <path d="M21 6l-2 2"/>
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

  // GRUPO 3 - Piernas Quad Dominante (énfasis en cuádriceps)
  grupo3: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 2c-1.5 0-2.5 1-2.5 2.5 0 2.5 .5 5 1 8"/>
      <path d="M16 2c1.5 0 2.5 1 2.5 2.5 0 2.5-.5 5-1 8"/>
      <path d="M6.5 12.5c.3 3 .2 6-.3 8-.3 1.5.5 2.5 1.5 2.5"/>
      <path d="M17.5 12.5c-.3 3-.2 6 .3 8 .3 1.5-.5 2.5-1.5 2.5"/>
      <ellipse cx="8.5" cy="8" rx="2" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="15.5" cy="8" rx="2" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="8.5" cy="8" rx="2" ry="4"/>
      <ellipse cx="15.5" cy="8" rx="2" ry="4"/>
      <path d="M10 5c1-.3 3-.3 4 0"/>
      <path d="M10 14h4"/>
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
