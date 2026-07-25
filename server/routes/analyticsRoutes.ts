import { Router } from 'express';
import { DB } from '../store.js';

const router = Router();

// GET /api/analytics
router.get('/', async (req, res) => {
  try {
    const analytics = await DB.getAnalytics();
    res.json(analytics);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error generating analytics' });
  }
});

export default router;
