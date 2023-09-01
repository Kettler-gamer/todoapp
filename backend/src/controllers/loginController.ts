import { Request, Response } from "express";
import loginService from "../services/loginService";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";
import { User } from "../types/user";
import jwtUtil from "../util/jwtUtil";
import { createError } from "../errorHandler/errorHandler";

async function login(req:Request, res: Response) {
    const {username, password} = req.body;

    const userResult = await loginService.getUser(username)
        .catch(error => console.log(error));

    if(userResult === undefined) return createError("Server error", 500, res);

    const row = (userResult[0] as RowDataPacket);
        
    if(row.length === 0) return createError("Incorrect username or password!", 400, res);
        
    const user: User = row[0] as User;

    const match = await bcrypt.compare(password, user.password!);

    if(!match) return createError("Incorrect username or password!", 400, res);

    const token = jwtUtil.createToken({username, role: user.role});

    res.send({message:"You logged in!", token});
}

export default {login};