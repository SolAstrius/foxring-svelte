export interface SiteStatus {
  timestamp: string;
  responseTimeMs: number | null;
  status: 'success' | 'status_error' | 'network_error' | 'timeout' | 'other' | null;
  statusCode: number | null;
}

export interface Site {
  id: number;
  name: string;
  url: string;
  createdAt: string;
  faviconName: string | null;
  status: SiteStatus | null;
}

export interface ListResponse {
  sites: Site[];
}

export interface User {
  id: string;
  username: string;
  fullName: string | null;
  isAdmin: boolean;
}

const BASE = __BACKEND_URL__;

export async function getUser(): Promise<User | null> {
  try {
    const res = await fetch(`${BASE}/manage/user`, { credentials: 'same-origin' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getMySites(): Promise<Site[]> {
  try {
    const res = await fetch(`${BASE}/manage/sites`, { credentials: 'same-origin' });
    if (!res.ok) return [];
    const data: { sites: Site[] } = await res.json();
    return data.sites;
  } catch {
    return [];
  }
}

export async function addSite(url: string, name: string | null): Promise<{ ok: true; site: Site } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${BASE}/manage/sites/new`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, name }),
    });
    if (res.ok) return { ok: true, site: await res.json() };
    if (res.status === 409) return { ok: false, error: 'A site with this URL already exists.' };
    if (res.status === 400) return { ok: false, error: 'Invalid URL.' };
    return { ok: false, error: 'Something went wrong.' };
  } catch {
    return { ok: false, error: 'Could not reach the server.' };
  }
}

export async function deleteSite(siteId: number): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/manage/sites/${siteId}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    });
    return res.status === 204;
  } catch {
    return false;
  }
}

export function authUrl(redirectTo: string): string {
  return `${BASE}/manage/auth?redirect_to=${encodeURIComponent(redirectTo)}`;
}
