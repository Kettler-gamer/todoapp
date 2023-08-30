import { NextFunction, Request, Response } from "express";
import { createError } from "../errorHandler/errorHandler";
import jwtUtil from "../util/jwtUtil";

function checkToken(req:Request, res:Response, next:NextFunction){
    const token = req.headers.authorization;

    if(token === undefined) return createError("Token not provided!", 400, res);

    const payload = jwtUtil.verifyToken(token);

    if(payload){
        res.locals.jwtPayload = payload;
        next();
    }
}

export default {checkToken};