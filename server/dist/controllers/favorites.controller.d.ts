import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const getFavorites: (req: AuthRequest, res: Response) => Promise<void>;
export declare const addFavorite: (req: AuthRequest, res: Response) => Promise<void>;
export declare const removeFavorite: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=favorites.controller.d.ts.map