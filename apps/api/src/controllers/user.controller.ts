import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@blitzquiz/database'
import { signupSchema, loginSchema } from '../validators'

export const signup = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const validatedData = signupSchema.parse(req.body)
        const { email, password, name } = validatedData

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name }
        })

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' })
        res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
}

export const login = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { email, password } = loginSchema.parse(req.body)

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' })
        res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
}
