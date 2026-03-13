import cron from 'node-cron'
import { prisma } from '@blitzquiz/database'
import redis from './redisClient'

// Sync Redis state to Database every minute (if needed) or handle contest closures
cron.schedule('* * * * *', async () => {
    console.log('Running submission cleanup/sync...')
    // Placeholder for complex batching if needed
    // For now, we can check for contests that just ended and finalize leaderboards
    const now = new Date()
    const endedContests = await prisma.contest.findMany({
        where: {
            endTime: { lte: now },
            status: 'LIVE'
        }
    })

    for (const contest of endedContests) {
        await prisma.contest.update({
            where: { id: contest.id },
            data: { status: 'CLOSED' }
        })
        console.log(`Contest ${contest.id} marked as CLOSED`)
    }
})
