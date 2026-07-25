import { Router } from 'express';
import { DB } from '../store.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/participants - Public / Protected
router.get('/', async (req, res) => {
  try {
    const participants = await DB.getParticipants();
    res.json(participants);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching participants' });
  }
});

// POST /api/participants - Admin only
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, email, telegramUsername, country, cohort, progress, totalPoints } = req.body;
    if (!name || !email || !telegramUsername || !country) {
      return res.status(400).json({ message: 'Name, email, Telegram username, and country are required.' });
    }
    const newParticipant = await DB.createParticipant({
      name,
      email,
      telegramUsername,
      country,
      cohort,
      progress,
      totalPoints
    });
    res.status(201).json(newParticipant);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error creating participant' });
  }
});

// PUT /api/participants/:id - Admin or Self
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await DB.updateParticipant(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error updating participant' });
  }
});

// DELETE /api/participants/:id - Admin only
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await DB.deleteParticipant(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    res.json({ message: 'Participant removed successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error deleting participant' });
  }
});

export default router;
