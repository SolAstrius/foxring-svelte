import type { Site } from './api';

export const mockSites: Site[] = [
  { id: 1, name: "Foxring",       url: "https://foxr.ing",           createdAt: "2025-01-01T00:00:00Z", faviconName: null, status: { timestamp: "", responseTimeMs: null, status: "success", statusCode: 200 } },
  { id: 2, name: "Sol Astrius",   url: "https://solastrius.ink",     createdAt: "2025-01-01T00:00:00Z", faviconName: null, status: { timestamp: "", responseTimeMs: null, status: "success", statusCode: 200 } },
  { id: 3, name: "vanutp",        url: "https://vanutp.dev",         createdAt: "2025-01-01T00:00:00Z", faviconName: null, status: { timestamp: "", responseTimeMs: null, status: "success", statusCode: 200 } },
  { id: 4, name: "Example A",     url: "https://aaaa.example",       createdAt: "2025-01-01T00:00:00Z", faviconName: null, status: null },
  { id: 5, name: "Example B",     url: "https://bbbb.example",       createdAt: "2025-01-01T00:00:00Z", faviconName: null, status: null },
];
