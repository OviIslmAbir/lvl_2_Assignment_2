import type { Application, NextFunction, Request, Response } from "express"
import express from 'express'
import { authRoute } from "./modules/auth/auth.route"
import { issuesRoute } from "./modules/issues/issues.route"
import dotenv from "dotenv"

dotenv.config()

export const app: Application = express()
export const port = process.env.PORT 

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/issues', issuesRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment 2')
})
app.use((err: any, req: Request, res:Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: err.message,
  })
});
