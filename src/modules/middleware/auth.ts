import type { NextFunction, Request, Response } from "express"
import Jwt, { type JwtPayload } from "jsonwebtoken"
import type { ROLES } from "../../types"
import { pool } from "../../database/db"


const auth = (...roles: ROLES[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized. No token provided."
                })
            }

            const decoded = Jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

            const userData = await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [decoded.email]
            )

            if (userData.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found."
                })
            }

            const user = userData.rows[0]

            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden. You do not have permission to access this resource."
                })
            }

            req.user = user  
            next()

        } catch (error) {
            next(error)
        }
    }
}

export default auth