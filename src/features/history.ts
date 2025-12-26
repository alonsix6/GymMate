import { getHistory, deleteFromHistory, getPRs, saveHistory } from '@/utils/storage';
import { renderHistoryItem, renderPRItem, refreshIcons } from '@/ui/components';
import { icon } from '@/utils/icons';

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
// EXPORTAR A CSV (reemplaza xlsx por seguridad)
// ==========================================

function escapeCSV(value: string | number): string {
  const str = String(value);
  // Escapar comillas dobles y envolver en comillas si contiene caracteres especiales
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportToCSV(): void {
  const history = getHistory();

  if (history.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  // Headers
  const headers = [
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
  ];

  const rows: string[][] = [headers];

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
          rows.push([
            fecha,
            grupo,
            ej.nombre,
            String(ej.sets),
            String(ej.reps),
            String(ej.peso),
            ej.esMancuerna ? 'Sí' : 'No',
            ej.grupoMuscular,
            String(ej.volumen),
            ej.completado ? 'Sí' : 'No',
            String(volumenTotalSesion),
          ]);
        }
      });
    }
  });

  // Generar CSV con BOM para Excel
  const BOM = '\uFEFF';
  const csvContent = BOM + rows.map(row => row.map(escapeCSV).join(',')).join('\n');

  // Crear blob y descargar
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `GymMate_Historial_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Mantener compatibilidad con el nombre anterior
export const exportToExcel = exportToCSV;

// ==========================================
// IMPORTAR DESDE CSV
// ==========================================

interface ParsedCSVRow {
  fecha: string;
  grupo: string;
  ejercicio: string;
  sets: number;
  reps: number;
  peso: number;
  esMancuerna: boolean;
  grupoMuscular: string;
  volumen: number;
  completado: boolean;
  volumenTotalSesion: number;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());

  return result;
}

function parseSpanishDate(dateStr: string): string {
  // Formato esperado: DD/MM/YYYY o D/M/YYYY
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}T12:00:00.000Z`;
  }
  // Si ya está en formato ISO, devolverlo
  return dateStr;
}

export function importFromCSV(file: File): Promise<{ imported: number; duplicates: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        // Remover BOM si existe
        const cleanContent = content.replace(/^\uFEFF/, '');
        const lines = cleanContent.split(/\r?\n/).filter(line => line.trim());

        if (lines.length < 2) {
          reject(new Error('El archivo CSV está vacío o no tiene datos'));
          return;
        }

        // Verificar headers
        const headers = parseCSVLine(lines[0]);
        const expectedHeaders = ['Fecha', 'Grupo', 'Ejercicio', 'Sets', 'Reps', 'Peso (kg)'];
        const hasValidHeaders = expectedHeaders.every(h =>
          headers.some(header => header.toLowerCase().includes(h.toLowerCase().split(' ')[0]))
        );

        if (!hasValidHeaders) {
          reject(new Error('El archivo CSV no tiene el formato correcto de GymMate'));
          return;
        }

        // Parsear filas
        const rows: ParsedCSVRow[] = [];
        for (let i = 1; i < lines.length; i++) {
          const values = parseCSVLine(lines[i]);
          if (values.length >= 10) {
            rows.push({
              fecha: values[0],
              grupo: values[1],
              ejercicio: values[2],
              sets: parseInt(values[3]) || 0,
              reps: parseInt(values[4]) || 0,
              peso: parseFloat(values[5]) || 0,
              esMancuerna: values[6]?.toLowerCase() === 'sí' || values[6]?.toLowerCase() === 'si',
              grupoMuscular: values[7] || 'Core',
              volumen: parseFloat(values[8]) || 0,
              completado: values[9]?.toLowerCase() === 'sí' || values[9]?.toLowerCase() === 'si',
              volumenTotalSesion: parseFloat(values[10]) || 0,
            });
          }
        }

        if (rows.length === 0) {
          reject(new Error('No se encontraron datos válidos en el archivo'));
          return;
        }

        // Agrupar por fecha + grupo para reconstruir sesiones
        const sessionMap = new Map<string, ParsedCSVRow[]>();
        rows.forEach(row => {
          const key = `${row.fecha}|${row.grupo}`;
          if (!sessionMap.has(key)) {
            sessionMap.set(key, []);
          }
          sessionMap.get(key)!.push(row);
        });

        // Construir sesiones
        const existingHistory = getHistory();
        const existingKeys = new Set(
          existingHistory.map(s => {
            const date = new Date(s.savedAt || s.date).toLocaleDateString('es-ES');
            return `${date}|${s.grupo}`;
          })
        );

        const newSessions: import('@/types').HistorySession[] = [];
        let duplicates = 0;

        sessionMap.forEach((sessionRows, key) => {
          // Verificar si ya existe
          if (existingKeys.has(key)) {
            duplicates++;
            return;
          }

          const firstRow = sessionRows[0];
          const isoDate = parseSpanishDate(firstRow.fecha);

          // Calcular volumen por grupo muscular
          const volumenPorGrupo: Record<string, number> = {};
          sessionRows.forEach(row => {
            const grupo = row.grupoMuscular;
            volumenPorGrupo[grupo] = (volumenPorGrupo[grupo] || 0) + row.volumen;
          });

          const session: import('@/types').HistorySession = {
            date: isoDate,
            savedAt: isoDate,
            sessionId: `imported_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            grupo: firstRow.grupo,
            type: 'weights',
            volumenTotal: firstRow.volumenTotalSesion || sessionRows.reduce((sum, r) => sum + r.volumen, 0),
            volumenPorGrupo,
            ejercicios: sessionRows.map(row => ({
              nombre: row.ejercicio,
              sets: row.sets,
              reps: row.reps,
              peso: row.peso,
              esMancuerna: row.esMancuerna,
              grupoMuscular: row.grupoMuscular as import('@/types').MuscleGroup,
              volumen: row.volumen,
              completado: row.completado,
            })),
          };

          newSessions.push(session);
        });

        // Agregar nuevas sesiones al historial
        if (newSessions.length > 0) {
          const updatedHistory = [...newSessions, ...existingHistory];
          // Ordenar por fecha (más reciente primero)
          updatedHistory.sort((a, b) => {
            const dateA = new Date(a.savedAt || a.date).getTime();
            const dateB = new Date(b.savedAt || b.date).getTime();
            return dateB - dateA;
          });
          saveHistory(updatedHistory);
        }

        resolve({ imported: newSessions.length, duplicates });
      } catch (error) {
        reject(new Error('Error al procesar el archivo CSV: ' + (error as Error).message));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };

    reader.readAsText(file, 'UTF-8');
  });
}

export function triggerCSVImport(): void {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv';
  input.style.display = 'none';

  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      const result = await importFromCSV(file);

      let message = `¡Importación completada!\n\n`;
      message += `✅ ${result.imported} entrenamiento(s) importado(s)`;
      if (result.duplicates > 0) {
        message += `\n⚠️ ${result.duplicates} duplicado(s) omitido(s)`;
      }

      alert(message);

      // Recargar historial si estamos en esa pestaña
      loadHistory();
      loadPRs();
    } catch (error) {
      alert('Error: ' + (error as Error).message);
    }
  };

  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
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
