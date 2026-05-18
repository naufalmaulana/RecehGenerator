import { Router } from 'express';
import { getPublicJokes, getPendingJokes, getAllJokes, submitJoke, updateJokeStatus, deleteJoke } from '../controllers/jokes.controller';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public
router.get('/', getPublicJokes);

// Authenticated
router.post('/', requireAuth, submitJoke);

// Admin only
router.get('/review', requireAuth, requireAdmin, getPendingJokes);
router.get('/all', requireAuth, requireAdmin, getAllJokes);
router.put('/:id/status', requireAuth, requireAdmin, updateJokeStatus);
router.delete('/:id', requireAuth, requireAdmin, deleteJoke);

export default router;
