import { getHistory, deleteFromHistory, getPRs } from '@/utils/storage';
import { renderHistoryItem, renderPRItem, refreshIcons } from '@/ui/components';
import { icon } from '@/utils/icons';
import * as XLSX from 'xlsx';

// ==========================================
// CARGAR HISTORIAL
// ==========================================

export function loadHistory(): void {
  const history = getHistory();
  const historyList = document.getElementById('historyList');

  if (!historyList) return;

  if (history.length === 0) {
    historyList.innerHTML = `
      <div class="text-center py-8">
        ${icon('history', 'xl', 'text-text-muted mb-3 mx-auto')}
        <p class="text-text-secondary">No hay entrenamientos guardados aún</p>
        <p class="text-text-muted text-sm mt-1">Completa tu primer entrenamiento para verlo aquí</p>
      </div>
    `;
    refreshIcons();
    return;
  }

  let html = '';
  history.forEach((session, index) => {
    html += renderHistoryItem(session, index);
  });

  historyList.innerHTML = html;
  refreshIcons();
}

// ==========================================
// ELIMINAR DEL HISTORIAL
// ==========================================

export function deleteHistoryItem(index: number): void {
  if (confirm('¿Eliminar este entrenamiento del historial?')) {
    deleteFromHistory(index);
    loadHistory();
  }
}

// ==========================================
// CARGAR PRs
// ==========================================

export function loadPRs(): void {
  const prs = getPRs();
  const prsList = document.getElementById('prsList');

  if (!prsList) return;

  const prEntries = Object.entries(prs);

  if (prEntries.length === 0) {
    prsList.innerHTML = `
      <div class="text-center py-8">
        ${icon('trophy', 'xl', 'text-text-muted mb-3 mx-auto')}
        <p class="text-text-secondary">Registra tus primeros entrenamientos para ver tus PRs</p>
        <p class="text-text-muted text-sm mt-1">Los récords personales se guardan automáticamente</p>
      </div>
    `;
    refreshIcons();
    return;
  }

  // Ordenar por fecha (más reciente primero)
  prEntries.sort((a, b) => {
    return new Date(b[1].date).getTime() - new Date(a[1].date).getTime();
  });

  let html = '';
  prEntries.forEach(([nombre, data]) => {
    html += renderPRItem(nombre, data);
  });

  prsList.innerHTML = html;
  refreshIcons();
}

// ==========================================
// EXPORTAR A EXCEL
// ==========================================

export function exportToExcel(): void {
  const history = getHistory();

  if (history.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  // Preparar datos para Excel
  const excelData: (string | number)[][] = [];

  // Headers
  excelData.push([
    'Fecha',
    'Grupo',
    'Ejercicio',
    'Sets',
    'Reps',
    'Peso (kg)',
    'Es Mancuerna',
    'Grupo Muscular',
    'Volumen',
    'Completado',
    'Volumen Total Sesión',
  ]);

  // Data rows - solo exportar sesiones de pesas
  history.forEach((session) => {
    if (session.ejercicios && Array.isArray(session.ejercicios)) {
      const fecha = new Date(session.savedAt || session.date).toLocaleDateString(
        'es-ES'
      );
      const grupo = session.grupo;
      const volumenTotalSesion = session.volumenTotal;

      session.ejercicios.forEach((ej) => {
        if (ej.volumen > 0) {
          excelData.push([
            fecha,
            grupo,
            ej.nombre,
            ej.sets,
            ej.reps,
            ej.peso,
            ej.esMancuerna ? 'Sí' : 'No',
            ej.grupoMuscular,
            ej.volumen,
            ej.completado ? 'Sí' : 'No',
            volumenTotalSesion,
          ]);
        }
      });
    }
  });

  // Crear workbook y worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(excelData);

  // Set column widths
  ws['!cols'] = [
    { wch: 12 }, // Fecha
    { wch: 30 }, // Grupo
    { wch: 30 }, // Ejercicio
    { wch: 8 }, // Sets
    { wch: 8 }, // Reps
    { wch: 10 }, // Peso
    { wch: 15 }, // Es Mancuerna
    { wch: 18 }, // Grupo Muscular
    { wch: 10 }, // Volumen
    { wch: 12 }, // Completado
    { wch: 18 }, // Volumen Total
  ];

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Historial de Entrenos');

  // Generate Excel file and download
  XLSX.writeFile(
    wb,
    `GymMate_Historial_${new Date().toISOString().split('T')[0]}.xlsx`
  );
}

// ==========================================
// ESTADÍSTICAS RÁPIDAS
// ==========================================

export function getQuickStats(): {
  totalWorkouts: number;
  totalVolume: number;
  lastWorkout: string | null;
  streak: number;
} {
  const history = getHistory();

  const weightSessions = history.filter((s) => s.type !== 'cardio');

  const totalWorkouts = weightSessions.length;
  const totalVolume = weightSessions.reduce(
    (sum, s) => sum + (s.volumenTotal || 0),
    0
  );
  const lastWorkout =
    weightSessions.length > 0
      ? weightSessions[0].savedAt || weightSessions[0].date
      : null;

  // Calcular racha
  let streak = 0;
  if (weightSessions.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateString = checkDate.toISOString().split('T')[0];

      const hasWorkout = weightSessions.some((s) => {
        const sessionDate = new Date(s.savedAt || s.date)
          .toISOString()
          .split('T')[0];
        return sessionDate === dateString;
      });

      if (hasWorkout) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
  }

  return { totalWorkouts, totalVolume, lastWorkout, streak };
}
