import { pool } from "../../database/db"
import bcrypt from "bcryptjs"
const registerUserInDatabase = async (payload: any) => {
    const { name, email, password, role } = payload
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, COALESCE($4, \'contributor\')) RETURNING *',
        [name, email, hashedPassword, role]
    )
    return result.rows[0]
}

export const authService = {
    registerUserInDatabase
}