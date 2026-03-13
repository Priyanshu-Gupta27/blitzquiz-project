import express from 'express'
import { prisma } from '@blitzquiz/database'
import { createContestSchema } from '../validators'
import { generateAIQuestions } from '../services/generateAIres'

export const createContest = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { title, description, startTime, endTime } = createContestSchema.parse(req.body)
        const adminId = (req as any).user.id

        const contest = await prisma.contest.create({
            data: {
                title,
                description,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                adminId
            }
        })

        res.status(201).json(contest)
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
}

export const getContests = async (req: express.Request, res: express.Response): Promise<void> => {
    const contests = await prisma.contest.findMany({
        include: { _count: { select: { questions: true } } }
    })
    res.json(contests)
}

export const addAIQuestions = async (req: express.Request, res: express.Response): Promise<void> => {
    const { contestId, topic, count } = req.body
    const questions = await generateAIQuestions(topic, count)

    if (questions.length === 0) {
        res.status(500).json({ message: 'Failed to generate questions' })
        return
    }

    const createdQuestions = await Promise.all(
        questions.map((q: any) =>
            prisma.mCQ.create({
                data: {
                    ...q,
                    contestId
                }
            })
        )
    )

    res.json(createdQuestions)
}
