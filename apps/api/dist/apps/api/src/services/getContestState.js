"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshContestStatuses = exports.getContestState = void 0;
const database_1 = require("@blitzquiz/database");
const getContestState = (startTime, endTime) => {
    const now = new Date();
    if (now < startTime)
        return 'UPCOMING';
    if (now > endTime)
        return 'CLOSED';
    return 'LIVE';
};
exports.getContestState = getContestState;
const refreshContestStatuses = async () => {
    const contests = await database_1.prisma.contest.findMany({
        where: { status: { not: 'CLOSED' } }
    });
    for (const contest of contests) {
        const newState = (0, exports.getContestState)(contest.startTime, contest.endTime);
        if (newState !== contest.status) {
            await database_1.prisma.contest.update({
                where: { id: contest.id },
                data: { status: newState }
            });
        }
    }
};
exports.refreshContestStatuses = refreshContestStatuses;
