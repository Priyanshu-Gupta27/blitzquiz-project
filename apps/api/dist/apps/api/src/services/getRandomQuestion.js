"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomQuestions = void 0;
const database_1 = require("@blitzquiz/database");
const getRandomQuestions = async (count = 10) => {
    const total = await database_1.prisma.mCQ.count();
    const randomIndices = Array.from({ length: count }, () => Math.floor(Math.random() * total));
    // This is a simplified random fetch for small datasets
    const questions = await database_1.prisma.mCQ.findMany({
        take: count,
        skip: Math.max(0, Math.floor(Math.random() * (total - count))),
    });
    return questions;
};
exports.getRandomQuestions = getRandomQuestions;
