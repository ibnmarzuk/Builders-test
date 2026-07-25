import { Router } from 'express';
import { DB } from '../store.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = Router();

// GET /api/submissions
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    // If admin, return all submissions; if participant, return all or user's own submissions
    const userId = req.user.role === 'admin' ? undefined : req.query.mine === 'true' ? req.user._id : undefined;
    const submissions = await DB.getSubmissions(userId);
    res.json(submissions);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching submissions' });
  }
});

// POST /api/submissions - Protected for participants & admins
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { projectName, description, githubRepo, liveDemo, screenshot, assignmentId, assignmentTitle } = req.body;

    if (!projectName || !description || !githubRepo || !liveDemo) {
      return res.status(400).json({ message: 'Project Name, Description, GitHub Repo, and Live Demo are required.' });
    }

    const newSubmission = await DB.createSubmission(
      {
        projectName,
        description,
        githubRepo,
        liveDemo,
        screenshot,
        assignmentId,
        assignmentTitle
      },
      req.user
    );

    res.status(201).json(newSubmission);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error creating submission' });
  }
});

// PUT /api/submissions/:id - Admin review or update
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { status, feedback, pointsAwarded } = req.body;

    // Only admin can approve/reject/grade
    if (req.user.role !== 'admin' && status) {
      return res.status(403).json({ message: 'Only admins can review submissions.' });
    }

    const updated = await DB.updateSubmission(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error updating submission' });
  }
});

// DELETE /api/submissions/:id
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const deleted = await DB.deleteSubmission(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json({ message: 'Submission deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error deleting submission' });
  }
});

export default router;
