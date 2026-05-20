import type { JwtPayload } from "jsonwebtoken"
import type { ROLES } from "../types"

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
        name: string
        email: string
        role: ROLES
      } & JwtPayload
    }
  }
}

