// ==========================================
// GAMIFICATION UI COMPONENTS
// ==========================================

import {
  getPlayerStats,
  getMuscleRanks,
  getCurrentLevelProgress,
  getStreakInfo,
  getAchievementsProgress,
  getAchievements,
} from '@/features/gamification';
import { renderLevelBadge, renderLevelBadgeWithProgress } from './level-badge';
import { renderMuscleMap, renderMuscleMapDual } from './muscle-map';
import { renderAllRanksLegend } from './rank-emblem';
import { RANK_COLORS } from '@/features/gamification';
import { icon, refreshIcons } from '@/utils/icons';

/**
 * Renderiza el widget de gamificacion para el header
 */
export function renderGamificationHeader(): string {
  const stats = getPlayerStats();
  const progress = getCurrentLevelProgress();
  const streak = getStreakInfo();

  return `
    <div
      class="gamification-header flex items-center gap-2 cursor-pointer"
      onclick="window.showGamificationModal && window.showGamificationModal()"
    >
      <div class="w-9 h-9">
        ${renderLevelBadge(stats.level, 36)}
      </div>
      <div class="hidden sm:flex flex-col">
        <div class="flex items-center gap-1">
          <span class="text-xs font-bold" style="color: ${stats.titleInfo.color}">${stats.level}</span>
          ${streak.current >= 3 ? `<span class="flex items-center gap-0.5 text-[10px] text-orange-400">${icon('fire', 'sm')}${streak.current}</span>` : ''}
        </div>
        <div class="w-16 h-1 bg-dark-border rounded-full overflow-hidden">
          <div
            class="h-full rounded-full"
            style="width: ${progress.percentage}%; background-color: ${stats.titleInfo.color}"
          ></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renderiza el hero card de gamificacion para la home
 */
export function renderGamificationHeroCard(): string {
  const stats = getPlayerStats();
  const muscleRanks = getMuscleRanks();
  const progress = getCurrentLevelProgress();
  const streak = getStreakInfo();

  return `
    <div
      class="gamification-hero bg-gradient-to-br from-dark-surface to-dark-bg p-4 rounded-2xl border border-dark-border cursor-pointer"
      onclick="window.showGamificationModal && window.showGamificationModal()"
    >
      <div class="flex items-center gap-4">
        <!-- Mapa corporal mini -->
        <div class="w-20 h-32 flex-shrink-0">
          ${renderMuscleMap(muscleRanks, 80, 128)}
        </div>

        <!-- Info de nivel -->
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-10 h-10">
              ${renderLevelBadge(stats.level, 40)}
            </div>
            <div>
              <div class="text-lg font-bold" style="color: ${stats.titleInfo.color}">
                Nivel ${stats.level}
              </div>
              <div class="text-sm text-gray-400">${stats.titleInfo.full}</div>
            </div>
          </div>

          <!-- Barra de XP -->
          <div class="mb-2">
            <div class="h-2 bg-dark-border rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-500"
                style="width: ${progress.percentage}%; background-color: ${stats.titleInfo.color}"
              ></div>
            </div>
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>${progress.currentXP.toLocaleString()} XP</span>
              <span>${progress.maxXP.toLocaleString()} XP</span>
            </div>
          </div>

          <!-- Stats rapidos -->
          <div class="flex gap-4 text-xs">
            ${streak.current > 0 ? `
              <div class="flex items-center gap-1 text-orange-400">
                ${icon('fire', 'sm')}
                <span>${streak.current} días</span>
              </div>
            ` : ''}
            <div class="flex items-center gap-1 text-gray-400">
              ${icon('stats', 'sm')}
              <span>Toca para ver más</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renderiza el modal completo de gamificacion
 */
export function renderGamificationModal(): string {
  const stats = getPlayerStats();
  const muscleRanks = getMuscleRanks();
  const progress = getCurrentLevelProgress();
  const streak = getStreakInfo();
  const achievementProgress = getAchievementsProgress();

  return `
    <div id="gamification-modal" class="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div class="min-h-screen p-4">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold">Progreso</h2>
          <button
            onclick="window.hideGamificationModal && window.hideGamificationModal()"
            class="p-2 hover:bg-dark-surface rounded-full"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Seccion Nivel -->
        <div class="bg-dark-surface rounded-2xl p-4 mb-4">
          <h3 class="text-sm font-medium text-gray-400 mb-3">NIVEL DE CUENTA</h3>
          ${renderLevelBadgeWithProgress(stats.level, progress.currentXP, progress.maxXP)}

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-dark-border">
            <div class="text-center">
              <div class="text-2xl font-bold" style="color: ${stats.titleInfo.color}">${stats.totalXP.toLocaleString()}</div>
              <div class="text-xs text-gray-500">XP Total</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-400">${streak.current}</div>
              <div class="text-xs text-gray-500">Racha actual</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-400">${streak.best}</div>
              <div class="text-xs text-gray-500">Mejor racha</div>
            </div>
          </div>
        </div>

        <!-- Seccion Rangos Musculares -->
        <div class="bg-dark-surface rounded-2xl p-4 mb-4">
          <h3 class="text-sm font-medium text-gray-400 mb-3">RANGOS MUSCULARES</h3>

          <!-- Dual body map (front + back) -->
          <div class="flex justify-center mb-4">
            ${renderMuscleMapDual(muscleRanks, 280, 200)}
          </div>

          <!-- Legend grid -->
          <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            ${[
              { key: 'pecho', label: 'Pecho' },
              { key: 'espalda', label: 'Espalda' },
              { key: 'hombros', label: 'Hombros' },
              { key: 'biceps', label: 'Bíceps' },
              { key: 'triceps', label: 'Tríceps' },
              { key: 'core', label: 'Core' },
              { key: 'gluteos', label: 'Glúteos' },
              { key: 'piernas', label: 'Piernas' },
            ].map(({ key, label }) => {
              const data = muscleRanks[key as keyof typeof muscleRanks];
              const colors = RANK_COLORS[data.rank];
              return `
                <div class="flex items-center justify-between">
                  <span class="text-gray-400">${label}</span>
                  <span class="font-medium" style="color: ${colors.fill}">${data.rank}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Seccion Logros -->
        <div class="bg-dark-surface rounded-2xl p-4 mb-4">
          <button
            class="w-full flex items-center justify-between"
            onclick="window.toggleAchievementsExpanded && window.toggleAchievementsExpanded()"
          >
            <h3 class="text-sm font-medium text-gray-400">LOGROS</h3>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-yellow-400">${achievementProgress.unlocked}/${achievementProgress.total}</span>
              <span id="achievements-chevron" class="text-gray-400 transition-transform duration-200">
                ${icon('chevronDown', 'sm')}
              </span>
            </div>
          </button>

          <!-- Collapsed summary -->
          <div id="achievements-summary" class="mt-3">
            <div class="flex items-center justify-between">
              <div class="text-xs text-gray-500">Logros desbloqueados</div>
              <div class="w-32 h-2 bg-dark-border rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-yellow-400"
                  style="width: ${achievementProgress.percentage}%"
                ></div>
              </div>
            </div>
          </div>

          <!-- Expanded list -->
          <div id="achievements-expanded" class="hidden mt-4">
            ${renderAchievementsList()}
          </div>
        </div>

        <!-- Guia de Rangos -->
        <div class="bg-dark-surface rounded-2xl p-4 mb-4">
          <h3 class="text-sm font-medium text-gray-400 mb-3">GUÍA DE RANGOS</h3>
          <p class="text-xs text-gray-500 mb-3">
            Los rangos se basan en tu fuerza relativa (1RM / peso corporal).
            Cada grupo muscular tiene su propio rango.
          </p>
          ${renderAllRanksLegend()}
        </div>

        <!-- Guia de Niveles -->
        <div class="bg-dark-surface rounded-2xl p-4">
          <h3 class="text-sm font-medium text-gray-400 mb-3">GUÍA DE NIVELES</h3>
          <p class="text-xs text-gray-500 mb-3">
            Gana XP completando entrenamientos, batiendo PRs, y manteniendo rachas.
            El nivel 100 (Simétrico) requiere ~4 años de entrenamiento dedicado.
          </p>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between"><span style="color: #6B7280">Principiante I-V</span><span class="text-gray-500">Nivel 1-16</span></div>
            <div class="flex justify-between"><span style="color: #22C55E">Novato I-V</span><span class="text-gray-500">Nivel 17-33</span></div>
            <div class="flex justify-between"><span style="color: #3B82F6">Intermedio I-V</span><span class="text-gray-500">Nivel 34-50</span></div>
            <div class="flex justify-between"><span style="color: #8B5CF6">Avanzado I-V</span><span class="text-gray-500">Nivel 51-66</span></div>
            <div class="flex justify-between"><span style="color: #F59E0B">Elite I-V</span><span class="text-gray-500">Nivel 67-83</span></div>
            <div class="flex justify-between"><span style="color: #EF4444">Legendario I-V</span><span class="text-gray-500">Nivel 84-99</span></div>
            <div class="flex justify-between"><span class="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold">Simétrico</span><span class="text-gray-500">Nivel 100</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Categoria labels for achievements
 */
const CATEGORY_LABELS: Record<string, string> = {
  sesiones: 'Sesiones',
  volumen: 'Volumen',
  prs: 'Récords Personales',
  rachas: 'Rachas',
  rangos: 'Rangos',
  especial: 'Especiales',
};

/**
 * Renderiza la lista completa de logros
 */
function renderAchievementsList(): string {
  const achievements = getAchievements();

  // Group by category
  const byCategory: Record<string, typeof achievements> = {};
  for (const achievement of achievements) {
    const cat = achievement.category;
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(achievement);
  }

  // Render each category
  const categories = ['sesiones', 'volumen', 'prs', 'rachas', 'rangos', 'especial'];

  return categories.map(cat => {
    const items = byCategory[cat] || [];
    if (items.length === 0) return '';

    const completed = items.filter(a => a.unlockedAt);
    const pending = items.filter(a => !a.unlockedAt);

    return `
      <div class="mb-4 last:mb-0">
        <div class="text-xs font-medium text-gray-500 mb-2">${CATEGORY_LABELS[cat]}</div>
        <div class="space-y-2">
          ${[...completed, ...pending].map(achievement => {
            const isUnlocked = !!achievement.unlockedAt;
            return `
              <div class="flex items-start gap-3 p-2 rounded-lg ${isUnlocked ? 'bg-dark-bg/50' : ''}">
                <div class="flex-shrink-0 mt-0.5 ${isUnlocked ? 'text-green-400' : 'text-gray-600'}">
                  ${isUnlocked ? icon('check', 'sm') : icon('target', 'sm')}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="${isUnlocked ? 'text-white' : 'text-gray-400'} font-medium text-sm">
                      ${achievement.name}
                    </span>
                    <span class="text-xs ${isUnlocked ? 'text-yellow-400' : 'text-gray-600'}">
                      +${achievement.xpReward} XP
                    </span>
                  </div>
                  <div class="text-xs ${isUnlocked ? 'text-gray-400' : 'text-gray-600'}">
                    ${achievement.description}
                  </div>
                  ${!isUnlocked && achievement.progress !== undefined && achievement.target ? `
                    <div class="mt-1 flex items-center gap-2">
                      <div class="flex-1 h-1 bg-dark-border rounded-full overflow-hidden">
                        <div
                          class="h-full rounded-full bg-gray-500"
                          style="width: ${Math.min(100, (achievement.progress / achievement.target) * 100)}%"
                        ></div>
                      </div>
                      <span class="text-[10px] text-gray-500">
                        ${achievement.progress}/${achievement.target}
                      </span>
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Toggle achievements expanded state
 */
function toggleAchievementsExpanded(): void {
  const summary = document.getElementById('achievements-summary');
  const expanded = document.getElementById('achievements-expanded');
  const chevron = document.getElementById('achievements-chevron');

  if (summary && expanded && chevron) {
    const isExpanded = !expanded.classList.contains('hidden');

    if (isExpanded) {
      expanded.classList.add('hidden');
      summary.classList.remove('hidden');
      chevron.style.transform = 'rotate(0deg)';
    } else {
      expanded.classList.remove('hidden');
      summary.classList.add('hidden');
      chevron.style.transform = 'rotate(180deg)';
      refreshIcons();
    }
  }
}

/**
 * Muestra el modal de gamificacion
 */
export function showGamificationModal(): void {
  const existing = document.getElementById('gamification-modal');
  if (existing) {
    existing.remove();
  }

  const modal = document.createElement('div');
  modal.innerHTML = renderGamificationModal();
  document.body.appendChild(modal.firstElementChild as Node);

  // Animar entrada y refrescar iconos
  requestAnimationFrame(() => {
    const modalEl = document.getElementById('gamification-modal');
    if (modalEl) {
      modalEl.classList.add('animate-fade-in');
    }
    refreshIcons();
  });
}

/**
 * Oculta el modal de gamificacion
 */
export function hideGamificationModal(): void {
  const modal = document.getElementById('gamification-modal');
  if (modal) {
    modal.classList.add('animate-fade-out');
    setTimeout(() => modal.remove(), 200);
  }
}

// Exponer funciones globalmente para onclick handlers
if (typeof window !== 'undefined') {
  (window as any).showGamificationModal = showGamificationModal;
  (window as any).hideGamificationModal = hideGamificationModal;
  (window as any).toggleAchievementsExpanded = toggleAchievementsExpanded;
}
