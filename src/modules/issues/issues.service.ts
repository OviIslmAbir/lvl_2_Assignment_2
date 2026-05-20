import { pool } from "../../database/db"
import type { Issue } from "./issues.type"


const createIssueInDatabase = async (payload: Issue, reporterId: number) => {
    const { title, description, type } = payload
    const result = await pool.query(
        `INSERT INTO issues (title, description, type, status, reporter_id)
         VALUES ($1, $2, $3, 'open', $4)
         RETURNING *`,
        [title, description, type, reporterId]
    )
    return result.rows[0]
}

export const issueService = {
    createIssueInDatabase
}