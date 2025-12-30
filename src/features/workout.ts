import type { ExerciseData, Exercise } from '@/types';
import { getTrainingGroup } from '@/data/training-groups';
import {
  sessionData,
  setSessionGroup,
  setSessionExercises,
  updateExercise as updateExerciseState,
  toggleExerciseCompleted,
  saveCurrentSession,
  endSession,
  hasUnsavedData,
  hasUnsavedChanges,
  setOnDraftSavedCallback,
} from '@/state/session';
import { renderExercise, refreshIcons } from '@/ui/components';
import { icon } from '@/utils/icons';

// ==========================================
// CARGAR GRUPO DE ENTRENAMIENTO
// ==========================================

export function loadTrainingGroup(grupoId: string): void {
  const grupo = getTrainingGroup(grupoId);
  if (!grupo) {
    console.error(`Training group not found: ${grupoId}`);
    return;
  }

  // Confirmar cambio si hay datos sin guardar
  if (hasUnsavedData()) {
    if (
      !confirm(
        'Tienes cambios sin guardar. ¿Quieres cambiar de rutina de todas formas?'
      )
    ) {
      return;
    }
  }

  // Establecer grupo en sesión
  setSessionGroup(grupo.nombre);

  // Crear ejercicios con datos iniciales
  const ejercicios: ExerciseData[] = [];

  grupo.ejercicios.forEach((ej: Exercise) => {
    ejercicios.push({
      ...ej,
      sets: 0,
      reps: 0,
      peso: 0,
      volumen: 0,
      completado: false,
    });
  });

  grupo.opcionales.forEach((ej: Exercise) => {
    ejercicios.push({
      ...ej,
      sets: 0,
      reps: 0,
      peso: 0,
      volumen: 0,
      completado: false,
    });
  });

  setSessionExercises(ejercicios);

  // Renderizar UI
  renderWorkoutUI(grupo.nombre, ejercicios, grupo.ejercicios.length);
}

// ==========================================
// RENDERIZAR UI DE WORKOUT
// ==========================================

function renderWorkoutUI(
  groupName: string,
  ejercicios: ExerciseData[],
  obligatoriosCount: number
): void {
  // Mostrar info del entrenamiento
  const trainingInfo = document.getElementById('trainingInfo');
  if (trainingInfo) {
    trainingInfo.classList.remove('hidden');
  }

  const currentTraining = document.getElementById('currentTraining');
  if (currentTraining) {
    currentTraining.textContent = groupName;
  }

  const currentDate = document.getElementById('currentDate');
  if (currentDate) {
    currentDate.textContent = new Date().toLocaleDateString('es-ES');
  }

  // Renderizar ejercicios obligatorios
  const ejerciciosList = document.getElementById('ejerciciosList');
  if (ejerciciosList) {
    let html = '';
    for (let i = 0; i < obligatoriosCount; i++) {
      html += renderExercise(ejercicios[i], i, false);
    }
    ejerciciosList.innerHTML = html;
  }

  // Renderizar ejercicios opcionales
  const opcionalesList = document.getElementById('opcionalesList');
  if (opcionalesList) {
    let html = '';
    if (ejercicios.length > obligatoriosCount) {
      html = `
        <div class="mb-3 flex items-center gap-2">
          ${icon('bookmark', 'md', 'text-status-warning')}
          <span class="text-sm font-semibold text-status-warning">Ejercicios Opcionales</span>
        </div>
      `;
      for (let i = obligatoriosCount; i < ejercicios.length; i++) {
        html += renderExercise(ejercicios[i], i, true);
      }
    }
    opcionalesList.innerHTML = html;
  }

  // Mostrar secciones
  const containers = [
    'ejerciciosContainer',
    'volumeSummary',
    'saveSection',
    'quickStats',
  ];
  containers.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  });

  // Actualizar displays
  updateVolumeDisplay();
  updateQuickStats();
  updateSaveButtonState();

  // Refrescar iconos
  refreshIcons();
}

// ==========================================
// ACTUALIZAR EJERCICIO
// ==========================================

