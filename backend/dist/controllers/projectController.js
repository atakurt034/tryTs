"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProjects = void 0;
const projects_1 = __importDefault(require("../data/projects"));
const listProjects = (req, res, next) => {
    res.json(projects_1.default);
};
exports.listProjects = listProjects;
//# sourceMappingURL=projectController.js.map