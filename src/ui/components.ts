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

  const optionalBadge = isOptional
    ? `<span class="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-semibold">Opcional</span>`
    : '';

  const cardBg = isOptional ? 'bg-orange-500/5 border-orange-500/20' : 'bg-slate-800/50 border-slate-700/50';

  return `
    <div class="${cardBg} border rounded-xl p-4 mb-4" id="ejercicio-${index}">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <input
            type="checkbox"
            id="completado-${index}"
            ${ejercicio.completado ? 'checked' : ''}
            onchange="window.toggleCompletado(${index})"
            class="w-6 h-6 rounded-lg bg-slate-700 border-2 border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-white text-base leading-tight">${ejercicio.nombre}</h3>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs text-slate-400 flex items-center gap-1">
                <i data-lucide="${muscleIcon}" class="w-3 h-3"></i>
                ${ejercicio.grupoMuscular}
              </span>
              ${optionalBadge}
            </div>
          </div>
        </div>
        ${
          gifUrl
            ? `
          <button
            onclick="window.showAnimation('${ejercicio.nombre}', '${gifUrl}')"
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 active:scale-95 transition-all flex-shrink-0"
          >
            ${icon('play', 'md')}
          </button>
        `
            : ''
        }
      </div>

      <!-- Inputs - Clean and simple with better spacing -->
      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="block text-xs text-slate-500 mb-1.5 text-center">Sets</label>
          <input
            type="number"
            id="sets-${index}"
            value="${ejercicio.sets || ''}"
            placeholder="0"
            min="0"
            max="20"
            onchange="window.updateEjercicio(${index})"
            class="w-full h-12 text-center bg-slate-900 border-2 border-slate-700 rounded-xl text-white text-xl font-bold focus:border-blue-500 focus:ring-0 placeholder-slate-600"
          />
        </div>
        <div>
          <label class="block text-xs text-slate-500 mb-1.5 text-center">Reps</label>
          <input
            type="number"
            id="reps-${index}"
            value="${ejercicio.reps || ''}"
            placeholder="0"
            min="0"
            max="100"
            onchange="window.updateEjercicio(${index})"
            class="w-full h-12 text-center bg-slate-900 border-2 border-slate-700 rounded-xl text-white text-xl font-bold focus:border-blue-500 focus:ring-0 placeholder-slate-600"
          />
        </div>
        <div>
          <label class="block text-xs text-slate-500 mb-1.5 text-center">Kg</label>
          <input
            type="number"
            id="peso-${index}"
            value="${ejercicio.peso || ''}"
            placeholder="0"
            min="0"
            step="0.5"
            onchange="window.updateEjercicio(${index})"
            class="w-full h-12 text-center bg-slate-900 border-2 border-slate-700 rounded-xl text-white text-xl font-bold focus:border-blue-500 focus:ring-0 placeholder-slate-600"
          />
        </div>
      </div>

      <!-- Volume - Prominent -->
      <div class="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between">
        <span class="text-sm text-slate-400">Volumen</span>
        <span class="text-lg font-bold ${ejercicio.volumen > 0 ? 'text-emerald-400' : 'text-slate-500'}" id="volumen-${index}">
          ${ejercicio.volumen > 0 ? ejercicio.volumen.toLocaleString() + ' kg' : '-'}
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
