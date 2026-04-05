import type { Plugin } from 'vite';
import type { Site, User } from './api';

const mockUser: User = {
  id: 'mock-1',
  username: 'TestUser',
  fullName: 'Test User',
  isAdmin: false,
};

const mockSites: Site[] = [
  { id: 1, name: "Sol's Constellation", url: "https://solastrius.ink", createdAt: "2025-06-01T00:00:00Z", faviconName: null, status: { timestamp: "", responseTimeMs: 120, status: "success", statusCode: 200 } },
  { id: 2, name: "foxring", url: "https://foxr.ing", createdAt: "2025-01-01T00:00:00Z", faviconName: null, status: { timestamp: "", responseTimeMs: 80, status: "success", statusCode: 200 } },
];

let nextId = 100;

export function mockApiPlugin(): Plugin {
  return {
    name: 'mock-api',
    configureServer(server) {
      // public endpoints
      server.middlewares.use('/list', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ sites: mockSites }));
      });

      server.middlewares.use('/first/json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(mockSites[0] ?? null));
      });

      server.middlewares.use('/random/json', (_req, res) => {
        const site = mockSites[Math.floor(Math.random() * mockSites.length)] ?? null;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(site));
      });

      // manage endpoints
      server.middlewares.use('/manage/user', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(mockUser));
      });

      server.middlewares.use('/manage/sites', (req, res, next) => {
        if (req.method === 'GET' && req.url === '/') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ sites: mockSites }));
          return;
        }

        if (req.method === 'POST' && req.url === '/new') {
          let body = '';
          req.on('data', (c: Buffer) => body += c);
          req.on('end', () => {
            const { url, name } = JSON.parse(body);
            const site: Site = {
              id: nextId++,
              name: name || url,
              url,
              createdAt: new Date().toISOString(),
              faviconName: null,
              status: null,
            };
            mockSites.push(site);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(site));
          });
          return;
        }

        // DELETE /manage/sites/:id
        const deleteMatch = req.url?.match(/^\/(\d+)$/);
        if (req.method === 'DELETE' && deleteMatch) {
          const id = parseInt(deleteMatch[1]);
          const idx = mockSites.findIndex(s => s.id === id);
          if (idx >= 0) mockSites.splice(idx, 1);
          res.statusCode = 204;
          res.end();
          return;
        }

        next();
      });

      // auth redirect (just bounce back)
      server.middlewares.use('/manage/auth', (req, res) => {
        const url = new URL(req.url ?? '/', 'http://localhost');
        const redirectTo = url.searchParams.get('redirect_to') || '/';
        res.writeHead(307, { Location: redirectTo });
        res.end();
      });
    },
  };
}
