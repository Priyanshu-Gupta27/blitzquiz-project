import express from 'express'
import cors from 'cors'
import { signup, login } from './controllers/user.controller'
import { createContest, getContests, addAIQuestions } from './controllers/contest.controller'
import { authMiddleware, adminMiddleware } from './middlewares'

const app = express()

app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req: express.Request, res: express.Response) => res.json({ status: 'ok' }))

// Auth Routes
app.post('/api/auth/signup', signup)
app.post('/api/auth/login', login)

// Contest Routes
app.get('/api/contests', getContests)
app.post('/api/contests', authMiddleware, adminMiddleware, createContest)
app.post('/api/contests/ai-gen', authMiddleware, adminMiddleware, addAIQuestions)

export default app
