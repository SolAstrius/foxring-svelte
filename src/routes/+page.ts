import type { ListResponse } from '$lib/api';
import { mockSites } from '$lib/members';
import type { PageLoad } from './$types';

const BACKEND_URL = __BACKEND_URL__;

export const load: PageLoad = async ({ fetch }) => {
  try {
    const res = await fetch(`${BACKEND_URL}/list`);
    if (!res.ok) return { sites: mockSites, mock: true };
    const data: ListResponse = await res.json();
    return { sites: data.sites, mock: false };
  } catch {
    return { sites: mockSites, mock: true };
  }
}
