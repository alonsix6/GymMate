import type { TabName } from '@/types';
import { hasUnsavedData, checkForExistingDraft, restoreFromDraft } from '@/state/session';
import { loadHistory, loadPRs } from '@/features/history';
import { initializeCharts } from '@/features/charts';
import { initializeCalculators } from '@/features/calculators';
import { loadProfile } from '@/features/profile';
import { refreshIcons, icon } from '@/utils/icons';

// ==========================================
// NAVEGACIÓN ENTRE TABS
// ==========================================

export function switchTab(tabName: TabName): void {
  // Ocultar home view
  const homeView = document.getElementById('homeView');
  if (homeView) {
    homeView.classList.add('hidden');
  }

  // Ocultar todas las vistas de cardio
  hideCardioViews();

  // Ocultar todos los tabs
  document.querySelectorAll('.tab-content').forEach((tab) => {
    tab.classList.add('hidden');
    tab.classList.remove('active');
  });

  // Mostrar el tab seleccionado
  const selectedTab = document.getElementById(tabName + 'Tab');
  if (selectedTab) {
    selectedTab.classList.remove('hidden');
    selectedTab.classList.add('active');
  }

  // Scroll al inicio
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Actualizar navegación inferior
  updateBottomNav(tabName);

  // Cargar datos específicos del tab
  loadTabData(tabName);

  // Refrescar iconos
  refreshIcons();
}

export function showHome(): void {
  // Verificar cambios sin guardar
  if (hasUnsavedData()) {
    if (!confirm('Tienes cambios sin guardar. ¿Volver al inicio de todas formas?')) {
      return;
    }
  }

  // Ocultar todos los tabs
  document.querySelectorAll('.tab-content').forEach((tab) => {
    tab.classList.add('hidden');
    tab.classList.remove('active');
  });

  // Ocultar vistas de cardio
  hideCardioViews();

  // Mostrar home view
  const homeView = document.getElementById('homeView');
  if (homeView) {
    homeView.classList.remove('hidden');
  }

  // Actualizar navegación
  updateBottomNav('home');

  // Scroll al inicio
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Actualizar UI del home
  updateHomeUI();

  // Refrescar iconos
  refreshIcons();
}

function hideCardioViews(): void {
  const cardioViews = [
    'cardioSelectorView',
    'cardioConfigView',
    'cardioTimerView',
    'cardioSummaryView',
  ];

  cardioViews.forEach((id) => {
    const view = document.getElementById(id);
    if (view) {
      view.classList.add('hidden');
    }
  });
}

function updateBottomNav(activeTab: TabName | 'home'): void {
  document.querySelectorAll('[data-nav]').forEach((item) => {
    item.classList.remove('active');
    const navType = (item as HTMLElement).dataset.nav;
    if (navType === activeTab) {
      item.classList.add('active');
    }
  });
}

function loadTabData(tabName: TabName): void {
  switch (tabName) {
    case 'history':
      loadHistory();
      break;
    case 'prs':
      loadPRs();
      break;
    case 'charts':
      initializeCharts();
      break;
    case 'calculators':
      initializeCalculators();
      break;
    case 'profile':
      loadProfile();
      break;
  }
}

// ==========================================
// UI DEL HOME
// ==========================================

function updateHomeUI(): void {
  updateHeroSection();
  updateResumeWorkoutCard();
}

