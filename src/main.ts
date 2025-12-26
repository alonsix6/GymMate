import './styles/main.css';
import { initializeIcons, refreshIcons } from '@/utils/icons';
import { initializeNavigation, showHome, switchTab, resumeDraft, dismissDraft } from '@/ui/navigation';
import { initializeModals, showAnimation, closeAnimationModal } from '@/ui/modals';
import { initializeTimerListeners, openRestTimerModal } from '@/features/timer';
import { initializeProfile } from '@/features/profile';
import { loadHistory, loadPRs, exportToExcel, deleteHistoryItem } from '@/features/history';
import {
  loadTrainingGroup,
  updateEjercicio,
  incrementInput,
  decrementInput,
  toggleCompletado,
  saveWorkout,
  finishWorkout,
} from '@/features/workout';
import {
  showCardioSelector,
  selectCardioMode,
  showCardioConfig,
  adjustCardioConfig,
  setCardioExercise,
  startCardioWorkout,
  toggleCardioPause,
  stopCardioWorkout,
} from '@/features/cardio';
import { trainingGroups } from '@/data/training-groups';
import { getCustomWorkouts, deleteCustomWorkout } from '@/utils/storage';
import { icon } from '@/utils/icons';

// ==========================================
// EXPONER FUNCIONES AL WINDOW (para onclick)
// ==========================================

declare global {
  interface Window {
    // Navigation
    showHome: typeof showHome;
    switchTab: typeof switchTab;
    resumeDraft: typeof resumeDraft;
    dismissDraft: typeof dismissDraft;

    // Workout
    loadTrainingGroup: typeof loadTrainingGroup;
    updateEjercicio: typeof updateEjercicio;
    incrementInput: typeof incrementInput;
    decrementInput: typeof decrementInput;
    toggleCompletado: typeof toggleCompletado;
    saveWorkout: typeof saveWorkout;
    finishWorkout: typeof finishWorkout;

    // Modals
    showAnimation: typeof showAnimation;
    closeAnimationModal: typeof closeAnimationModal;

    // Timer
    openRestTimerModal: typeof openRestTimerModal;

    // History
    deleteHistoryItem: typeof deleteHistoryItem;
    exportToExcel: typeof exportToExcel;

    // Custom Workouts
    deleteCustomWorkout: typeof deleteCustomWorkout;

    // Cardio
    showCardioSelector: typeof showCardioSelector;
    selectCardioMode: typeof selectCardioMode;
    showCardioConfig: typeof showCardioConfig;
    adjustCardioConfig: typeof adjustCardioConfig;
    setCardioExercise: typeof setCardioExercise;
    startCardioWorkout: typeof startCardioWorkout;
    toggleCardioPause: typeof toggleCardioPause;
    stopCardioWorkout: typeof stopCardioWorkout;
  }
}

window.showHome = showHome;
window.switchTab = switchTab;
window.resumeDraft = resumeDraft;
window.dismissDraft = dismissDraft;
window.loadTrainingGroup = loadTrainingGroup;
window.updateEjercicio = updateEjercicio;
window.incrementInput = incrementInput;
window.decrementInput = decrementInput;
window.toggleCompletado = toggleCompletado;
window.saveWorkout = saveWorkout;
window.finishWorkout = finishWorkout;
window.showAnimation = showAnimation;
window.closeAnimationModal = closeAnimationModal;
window.openRestTimerModal = openRestTimerModal;
window.deleteHistoryItem = deleteHistoryItem;
window.exportToExcel = exportToExcel;
window.deleteCustomWorkout = deleteCustomWorkout;
window.showCardioSelector = showCardioSelector;
window.selectCardioMode = selectCardioMode;
window.showCardioConfig = showCardioConfig;
window.adjustCardioConfig = adjustCardioConfig;
window.setCardioExercise = setCardioExercise;
window.startCardioWorkout = startCardioWorkout;
window.toggleCardioPause = toggleCardioPause;
window.stopCardioWorkout = stopCardioWorkout;

