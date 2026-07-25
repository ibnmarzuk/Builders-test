import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { connectDB } from './server/config/db.js';

import authRoutes from './server/routes/authRoutes.js';
import assignmentRoutes from './server/routes/assignmentRoutes.js';
import announcementRoutes from './server/routes/announcementRoutes.js';
import submissionRoutes from './server/routes/submissionRoutes.js';
import participantRoutes from './server/routes/participantRoutes.js';
import analyticsRoutes from './server/routes/analyticsRoutes.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Connect Database (Atlas with memory fallback)
  await connectDB();

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/assignments', assignmentRoutes);
  app.use('/api/announcements', announcementRoutes);
  app.use('/api/submissions', submissionRoutes);
  app.use('/api/participants', participantRoutes);
  app.use('/api/analytics', analyticsRoutes);

  app.get('/api/health', (req, res) => {
    res.json({
      status: 'online',
      app: 'Builders Build Community Hub',
      timestamp: new Date().toISOString()
    });
  });

  // Vite Middleware for Development / Static serving in Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Builders Build Hub Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
