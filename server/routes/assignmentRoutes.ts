import { Router } from 'express';
import { DB } from '../store.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/assignments - Public/Protected
router.get('/', async (req, res) => {
  try {
    const assignments = await DB.getAssignments();
    res.json(assignments);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching assignments' });
  }
});

// POST /api/assignments - Admin only
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { title, description, dueDate, difficulty, resources, status, dayNumber, points } = req.body;
    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: 'Title, description, and dueDate are required.' });
    }
    const newAssignment = await DB.createAssignment({
      title,
      description,
      dueDate,
      difficulty,
      resources,
      status,
      dayNumber,
      points
    });
    res.status(201).json(newAssignment);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error creating assignment' });
  }
});

// PUT /api/assignments/:id - Admin only
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const updated = await DB.updateAssignment(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error updating assignment' });
  }
});

// DELETE /api/assignments/:id - Admin only
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await DB.deleteAssignment(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error deleting assignment' });
  }
});

export default router;
