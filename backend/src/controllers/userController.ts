import { Request, Response } from "express";
import userService from "../services/userService";
import bcrypt from "bcrypt";
import { createError } from "../errorHandler/errorHandler";
import { ResultSetHeader } from "mysql2";

async function createUser(req:Request, res:Response) {
    const {username, password} = req.body;

    if(username === undefined || password === undefined) 
        return createError("Bad request!", 400, res);

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    const result: ResultSetHeader[] | void = await userService.createUser(username, hashedPassword).catch(error => console.log(error));
    
    if(result === undefined) return;

    console.log(result[0]);
}

export default { createUser };