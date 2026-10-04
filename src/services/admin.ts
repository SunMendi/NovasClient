import { API_BASE_URL } from './api';
import { authService } from './auth';

function errorText(value: unknown): string {
  if (Array.isArray(value)) return value.map(errorText).join(' ');
  if (value && typeof value === 'object') return Object.entries(value).map(([key, detail]) => `${key.replace(/_/g, ' ')}: ${errorText(detail)}`).join('\n');
  return String(value ?? '');
}
export async function adminRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers: { Accept: 'application/json', Authorization: `Token ${authService.getToken()}`, ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers } });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401) throw new Error('Your session has expired. Sign out and sign in again.');
    throw new Error(errorText(data?.errors || data || 'The request failed. Please try again.'));
  }
  if (res.status === 204) return undefined as T;
  if (!data || !('data' in data)) throw new Error('The server returned an unexpected response. Please try again.');
  return data.data as T;
}
