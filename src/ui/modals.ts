import { icon, refreshIcons } from '@/utils/icons';

// ==========================================
// MODAL DE ANIMACIÓN DE EJERCICIO
// ==========================================

export type GuidanceType = 'image' | 'text';

export interface ExerciseGuidance {
  type: GuidanceType;
  content: string;
  fallback?: string; // Description fallback if image fails to load
}

// Overload for backwards compatibility
export function showAnimation(nombre: string, gifUrl: string): void;
export function showAnimation(nombre: string, guidance: ExerciseGuidance): void;
export function showAnimation(nombre: string, guidanceOrUrl: string | ExerciseGuidance): void {
  const modal = document.getElementById('animationModal');
  const title = document.getElementById('modalTitle');
  const container = document.getElementById('animationContainer');

  if (!modal || !title || !container) return;

  title.textContent = nombre;

  // Normalize input to guidance object
  const guidance: ExerciseGuidance | null =
    typeof guidanceOrUrl === 'string'
      ? guidanceOrUrl
        ? { type: 'image', content: guidanceOrUrl }
        : null
      : guidanceOrUrl;

  if (!guidance) {
    container.innerHTML = `
      <div class="flex flex-col items-center gap-3 text-center p-4">
        ${icon('info', 'xl', 'text-text-muted')}
        <p class="text-text-secondary">Referencia visual no disponible para este ejercicio.</p>
      </div>
    `;
    refreshIcons();
    modal.classList.add('active');
    return;
  }

  if (guidance.type === 'text') {
    // Show text description
    container.innerHTML = `
      <div class="flex flex-col items-start gap-4 p-4 max-w-md">
        <div class="flex items-center gap-3">
          ${icon('info', 'lg', 'text-accent')}
          <h4 class="text-lg font-semibold text-text-primary">Cómo realizar el ejercicio</h4>
        </div>
        <p class="text-text-secondary leading-relaxed text-left">${guidance.content}</p>
        <div class="flex items-center gap-2 mt-2 text-sm text-text-muted">
          ${icon('target', 'sm', 'text-status-success')}
          <span>Mantén la técnica correcta para evitar lesiones</span>
        </div>
      </div>
    `;
    refreshIcons();
  } else {
    // Show image
    container.innerHTML = `
      <div class="flex flex-col items-center gap-3">
        <div class="animate-spin">
          ${icon('loading', 'xl', 'text-accent')}
        </div>
        <p class="text-text-secondary">Cargando imagen...</p>
      </div>
    `;
    refreshIcons();

    const img = new Image();
    img.className = 'w-full max-w-md rounded-lg shadow-lg';
    img.alt = nombre;
    img.loading = 'lazy';
    img.decoding = 'async';

    img.onload = () => {
      container.innerHTML = '';
      container.appendChild(img);
    };

    img.onerror = () => {
      // If there's a fallback description, show it instead of error
      if (guidance.fallback) {
        container.innerHTML = `
          <div class="flex flex-col items-start gap-4 p-4 max-w-md">
            <div class="flex items-center gap-3">
              ${icon('info', 'lg', 'text-accent')}
              <h4 class="text-lg font-semibold text-text-primary">Cómo realizar el ejercicio</h4>
            </div>
            <p class="text-text-secondary leading-relaxed text-left">${guidance.fallback}</p>
            <div class="flex items-center gap-2 mt-2 text-sm text-text-muted">
              ${icon('target', 'sm', 'text-status-success')}
              <span>Mantén la técnica correcta para evitar lesiones</span>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="flex flex-col items-center gap-3 text-center p-4">
            ${icon('error', 'xl', 'text-status-error')}
            <p class="text-text-primary font-semibold">Error al cargar la imagen</p>
            <p class="text-text-secondary text-sm">La imagen de referencia no está disponible en este momento.</p>
          </div>
        `;
      }
      refreshIcons();
    };

    img.src = guidance.content;
  }

  modal.classList.add('active');
}

export function closeAnimationModal(): void {
  const modal = document.getElementById('animationModal');
  const container = document.getElementById('animationContainer');

  if (modal) {
    modal.classList.remove('active');
  }

  if (container) {
    container.innerHTML = `
      <p class="text-text-secondary">Cargando imagen de referencia...</p>
    `;
  }
}

// ==========================================
// MODAL DE CONFIRMACIÓN
// ==========================================

