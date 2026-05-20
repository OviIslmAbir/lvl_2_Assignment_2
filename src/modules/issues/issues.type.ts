export type IssueType = "bug" | "feature"
export type IssueStatus = "open" | "in_progress" | "closed"

export interface Issue {
    title: string
    description: string
    type: IssueType
}