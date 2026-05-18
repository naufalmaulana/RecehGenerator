import { Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getFavorites = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) return;

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: { joke: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

export const addFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { jokeId } = req.body;
    const userId = req.user?.id;
    
    if (!userId) return;

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        jokeId: Number(jokeId)
      }
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add favorite (may already exist)' });
  }
};

export const removeFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { jokeId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) return;

    await prisma.favorite.delete({
      where: {
        userId_jokeId: {
          userId,
          jokeId: Number(jokeId)
        }
      }
    });

    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};
