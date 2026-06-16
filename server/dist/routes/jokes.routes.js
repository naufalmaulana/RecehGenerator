"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jokes_controller_1 = require("../controllers/jokes.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public
router.get('/', jokes_controller_1.getPublicJokes);
// Authenticated
router.post('/', auth_middleware_1.requireAuth, jokes_controller_1.submitJoke);
// Admin only
router.get('/review', auth_middleware_1.requireAuth, auth_middleware_1.requireAdmin, jokes_controller_1.getPendingJokes);
router.get('/all', auth_middleware_1.requireAuth, auth_middleware_1.requireAdmin, jokes_controller_1.getAllJokes);
router.put('/:id/status', auth_middleware_1.requireAuth, auth_middleware_1.requireAdmin, jokes_controller_1.updateJokeStatus);
router.delete('/:id', auth_middleware_1.requireAuth, auth_middleware_1.requireAdmin, jokes_controller_1.deleteJoke);
exports.default = router;
//# sourceMappingURL=jokes.routes.js.map