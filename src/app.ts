import type { Application, Request, Response } from "express"
import express from 'express'
import { authRoute } from "./modules/auth/auth.route"
import { issuesRoute } from "./modules/issues/issues.route"

export const app: Application = express()
export const port = 5000

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/issues', issuesRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment 2')
})
