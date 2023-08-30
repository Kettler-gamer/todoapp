import { Response } from "express";

export function createError(message: string, httpCode: number, res: Response) {
    res.status(httpCode).send({message});
}