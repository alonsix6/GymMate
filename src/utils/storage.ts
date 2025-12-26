import { STORAGE_KEYS, MAX_HISTORY_ITEMS } from '@/constants';
import type {
  SessionData,
  PRData,
  ProfileData,
  HistorySession,
  TrainingGroup,
} from '@/types';

// ==========================================
// WRAPPER PARA LOCALSTORAGE
// ==========================================

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage: ${key}`, error);
  }
}

function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error);
  }
}

// ==========================================
// HISTORY
// ==========================================

export function getHistory(): HistorySession[] {
  return getItem<HistorySession[]>(STORAGE_KEYS.HISTORY, []);
}

export function saveHistory(history: HistorySession[]): void {
  // Mantener solo los últimos MAX_HISTORY_ITEMS
  if (history.length > MAX_HISTORY_ITEMS) {
    history.length = MAX_HISTORY_ITEMS;
  }
  setItem(STORAGE_KEYS.HISTORY, history);
}

export function addToHistory(session: HistorySession): void {
  const history = getHistory();
  const existingIndex = history.findIndex(
    (s) => s.sessionId === session.sessionId
  );

  if (existingIndex !== -1) {
    history[existingIndex] = session;
  } else {
    history.unshift(session);
  }

  saveHistory(history);
}

export function deleteFromHistory(index: number): void {
  const history = getHistory();
  history.splice(index, 1);
  saveHistory(history);
}

// ==========================================
// PRs
// ==========================================

export function getPRs(): Record<string, PRData> {
  return getItem<Record<string, PRData>>(STORAGE_KEYS.PRS, {});
}

export function savePRs(prs: Record<string, PRData>): void {
  setItem(STORAGE_KEYS.PRS, prs);
}

export function updatePR(exerciseName: string, prData: PRData): void {
  const prs = getPRs();
  prs[exerciseName] = prData;
  savePRs(prs);
}

// ==========================================
// PROFILE
// ==========================================

export function getProfile(): Partial<ProfileData> {
  return getItem<Partial<ProfileData>>(STORAGE_KEYS.PROFILE, {});
}

export function saveProfile(profile: ProfileData): void {
  setItem(STORAGE_KEYS.PROFILE, profile);
}

// ==========================================
// DRAFT (Auto-guardado)
// ==========================================

export interface DraftData extends SessionData {
  draftSavedAt: string;
  draftTimestamp: number;
}

export function getDraft(): DraftData | null {
  return getItem<DraftData | null>(STORAGE_KEYS.DRAFT, null);
}

export function saveDraft(session: SessionData): void {
  const draft: DraftData = {
    ...session,
    draftSavedAt: new Date().toISOString(),
    draftTimestamp: Date.now(),
  };
  setItem(STORAGE_KEYS.DRAFT, draft);
}

export function clearDraft(): void {
  removeItem(STORAGE_KEYS.DRAFT);
}

// ==========================================
// SESSION
// ==========================================

export function getSession(): SessionData | null {
  return getItem<SessionData | null>(STORAGE_KEYS.SESSION, null);
}

export function saveSession(session: SessionData): void {
  setItem(STORAGE_KEYS.SESSION, session);
}

export function clearSession(): void {
  removeItem(STORAGE_KEYS.SESSION);
}

// ==========================================
// CUSTOM WORKOUTS
// ==========================================

export interface CustomWorkout extends TrainingGroup {
  id: string;
  isCustom: boolean;
  createdAt: string;
}

export function getCustomWorkouts(): CustomWorkout[] {
  return getItem<CustomWorkout[]>(STORAGE_KEYS.CUSTOM_WORKOUTS, []);
}

export function saveCustomWorkouts(workouts: CustomWorkout[]): void {
  setItem(STORAGE_KEYS.CUSTOM_WORKOUTS, workouts);
}

export function addCustomWorkout(workout: CustomWorkout): void {
  const workouts = getCustomWorkouts();
  workouts.push(workout);
  saveCustomWorkouts(workouts);
}

export function deleteCustomWorkout(workoutId: string): void {
  const workouts = getCustomWorkouts();
  const filtered = workouts.filter((w) => w.id !== workoutId);
  saveCustomWorkouts(filtered);
}