export function updateEjercicio(index: number): void {
  const setsInput = document.getElementById(`sets-${index}`) as HTMLInputElement;
  const repsInput = document.getElementById(`reps-${index}`) as HTMLInputElement;
  const pesoInput = document.getElementById(`peso-${index}`) as HTMLInputElement;

  if (!setsInput || !repsInput || !pesoInput) return;

  // Validar entrada decimal (bloquear comas)
  if (!validateDecimalInput(pesoInput)) return;

  const sets = parseFloat(setsInput.value) || 0;
  const reps = parseFloat(repsInput.value) || 0;
  const peso = parseFloat(pesoInput.value) || 0;

  // Actualizar estado
  updateExerciseState(index, sets, reps, peso);

  // Actualizar UI de volumen
  const volumenEl = document.getElementById(`volumen-${index}`);
  if (volumenEl) {
    volumenEl.textContent = `${sessionData.ejercicios[index].volumen.toLocaleString()} kg`;
  }

  // Actualizar displays
  updateVolumeDisplay();
  updateQuickStats();
  updateSaveButtonState();
  updateUnsavedIndicator();
}

// ==========================================
// HELPERS DE INPUT
// ==========================================

export function incrementInput(inputId: string): void {
  const input = document.getElementById(inputId) as HTMLInputElement;
  if (input) {
    input.value = String((parseFloat(input.value) || 0) + 1);
    input.dispatchEvent(new Event('change'));
  }
}

export function decrementInput(inputId: string): void {
  const input = document.getElementById(inputId) as HTMLInputElement;
  if (input) {
    const newValue = Math.max(0, (parseFloat(input.value) || 0) - 1);
    input.value = String(newValue);
    input.dispatchEvent(new Event('change'));
  }
}

function validateDecimalInput(input: HTMLInputElement): boolean {
  if (input.value.includes(',')) {
    input.value = input.value.replace(',', '.');
    input.classList.add('animate-shake');
    setTimeout(() => input.classList.remove('animate-shake'), 300);
  }
  return true;
}

// ==========================================
// TOGGLE COMPLETADO
// ==========================================

export function toggleCompletado(index: number): void {
  const button = document.getElementById(`completado-${index}`) as HTMLButtonElement;
  const nombreEl = document.getElementById(`nombre-${index}`) as HTMLElement;

  if (!button) return;

  // Get current state and toggle it
  const currentState = sessionData.ejercicios[index]?.completado || false;
  const newState = !currentState;

  // Update state
  toggleExerciseCompleted(index, newState);

  // Update button visual
  const checkIcon = button.querySelector('i');

  if (newState) {
    // Completed state - green filled circle with white check
    button.classList.remove('bg-transparent', 'border-slate-500', 'hover:border-emerald-400');
    button.classList.add('bg-emerald-500', 'border-emerald-500', 'scale-110');
    if (checkIcon) {
      checkIcon.classList.remove('text-slate-600');
      checkIcon.classList.add('text-white');
    }
    // Exercise name - green with strikethrough
    if (nombreEl) {
      nombreEl.classList.remove('text-white');
      nombreEl.classList.add('text-emerald-400', 'line-through', 'decoration-emerald-400', 'decoration-2');
    }
  } else {
    // Uncompleted state - transparent circle with gray check
    button.classList.remove('bg-emerald-500', 'border-emerald-500', 'scale-110');
    button.classList.add('bg-transparent', 'border-slate-500', 'hover:border-emerald-400');
    if (checkIcon) {
      checkIcon.classList.remove('text-white');
      checkIcon.classList.add('text-slate-600');
    }
    // Exercise name - white without strikethrough
    if (nombreEl) {
      nombreEl.classList.remove('text-emerald-400', 'line-through', 'decoration-emerald-400', 'decoration-2');
      nombreEl.classList.add('text-white');
    }
  }

  updateQuickStats();
  updateSaveButtonState();
}

// ==========================================
// ACTUALIZAR DISPLAYS
// ==========================================