export function showConfirmModal(
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
): void {
  const modal = document.createElement('div');
  modal.className = `
    fixed inset-0 bg-black/50 backdrop-blur-sm z-50
    flex items-center justify-center p-4
    animate-fade-in
  `;
  modal.id = 'confirmModal';

  modal.innerHTML = `
    <div class="bg-dark-surface border border-dark-border rounded-xl p-6 max-w-sm w-full">
      <div class="flex items-center gap-3 mb-4">
        ${icon('warning', 'lg', 'text-status-warning')}
        <h3 class="text-lg font-bold text-text-primary">${title}</h3>
      </div>
      <p class="text-text-secondary mb-6">${message}</p>
      <div class="flex gap-3">
        <button
          id="confirmModalCancel"
          class="flex-1 py-2 px-4 bg-dark-bg border border-dark-border rounded-lg
                 text-text-secondary hover:text-text-primary active:scale-95 transition-all"
        >
          Cancelar
        </button>
        <button
          id="confirmModalConfirm"
          class="flex-1 py-2 px-4 bg-accent hover:bg-accent-hover text-white
                 font-semibold rounded-lg active:scale-95 transition-all"
        >
          Confirmar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  refreshIcons();

  // Event listeners
  const cancelBtn = document.getElementById('confirmModalCancel');
  const confirmBtn = document.getElementById('confirmModalConfirm');

  cancelBtn?.addEventListener('click', () => {
    modal.remove();
    onCancel?.();
  });

  confirmBtn?.addEventListener('click', () => {
    modal.remove();
    onConfirm();
  });

  // Cerrar al hacer clic fuera
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      onCancel?.();
    }
  });
}

// ==========================================
// TOAST / NOTIFICACIÓN
// ==========================================

export function showToast(
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'info'
): void {
  const icons = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  const colors = {
    success: 'border-status-success bg-status-success/10',
    error: 'border-status-error bg-status-error/10',
    warning: 'border-status-warning bg-status-warning/10',
    info: 'border-status-info bg-status-info/10',
  };

  const iconColors = {
    success: 'text-status-success',
    error: 'text-status-error',
    warning: 'text-status-warning',
    info: 'text-status-info',
  };

  const toast = document.createElement('div');
  toast.className = `
    fixed bottom-20 left-4 right-4 mx-auto max-w-sm
    ${colors[type]} border rounded-xl p-4
    flex items-center gap-3
    animate-slide-up z-50
  `;

  toast.innerHTML = `
    ${icon(icons[type], 'md', iconColors[type])}
    <p class="text-text-primary text-sm flex-1">${message}</p>
    <button onclick="this.parentElement.remove()" class="text-text-muted hover:text-text-primary">
      ${icon('close', 'sm')}
    </button>
  `;

  document.body.appendChild(toast);
  refreshIcons();

  // Auto-eliminar después de 4 segundos
  setTimeout(() => {
    toast.classList.add('animate-fade-in');
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================
// INDICADOR DE CAMBIOS SIN GUARDAR
// ==========================================

export function showUnsavedIndicator(): void {
  const indicator = document.getElementById('unsavedIndicator');
  if (indicator) {
    indicator.classList.remove('hidden');
    indicator.classList.add('animate-slide-down');
  }
}

export function hideUnsavedIndicator(): void {
  const indicator = document.getElementById('unsavedIndicator');
  if (indicator) {
    indicator.classList.add('hidden');
  }
}

// ==========================================
// INDICADOR DE GUARDADO EXITOSO
// ==========================================

export function showSavedIndicator(): void {
  const indicator = document.getElementById('savedIndicator');
  if (indicator) {
    indicator.classList.remove('hidden');
    indicator.classList.add('animate-slide-down');

    setTimeout(() => {
      indicator.classList.add('hidden');
    }, 2000);
  }
}

// ==========================================
// INICIALIZAR MODALES
// ==========================================

export function initializeModals(): void {
  // Cerrar modal de animación
  const closeModal = document.getElementById('closeModal');
  closeModal?.addEventListener('click', closeAnimationModal);

  // Cerrar al hacer clic fuera
  const animationModal = document.getElementById('animationModal');
  animationModal?.addEventListener('click', (e) => {
    if (e.target === animationModal) {
      closeAnimationModal();
    }
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAnimationModal();
      document.getElementById('confirmModal')?.remove();
    }
  });
}
