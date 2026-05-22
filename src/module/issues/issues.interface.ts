export const ISSUE_TYPES = {
  BUG: "bug",
  FEATURE_REQUEST: "feature_request",
} as const;

export type IssueType = (typeof ISSUE_TYPES)[keyof typeof ISSUE_TYPES];

export const ISSUE_STATUS = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
} as const;

export type IssueStatus = (typeof ISSUE_STATUS)[keyof typeof ISSUE_STATUS];

export interface IIssue {
  id?: number;
  title: string;
  description: string;
  type: IssueType;
  status?: IssueStatus;
}
