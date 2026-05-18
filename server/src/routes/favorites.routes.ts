import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favorites.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:jokeId', removeFavorite);

export default router;
