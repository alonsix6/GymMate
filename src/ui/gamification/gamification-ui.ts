// ==========================================
// GAMIFICATION UI COMPONENTS
// ==========================================

import {
  getPlayerStats,
  getMuscleRanks,
  getCurrentLevelProgress,
  getStreakInfo,
  getAchievementsProgress,
} from '@/features/gamification';
import { renderLevelBadge, renderLevelBadgeWithProgress } from './level-badge';
import { renderMuscleMap, renderMuscleMapWithLegend } from './muscle-map';
import { renderAllRanksLegend } from './rank-emblem';

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
          ${streak.current >= 3 ? `<span class="text-[10px]">🔥${streak.current}</span>` : ''}
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
              <div class="flex items-center gap-1">
                <span>🔥</span>
                <span class="text-orange-400">${streak.current} días</span>
              </div>
            ` : ''}
            <div class="flex items-center gap-1 text-gray-400">
              <span>📊</span>
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
          ${renderMuscleMapWithLegend(muscleRanks)}
        </div>

        <!-- Seccion Logros -->
        <div class="bg-dark-surface rounded-2xl p-4 mb-4">
          <h3 class="text-sm font-medium text-gray-400 mb-3">LOGROS</h3>
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold text-yellow-400">
                ${achievementProgress.unlocked}/${achievementProgress.total}
              </div>
              <div class="text-xs text-gray-500">Logros desbloqueados</div>
            </div>
            <div class="w-32 h-2 bg-dark-border rounded-full overflow-hidden">
              <div
                class="h-full rounded-full bg-yellow-400"
                style="width: ${achievementProgress.percentage}%"
              ></div>
            </div>
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

  // Animar entrada
  requestAnimationFrame(() => {
    const modalEl = document.getElementById('gamification-modal');
    if (modalEl) {
      modalEl.classList.add('animate-fade-in');
    }
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
}
