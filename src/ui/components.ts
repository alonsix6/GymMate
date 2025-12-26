import type { ExerciseData, PRData, HistorySession } from '@/types';
import { icon, refreshIcons, getMuscleIcon } from '@/utils/icons';
import { getExerciseGif } from '@/data/training-groups';
import { formatDate } from '@/utils/calculations';

// ==========================================
// COMPONENTES DE UI REUTILIZABLES
// ==========================================

// Card base sin gradientes
export function card(content: string, className: string = ''): string {
  return `
    <div class="bg-dark-surface border border-dark-border rounded-xl p-4 ${className}">
      ${content}
    </div>
  `;
}

// Botón primario
export function buttonPrimary(
  text: string,
  onClick: string,
  iconName?: string,
  className: string = ''
): string {
  const iconHtml = iconName ? icon(iconName, 'md', 'mr-2') : '';
  return `
    <button
      onclick="${onClick}"
      class="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-4 rounded-xl
             active:scale-95 transition-all flex items-center justify-center ${className}"
    >
      ${iconHtml}${text}
    </button>
  `;
}

// Botón secundario
export function buttonSecondary(
  text: string,
  onClick: string,
  iconName?: string,
  className: string = ''
): string {
  const iconHtml = iconName ? icon(iconName, 'md', 'mr-2') : '';
  return `
    <button
      onclick="${onClick}"
      class="w-full bg-dark-surface border border-dark-border hover:border-accent/30
             text-text-primary font-semibold py-3 px-4 rounded-xl
             active:scale-95 transition-all flex items-center justify-center ${className}"
    >
      ${iconHtml}${text}
    </button>
  `;
}

// Botón de icono
export function iconButton(
  iconName: string,
  onClick: string,
  className: string = '',
  size: 'sm' | 'md' | 'lg' = 'md'
): string {
  const sizeClass = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  }[size];

  return `
    <button
      onclick="${onClick}"
      class="${sizeClass} rounded-lg hover:bg-white/5 active:scale-95 transition-all ${className}"
    >
      ${icon(iconName, size)}
    </button>
  `;
}

// Stat card sin gradientes
export function statCard(
  label: string,
  value: string,
  iconName: string,
  colorClass: string = 'text-accent'
): string {
  return `
    <div class="bg-dark-surface border border-dark-border rounded-xl p-3 text-center">
      <div class="flex justify-center mb-2">
        ${icon(iconName, 'lg', colorClass)}
      </div>
      <p class="text-2xl font-bold ${colorClass}">${value}</p>
      <p class="text-xs text-text-secondary">${label}</p>
    </div>
  `;
}

// ==========================================
// COMPONENTE DE EJERCICIO
// ==========================================

