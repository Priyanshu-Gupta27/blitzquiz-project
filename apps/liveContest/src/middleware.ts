import jwt from 'jsonwebtoken'

export const authenticateWS = (token: string): any => {
    try {
        const secret = process.env.JWT_SECRET || 'secret'
        return jwt.verify(token, secret)
    } catch (err) {
        return null
    }
}
