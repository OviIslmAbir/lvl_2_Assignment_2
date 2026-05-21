import { pool } from "../../database/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import type { User } from "./auth.type"


const registerUserInDatabase = async (payload: User) => {
    const { name, email, password, role } = payload
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, COALESCE($4, \'contributor\')) RETURNING *',
        [name, email, hashedPassword, role]
    )
    return result.rows[0]
}
const loginUserInDatabase = async (payload: { email: string; password: string }) => {
    const { email, password } = payload
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]
    if (!user) {
        throw new Error('User not found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Invalid credentials')
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, { expiresIn: '1d' })
    return { token, user }
}
export const authService = {
    registerUserInDatabase,
    loginUserInDatabase
}