"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notifications_controller_1 = require("../controllers/notifications.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.requireAuth);
router.get('/', notifications_controller_1.getNotifications);
router.put('/:id/read', notifications_controller_1.markAsRead);
exports.default = router;
//# sourceMappingURL=notifications.routes.js.map