import express from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        res.status(401).json({ message: 'Auth token missing' })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
            ; (req as any).user = decoded
        next()
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' })
    }
}

export const adminMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if ((req as any).user?.role !== 'ADMIN') {
        res.status(403).json({ message: 'Admin access required' })
        return
    }
    next()
}
