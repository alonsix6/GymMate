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

  // Obtener datos para el mensaje dinámico
  const { hasDraft } = checkForExistingDraft();
  const stats = getQuickHomeStats();

  let message = '';
  let subtitle = '';

  if (hasDraft) {
    message = 'Tienes un entrenamiento en progreso';
    subtitle = 'Continúa donde lo dejaste';
  } else if (stats.streak > 0) {
    message = `Racha de ${stats.streak} día${stats.streak > 1 ? 's' : ''}`;
    subtitle = 'Sigue así, estás haciendo un gran trabajo';
  } else if (stats.daysSinceLastWorkout > 7) {
    message = 'Te echamos de menos';
    subtitle = 'Han pasado ' + stats.daysSinceLastWorkout + ' días desde tu último entreno';
  } else if (stats.totalWorkouts === 0) {
    message = 'Bienvenido a GymMate';
    subtitle = 'Tu compañero de entrenamiento personal';
  } else {
    const greetings = [
      'Listo para entrenar?',
      'Un día más, un paso más cerca',
      'La consistencia es la clave',
      'Cada repetición cuenta',
    ];
    message = greetings[Math.floor(Math.random() * greetings.length)];
    subtitle = 'Selecciona una rutina para comenzar';
  }

  heroContent.innerHTML = `
    <div class="flex items-center gap-3 mb-2">
      ${icon('workout', 'xl', 'text-accent')}
      <h1 class="text-2xl font-display font-bold text-text-primary">${message}</h1>
    </div>
    <p class="text-text-secondary">${subtitle}</p>
  `;

  refreshIcons();
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

  // FAB button
  const fabButton = document.getElementById('fabButton');
  fabButton?.addEventListener('click', () => {
    switchTab('workoutBuilder');
  });
}