export function renderExercise(
  ejercicio: ExerciseData,
  index: number,
  isOptional: boolean = false
): string {
  const gifUrl = getExerciseGif(ejercicio.nombre);
  const muscleIcon = getMuscleIcon(ejercicio.grupoMuscular);

  const optionalBorder = isOptional ? 'border-status-warning/30' : 'border-dark-border';
  const optionalBadge = isOptional
    ? `<span class="text-xs bg-status-warning/20 text-status-warning px-2 py-0.5 rounded-full">Opcional</span>`
    : '';

  return `
    <div class="bg-dark-surface border ${optionalBorder} rounded-xl p-4 mb-3" id="ejercicio-${index}">
      <!-- Header -->
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            id="completado-${index}"
            ${ejercicio.completado ? 'checked' : ''}
            onchange="window.toggleCompletado(${index})"
            class="w-5 h-5 mt-1 rounded bg-dark-bg border-dark-border text-accent
                   focus:ring-accent focus:ring-offset-0"
          />
          <div class="flex-1">
            <h3 class="font-semibold text-text-primary text-sm leading-tight">${ejercicio.nombre}</h3>
            <div class="flex items-center gap-2 mt-1">
              ${icon(muscleIcon, 'sm', 'text-text-secondary')}
              <span class="text-xs text-text-secondary">${ejercicio.grupoMuscular}</span>
              ${optionalBadge}
            </div>
          </div>
        </div>
        ${
          gifUrl
            ? `
          <button
            onclick="window.showAnimation('${ejercicio.nombre}', '${gifUrl}')"
            class="p-2 rounded-lg hover:bg-white/5 active:scale-95 transition-all text-text-secondary hover:text-accent"
          >
            ${icon('play', 'md')}
          </button>
        `
            : ''
        }
      </div>

      <!-- Inputs -->
      <div class="grid grid-cols-3 gap-2 mb-3">
        <div>
          <label class="block text-xs text-text-secondary mb-1">Sets</label>
          <div class="flex items-center">
            <button
              onclick="window.decrementInput('sets-${index}')"
              class="p-1.5 bg-dark-bg border border-dark-border rounded-l-lg hover:bg-white/5"
            >
              ${icon('minus', 'sm')}
            </button>
            <input
              type="number"
              id="sets-${index}"
              value="${ejercicio.sets}"
              min="0"
              max="20"
              onchange="window.updateEjercicio(${index})"
              class="w-full text-center py-2 bg-dark-bg border-y border-dark-border text-text-primary text-sm"
            />
            <button
              onclick="window.incrementInput('sets-${index}')"
              class="p-1.5 bg-dark-bg border border-dark-border rounded-r-lg hover:bg-white/5"
            >
              ${icon('plus', 'sm')}
            </button>
          </div>
        </div>
        <div>
          <label class="block text-xs text-text-secondary mb-1">Reps</label>
          <div class="flex items-center">
            <button
              onclick="window.decrementInput('reps-${index}')"
              class="p-1.5 bg-dark-bg border border-dark-border rounded-l-lg hover:bg-white/5"
            >
              ${icon('minus', 'sm')}
            </button>
            <input
              type="number"
              id="reps-${index}"
              value="${ejercicio.reps}"
              min="0"
              max="100"
              onchange="window.updateEjercicio(${index})"
              class="w-full text-center py-2 bg-dark-bg border-y border-dark-border text-text-primary text-sm"
            />
            <button
              onclick="window.incrementInput('reps-${index}')"
              class="p-1.5 bg-dark-bg border border-dark-border rounded-r-lg hover:bg-white/5"
            >
              ${icon('plus', 'sm')}
            </button>
          </div>
        </div>
        <div>
          <label class="block text-xs text-text-secondary mb-1">Peso (kg)</label>
          <input
            type="number"
            id="peso-${index}"
            value="${ejercicio.peso}"
            min="0"
            step="0.5"
            onchange="window.updateEjercicio(${index})"
            class="w-full text-center py-2 bg-dark-bg border border-dark-border rounded-lg text-text-primary text-sm"
          />
        </div>
      </div>

      <!-- Volume -->
      <div class="flex items-center justify-between pt-2 border-t border-dark-border">
        <div class="flex items-center gap-2">
          ${icon('trending', 'sm', 'text-text-secondary')}
          <span class="text-xs text-text-secondary">Volumen</span>
        </div>
        <span class="text-sm font-bold text-accent" id="volumen-${index}">
          ${ejercicio.volumen.toLocaleString()} kg
        </span>
      </div>
    </div>
  `;
}

// ==========================================
// COMPONENTE DE HISTORIAL
// ==========================================

