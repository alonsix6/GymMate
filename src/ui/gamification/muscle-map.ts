// ==========================================
// MUSCLE MAP SVG COMPONENT
// ==========================================

import type { MuscleRanks, GamificationMuscleGroup } from '@/types/gamification';
import { RANK_COLORS } from '@/features/gamification';

/**
 * Paths SVG para cada grupo muscular (vista frontal)
 */
const MUSCLE_PATHS: Record<GamificationMuscleGroup, string[]> = {
  // Hombros (izquierdo y derecho)
  hombros: [
    'M35 75 Q45 65 55 72 Q60 80 55 88 Q45 85 35 75 Z',
    'M165 75 Q155 65 145 72 Q140 80 145 88 Q155 85 165 75 Z',
  ],
  // Pecho
  pecho: [
    'M60 82 Q100 72 140 82 L138 115 Q100 125 62 115 Z',
  ],
  // Biceps
  biceps: [
    'M35 95 Q28 110 30 135 Q38 140 42 135 Q48 110 42 95 Z',
    'M165 95 Q172 110 170 135 Q162 140 158 135 Q152 110 158 95 Z',
  ],
  // Triceps (parte posterior, parcialmente visible)
  triceps: [
    'M30 100 Q24 115 26 132 Q32 135 35 130 Q38 115 32 100 Z',
    'M170 100 Q176 115 174 132 Q168 135 165 130 Q162 115 168 100 Z',
  ],
  // Espalda (visible en los lados)
  espalda: [
    'M55 88 L48 125 L58 125 L62 88 Z',
    'M145 88 L152 125 L142 125 L138 88 Z',
  ],
  // Core/Abdomen
  core: [
    'M70 120 L130 120 L128 178 Q100 188 72 178 Z',
  ],
  // Gluteos
  gluteos: [
    'M72 182 Q85 175 100 178 Q100 205 85 210 Q70 205 72 182 Z',
    'M128 182 Q115 175 100 178 Q100 205 115 210 Q130 205 128 182 Z',
  ],
  // Piernas (Cuadriceps)
  piernas: [
    'M68 212 L58 310 L88 310 L95 212 Z',
    'M132 212 L142 310 L112 310 L105 212 Z',
  ],
};

/**
 * Genera el filtro de glow para SVG
 */
function generateGlowFilter(id: string): string {
  return `
    <filter id="${id}">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  `;
}

/**
 * Renderiza el mapa muscular completo con colores basados en rangos
 * @param muscleRanks - Rangos de cada grupo muscular
 * @param width - Ancho del SVG (default 200)
 * @param height - Alto del SVG (default 350)
 */
export function renderMuscleMap(
  muscleRanks: MuscleRanks,
  width: number = 200,
  height: number = 350
): string {
  const muscles: GamificationMuscleGroup[] = [
    'hombros', 'pecho', 'biceps', 'triceps',
    'espalda', 'core', 'gluteos', 'piernas'
  ];

  // Generar paths coloreados
  const musclePaths = muscles.map(muscle => {
    const rankData = muscleRanks[muscle];
    const colors = RANK_COLORS[rankData.rank];
    const hasGlow = colors.glow !== 'none';
    const filterId = `glow-${muscle}`;

    return MUSCLE_PATHS[muscle].map((path) => `
      <path
        d="${path}"
        fill="${colors.fill}"
        ${hasGlow ? `filter="url(#${filterId})"` : ''}
        class="muscle-${muscle}"
        data-muscle="${muscle}"
        data-rank="${rankData.rank}"
      />
    `).join('');
  }).join('');

  // Generar filtros de glow
  const glowFilters = muscles
    .filter(m => RANK_COLORS[muscleRanks[m].rank].glow !== 'none')
    .map(m => generateGlowFilter(`glow-${m}`))
    .join('');

  return `
    <svg viewBox="0 0 200 350" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${glowFilters}
      </defs>

      <!-- Silueta base (cabeza, cuello, brazos, piernas inferiores) -->
      <ellipse cx="100" cy="32" rx="22" ry="28" fill="#374151"/>
      <rect x="92" y="58" width="16" height="15" fill="#374151"/>

      <!-- Antebrazos -->
      <path d="M28 138 L22 200 L32 200 L36 138 Z" fill="#374151"/>
      <path d="M172 138 L178 200 L168 200 L164 138 Z" fill="#374151"/>

      <!-- Pantorrillas -->
      <path d="M60 315 L55 380 L80 380 L85 315 Z" fill="#374151"/>
      <path d="M140 315 L145 380 L120 380 L115 315 Z" fill="#374151"/>

      <!-- Musculos coloreados -->
      ${musclePaths}
    </svg>
  `;
}

/**
 * Renderiza un mapa muscular mini para el header/hero
 */
export function renderMuscleMapMini(muscleRanks: MuscleRanks): string {
  return `
    <div class="w-16 h-28 flex-shrink-0">
      ${renderMuscleMap(muscleRanks, 64, 112)}
    </div>
  `;
}

/**
 * Renderiza el mapa con leyenda de musculos
 */
export function renderMuscleMapWithLegend(muscleRanks: MuscleRanks): string {
  const muscles: Array<{ key: GamificationMuscleGroup; label: string }> = [
    { key: 'pecho', label: 'Pecho' },
    { key: 'espalda', label: 'Espalda' },
    { key: 'hombros', label: 'Hombros' },
    { key: 'biceps', label: 'Bíceps' },
    { key: 'triceps', label: 'Tríceps' },
    { key: 'core', label: 'Core' },
    { key: 'gluteos', label: 'Glúteos' },
    { key: 'piernas', label: 'Piernas' },
  ];

  return `
    <div class="flex gap-6">
      <div class="flex-shrink-0">
        ${renderMuscleMap(muscleRanks, 160, 280)}
      </div>
      <div class="flex-1 space-y-2">
        ${muscles.map(({ key, label }) => {
          const data = muscleRanks[key];
          const colors = RANK_COLORS[data.rank];
          const progressPercent = Math.min(100, (data.ratio / 2) * 100); // 2.0x = 100%

          return `
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-400 w-16">${label}</span>
              <div class="flex-1 h-2 bg-dark-border rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full"
                  style="width: ${progressPercent}%; background-color: ${colors.fill}"
                ></div>
              </div>
              <span class="text-xs font-medium w-16" style="color: ${colors.fill}">${data.rank}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/**
 * Renderiza indicador de progreso de un musculo individual
 */
export function renderMuscleProgress(
  muscle: GamificationMuscleGroup,
  muscleRanks: MuscleRanks
): string {
  const data = muscleRanks[muscle];
  const colors = RANK_COLORS[data.rank];

  const muscleLabels: Record<GamificationMuscleGroup, string> = {
    pecho: 'Pecho',
    espalda: 'Espalda',
    hombros: 'Hombros',
    biceps: 'Bíceps',
    triceps: 'Tríceps',
    core: 'Core',
    gluteos: 'Glúteos',
    piernas: 'Piernas',
  };

  return `
    <div class="flex items-center justify-between p-3 bg-dark-surface rounded-xl">
      <div class="flex items-center gap-3">
        <div
          class="w-3 h-3 rounded-full"
          style="background-color: ${colors.fill}; box-shadow: 0 0 8px ${colors.glow}"
        ></div>
        <span class="text-sm">${muscleLabels[muscle]}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium" style="color: ${colors.fill}">${data.rank}</span>
        <span class="text-xs text-gray-500">${data.ratio.toFixed(2)}x</span>
      </div>
    </div>
  `;
}
