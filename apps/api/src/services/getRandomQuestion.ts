import { prisma } from '@blitzquiz/database'

export const getRandomQuestions = async (count: number = 10) => {
    const total = await prisma.mCQ.count()
    const randomIndices = Array.from({ length: count }, () => Math.floor(Math.random() * total))

    // This is a simplified random fetch for small datasets
    const questions = await prisma.mCQ.findMany({
        take: count,
        skip: Math.max(0, Math.floor(Math.random() * (total - count))),
    })

    return questions
}