export function renderHistoryItem(
  session: HistorySession,
  index: number
): string {
  const date = formatDate(session.savedAt || session.date);

  if (session.type === 'cardio') {
    const modeNames: Record<string, string> = {
      tabata: 'Tabata',
      emom: 'EMOM',
      amrap: 'AMRAP',
      circuit: 'Circuito',
      pyramid: 'Pirámide',
      custom: 'Personalizado',
      fortime: 'For Time',
    };
    const modeName = modeNames[session.mode || 'emom'] || 'Cardio';

    return `
      <div class="bg-dark-surface border border-dark-border rounded-xl p-4">
        <div class="flex justify-between items-start mb-3">
          <div>
            <div class="flex items-center gap-2">
              ${icon('flame', 'md', 'text-status-warning')}
              <h3 class="font-bold text-text-primary">${modeName}</h3>
            </div>
            <p class="text-sm text-text-secondary mt-1">${date}</p>
          </div>
          ${iconButton('delete', `window.deleteHistoryItem(${index})`, 'text-status-error hover:text-status-error/80')}
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-dark-bg border border-dark-border rounded-lg p-2">
            <p class="text-xs text-text-secondary">Tiempo Total</p>
            <p class="text-lg font-bold text-status-warning">
              ${Math.floor((session as any).stats.totalTime / 60)}:${String((session as any).stats.totalTime % 60).padStart(2, '0')}
            </p>
          </div>
          <div class="bg-dark-bg border border-dark-border rounded-lg p-2">
            <p class="text-xs text-text-secondary">Rondas</p>
            <p class="text-lg font-bold text-accent">${(session as any).stats.roundsCompleted}</p>
          </div>
        </div>
      </div>
    `;
  }

  // Sesión de pesas
  const completedCount = session.ejercicios
    ? session.ejercicios.filter((ej) => ej.completado).length
    : 0;
  const totalExercises = session.ejercicios
    ? session.ejercicios.filter((ej) => ej.volumen > 0).length
    : 0;
  const volumenTotal = session.volumenTotal || 0;

  return `
    <div class="bg-dark-surface border border-dark-border rounded-xl p-4">
      <div class="flex justify-between items-start mb-3">
        <div>
          <div class="flex items-center gap-2">
            ${icon('workout', 'md', 'text-accent')}
            <h3 class="font-bold text-text-primary">${session.grupo || 'Entrenamiento'}</h3>
          </div>
          <p class="text-sm text-text-secondary mt-1">${date}</p>
        </div>
        ${iconButton('delete', `window.deleteHistoryItem(${index})`, 'text-status-error hover:text-status-error/80')}
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="bg-dark-bg border border-dark-border rounded-lg p-2">
          <p class="text-xs text-text-secondary">Volumen Total</p>
          <p class="text-lg font-bold text-accent">${volumenTotal.toFixed(0)} kg</p>
        </div>
        <div class="bg-dark-bg border border-dark-border rounded-lg p-2">
          <p class="text-xs text-text-secondary">Completados</p>
          <p class="text-lg font-bold text-status-success">${completedCount}/${totalExercises}</p>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// COMPONENTE DE PR
// ==========================================

export function renderPRItem(nombre: string, data: PRData): string {
  return `
    <div class="bg-dark-surface border border-dark-border border-l-4 border-l-status-warning rounded-xl p-4">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-bold text-text-primary">${nombre}</h3>
          <p class="text-sm text-text-secondary mt-1">
            <span class="text-2xl font-bold text-status-warning">${data.peso}kg</span>
            <span class="text-text-muted ml-2">${data.sets}x${data.reps}</span>
          </p>
          <p class="text-xs text-text-muted mt-2">
            ${formatDate(data.date)}
          </p>
        </div>
        <div class="flex items-center">
          ${icon('trophy', 'xl', 'text-status-warning')}
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// COMPONENTE DE RUTINA (HOME)
// ==========================================

export function renderRoutineCard(
  groupId: string,
  name: string,
  exerciseCount: number,
  colorClass: string = 'border-accent'
): string {
  return `
    <div
      data-grupo="${groupId}"
      class="bg-dark-surface border ${colorClass} border-l-4 rounded-xl p-4
             cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-dark-bg flex items-center justify-center">
          ${icon('workout', 'lg', 'text-accent')}
        </div>
        <div class="flex-1">
          <h3 class="font-bold text-text-primary text-sm">${name}</h3>
          <p class="text-xs text-text-secondary">${exerciseCount} ejercicios</p>
        </div>
        ${icon('chevronRight', 'md', 'text-text-muted')}
      </div>
    </div>
  `;
}

// Función para refrescar iconos después de renderizar
export { refreshIcons };
