"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const router = express_1.Router();
router.route('/').get(projectController_1.listProjects);
exports.default = router;
//# sourceMappingURL=projectsRoutes.js.map