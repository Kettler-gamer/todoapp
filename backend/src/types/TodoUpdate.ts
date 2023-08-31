export type TodoState = "NEW" | "UNFINISHED" | "EXPIRED" | "FINISHED"

export interface TodoUpdate {
    title?: string;
    content?: string;
    expiresAt?: string;
    state?: TodoState;
}