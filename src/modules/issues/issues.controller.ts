import type { Request, Response } from "express"
import { issueService } from "./issues.service"

const createIssue = async (req: Request, res: Response) => {
    try {
        const reporterId = req.user?.id
        if (!reporterId) {
            return res.status(400).json({
                success: false,
                message: "Reporter ID is required"
            })
        }

        const issue = await issueService.createIssueInDatabase(req.body, reporterId)

        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: issue
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create issue"
        })
    }
}

export const issueController = {
    createIssue
}