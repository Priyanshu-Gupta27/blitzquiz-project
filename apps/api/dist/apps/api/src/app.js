"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_controller_1 = require("./controllers/user.controller");
const contest_controller_1 = require("./controllers/contest.controller");
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));
// Auth Routes
app.post('/api/auth/signup', user_controller_1.signup);
app.post('/api/auth/login', user_controller_1.login);
// Contest Routes
app.get('/api/contests', contest_controller_1.getContests);
app.post('/api/contests', middlewares_1.authMiddleware, middlewares_1.adminMiddleware, contest_controller_1.createContest);
app.post('/api/contests/ai-gen', middlewares_1.authMiddleware, middlewares_1.adminMiddleware, contest_controller_1.addAIQuestions);
exports.default = app;