function updateHeroSection(): void {
  const heroContent = document.getElementById('heroContent');
  if (!heroContent) return;

  // Get comprehensive stats
  const { hasDraft } = checkForExistingDraft();
  const stats = getQuickHomeStats();
  const recentPR = getRecentPR();
  const weeklyVolume = getWeeklyVolume();

  // Time-based greeting with emoji
  const hour = new Date().getHours();
  let greeting = 'Hola';
  let timeEmoji = '';
  if (hour < 12) {
    greeting = 'Buenos dias';
    timeEmoji = '☀️';
  } else if (hour < 18) {
    greeting = 'Buenas tardes';
    timeEmoji = '🌤️';
  } else {
    greeting = 'Buenas noches';
    timeEmoji = '🌙';
  }

  // Motivational message based on context - more energetic!
  let motivationalMsg = '';
  let heroGradient = 'from-blue-600/20 via-purple-600/20 to-pink-600/20';
  let accentGradient = 'from-blue-500 to-purple-500';
  let statusIcon = 'zap';

  if (hasDraft) {
    motivationalMsg = '💪 Tienes un entrenamiento pendiente!';
    heroGradient = 'from-orange-600/30 via-amber-600/20 to-yellow-600/20';
    accentGradient = 'from-orange-500 to-amber-500';
    statusIcon = 'play-circle';
  } else if (stats.streak >= 5) {
    motivationalMsg = `🔥 ${stats.streak} dias de racha! IMPARABLE!`;
    heroGradient = 'from-orange-600/30 via-red-600/20 to-pink-600/20';
    accentGradient = 'from-orange-500 to-red-500';
    statusIcon = 'flame';
  } else if (stats.streak >= 3) {
    motivationalMsg = `⚡ Racha de ${stats.streak} dias! Sigue asi!`;
    heroGradient = 'from-green-600/30 via-emerald-600/20 to-teal-600/20';
    accentGradient = 'from-green-500 to-emerald-500';
    statusIcon = 'trending-up';
  } else if (stats.daysSinceLastWorkout > 7) {
    motivationalMsg = '🎯 Es momento de volver! Tu puedes!';
    heroGradient = 'from-purple-600/30 via-indigo-600/20 to-blue-600/20';
    accentGradient = 'from-purple-500 to-indigo-500';
    statusIcon = 'target';
  } else if (stats.totalWorkouts === 0) {
    motivationalMsg = '🚀 Comienza tu transformacion hoy!';
    heroGradient = 'from-cyan-600/30 via-blue-600/20 to-indigo-600/20';
    accentGradient = 'from-cyan-500 to-blue-500';
    statusIcon = 'rocket';
  } else if (stats.daysSinceLastWorkout <= 1) {
    motivationalMsg = '💥 Estas en fuego! No pares!';
    heroGradient = 'from-emerald-600/30 via-green-600/20 to-teal-600/20';
    accentGradient = 'from-emerald-500 to-green-500';
    statusIcon = 'zap';
  } else {
    motivationalMsg = '💪 Vamos a entrenar!';
    heroGradient = 'from-blue-600/30 via-indigo-600/20 to-purple-600/20';
    accentGradient = 'from-blue-500 to-indigo-500';
    statusIcon = 'dumbbell';
  }

  // Build stats display - more vibrant
  const statsHtml = stats.totalWorkouts > 0 ? `
    <div class="grid grid-cols-3 gap-3 mt-5">
      <div class="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-3 text-center">
        <p class="text-3xl font-bold text-blue-400">${stats.totalWorkouts}</p>
        <p class="text-xs text-blue-300/80 font-medium">Entrenos</p>
      </div>
      <div class="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-3 text-center">
        <p class="text-3xl font-bold text-orange-400">${stats.streak}</p>
        <p class="text-xs text-orange-300/80 font-medium">🔥 Racha</p>
      </div>
      <div class="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-xl p-3 text-center">
        <p class="text-3xl font-bold text-emerald-400">${formatVolume(weeklyVolume)}</p>
        <p class="text-xs text-emerald-300/80 font-medium">Kg/Semana</p>
      </div>
    </div>
  ` : `
    <div class="mt-5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
      <p class="text-cyan-400 font-medium">✨ Comienza tu primer entrenamiento</p>
      <p class="text-sm text-cyan-300/60 mt-1">Elige una rutina abajo para empezar</p>
    </div>
  `;

  // Recent PR display - celebratory!
  const prHtml = recentPR ? `
    <div class="mt-4 bg-gradient-to-r from-yellow-500/20 via-amber-500/15 to-orange-500/20 border border-yellow-500/40 rounded-xl p-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/30">
          <i data-lucide="trophy" class="w-6 h-6 text-white"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-yellow-400 font-bold uppercase tracking-wide">🏆 PR Reciente!</p>
          <p class="text-base text-white font-bold truncate">${recentPR.exercise}</p>
          <p class="text-sm text-yellow-300/80 font-semibold">${recentPR.weight}kg x ${recentPR.reps} reps</p>
        </div>
      </div>
    </div>
  ` : '';

  heroContent.innerHTML = `
    <div class="bg-gradient-to-br ${heroGradient} border border-white/10 rounded-2xl p-5 relative overflow-hidden shadow-xl">
      <!-- Animated decorative elements -->
      <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${accentGradient} rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br ${accentGradient} rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

      <!-- Header -->
      <div class="relative">
        <div class="flex items-center justify-between mb-2">
          <p class="text-base text-white/80">${timeEmoji} ${greeting}</p>
          <div class="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full">
            <i data-lucide="${statusIcon}" class="w-4 h-4 text-white/80"></i>
          </div>
        </div>
        <h1 class="text-3xl font-display font-bold text-white mb-3">GymMate</h1>

        <!-- Motivational banner -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
          <p class="text-base font-semibold text-white">${motivationalMsg}</p>
        </div>

        ${statsHtml}
        ${prHtml}
      </div>
    </div>
  `;

  refreshIcons();
}

