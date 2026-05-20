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
const getAllIssuesFromDatabase = async (query: {
    sort?: string | undefined
    type?: string | undefined
    status?: string | undefined
}) => {
    const { sort = "newest", type, status } = query

    const conditions: string[] = []
    const values: string[] = []
    let paramCount = 1

    if (type) {
        conditions.push(`type = $${paramCount}`)
        values.push(type)
        paramCount++
    }

    if (status) {
        conditions.push(`status = $${paramCount}`)
        values.push(status)
        paramCount++
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""
    const orderClause = sort === "oldest" ? "ASC" : "DESC"

    const result = await pool.query(
        `SELECT * FROM issues ${whereClause} ORDER BY created_at ${orderClause}`,
        values
    )

    return result.rows
}

export const issueService = {
    createIssueInDatabase,
    getAllIssuesFromDatabase
}
