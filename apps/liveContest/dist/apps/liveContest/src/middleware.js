"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateWS = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateWS = (token) => {
    try {
        const secret = process.env.JWT_SECRET || 'secret';
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (err) {
        return null;
    }
};
exports.authenticateWS = authenticateWS;
