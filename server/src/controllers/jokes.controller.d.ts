import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const getPublicJokes: (req: Request, res: Response) => Promise<void>;
export declare const getPendingJokes: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getAllJokes: (req: AuthRequest, res: Response) => Promise<void>;
export declare const submitJoke: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateJokeStatus: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteJoke: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=jokes.controller.d.ts.map