// ==========================================
// RENDERIZAR RUTINAS EN HOME
// ==========================================

function renderRoutinesInHome(): void {
  const container = document.getElementById('routinesContainer');
  if (!container) return;

  const groupColors: Record<string, string> = {
    grupo1: 'border-l-blue-500',
    grupo2: 'border-l-green-500',
    grupo3: 'border-l-purple-500',
    grupo4: 'border-l-orange-500',
    grupo5: 'border-l-pink-500',
  };

  let html = '';

  // Rutinas predefinidas
  Object.entries(trainingGroups).forEach(([id, group]) => {
    html += `
      <div
        data-grupo="${id}"
        class="bg-dark-surface border border-dark-border ${groupColors[id]} border-l-4 rounded-xl p-4
               cursor-pointer active:scale-[0.98] transition-transform"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-dark-bg flex items-center justify-center">
            ${icon('workout', 'lg', 'text-accent')}
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-text-primary text-sm">${group.nombre}</h3>
            <p class="text-xs text-text-secondary">${group.ejercicios.length} ejercicios principales</p>
          </div>
          ${icon('chevronRight', 'md', 'text-text-muted')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Re-attach event listeners
  container.querySelectorAll('[data-grupo]').forEach((card) => {
    card.addEventListener('click', function (this: HTMLElement) {
      const grupo = this.dataset.grupo;
      if (grupo) {
        loadTrainingGroup(grupo);
        switchTab('workout');
      }
    });
  });

  refreshIcons();
}

// ==========================================
// RENDERIZAR RUTINAS PERSONALIZADAS
// ==========================================

function renderCustomWorkoutsInHome(): void {
  const container = document.getElementById('customWorkoutsContainer');
  if (!container) return;

  const customWorkouts = getCustomWorkouts();

  if (customWorkouts.length === 0) {
    container.innerHTML = '';
    return;
  }

  let html = `
    <div class="mt-6">
      <h2 class="text-lg font-display font-bold text-text-primary mb-3 flex items-center gap-2">
        ${icon('bookmark', 'md', 'text-accent')}
        Mis Rutinas
      </h2>
      <div class="space-y-3">
  `;

  customWorkouts.forEach((workout) => {
    html += `
      <div
        data-custom-workout="${workout.id}"
        class="bg-dark-surface border border-accent/30 border-l-4 border-l-accent rounded-xl p-4
               cursor-pointer active:scale-[0.98] transition-transform"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              ${icon('workout', 'lg', 'text-accent')}
            </div>
            <div>
              <h3 class="font-bold text-text-primary text-sm">${workout.nombre}</h3>
              <p class="text-xs text-text-secondary">${workout.ejercicios.length} ejercicios</p>
            </div>
          </div>
          <button
            onclick="event.stopPropagation(); deleteCustomWorkout('${workout.id}')"
            class="p-2 text-status-error hover:text-status-error/80 rounded-lg hover:bg-white/5"
          >
            ${icon('delete', 'md')}
          </button>
        </div>
      </div>
    `;
  });

  html += '</div></div>';
  container.innerHTML = html;

  refreshIcons();
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

function init(): void {
  console.log('GymMate v3.0 - Initializing...');

  // Inicializar iconos Lucide
  initializeIcons();

  // Inicializar navegación
  initializeNavigation();

  // Inicializar modales
  initializeModals();

  // Inicializar timer
  initializeTimerListeners();

  // Inicializar perfil
  initializeProfile();

  // Renderizar rutinas en home
  renderRoutinesInHome();
  renderCustomWorkoutsInHome();

  // Cargar historial y PRs
  loadHistory();
  loadPRs();

  // Mostrar home por defecto
  showHome();

  // Refrescar iconos después de renderizar
  setTimeout(refreshIcons, 100);

  console.log('GymMate v3.0 - Ready!');
  console.log('- Modern UI without gradients');
  console.log('- Lucide icons');
  console.log('- TypeScript modules');
  console.log('- PWA ready');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.log('SW registration failed:', error);
    });
  });
}
