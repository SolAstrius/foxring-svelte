import type { ListResponse } from '$lib/api'
import type { PageLoad } from './$types'

const BACKEND_URL = __BACKEND_URL__

export const load: PageLoad = async ({ fetch }) => {
  try {
    const res = await fetch(`${BACKEND_URL}/list`)
    if (!res.ok) return { sites: [] }
    const data: ListResponse = await res.json()
    return { sites: data.sites }
  } catch (e) {
    console.error('Failed to fetch sites', e)
    return { sites: [] }
  }
}
