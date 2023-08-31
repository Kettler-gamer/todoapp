export type TodoState = "NEW" | "UNFINISHED" | "EXPIRED" | "FINISHED"

export interface TodoUpdate {
    title?: string;
    content?: string;
    expireAt?: Date | null;
    state?: TodoState;
}