"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const contactController_js_1 = require("../controllers/contactController.js");
router
    .route('/')
    .post(express_validator_1.body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Please input a minimum of 3 characters on your name')
    .isAlpha('en-US', { ignore: '-s' })
    .withMessage('Use only letters for the name'), express_validator_1.body('email')
    .isEmail()
    .withMessage('Please Input Valid Email')
    .normalizeEmail(), express_validator_1.body('message')
    .trim()
    .isLength({ min: 5 })
    .withMessage("Please don't be shy.Message me with more than 5 characters"), contactController_js_1.sendMail);
exports.default = router;
//# sourceMappingURL=contactRoutes.js.map