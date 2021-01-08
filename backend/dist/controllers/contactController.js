"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("../models/server"));
const user_1 = __importDefault(require("../models/user"));
const express_validator_1 = require("express-validator");
dotenv_1.default.config();
const updateEmailCount = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server_1.default.findByIdAndUpdate(process.env.SERVER_ID, { $inc: { emailsSentCount: 1 } }, { new: true });
});
exports.sendMail = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    const ttl = 3600000;
    const { email, name, message, subject } = req.body;
    const transport = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    };
    const transporter = nodemailer_1.default.createTransport(transport);
    const mail = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: subject,
        text: `
  from:
  ${name} 

  contact: ${email}

  message: 

  ${message}`,
    };
    const now = new Date();
    let user = yield user_1.default.findOne({ email });
    if (email) {
        if (!errors.isEmpty()) {
            const errorString = errors.array().map((result) => result.msg);
            res.status(422);
            throw new Error(errorString.toString());
        }
        else {
            if (user) {
                if (user.time < now.getTime()) {
                    user.name = name;
                    user.email = email;
                    user.message = message;
                    user.time = now.getTime() + ttl;
                    const updated = yield user.save();
                    transporter.sendMail(mail, (err, data) => {
                        if (err) {
                            res.json({
                                status: 'fail',
                                valid: false,
                                data: updated,
                            });
                        }
                        else {
                            res.json({ status: 'success', valid: true, data: updated });
                        }
                    });
                    updateEmailCount();
                }
                else {
                    res.json({ valid: false, data: user });
                }
            }
            else {
                const createdUser = yield user_1.default.create({
                    name: name,
                    email: email,
                    message: message,
                    time: now.getTime() + ttl,
                });
                if (createdUser) {
                    transporter.sendMail(mail, (err, data) => {
                        if (err) {
                            res.json({
                                status: 'fail',
                                valid: false,
                                data: createdUser,
                            });
                        }
                        else {
                            res.json({ status: 'success', valid: true, data: createdUser });
                        }
                    });
                    updateEmailCount();
                }
            }
        }
    }
}));
//# sourceMappingURL=contactController.js.map