"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeaderboard = exports.fetchContestById = void 0;
const database_1 = require("@blitzquiz/database");
const fetchContestById = async (id) => {
    return await database_1.prisma.contest.findUnique({
        where: { id },
        include: {
            questions: true,
            leaderboard: {
                include: { user: true },
                orderBy: { score: 'desc' },
            },
        },
    });
};
exports.fetchContestById = fetchContestById;
const updateLeaderboard = async (contestId, userId, scoreIncrement) => {
    return await database_1.prisma.leaderBoard.upsert({
        where: {
            userId_contestId: { userId, contestId },
        },
        update: {
            score: { increment: scoreIncrement },
        },
        create: {
            userId,
            contestId,
            score: scoreIncrement,
        },
    });
};
exports.updateLeaderboard = updateLeaderboard;
