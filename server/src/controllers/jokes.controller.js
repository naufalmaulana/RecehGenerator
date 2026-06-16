"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJoke = exports.updateJokeStatus = exports.submitJoke = exports.getAllJokes = exports.getPendingJokes = exports.getPublicJokes = void 0;
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const getPublicJokes = async (req, res) => {
    try {
        const { category } = req.query; // 'SFW' or 'NSFW'
        const whereClause = { status: 'APPROVED' };
        if (category) {
            whereClause.category = category;
        }
        const jokes = await prisma_1.default.joke.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            include: { author: { select: { email: true } } }
        });
        res.json(jokes);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch jokes' });
    }
};
exports.getPublicJokes = getPublicJokes;
const getPendingJokes = async (req, res) => {
    try {
        const jokes = await prisma_1.default.joke.findMany({
            where: { status: 'PENDING' },
            orderBy: { createdAt: 'desc' },
            include: { author: { select: { email: true } } }
        });
        res.json(jokes);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch pending jokes' });
    }
};
exports.getPendingJokes = getPendingJokes;
const getAllJokes = async (req, res) => {
    try {
        const jokes = await prisma_1.default.joke.findMany({
            orderBy: { createdAt: 'desc' },
            include: { author: { select: { email: true } } }
        });
        res.json(jokes);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch all jokes' });
    }
};
exports.getAllJokes = getAllJokes;
const submitJoke = async (req, res) => {
    try {
        const { text, category } = req.body;
        const userId = req.user?.id;
        if (!text || !category) {
            res.status(400).json({ error: 'Text and category are required' });
            return;
        }
        const joke = await prisma_1.default.joke.create({
            data: {
                text,
                category,
                status: 'PENDING',
                authorId: userId
            }
        });
        if (userId) {
            await prisma_1.default.notification.create({
                data: {
                    userId,
                    title: 'Joke Submitted',
                    body: 'Your joke has been submitted and is waiting for admin review.'
                }
            });
        }
        res.status(201).json(joke);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to submit joke' });
    }
};
exports.submitJoke = submitJoke;
const updateJokeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'APPROVED' or 'REJECTED'
        const joke = await prisma_1.default.joke.findUnique({ where: { id: Number(id) } });
        if (!joke) {
            res.status(404).json({ error: 'Joke not found' });
            return;
        }
        const updatedJoke = await prisma_1.default.joke.update({
            where: { id: Number(id) },
            data: { status }
        });
        if (joke.authorId) {
            const title = status === 'APPROVED' ? 'Joke Approved! 🎉' : 'Joke Rejected 😔';
            const body = status === 'APPROVED'
                ? `Your joke "${joke.text.substring(0, 30)}..." has been approved!`
                : `Unfortunately, your joke "${joke.text.substring(0, 30)}..." was rejected.`;
            await prisma_1.default.notification.create({
                data: {
                    userId: joke.authorId,
                    title,
                    body
                }
            });
        }
        res.json(updatedJoke);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update joke status' });
    }
};
exports.updateJokeStatus = updateJokeStatus;
const deleteJoke = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.joke.delete({ where: { id: Number(id) } });
        res.json({ message: 'Joke deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete joke' });
    }
};
exports.deleteJoke = deleteJoke;
//# sourceMappingURL=jokes.controller.js.map