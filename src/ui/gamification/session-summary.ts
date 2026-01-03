// ==========================================
// SESSION XP SUMMARY POPUP
// ==========================================

import type { SessionXPSummary, GamificationMuscleGroup } from '@/types/gamification';
import { RANK_COLORS } from '@/features/gamification';
import { renderLevelBadge } from './level-badge';
import { renderRankEmblem } from './rank-emblem';

/**
 * Nombres de musculos en español
 */
const MUSCLE_NAMES: Record<GamificationMuscleGroup, string> = {
  pecho: 'Pecho',
  espalda: 'Espalda',
  hombros: 'Hombros',
  biceps: 'Bíceps',
  triceps: 'Tríceps',
  piernas: 'Piernas',
  gluteos: 'Glúteos',
  core: 'Core',
};

/**
 * Renderiza el popup de resumen de XP al terminar sesion
 */
export function renderSessionSummary(summary: SessionXPSummary): string {
  const hasRankUps = summary.rankUps.length > 0;

  return `
    <div id="session-summary-modal" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div class="bg-dark-surface rounded-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <!-- Header -->
        <div class="p-6 text-center border-b border-dark-border">
          <h2 class="text-xl font-bold mb-4">Entrenamiento Completado</h2>

          <!-- Badge y nivel -->
          <div class="flex justify-center mb-3">
            <div class="w-16 h-16">
              ${renderLevelBadge(summary.newLevel, 64)}
            </div>
          </div>

          <div class="text-lg font-bold" style="color: ${summary.titleInfo.color}">
            Nivel ${summary.newLevel} - ${summary.titleInfo.full}
          </div>

          ${summary.leveledUp ? `
            <div class="mt-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm inline-block animate-pulse">
              ⬆️ ¡Subiste de nivel!
            </div>
          ` : ''}

          <!-- Barra de progreso -->
          <div class="mt-4">
            <div class="h-3 bg-dark-border rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-1000"
                style="width: ${summary.levelProgress.percentage}%; background-color: ${summary.titleInfo.color}"
              ></div>
            </div>
            <div class="text-xs text-gray-500 mt-1">
              ${summary.levelProgress.current.toLocaleString()} / ${summary.levelProgress.max.toLocaleString()} XP
            </div>
          </div>
        </div>

        <!-- Desglose de XP -->
        <div class="p-4 border-b border-dark-border">
          <h3 class="text-sm font-medium text-gray-400 mb-3">XP GANADO</h3>
          <div class="space-y-2">
            <!-- Base XP -->
            <div class="flex justify-between items-center">
              <span class="text-sm">Entrenamiento completado</span>
              <span class="text-green-400 font-medium">+${summary.baseXP} XP</span>
            </div>

            <!-- Volumen XP -->
            ${summary.volumeXP > 0 ? `
              <div class="flex justify-between items-center">
                <span class="text-sm">Volumen</span>
                <span class="text-green-400 font-medium">+${summary.volumeXP} XP</span>
              </div>
            ` : ''}

            <!-- PRs XP -->
            ${summary.prXP.map(pr => `
              <div class="flex justify-between items-center">
                <span class="text-sm text-yellow-400">🏆 PR: ${pr.exercise}</span>
                <span class="text-yellow-400 font-medium">+${pr.amount} XP</span>
              </div>
            `).join('')}

            <!-- Streak XP -->
            ${summary.streakXP > 0 ? `
              <div class="flex justify-between items-center">
                <span class="text-sm text-orange-400">🔥 Racha</span>
                <span class="text-orange-400 font-medium">+${summary.streakXP} XP</span>
              </div>
            ` : ''}

            <!-- Achievement XP -->
            ${summary.achievementXP.map(a => `
              <div class="flex justify-between items-center">
                <span class="text-sm text-purple-400">🎖️ ${a.name}</span>
                <span class="text-purple-400 font-medium">+${a.amount} XP</span>
              </div>
            `).join('')}

            <!-- Rank up XP -->
            ${summary.rankUpXP.map(r => `
              <div class="flex justify-between items-center">
                <span class="text-sm text-blue-400">⬆️ Rango ${r.muscle}</span>
                <span class="text-blue-400 font-medium">+${r.amount} XP</span>
              </div>
            `).join('')}

            <!-- Total -->
            <div class="flex justify-between items-center pt-2 border-t border-dark-border">
              <span class="font-bold">TOTAL</span>
              <span class="text-xl font-bold text-accent">+${summary.totalXP} XP</span>
            </div>
          </div>
        </div>

        <!-- Rank ups -->
        ${hasRankUps ? `
          <div class="p-4 border-b border-dark-border">
            <h3 class="text-sm font-medium text-gray-400 mb-3">RANGOS ACTUALIZADOS</h3>
            <div class="space-y-3">
              ${summary.rankUps.map(ru => {
                const toColors = RANK_COLORS[ru.to];
                return `
                  <div class="flex items-center gap-3 p-2 bg-dark-bg rounded-xl">
                    <div class="w-8 h-8">
                      ${renderRankEmblem(ru.to, 32)}
                    </div>
                    <div class="flex-1">
                      <div class="text-sm font-medium">${MUSCLE_NAMES[ru.muscle]}</div>
                      <div class="text-xs">
                        <span class="text-gray-500">${ru.from}</span>
                        <span class="text-gray-600 mx-1">→</span>
                        <span style="color: ${toColors.fill}" class="font-medium">${ru.to}</span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Boton continuar -->
        <div class="p-4">
          <button
            onclick="window.hideSessionSummary && window.hideSessionSummary()"
            class="w-full py-3 bg-accent text-white rounded-xl font-semibold active:scale-95 transition-transform"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Muestra el popup de resumen de sesion
 */
export function showSessionSummary(summary: SessionXPSummary): Promise<void> {
  return new Promise((resolve) => {
    const existing = document.getElementById('session-summary-modal');
    if (existing) {
      existing.remove();
    }

    const modal = document.createElement('div');
    modal.innerHTML = renderSessionSummary(summary);
    document.body.appendChild(modal.firstElementChild as Node);

    // Guardar resolve para cuando se cierre
    (window as any)._sessionSummaryResolve = resolve;
  });
}

/**
 * Oculta el popup de resumen
 */
export function hideSessionSummary(): void {
  const modal = document.getElementById('session-summary-modal');
  if (modal) {
    modal.classList.add('animate-fade-out');
    setTimeout(() => {
      modal.remove();
      // Resolver la promesa
      if ((window as any)._sessionSummaryResolve) {
        (window as any)._sessionSummaryResolve();
        delete (window as any)._sessionSummaryResolve;
      }
    }, 200);
  }
}

// Exponer globalmente
if (typeof window !== 'undefined') {
  (window as any).hideSessionSummary = hideSessionSummary;
}

/**
 * Renderiza un mensaje de level up para el coach
 */
export function renderLevelUpMessage(_oldLevel: number, newLevel: number, titleInfo: { full: string; color: string }): string {
  return `
    <div class="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 rounded-xl border border-yellow-500/30">
      <div class="w-12 h-12">
        ${renderLevelBadge(newLevel, 48)}
      </div>
      <div>
        <div class="font-bold text-yellow-400">¡Subiste a Nivel ${newLevel}!</div>
        <div class="text-sm" style="color: ${titleInfo.color}">${titleInfo.full}</div>
      </div>
    </div>
  `;
}

/**
 * Renderiza un mensaje de rank up para el coach
 */
export function renderRankUpMessage(
  muscle: GamificationMuscleGroup,
  from: string,
  to: string
): string {
  const toColors = RANK_COLORS[to as keyof typeof RANK_COLORS];

  return `
    <div class="flex items-center gap-3 p-3 bg-dark-surface rounded-xl border border-dark-border">
      <div class="w-10 h-10">
        ${renderRankEmblem(to as any, 40)}
      </div>
      <div>
        <div class="font-medium">¡${MUSCLE_NAMES[muscle]} subió a ${to}!</div>
        <div class="text-xs text-gray-500">${from} → <span style="color: ${toColors.fill}">${to}</span></div>
      </div>
    </div>
  `;
}
