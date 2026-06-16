"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.addFavorite = exports.getFavorites = void 0;
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const getFavorites = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return;
        const favorites = await prisma_1.default.favorite.findMany({
            where: { userId },
            include: { joke: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(favorites);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
};
exports.getFavorites = getFavorites;
const addFavorite = async (req, res) => {
    try {
        const { jokeId } = req.body;
        const userId = req.user?.id;
        if (!userId)
            return;
        const favorite = await prisma_1.default.favorite.create({
            data: {
                userId,
                jokeId: Number(jokeId)
            }
        });
        res.status(201).json(favorite);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to add favorite (may already exist)' });
    }
};
exports.addFavorite = addFavorite;
const removeFavorite = async (req, res) => {
    try {
        const { jokeId } = req.params;
        const userId = req.user?.id;
        if (!userId)
            return;
        await prisma_1.default.favorite.delete({
            where: {
                userId_jokeId: {
                    userId,
                    jokeId: Number(jokeId)
                }
            }
        });
        res.json({ message: 'Favorite removed' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
};
exports.removeFavorite = removeFavorite;
//# sourceMappingURL=favorites.controller.js.map