"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const database_1 = require("@blitzquiz/database");
// Sync Redis state to Database every minute (if needed) or handle contest closures
node_cron_1.default.schedule('* * * * *', async () => {
    console.log('Running submission cleanup/sync...');
    // Placeholder for complex batching if needed
    // For now, we can check for contests that just ended and finalize leaderboards
    const now = new Date();
    const endedContests = await database_1.prisma.contest.findMany({
        where: {
            endTime: { lte: now },
            status: 'LIVE'
        }
    });
    for (const contest of endedContests) {
        await database_1.prisma.contest.update({
            where: { id: contest.id },
            data: { status: 'CLOSED' }
        });
        console.log(`Contest ${contest.id} marked as CLOSED`);
    }
});
