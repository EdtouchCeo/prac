import { ComplaintTemplate } from '../types';

const FAVORITES_KEY = 'complaint_guide_favorites_v1';
const CUSTOM_TEMPLATES_KEY = 'complaint_guide_custom_templates_v1';
const THEME_KEY = 'complaint_guide_theme_v1';

export function getFavoritesFromStorage(): string[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse favorites from LocalStorage', e);
    return [];
  }
}

export function saveFavoritesToStorage(favorites: string[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to save favorites to LocalStorage', e);
  }
}

export function toggleFavoriteInStorage(templateId: string): string[] {
  const current = getFavoritesFromStorage();
  const exists = current.includes(templateId);
  const updated = exists ? current.filter((id) => id !== templateId) : [...current, templateId];
  saveFavoritesToStorage(updated);
  return updated;
}

export function getCustomTemplatesFromStorage(): ComplaintTemplate[] {
  try {
    const data = localStorage.getItem(CUSTOM_TEMPLATES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse custom templates from LocalStorage', e);
    return [];
  }
}

export function saveCustomTemplateToStorage(template: ComplaintTemplate): ComplaintTemplate[] {
  try {
    const current = getCustomTemplatesFromStorage();
    const updated = [template, ...current];
    localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save custom template to LocalStorage', e);
    return getCustomTemplatesFromStorage();
  }
}

export function deleteCustomTemplateFromStorage(templateId: string): ComplaintTemplate[] {
  try {
    const current = getCustomTemplatesFromStorage();
    const updated = current.filter((t) => t.id !== templateId);
    localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete custom template', e);
    return getCustomTemplatesFromStorage();
  }
}

export function getThemeFromStorage(): 'light' | 'dark' {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === 'dark' || theme === 'light') return theme;
    // Default to system preference or light
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function saveThemeToStorage(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Failed to save theme to LocalStorage', e);
  }
}

const GEMINI_API_KEY_STORAGE = 'complaint_guide_gemini_api_key_v1';

export function getApiKeyFromStorage(): string {
  try {
    return localStorage.getItem(GEMINI_API_KEY_STORAGE) || '';
  } catch {
    return '';
  }
}

export function saveApiKeyToStorage(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(GEMINI_API_KEY_STORAGE);
    }
  } catch (e) {
    console.error('Failed to save API key to LocalStorage', e);
  }
}

export function removeApiKeyFromStorage(): void {
  try {
    localStorage.removeItem(GEMINI_API_KEY_STORAGE);
  } catch (e) {
    console.error('Failed to remove API key from LocalStorage', e);
  }
}