function getRecentPR(): { exercise: string; weight: number; reps: number } | null {
  try {
    const prs = JSON.parse(localStorage.getItem('gymmate_prs') || '{}');
    const entries = Object.entries(prs);

    if (entries.length === 0) return null;

    // Get the most recent PR by date
    type PREntry = { exercise: string; weight: number; reps: number; date: string };
    let mostRecent: PREntry | null = null;

    for (const [exercise, data] of entries) {
      const prData = data as { peso: number; reps: number; date: string };
      const current: PREntry = {
        exercise,
        weight: prData.peso,
        reps: prData.reps,
        date: prData.date,
      };

      if (!mostRecent || new Date(current.date) > new Date(mostRecent.date)) {
        mostRecent = current;
      }
    }

    // Only show if PR is from last 30 days
    if (mostRecent) {
      const daysSincePR = Math.floor(
        (new Date().getTime() - new Date(mostRecent.date).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSincePR <= 30) {
        return { exercise: mostRecent.exercise, weight: mostRecent.weight, reps: mostRecent.reps };
      }
    }
  } catch (e) {
    console.error('Error getting recent PR:', e);
  }

  return null;
}

function getWeeklyVolume(): number {
  const history = JSON.parse(localStorage.getItem('gymmate_history') || '[]');
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return history
    .filter((s: any) => s.type !== 'cardio' && new Date(s.savedAt || s.date) >= oneWeekAgo)
    .reduce((sum: number, s: any) => sum + (s.volumenTotal || 0), 0);
}

function formatVolume(vol: number): string {
  if (vol >= 1000) {
    return (vol / 1000).toFixed(1) + 'k';
  }
  return vol.toString();
}

function updateResumeWorkoutCard(): void {
  const resumeCard = document.getElementById('resumeWorkoutCard');
  if (!resumeCard) return;

  const { hasDraft, draft, isStale } = checkForExistingDraft();

  if (!hasDraft || !draft) {
    resumeCard.classList.add('hidden');
    return;
  }

  if (isStale) {
    resumeCard.classList.add('hidden');
    return;
  }

  const draftDate = new Date(draft.draftSavedAt).toLocaleString('es-ES', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  resumeCard.innerHTML = `
    <div class="bg-dark-surface border border-accent/30 rounded-xl p-4 mb-4">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-2">
          ${icon('clock', 'md', 'text-accent')}
          <span class="text-sm font-semibold text-accent">Entrenamiento en progreso</span>
        </div>
        <button onclick="window.dismissDraft()" class="text-text-muted hover:text-text-secondary">
          ${icon('close', 'sm')}
        </button>
      </div>
      <h3 class="font-bold text-text-primary mb-1">${draft.grupo}</h3>
      <p class="text-xs text-text-muted mb-3">Guardado: ${draftDate}</p>
      <div class="flex gap-2">
        <button
          onclick="window.resumeDraft()"
          class="flex-1 bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-4 rounded-lg
                 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          ${icon('play', 'sm')}
          Continuar
        </button>
        <button
          onclick="window.dismissDraft()"
          class="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-text-secondary
                 hover:text-text-primary active:scale-95 transition-all"
        >
          Descartar
        </button>
      </div>
    </div>
  `;

  resumeCard.classList.remove('hidden');
  refreshIcons();
}

function getQuickHomeStats(): {
  totalWorkouts: number;
  streak: number;
  daysSinceLastWorkout: number;
} {
  const history = JSON.parse(localStorage.getItem('gymmate_history') || '[]');
  const weightSessions = history.filter((s: any) => s.type !== 'cardio');

  let streak = 0;
  let daysSinceLastWorkout = 0;

  if (weightSessions.length > 0) {
    const lastWorkout = new Date(weightSessions[0].savedAt || weightSessions[0].date);
    const today = new Date();
    daysSinceLastWorkout = Math.floor(
      (today.getTime() - lastWorkout.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calcular racha
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateString = checkDate.toISOString().split('T')[0];

      const hasWorkout = weightSessions.some((s: any) => {
        const sessionDate = new Date(s.savedAt || s.date).toISOString().split('T')[0];
        return sessionDate === dateString;
      });

      if (hasWorkout) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
  }

  return {
    totalWorkouts: weightSessions.length,
    streak,
    daysSinceLastWorkout,
  };
}

// ==========================================
// DRAFT MANAGEMENT
// ==========================================

export function resumeDraft(): void {
  const { draft } = checkForExistingDraft();
  if (draft) {
    restoreFromDraft(draft);
    switchTab('workout');
    // Renderizar el workout con los datos del draft
    // Esto se manejará en el módulo de workout
  }
}

export function dismissDraft(): void {
  if (confirm('¿Descartar el entrenamiento guardado?')) {
    localStorage.removeItem('gymmate_draft');
    updateResumeWorkoutCard();
  }
}

// ==========================================
// INICIALIZAR NAVEGACIÓN
// ==========================================

export function initializeNavigation(): void {
  // Navegación inferior
  document.querySelectorAll('[data-nav]').forEach((item) => {
    item.addEventListener('click', function (this: HTMLElement) {
      const navType = this.dataset.nav as TabName | 'home';
      if (navType === 'home') {
        showHome();
      } else {
        switchTab(navType as TabName);
      }
    });
  });

  // Rutinas clicables
  document.querySelectorAll('[data-grupo]').forEach((card) => {
    card.addEventListener('click', function (this: HTMLElement) {
      const grupo = this.dataset.grupo;
      if (grupo) {
        // Import dinámico para evitar dependencia circular
        import('@/features/workout').then(({ loadTrainingGroup }) => {
          loadTrainingGroup(grupo);
          switchTab('workout');
        });
      }
    });
  });

  // Quick actions
  document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', function (this: HTMLElement) {
      const action = this.dataset.action as TabName;
      switchTab(action);
    });
  });

  // FAB button - open workout builder to create custom routine
  const fabButton = document.getElementById('fabButton');
  fabButton?.addEventListener('click', () => {
    // Use window to access the function from main.ts
    if (typeof (window as any).openWorkoutBuilder === 'function') {
      (window as any).openWorkoutBuilder();
    }
  });
}
