import { Request, Response } from "express";
import userService from "../services/userService";
import bcrypt from "bcrypt";
import { createError } from "../errorHandler/errorHandler";
import { ResultSetHeader } from "mysql2";
import userErrorHandler from "../errorHandler/userErrorHandler";

async function createUser(req:Request, res:Response) {
    const {username, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    const result: ResultSetHeader[] | void = await userService.createUser(username, hashedPassword)
        .catch((error) => userErrorHandler.createUserError(error, res));
    
    if(result === undefined) return;

    if(result[0].affectedRows !== 1) return createError("Server error!", 500, res);

    res.status(201).send({message:"The account was created successfully!"});
}

export default { createUser };