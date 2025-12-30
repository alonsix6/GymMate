import type { CardioMode, CardioConfig, CardioSessionStats } from '@/types';
import { cardioState, resetCardioState } from '@/state/session';
import { getCardioExerciseNames } from '@/data/cardio-exercises';
import { addToHistory } from '@/utils/storage';
import { icon, refreshIcons } from '@/utils/icons';

// ==========================================
// ESTADO DEL TIMER
// ==========================================

let timerInterval: ReturnType<typeof setInterval> | null = null;
let audioContext: AudioContext | null = null;

// ==========================================
// CONFIGURACIONES POR DEFECTO
// ==========================================

const DEFAULT_CONFIGS: Record<CardioMode, CardioConfig> = {
  tabata: { rounds: 8, work: 20, rest: 10 },
  emom: { rounds: 10, interval: 60 },
  amrap: { duration: 600, exercises: [] }, // 10 minutes
  circuit: { rounds: 3, work: 40, rest: 20, roundRest: 60, exercises: [] },
  pyramid: { levels: [20, 30, 40, 30, 20], rest: 10 },
  custom: { rounds: 5, work: 30, rest: 15 },
  fortime: { exercises: [], reps: 10 },
};

// ==========================================
// MOSTRAR SELECTOR DE CARDIO
// ==========================================

export function showCardioSelector(): void {
  // Ocultar home view y todos los tabs
  const homeView = document.getElementById('homeView');
  if (homeView) homeView.classList.add('hidden');

  document.querySelectorAll('.tab-content').forEach((tab) => {
    tab.classList.add('hidden');
    tab.classList.remove('active');
  });

  hideAllCardioViews();

  const selectorView = document.getElementById('cardioSelectorView');
  if (!selectorView) return;

  selectorView.classList.remove('hidden');
  selectorView.innerHTML = `
    <!-- Navigation Bar -->
    <div class="flex items-center gap-3 mb-6">
      <button onclick="window.showHome()" class="w-11 h-11 flex items-center justify-center bg-dark-surface border border-dark-border rounded-xl active:scale-95 transition-transform">
        <i data-lucide="arrow-left" class="w-5 h-5 text-text-primary"></i>
      </button>
      <h2 class="text-xl font-display font-bold text-text-primary flex items-center gap-2">
        ${icon('fire', 'lg', 'text-orange-400')}
        Cardio & HIIT
      </h2>
    </div>

    <p class="text-text-secondary text-sm mb-4">Selecciona un modo de entrenamiento</p>

    <div class="space-y-3">
      ${renderModeCard('tabata', 'Tabata', '20s trabajo / 10s descanso × 8 rondas', 'zap')}
      ${renderModeCard('emom', 'EMOM', 'Every Minute On the Minute', 'clock')}
      ${renderModeCard('amrap', 'AMRAP', 'As Many Reps As Possible', 'trending')}
      ${renderModeCard('circuit', 'Circuito', 'Ejercicios en secuencia con descansos', 'activity')}
      ${renderModeCard('pyramid', 'Pirámide', 'Intervalos ascendentes y descendentes', 'triangle')}
      ${renderModeCard('custom', 'Personalizado', 'Configura tu propio intervalo', 'settings')}
    </div>
  `;

  refreshIcons();
}

function renderModeCard(mode: CardioMode, title: string, description: string, iconName: string): string {
  return `
    <button
      onclick="window.selectCardioMode('${mode}')"
      class="w-full bg-gradient-to-br from-orange-500/15 to-red-600/10 border border-orange-500/30 rounded-xl p-4 flex items-center gap-4
             active:scale-[0.98] transition-all hover:border-orange-400/50 text-left"
    >
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
        ${icon(iconName, 'lg', 'text-white')}
      </div>
      <div class="flex-1">
        <h3 class="font-bold text-white">${title}</h3>
        <p class="text-sm text-orange-200/70">${description}</p>
      </div>
      ${icon('chevronRight', 'md', 'text-orange-300')}
    </button>
  `;
}

