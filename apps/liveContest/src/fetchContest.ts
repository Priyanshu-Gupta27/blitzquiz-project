import { prisma } from '@blitzquiz/database'

export const fetchContestById = async (id: string) => {
    return await prisma.contest.findUnique({
        where: { id },
        include: {
            questions: true,
            leaderboard: {
                include: { user: true },
                orderBy: { score: 'desc' },
            },
        },
    })
}

export const updateLeaderboard = async (contestId: string, userId: string, scoreIncrement: number) => {
    return await prisma.leaderBoard.upsert({
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
    })
}
