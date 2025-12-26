import { getProfile, saveProfile as saveProfileData } from '@/utils/storage';
import type { ProfileData } from '@/types';

// ==========================================
// CARGAR PERFIL
// ==========================================

export function loadProfile(): void {
  const profile = getProfile();

  if (profile.name) {
    const nameInput = document.getElementById('profileName') as HTMLInputElement;
    if (nameInput) nameInput.value = profile.name;
  }

  if (profile.birthdate) {
    const birthdateInput = document.getElementById(
      'profileBirthdate'
    ) as HTMLInputElement;
    if (birthdateInput) {
      birthdateInput.value = profile.birthdate;
      calculateAge();
    }
  }

  if (profile.gender) {
    const genderSelect = document.getElementById(
      'profileGender'
    ) as HTMLSelectElement;
    if (genderSelect) genderSelect.value = profile.gender;
  }

  if (profile.weight) {
    const weightInput = document.getElementById(
      'profileWeight'
    ) as HTMLInputElement;
    if (weightInput) weightInput.value = String(profile.weight);
  }

  if (profile.height) {
    const heightInput = document.getElementById(
      'profileHeight'
    ) as HTMLInputElement;
    if (heightInput) heightInput.value = String(profile.height);
  }

  if (profile.activity) {
    const activitySelect = document.getElementById(
      'profileActivity'
    ) as HTMLSelectElement;
    if (activitySelect) activitySelect.value = String(profile.activity);
  }
}

// ==========================================
// GUARDAR PERFIL
// ==========================================

export function saveProfile(e: Event): boolean {
  e.preventDefault();

  const profile: ProfileData = {
    name:
      (document.getElementById('profileName') as HTMLInputElement)?.value || '',
    birthdate:
      (document.getElementById('profileBirthdate') as HTMLInputElement)?.value ||
      '',
    gender:
      ((document.getElementById('profileGender') as HTMLSelectElement)
        ?.value as 'male' | 'female') || 'male',
    weight:
      parseFloat(
        (document.getElementById('profileWeight') as HTMLInputElement)?.value ||
          '0'
      ) || 0,
    height:
      parseFloat(
        (document.getElementById('profileHeight') as HTMLInputElement)?.value ||
          '0'
      ) || 0,
    activity:
      parseFloat(
        (document.getElementById('profileActivity') as HTMLSelectElement)
          ?.value || '1.2'
      ) || 1.2,
  };

  saveProfileData(profile);

  // Mostrar mensaje de éxito
  const message = document.getElementById('profileSaveMessage');
  if (message) {
    message.classList.remove('hidden');
    setTimeout(() => {
      message.classList.add('hidden');
    }, 3000);
  }

  return false;
}

// ==========================================
// CALCULAR EDAD
// ==========================================

export function calculateAge(): void {
  const birthdateInput = document.getElementById(
    'profileBirthdate'
  ) as HTMLInputElement;
  const ageDisplay = document.getElementById('calculatedAge');

  if (!birthdateInput || !ageDisplay) return;

  const birthdate = birthdateInput.value;
  if (!birthdate) {
    ageDisplay.textContent = '-';
    return;
  }

  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  ageDisplay.textContent = String(age);
}

// ==========================================
// INICIALIZAR PERFIL
// ==========================================

export function initializeProfile(): void {
  // Establecer max date para birthdate input (hoy)
  const today = new Date().toISOString().split('T')[0];
  const birthdateInput = document.getElementById(
    'profileBirthdate'
  ) as HTMLInputElement;

  if (birthdateInput) {
    birthdateInput.setAttribute('max', today);

    // Min = 100 años atrás
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    birthdateInput.setAttribute('min', minDate.toISOString().split('T')[0]);

    birthdateInput.addEventListener('change', calculateAge);
  }

  // Form submit
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', saveProfile);
  }

  // Cargar datos existentes
  loadProfile();
}

// ==========================================
// OBTENER DATOS DEL PERFIL PARA CALCULADORAS
// ==========================================

export function getProfileForCalculators(): {
  age: number | null;
  gender: 'male' | 'female' | null;
  weight: number | null;
  height: number | null;
  activity: number | null;
} {
  const profile = getProfile();

  let age: number | null = null;
  if (profile.birthdate) {
    const birth = new Date(profile.birthdate);
    const today = new Date();
    age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
  }

  return {
    age,
    gender: profile.gender || null,
    weight: profile.weight || null,
    height: profile.height || null,
    activity: profile.activity || null,
  };
}
