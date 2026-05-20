import type { Application, Request, Response } from "express"
import express from 'express'

export const app: Application = express()
export const port = 5000

app.use(express.json())


app.get('/', (req: Request, res: Response) => {
  res.send('Assignment 2')
})
