"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const middleware_1 = require("./middleware");
const redisClient_1 = __importDefault(require("./redisClient"));
const fetchContest_1 = require("./fetchContest");
const server = http_1.default.createServer();
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', async (ws, req) => {
    const client = ws;
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
    const contestId = url.searchParams.get('contestId');
    if (!token || !contestId) {
        client.close(1008, 'Missing token or contestId');
        return;
    }
    const user = (0, middleware_1.authenticateWS)(token);
    if (!user) {
        client.close(1008, 'Invalid token');
        return;
    }
    client.userId = user.id;
    client.contestId = contestId;
    // Join contest room in Redis
    await redisClient_1.default.sadd(`contest:${contestId}:users`, user.id);
    client.on('message', async (data) => {
        try {
            const message = JSON.parse(data.toString());
            if (message.type === 'SUBMIT_ANSWER') {
                const { questionId, answer, isCorrect } = message.payload;
                if (isCorrect) {
                    await (0, fetchContest_1.updateLeaderboard)(contestId, client.userId, 10); // 10 points per correct answer
                }
                // Broadcast update to all users in this contest
                const leaderboard = await (0, fetchContest_1.fetchContestById)(contestId);
                wss.clients.forEach((c) => {
                    const otherClient = c;
                    if (otherClient.readyState === ws_1.WebSocket.OPEN && otherClient.contestId === contestId) {
                        otherClient.send(JSON.stringify({
                            type: 'LEADERBOARD_UPDATE',
                            payload: leaderboard?.leaderboard
                        }));
                    }
                });
            }
        }
        catch (err) {
            console.error('WS Message Error:', err);
        }
    });
    client.on('close', async () => {
        if (client.userId && client.contestId) {
            await redisClient_1.default.srem(`contest:${client.contestId}:users`, client.userId);
        }
    });
});
const PORT = process.env.WS_PORT || 8080;
server.listen(PORT, () => {
    console.log(`WebSocket server running on port ${PORT}`);
});
