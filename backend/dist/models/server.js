"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const serverSchema = new mongoose_1.default.Schema({
    visitorCount: {
        type: Number,
        required: true,
    },
    emailsSentCount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
const Server = mongoose_1.default.model('Server', serverSchema);
exports.default = Server;
//# sourceMappingURL=server.js.map