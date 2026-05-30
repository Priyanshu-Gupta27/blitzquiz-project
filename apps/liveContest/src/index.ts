import { WebSocketServer, WebSocket } from 'ws'
import http from 'http'
import { authenticateWS } from './middleware'
import redis from './redisClient'
import { fetchContestById, updateLeaderboard } from './fetchContest'

const server = http.createServer()
const wss = new WebSocketServer({ server })

interface ContestClient extends WebSocket {
    userId?: string;
    contestId?: string;
}

wss.on('connection', async (ws: WebSocket, req: http.IncomingMessage) => {
    const client = ws as ContestClient
    const url = new URL(req.url || '', `http://${req.headers.host}`)
    const token = url.searchParams.get('token')
    const contestId = url.searchParams.get('contestId')

    if (!token || !contestId) {
        client.close(1008, 'Missing token or contestId')
        return
    }

    const user = authenticateWS(token)
    if (!user) {
        client.close(1008, 'Invalid token')
        return
    }

    client.userId = user.id
    client.contestId = contestId

    // Join contest room in Redis
    await redis.sadd(`contest:${contestId}:users`, user.id)

    client.on('message', async (data) => {
        try {
            const message = JSON.parse(data.toString())

            if (message.type === 'SUBMIT_ANSWER') {
                const { questionId, answer, isCorrect } = message.payload

                if (isCorrect) {
                    await updateLeaderboard(contestId, client.userId!, 10) // 10 points per correct answer
                }

                // Broadcast update to all users in this contest
                const leaderboard = await fetchContestById(contestId)
                wss.clients.forEach((c: WebSocket) => {
                    const otherClient = c as unknown as ContestClient
                    if (otherClient.readyState === WebSocket.OPEN && otherClient.contestId === contestId) {
                        otherClient.send(JSON.stringify({
                            type: 'LEADERBOARD_UPDATE',
                            payload: leaderboard?.leaderboard
                        }))
                    }
                })
            }
        } catch (err) {
            console.error('WS Message Error:', err)
        }
    })

    client.on('close', async () => {
        if (client.userId && client.contestId) {
            await redis.srem(`contest:${client.contestId}:users`, client.userId)
        }
    })
})

const PORT = process.env.PORT || 8080
server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`WebSocket server running on port ${PORT}`)
})