// ==========================================
// SELECCIONAR MODO
// ==========================================

export function selectCardioMode(mode: CardioMode): void {
  cardioState.mode = mode;
  cardioState.config = { ...DEFAULT_CONFIGS[mode] };

  showCardioConfig();
}

// ==========================================
// MOSTRAR CONFIGURACIÓN
// ==========================================

export function showCardioConfig(): void {
  hideAllCardioViews();

  const configView = document.getElementById('cardioConfigView');
  if (!configView || !cardioState.mode) return;

  configView.classList.remove('hidden');

  const mode = cardioState.mode;
  const config = cardioState.config;

  let configHTML = '';

  switch (mode) {
    case 'tabata':
      configHTML = `
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-text-secondary mb-2">Rondas</label>
            <div class="flex items-center gap-3">
              <button onclick="window.adjustCardioConfig('rounds', -1)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('minus', 'md')}
              </button>
              <span id="configRounds" class="text-2xl font-bold text-accent w-16 text-center">${config.rounds}</span>
              <button onclick="window.adjustCardioConfig('rounds', 1)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('plus', 'md')}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-2">Trabajo (segundos)</label>
            <div class="flex items-center gap-3">
              <button onclick="window.adjustCardioConfig('work', -5)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('minus', 'md')}
              </button>
              <span id="configWork" class="text-2xl font-bold text-status-success w-16 text-center">${config.work}</span>
              <button onclick="window.adjustCardioConfig('work', 5)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('plus', 'md')}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-2">Descanso (segundos)</label>
            <div class="flex items-center gap-3">
              <button onclick="window.adjustCardioConfig('rest', -5)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('minus', 'md')}
              </button>
              <span id="configRest" class="text-2xl font-bold text-status-error w-16 text-center">${config.rest}</span>
              <button onclick="window.adjustCardioConfig('rest', 5)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('plus', 'md')}
              </button>
            </div>
          </div>
        </div>
      `;
      break;

    case 'emom':
      configHTML = `
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-text-secondary mb-2">Minutos totales</label>
            <div class="flex items-center gap-3">
              <button onclick="window.adjustCardioConfig('rounds', -1)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('minus', 'md')}
              </button>
              <span id="configRounds" class="text-2xl font-bold text-accent w-16 text-center">${config.rounds}</span>
              <button onclick="window.adjustCardioConfig('rounds', 1)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('plus', 'md')}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-2">Ejercicio</label>
            <select id="emomExercise" onchange="window.setCardioExercise(this.value)" class="w-full">
              <option value="">-- Selecciona ejercicio --</option>
              ${getCardioExerciseNames().map(name => `<option value="${name}">${name}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-2">Repeticiones por minuto</label>
            <div class="flex items-center gap-3">
              <button onclick="window.adjustCardioConfig('reps', -1)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('minus', 'md')}
              </button>
              <span id="configReps" class="text-2xl font-bold text-status-warning w-16 text-center">${config.reps || 10}</span>
              <button onclick="window.adjustCardioConfig('reps', 1)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('plus', 'md')}
              </button>
            </div>
          </div>
        </div>
      `;
      break;

    case 'amrap':
      configHTML = `
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-text-secondary mb-2">Duración (minutos)</label>
            <div class="flex items-center gap-3">
              <button onclick="window.adjustCardioConfig('duration', -60)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('minus', 'md')}
              </button>
              <span id="configDuration" class="text-2xl font-bold text-accent w-16 text-center">${(config.duration || 600) / 60}</span>
              <button onclick="window.adjustCardioConfig('duration', 60)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('plus', 'md')}
              </button>
            </div>
          </div>
          <p class="text-sm text-text-muted">Completa tantas rondas como puedas en el tiempo límite.</p>
        </div>
      `;
      break;

    case 'pyramid':
      const levels = config.levels || [20, 30, 40, 30, 20];
      const totalWorkTime = levels.reduce((a, b) => a + b, 0);
      const totalRestTime = (levels.length - 1) * (config.rest || 10);
      configHTML = `
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-text-secondary mb-2">Estructura de pirámide</label>
            <div class="bg-dark-bg border border-dark-border rounded-lg p-3 mb-3">
              <!-- Visual pyramid -->
              <div id="pyramidLevels" class="flex items-end justify-center gap-1 mb-4 h-16">
                ${levels.map((l) => {
                  const maxLevel = Math.max(...levels);
                  const height = Math.round((l / maxLevel) * 100);
                  return `
                    <div class="flex flex-col items-center">
                      <span class="text-xs text-status-warning font-bold mb-1">${l}s</span>
                      <div class="w-8 bg-gradient-to-t from-orange-600 to-yellow-500 rounded-t" style="height: ${height}%"></div>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Presets -->
              <div class="grid grid-cols-3 gap-2 mb-3">
                <button onclick="window.adjustPyramidLevel('corta')" class="p-2 bg-dark-surface border border-dark-border rounded-lg text-xs hover:border-orange-500/50 transition-colors">
                  Corta
                </button>
                <button onclick="window.adjustPyramidLevel('media')" class="p-2 bg-dark-surface border border-dark-border rounded-lg text-xs hover:border-orange-500/50 transition-colors">
                  Media
                </button>
                <button onclick="window.adjustPyramidLevel('larga')" class="p-2 bg-dark-surface border border-dark-border rounded-lg text-xs hover:border-orange-500/50 transition-colors">
                  Larga
                </button>
                <button onclick="window.adjustPyramidLevel('intensa')" class="p-2 bg-dark-surface border border-dark-border rounded-lg text-xs hover:border-orange-500/50 transition-colors">
                  Intensa
                </button>
                <button onclick="window.adjustPyramidLevel('extendida')" class="p-2 bg-dark-surface border border-dark-border rounded-lg text-xs hover:border-orange-500/50 transition-colors">
                  Extendida
                </button>
                <button onclick="window.adjustPyramidLevel('reset')" class="p-2 bg-dark-surface border border-dark-border rounded-lg text-xs hover:border-orange-500/50 transition-colors">
                  Reset
                </button>
              </div>

              <!-- Scale buttons -->
              <div class="flex gap-2">
                <button onclick="window.adjustPyramidLevel('scale_down')" class="flex-1 p-2 bg-dark-surface border border-dark-border rounded-lg text-sm active:scale-95 transition-transform">
                  ${icon('minus', 'sm')} Reducir
                </button>
                <button onclick="window.adjustPyramidLevel('scale_up')" class="flex-1 p-2 bg-dark-surface border border-dark-border rounded-lg text-sm active:scale-95 transition-transform">
                  ${icon('plus', 'sm')} Aumentar
                </button>
              </div>
            </div>
            <p class="text-xs text-text-muted">Tiempo trabajo: ${Math.floor(totalWorkTime / 60)}:${String(totalWorkTime % 60).padStart(2, '0')} | Total: ${Math.floor((totalWorkTime + totalRestTime) / 60)}:${String((totalWorkTime + totalRestTime) % 60).padStart(2, '0')}</p>
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-2">Descanso entre niveles (segundos)</label>
            <div class="flex items-center gap-3">
              <button onclick="window.adjustCardioConfig('rest', -5)" class="p-2 bg-dark-bg border border-dark-border rounded-lg active:scale-95 transition-transform">
                ${icon('minus', 'md')}
              </button>
              <span id="configRest" class="text-2xl font-bold text-status-error w-16 text-center">${config.rest || 10}</span>
              <button onclick="window.adjustCardioConfig('rest', 5)" class="p-2 bg-dark-bg border border-dark-border rounded-lg active:scale-95 transition-transform">
                ${icon('plus', 'md')}
              </button>
            </div>
          </div>
        </div>
      `;
      break;

    default: // custom, circuit
      configHTML = `
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-text-secondary mb-2">Rondas</label>
            <div class="flex items-center gap-3">
              <button onclick="window.adjustCardioConfig('rounds', -1)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('minus', 'md')}
              </button>
              <span id="configRounds" class="text-2xl font-bold text-accent w-16 text-center">${config.rounds}</span>
              <button onclick="window.adjustCardioConfig('rounds', 1)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('plus', 'md')}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-2">Trabajo (segundos)</label>
            <div class="flex items-center gap-3">
              <button onclick="window.adjustCardioConfig('work', -5)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('minus', 'md')}
              </button>
              <span id="configWork" class="text-2xl font-bold text-status-success w-16 text-center">${config.work || 30}</span>
              <button onclick="window.adjustCardioConfig('work', 5)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('plus', 'md')}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-2">Descanso (segundos)</label>
            <div class="flex items-center gap-3">
              <button onclick="window.adjustCardioConfig('rest', -5)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('minus', 'md')}
              </button>
              <span id="configRest" class="text-2xl font-bold text-status-error w-16 text-center">${config.rest || 15}</span>
              <button onclick="window.adjustCardioConfig('rest', 5)" class="p-2 bg-dark-bg border border-dark-border rounded-lg">
                ${icon('plus', 'md')}
              </button>
            </div>
          </div>
        </div>
      `;
  }

  const modeNames: Record<CardioMode, string> = {
    tabata: 'Tabata',
    emom: 'EMOM',
    amrap: 'AMRAP',
    circuit: 'Circuito',
    pyramid: 'Pirámide',
    custom: 'Personalizado',
    fortime: 'For Time',
  };

  configView.innerHTML = `
    <!-- Navigation Bar -->
    <div class="flex items-center gap-3 mb-6">
      <button onclick="window.showCardioSelector()" class="w-11 h-11 flex items-center justify-center bg-dark-surface border border-dark-border rounded-xl active:scale-95 transition-transform">
        <i data-lucide="arrow-left" class="w-5 h-5 text-text-primary"></i>
      </button>
      <h2 class="text-xl font-display font-bold text-text-primary flex items-center gap-2">
        ${icon('settings', 'lg', 'text-orange-400')}
        Configurar ${modeNames[mode]}
      </h2>
    </div>

    <div class="bg-dark-surface border border-dark-border rounded-xl p-4 mb-6">
      ${configHTML}
    </div>

    <button
      onclick="window.startCardioWorkout()"
      class="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl
             active:scale-95 transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-orange-500/30"
    >
      ${icon('play', 'lg')}
      Comenzar
    </button>
  `;

  refreshIcons();
}

// ==========================================
// AJUSTAR CONFIGURACIÓN
// ==========================================

export function adjustCardioConfig(key: keyof CardioConfig, delta: number): void {
  const config = cardioState.config;
  const current = (config[key] as number) || 0;
  const newValue = Math.max(1, current + delta);

  (config as Record<string, number>)[key] = newValue;

  // Update UI
  const element = document.getElementById(`config${key.charAt(0).toUpperCase() + key.slice(1)}`);
  if (element) {
    if (key === 'duration') {
      element.textContent = String(newValue / 60);
    } else {
      element.textContent = String(newValue);
    }
  }
}

export function setCardioExercise(exercise: string): void {
  cardioState.config.exercise = exercise;
}

// Presets de pirámide disponibles
const PYRAMID_PRESETS: Record<string, number[]> = {
  corta: [10, 20, 30, 20, 10],
  media: [20, 30, 40, 30, 20],
  larga: [30, 45, 60, 45, 30],
  intensa: [20, 40, 60, 40, 20],
  extendida: [15, 30, 45, 60, 45, 30, 15],
};

export function adjustPyramidLevel(action: string): void {
  const currentLevels = cardioState.config.levels || [20, 30, 40, 30, 20];

  if (action === 'scale_up') {
    // Escalar todos los niveles manteniendo la proporción (multiplicar por 1.5, mínimo +5)
    const newLevels = currentLevels.map(l => Math.min(120, Math.max(l + 5, Math.round(l * 1.25))));
    cardioState.config.levels = newLevels;
  } else if (action === 'scale_down') {
    // Reducir manteniendo proporción (dividir por 1.25, mínimo 10 segundos)
    const newLevels = currentLevels.map(l => Math.max(10, Math.round(l * 0.8)));
    cardioState.config.levels = newLevels;
  } else if (PYRAMID_PRESETS[action]) {
    // Aplicar preset
    cardioState.config.levels = [...PYRAMID_PRESETS[action]];
  } else if (action === 'reset') {
    cardioState.config.levels = [20, 30, 40, 30, 20];
  }

  // Re-render config
  showCardioConfig();
}

// ==========================================
// INICIAR WORKOUT
// ==========================================

export function startCardioWorkout(): void {
  hideAllCardioViews();

  const timerView = document.getElementById('cardioTimerView');
  if (!timerView) return;

  timerView.classList.remove('hidden');

  // Initialize state
  cardioState.isPaused = false;
  cardioState.currentRound = 1;
  cardioState.currentPhase = 'work';
  cardioState.totalTimeElapsed = 0;
  cardioState.workTimeTotal = 0;
  cardioState.restTimeTotal = 0;
  cardioState.startTime = Date.now();

  const config = cardioState.config;
  const mode = cardioState.mode;

  // Set initial time based on mode
  if (mode === 'amrap') {
    cardioState.timeRemaining = config.duration || 600;
  } else if (mode === 'emom') {
    cardioState.timeRemaining = config.interval || 60;
    cardioState.currentPhase = 'emom';
  } else if (mode === 'pyramid') {
    const levels = config.levels || [20, 30, 40, 30, 20];
    cardioState.currentExerciseIndex = 0; // Use this to track current level
    cardioState.timeRemaining = levels[0];
  } else {
    cardioState.timeRemaining = config.work || 20;
  }

  renderTimerView();
  startTimer();
}

// ==========================================
// TIMER LOGIC
// ==========================================

function startTimer(): void {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    if (cardioState.isPaused) return;

    cardioState.timeRemaining--;
    cardioState.totalTimeElapsed++;

    // Track work/rest time
    if (cardioState.currentPhase === 'work' || cardioState.currentPhase === 'emom') {
      cardioState.workTimeTotal++;
    } else {
      cardioState.restTimeTotal++;
    }

    updateTimerDisplay();

    // Check if phase ended
    if (cardioState.timeRemaining <= 0) {
      handlePhaseEnd();
    }

    // Play sound at 3, 2, 1
    if (cardioState.timeRemaining <= 3 && cardioState.timeRemaining > 0) {
      playBeep();
    }
  }, 1000);
}

function handlePhaseEnd(): void {
  const config = cardioState.config;
  const mode = cardioState.mode;
  const totalRounds = config.rounds || 8;

  playBeep(true); // Long beep

  if (mode === 'amrap') {
    // AMRAP ended
    finishCardioWorkout();
    return;
  }

  if (mode === 'emom') {
    // EMOM - each minute is a round
    if (cardioState.currentRound >= totalRounds) {
      finishCardioWorkout();
      return;
    }
    cardioState.currentRound++;
    cardioState.timeRemaining = config.interval || 60;
    renderTimerView();
    return;
  }

  if (mode === 'pyramid') {
    const levels = config.levels || [20, 30, 40, 30, 20];
    const currentLevelIndex = cardioState.currentExerciseIndex;

    if (cardioState.currentPhase === 'work') {
      // Switch to rest
      cardioState.currentPhase = 'rest';
      cardioState.timeRemaining = config.rest || 10;
    } else {
      // Rest ended, check if more levels
      const nextLevelIndex = currentLevelIndex + 1;
      if (nextLevelIndex >= levels.length) {
        finishCardioWorkout();
        return;
      }
      cardioState.currentExerciseIndex = nextLevelIndex;
      cardioState.currentRound = nextLevelIndex + 1;
      cardioState.currentPhase = 'work';
      cardioState.timeRemaining = levels[nextLevelIndex];
    }

    renderTimerView();
    return;
  }

  // Tabata/Custom/Circuit - alternate work/rest
  if (cardioState.currentPhase === 'work') {
    // Switch to rest
    cardioState.currentPhase = 'rest';
    cardioState.timeRemaining = config.rest || 10;
  } else {
    // Rest ended, check if more rounds
    if (cardioState.currentRound >= totalRounds) {
      finishCardioWorkout();
      return;
    }
    cardioState.currentRound++;
    cardioState.currentPhase = 'work';
    cardioState.timeRemaining = config.work || 20;
  }

  renderTimerView();
}

function updateTimerDisplay(): void {
  const timerEl = document.getElementById('cardioTimer');
  if (timerEl) {
    const mins = Math.floor(cardioState.timeRemaining / 60);
    const secs = cardioState.timeRemaining % 60;
    timerEl.textContent = `${mins}:${String(secs).padStart(2, '0')}`;
  }

  const totalEl = document.getElementById('cardioTotalTime');
  if (totalEl) {
    const mins = Math.floor(cardioState.totalTimeElapsed / 60);
    const secs = cardioState.totalTimeElapsed % 60;
    totalEl.textContent = `${mins}:${String(secs).padStart(2, '0')}`;
  }
}

function renderTimerView(): void {
  const timerView = document.getElementById('cardioTimerView');
  if (!timerView) return;

  const config = cardioState.config;
  const phase = cardioState.currentPhase;

  const phaseColors: Record<string, string> = {
    work: 'text-status-success',
    rest: 'text-status-error',
    emom: 'text-status-warning',
    roundRest: 'text-status-info',
  };

  const phaseNames: Record<string, string> = {
    work: 'TRABAJO',
    rest: 'DESCANSO',
    emom: 'GO!',
    roundRest: 'DESCANSO LARGO',
  };

  const mins = Math.floor(cardioState.timeRemaining / 60);
  const secs = cardioState.timeRemaining % 60;

  timerView.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-[60vh]">
      <!-- Phase indicator -->
      <div class="mb-4">
        <span class="text-lg font-bold ${phaseColors[phase]}">${phaseNames[phase]}</span>
      </div>

      <!-- Main timer -->
      <div id="cardioTimer" class="text-8xl font-display font-bold ${phaseColors[phase]} mb-4">
        ${mins}:${String(secs).padStart(2, '0')}
      </div>

      <!-- Round counter -->
      <div class="text-text-secondary mb-8">
        ${cardioState.mode === 'pyramid'
          ? `Nivel <span class="text-accent font-bold">${cardioState.currentExerciseIndex + 1}</span> / ${(config.levels || [20, 30, 40, 30, 20]).length}`
          : `Ronda <span class="text-accent font-bold">${cardioState.currentRound}</span> / ${config.rounds || '∞'}`
        }
      </div>

      <!-- Total time -->
      <div class="text-sm text-text-muted mb-8">
        Tiempo total: <span id="cardioTotalTime" class="font-mono">0:00</span>
      </div>

      <!-- Controls -->
      <div class="flex gap-4">
        <button
          onclick="window.toggleCardioPause()"
          class="w-16 h-16 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center
                 active:scale-95 transition-transform"
        >
          ${icon(cardioState.isPaused ? 'play' : 'pause', 'xl', 'text-text-primary')}
        </button>
        <button
          onclick="window.stopCardioWorkout()"
          class="w-16 h-16 rounded-full bg-status-error/20 border border-status-error/30 flex items-center justify-center
                 active:scale-95 transition-transform"
        >
          ${icon('close', 'xl', 'text-status-error')}
        </button>
      </div>
    </div>
  `;

  refreshIcons();
}

// ==========================================
// CONTROLES
// ==========================================

export function toggleCardioPause(): void {
  cardioState.isPaused = !cardioState.isPaused;
  renderTimerView();
}

export function stopCardioWorkout(): void {
  if (confirm('¿Seguro que quieres terminar el entrenamiento?')) {
    finishCardioWorkout();
  }
}

// ==========================================
// FINALIZAR WORKOUT
// ==========================================

function finishCardioWorkout(): void {
  // Stop timer
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // Calculate stats
  const stats: CardioSessionStats = {
    totalTime: cardioState.totalTimeElapsed,
    workTime: cardioState.workTimeTotal,
    restTime: cardioState.restTimeTotal,
    roundsCompleted: cardioState.currentRound,
    calories: estimateCalories(cardioState.workTimeTotal),
  };

  // Save to history
  const session = {
    type: 'cardio' as const,
    mode: cardioState.mode!,
    date: new Date().toISOString(),
    savedAt: new Date().toISOString(),
    config: { ...cardioState.config },
    stats,
    grupo: `Cardio - ${cardioState.mode?.toUpperCase()}`,
    ejercicios: [],
    volumenTotal: 0,
    volumenPorGrupo: {},
  };

  addToHistory(session);

  // Show summary
  showCardioSummary(stats);
}

function estimateCalories(workSeconds: number): number {
  // Rough estimate: ~10 calories per minute of high intensity work
  return Math.round((workSeconds / 60) * 10);
}

// ==========================================
// RESUMEN
// ==========================================

function showCardioSummary(stats: CardioSessionStats): void {
  hideAllCardioViews();

  const summaryView = document.getElementById('cardioSummaryView');
  if (!summaryView) return;

  summaryView.classList.remove('hidden');

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  summaryView.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div class="w-20 h-20 rounded-full bg-status-success/20 flex items-center justify-center mb-6">
        ${icon('check', 'xl', 'text-status-success')}
      </div>

      <h2 class="text-2xl font-display font-bold text-text-primary mb-2">
        ¡Entrenamiento Completado!
      </h2>
      <p class="text-text-secondary mb-8">${cardioState.mode?.toUpperCase()}</p>

      <div class="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
        <div class="bg-dark-surface border border-dark-border rounded-xl p-4">
          <p class="text-3xl font-bold text-accent">${formatTime(stats.totalTime)}</p>
          <p class="text-xs text-text-muted">Tiempo Total</p>
        </div>
        <div class="bg-dark-surface border border-dark-border rounded-xl p-4">
          <p class="text-3xl font-bold text-status-warning">${stats.roundsCompleted}</p>
          <p class="text-xs text-text-muted">Rondas</p>
        </div>
        <div class="bg-dark-surface border border-dark-border rounded-xl p-4">
          <p class="text-3xl font-bold text-status-success">${formatTime(stats.workTime)}</p>
          <p class="text-xs text-text-muted">Trabajo</p>
        </div>
        <div class="bg-dark-surface border border-dark-border rounded-xl p-4">
          <p class="text-3xl font-bold text-status-error">${stats.calories}</p>
          <p class="text-xs text-text-muted">Calorías (est.)</p>
        </div>
      </div>

      <button
        onclick="window.showHome()"
        class="w-full max-w-sm bg-accent hover:bg-accent-hover text-white font-bold py-4 px-6 rounded-xl
               active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        ${icon('home', 'md')}
        Volver al Inicio
      </button>
    </div>
  `;

  // Reset state
  resetCardioState();

  refreshIcons();
}

// ==========================================
// UTILIDADES
// ==========================================

function hideAllCardioViews(): void {
  const views = ['cardioSelectorView', 'cardioConfigView', 'cardioTimerView', 'cardioSummaryView'];
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
}

function playBeep(long = false): void {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = long ? 880 : 440;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + (long ? 0.5 : 0.1));

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + (long ? 0.5 : 0.1));
  } catch {
    // Audio not supported, try vibration
    if ('vibrate' in navigator) {
      navigator.vibrate(long ? 300 : 100);
    }
  }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

export function initializeCardio(): void {
  // Nothing to initialize yet, views are created dynamically
}
