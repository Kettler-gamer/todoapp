import { Role } from "./user";

export interface JwtPayload {
    username: string,
    role: Role
}