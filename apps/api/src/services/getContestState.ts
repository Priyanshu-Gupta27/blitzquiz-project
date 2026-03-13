import { prisma, ContestStatus } from '@blitzquiz/database'

export const getContestState = (startTime: Date, endTime: Date): ContestStatus => {
    const now = new Date()
    if (now < startTime) return 'UPCOMING'
    if (now > endTime) return 'CLOSED'
    return 'LIVE'
}

export const refreshContestStatuses = async () => {
    const contests = await prisma.contest.findMany({
        where: { status: { not: 'CLOSED' } }
    })

    for (const contest of contests) {
        const newState = getContestState(contest.startTime, contest.endTime)
        if (newState !== contest.status) {
            await prisma.contest.update({
                where: { id: contest.id },
                data: { status: newState }
            })
        }
    }
}
