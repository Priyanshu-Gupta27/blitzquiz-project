import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export const generateAIQuestions = async (topic: string, count: number = 5) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `Generate ${count} multiple-choice questions about ${topic}. 
  Return the output as a JSON array of objects, where each object has:
  - "question": string
  - "options": array of 4 strings
  - "correctOption": integer (0-3)
  - "solution": string explaining why the answer is correct.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Basic parsing (in production, use a more robust JSON extraction)
    try {
        return JSON.parse(text)
    } catch (err) {
        console.error('Gemini Parsing Error:', err)
        return []
    }
}
