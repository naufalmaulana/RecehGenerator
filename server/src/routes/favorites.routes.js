"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorites_controller_1 = require("../controllers/favorites.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.requireAuth);
router.get('/', favorites_controller_1.getFavorites);
router.post('/', favorites_controller_1.addFavorite);
router.delete('/:jokeId', favorites_controller_1.removeFavorite);
exports.default = router;
//# sourceMappingURL=favorites.routes.js.map