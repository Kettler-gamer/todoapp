export type Role = "ADMIN" | "USER";

export interface User {
    username: string,
    password?: string,
    role: Role
}