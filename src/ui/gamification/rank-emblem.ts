// ==========================================
// RANK EMBLEM SVG COMPONENT
// ==========================================

import type { StrengthRank } from '@/types/gamification';
import { RANK_COLORS } from '@/features/gamification';

/**
 * Configuracion de formas para cada rango
 */
const EMBLEM_CONFIG: Record<StrengthRank, {
  points: number;
  innerRadius: number;
  rotation: number;
}> = {
  Hierro: { points: 6, innerRadius: 0.5, rotation: 0 },
  Bronce: { points: 6, innerRadius: 0.6, rotation: 30 },
  Plata: { points: 8, innerRadius: 0.55, rotation: 0 },
  Oro: { points: 8, innerRadius: 0.6, rotation: 22.5 },
  Platino: { points: 5, innerRadius: 0.4, rotation: -90 },
  Esmeralda: { points: 6, innerRadius: 0.45, rotation: 0 },
  Diamante: { points: 8, innerRadius: 0.35, rotation: 22.5 },
  Campeon: { points: 10, innerRadius: 0.4, rotation: 0 },
  Simetrico: { points: 12, innerRadius: 0.5, rotation: 0 },
};

/**
 * Aclara un color hex
 */
function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

/**
 * Genera el path de una estrella/poligono
 */
function generateStarPath(
  cx: number,
  cy: number,
  points: number,
  outerR: number,
  innerRatio: number,
  rotation: number
): string {
  const step = Math.PI / points;
  const innerR = outerR * innerRatio;
  let path = '';

  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2 + (rotation * Math.PI / 180);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    path += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2);
  }

  return path + 'Z';
}

/**
 * Genera el SVG del emblema de rango
 * @param rank - Rango de fuerza
 * @param size - Tamaño del emblema (default 48)
 */
export function renderRankEmblem(rank: StrengthRank, size: number = 48): string {
  const config = EMBLEM_CONFIG[rank];
  const colors = RANK_COLORS[rank];
  const cx = 24;
  const cy = 24;
  const r = 18;

  const starPath = generateStarPath(
    cx, cy,
    config.points,
    r,
    config.innerRadius,
    config.rotation
  );

  const lighterColor = lightenColor(colors.fill, 30);
  const hasGlow = colors.glow !== 'none';
  const uniqueId = `rank-${rank}-${Date.now()}`;

  // Emblema especial para Simetrico
  if (rank === 'Simetrico') {
    return `
      <svg viewBox="0 0 48 48" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${uniqueId}-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#60A5FA"/>
            <stop offset="50%" style="stop-color:#3B82F6"/>
            <stop offset="100%" style="stop-color:#2563EB"/>
          </linearGradient>
          <filter id="${uniqueId}-glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle cx="24" cy="24" r="22" fill="${colors.glow}" opacity="0.3"/>
        <path d="${starPath}" fill="url(#${uniqueId}-grad)" filter="url(#${uniqueId}-glow)"/>
        <circle cx="24" cy="24" r="6" fill="white" opacity="0.3"/>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 48 48" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${uniqueId}-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${lighterColor}"/>
          <stop offset="100%" style="stop-color:${colors.fill}"/>
        </linearGradient>
        ${hasGlow ? `
        <filter id="${uniqueId}-glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        ` : ''}
      </defs>
      ${hasGlow ? `<circle cx="24" cy="24" r="20" fill="${colors.glow}" opacity="0.4"/>` : ''}
      <path d="${starPath}" fill="url(#${uniqueId}-grad)" ${hasGlow ? `filter="url(#${uniqueId}-glow)"` : ''}/>
    </svg>
  `;
}

/**
 * Genera un emblema mini para listas
 */
export function renderRankEmblemMini(rank: StrengthRank): string {
  return renderRankEmblem(rank, 24);
}

/**
 * Genera el emblema con nombre del rango
 */
export function renderRankWithLabel(rank: StrengthRank, size: number = 32): string {
  const colors = RANK_COLORS[rank];

  return `
    <div class="flex items-center gap-2">
      <div class="w-${size / 4} h-${size / 4}">
        ${renderRankEmblem(rank, size)}
      </div>
      <span class="text-sm font-medium" style="color: ${colors.fill}">${rank}</span>
    </div>
  `;
}

/**
 * Renderiza todos los rangos en una fila (para leyenda)
 */
export function renderAllRanksLegend(): string {
  const ranks: StrengthRank[] = [
    'Hierro', 'Bronce', 'Plata', 'Oro', 'Platino',
    'Esmeralda', 'Diamante', 'Campeon', 'Simetrico'
  ];

  const ratios = [
    '< 0.3x', '0.3-0.5x', '0.5-0.7x', '0.7-0.9x', '0.9-1.1x',
    '1.1-1.3x', '1.3-1.6x', '1.6-2.0x', '> 2.0x'
  ];

  return `
    <div class="space-y-2">
      ${ranks.map((rank, i) => {
        const colors = RANK_COLORS[rank];
        return `
          <div class="flex items-center gap-3">
            <div class="w-6 h-6">${renderRankEmblem(rank, 24)}</div>
            <span class="text-sm font-medium w-20" style="color: ${colors.fill}">${rank}</span>
            <span class="text-xs text-gray-500">${ratios[i]} peso corporal</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