export function updateVolumeDisplay(): void {
  const volumeBars = document.getElementById('volumeBars');
  if (!volumeBars) return;

  const volumenPorGrupo = sessionData.volumenPorGrupo;
  const grupos = Object.keys(volumenPorGrupo);

  if (grupos.length === 0) {
    volumeBars.innerHTML = `
      <p class="text-text-secondary text-center py-4">
        Ingresa datos para ver el resumen de volumen
      </p>
    `;
    return;
  }

  const maxVolumen = Math.max(...Object.values(volumenPorGrupo));

  let html = '';
  grupos.forEach((grupo) => {
    const volumen = volumenPorGrupo[grupo];
    const percentage = maxVolumen > 0 ? (volumen / maxVolumen) * 100 : 0;

    html += `
      <div class="mb-3">
        <div class="flex justify-between text-sm mb-1">
          <span class="text-text-secondary">${grupo}</span>
          <span class="text-accent font-semibold">${volumen.toLocaleString()} kg</span>
        </div>
        <div class="h-2 bg-dark-bg rounded-full overflow-hidden">
          <div
            class="h-full bg-accent rounded-full transition-all duration-300"
            style="width: ${percentage}%"
          ></div>
        </div>
      </div>
    `;
  });

  // Total
  html += `
    <div class="mt-4 pt-3 border-t border-dark-border">
      <div class="flex justify-between items-center">
        <span class="text-text-primary font-semibold">Volumen Total</span>
        <span class="text-xl font-bold text-accent">${sessionData.volumenTotal.toLocaleString()} kg</span>
      </div>
    </div>
  `;

  volumeBars.innerHTML = html;
}

export function updateQuickStats(): void {
  const ejercicios = sessionData.ejercicios;
  const completados = ejercicios.filter((ej) => ej.completado).length;
  const conDatos = ejercicios.filter((ej) => ej.volumen > 0).length;

  // Volumen
  const volumenStat = document.getElementById('statVolumen');
  if (volumenStat) {
    volumenStat.textContent = sessionData.volumenTotal.toLocaleString();
  }

  // Ejercicios
  const ejerciciosStat = document.getElementById('statEjercicios');
  if (ejerciciosStat) {
    ejerciciosStat.textContent = String(conDatos);
  }

  // Completados
  const completadosStat = document.getElementById('statCompletados');
  if (completadosStat) {
    completadosStat.textContent = `${completados}/${ejercicios.length}`;
  }

  // Sets totales
  const setsStat = document.getElementById('statSets');
  if (setsStat) {
    const totalSets = ejercicios.reduce((sum, ej) => sum + ej.sets, 0);
    setsStat.textContent = String(totalSets);
  }
}

export function updateSaveButtonState(): void {
  const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
  if (!saveButton) return;

  const hasData = sessionData.ejercicios.some((ej) => ej.volumen > 0);
  saveButton.disabled = !hasData;

  if (hasData) {
    saveButton.classList.remove('opacity-50', 'cursor-not-allowed');
  } else {
    saveButton.classList.add('opacity-50', 'cursor-not-allowed');
  }
}

export function updateUnsavedIndicator(): void {
  const indicator = document.getElementById('unsavedIndicator');
  if (!indicator) return;

  // Only show indicator when there are actual pending changes (before auto-save)
  // hasUnsavedChanges is false after draft auto-save, so indicator hides
  if (hasUnsavedChanges) {
    indicator.classList.remove('hidden');
    indicator.classList.add('animate-slide-down');
  } else {
    indicator.classList.add('hidden');
    indicator.classList.remove('animate-slide-down');
  }
}

// ==========================================
// GUARDAR SESIÓN
// ==========================================

export function saveWorkout(): void {
  const result = saveCurrentSession();

  const saveMessage = document.getElementById('saveMessage');
  if (saveMessage) {
    saveMessage.textContent =
      result === 'updated'
        ? 'Entrenamiento actualizado correctamente'
        : 'Entrenamiento guardado correctamente';
    saveMessage.classList.remove('hidden');

    setTimeout(() => {
      saveMessage.classList.add('hidden');
    }, 3000);
  }

  updateUnsavedIndicator();
  updateSaveButtonState();
}

export function finishWorkout(): void {
  if (hasUnsavedData()) {
    if (
      !confirm(
        '¿Guardar el entrenamiento antes de terminar? (Cancelar = no guardar)'
      )
    ) {
      endSession();
      window.location.reload();
      return;
    }
    saveWorkout();
  }

  endSession();
  window.location.reload();
}

// Register callback to update indicator when draft is auto-saved
setOnDraftSavedCallback(() => {
  updateUnsavedIndicator();
});
