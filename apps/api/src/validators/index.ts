import { z } from 'zod'

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const createContestSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
})

export const submitAnswerSchema = z.object({
    contestId: z.string().uuid(),
    questionId: z.string().uuid(),
    answer: z.number().int().min(0).max(3),
})
