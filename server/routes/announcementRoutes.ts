import { Router } from 'express';
import { DB } from '../store.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = Router();

// GET /api/announcements - Public/Protected
router.get('/', async (req, res) => {
  try {
    const announcements = await DB.getAnnouncements();
    res.json(announcements);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching announcements' });
  }
});

// POST /api/announcements - Admin only
router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { title, content, category, isPinned } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }
    const newAnnouncement = await DB.createAnnouncement({
      title,
      content,
      category,
      isPinned,
      authorName: req.user?.name || 'Organizers'
    });
    res.status(201).json(newAnnouncement);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error creating announcement' });
  }
});

// PUT /api/announcements/:id - Admin only
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const updated = await DB.updateAnnouncement(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error updating announcement' });
  }
});

// DELETE /api/announcements/:id - Admin only
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await DB.deleteAnnouncement(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error deleting announcement' });
  }
});

export default router;
