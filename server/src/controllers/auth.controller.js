"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOAuth = exports.login = exports.register = void 0;
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const prisma_1 = __importDefault(require("../prisma"));
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'dummy-google-client-id';
const googleClient = new google_auth_library_1.OAuth2Client(GOOGLE_CLIENT_ID);
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
        expiresIn: '7d',
    });
};
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'Email is already in use' });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                role: 'USER', // Default role
            },
        });
        const token = generateToken(user);
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            // If user doesn't exist or doesn't have a password (e.g. Google auth only)
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const token = generateToken(user);
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
const googleOAuth = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            res.status(400).json({ error: 'Google token is required' });
            return;
        }
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            res.status(400).json({ error: 'Invalid Google token' });
            return;
        }
        const email = payload.email;
        const googleId = payload.sub;
        let user = await prisma_1.default.user.findUnique({ where: { email } });
        if (user) {
            // User exists, but maybe they signed up with email/password before
            if (!user.googleId) {
                user = await prisma_1.default.user.update({
                    where: { email },
                    data: { googleId },
                });
            }
        }
        else {
            // Create new user
            user = await prisma_1.default.user.create({
                data: {
                    email,
                    googleId,
                    role: 'USER',
                },
            });
        }
        const jwtToken = generateToken(user);
        res.status(200).json({
            message: 'Google login successful',
            token: jwtToken,
            user: { id: user.id, email: user.email, role: user.role }
        });
    }
    catch (error) {
        console.error('Google Auth error:', error);
        res.status(500).json({ error: 'Internal server error during Google authentication' });
    }
};
exports.googleOAuth = googleOAuth;
//# sourceMappingURL=auth.controller.js.map