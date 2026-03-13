"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("@blitzquiz/database");
const validators_1 = require("../validators");
const signup = async (req, res) => {
    try {
        const validatedData = validators_1.signupSchema.parse(req.body);
        const { email, password, name } = validatedData;
        const existingUser = await database_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await database_1.prisma.user.create({
            data: { email, password: hashedPassword, name }
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = validators_1.loginSchema.parse(req.body);
        const user = await database_1.prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.login = login;
