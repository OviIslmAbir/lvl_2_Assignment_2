import type { Request, Response } from "express"
import { issueService } from "./issues.service"
import { USER_ROLE } from "../../types"

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
const getAllIssues = async (req: Request, res: Response) => {
    try {
        const { sort, type, status } = req.query as {
            sort?: string
            type?: string
            status?: string
        }

        const issues = await issueService.getAllIssuesFromDatabase({ sort, type, status })

        res.status(200).json({
            success: true,
            message: "Issues retrieved successfully",
            data: issues
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve issues"
        })
    }
}
const getIssueById = async (req: Request, res: Response) => {
    try {
        const issueId = parseInt(req.params.id as string)
        const issue = await issueService.getIssueByIdFromDatabase(issueId)

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Issue retrieved successfully",
            data: issue
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve issue"
        })
    }
}
const updateIssue = async (req: Request, res: Response) => {
    try {
        const issueId = Number(req.params.id)
        const user = req.user!

        const issue = await issueService.getIssueByIdFromDatabase(issueId)

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found."
            })
        }

        if (user.role === USER_ROLE.contributor) {
            if (issue.reporter_id !== user.id) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. You can only update your own issues."
                })
            }

            if (issue.status !== "open") {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. You can only update issues with open status."
                })
            }
        }

        const updatedIssue = await issueService.updateIssueInDatabase(issueId, req.body)

        res.status(200).json({
            success: true,
            message: "Issue updated successfully",
            data: updatedIssue
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update issue"
        })
    }
}
const deleteIssue = async (req: Request, res: Response) => {
    try {
        const issueId = Number(req.params.id)

        const issue = await issueService.getIssueByIdFromDatabase(issueId)

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found."
            })
        }

        await issueService.deleteIssueFromDatabase(issueId)

        res.status(200).json({
            success: true,
            message: "Issue deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete issue"
        })
    }
}





export const issueController = {
    createIssue,
    getAllIssues,
    getIssueById,
    updateIssue,
    deleteIssue
}