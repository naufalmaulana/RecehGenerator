import { Request, Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getPublicJokes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query; // 'SFW' or 'NSFW'
    
    const whereClause: any = { status: 'APPROVED' };
    if (category) {
      whereClause.category = category;
    }

    const jokes = await prisma.joke.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { email: true } } }
    });

    res.json(jokes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jokes' });
  }
};

export const getPendingJokes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const jokes = await prisma.joke.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { email: true } } }
    });
    res.json(jokes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending jokes' });
  }
};

export const getAllJokes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const jokes = await prisma.joke.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { email: true } } }
    });
    res.json(jokes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all jokes' });
  }
};

export const submitJoke = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { text, category } = req.body;
    const userId = req.user?.id;

    if (!text || !category) {
      res.status(400).json({ error: 'Text and category are required' });
      return;
    }

    const joke = await prisma.joke.create({
      data: {
        text,
        category,
        status: 'PENDING',
        authorId: userId
      }
    });

    if (userId) {
      await prisma.notification.create({
        data: {
          userId,
          title: 'Joke Submitted',
          body: 'Your joke has been submitted and is waiting for admin review.'
        }
      });
    }

    res.status(201).json(joke);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit joke' });
  }
};

export const updateJokeStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'APPROVED' or 'REJECTED'

    const joke = await prisma.joke.findUnique({ where: { id: Number(id) } });
    if (!joke) {
      res.status(404).json({ error: 'Joke not found' });
      return;
    }

    const updatedJoke = await prisma.joke.update({
      where: { id: Number(id) },
      data: { status }
    });

    if (joke.authorId) {
      const title = status === 'APPROVED' ? 'Joke Approved! 🎉' : 'Joke Rejected 😔';
      const body = status === 'APPROVED' 
        ? `Your joke "${joke.text.substring(0, 30)}..." has been approved!`
        : `Unfortunately, your joke "${joke.text.substring(0, 30)}..." was rejected.`;
        
      await prisma.notification.create({
        data: {
          userId: joke.authorId,
          title,
          body
        }
      });
    }

    res.json(updatedJoke);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update joke status' });
  }
};

export const deleteJoke = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.joke.delete({ where: { id: Number(id) } });
    res.json({ message: 'Joke deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete joke' });
  }
};
