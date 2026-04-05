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
