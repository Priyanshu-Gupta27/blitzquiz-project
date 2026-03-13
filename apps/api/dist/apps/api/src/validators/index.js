"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAnswerSchema = exports.createContestSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(2),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.createContestSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().optional(),
    startTime: zod_1.z.string().datetime(),
    endTime: zod_1.z.string().datetime(),
});
exports.submitAnswerSchema = zod_1.z.object({
    contestId: zod_1.z.string().uuid(),
    questionId: zod_1.z.string().uuid(),
    answer: zod_1.z.number().int().min(0).max(3),
});
