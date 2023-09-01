import { Request, Response, NextFunction } from "express";
import { createError } from "../errorHandler/errorHandler";
import { isStringEmpty } from "./todoFilter";

export function usernamePasswordFilter(req: Request, res: Response, next: NextFunction) {
    const {username, password} = req.body;
    
    if((isUndefinedOrNull(username) || isStringEmpty(username)) || 
    (isUndefinedOrNull(password) || isStringEmpty(password)))
        return createError("Username or password not provided!", 400, res);

    next();
}

export function confirmPasswordFilter(req: Request, res: Response, next: NextFunction) {
    const {password, confirmPassword} = req.body;

    if(isUndefinedOrNull(confirmPassword) || isStringEmpty(confirmPassword))
        return createError("confirmPassword not provided!", 400, res);

    if(password !== confirmPassword)
        return createError("Passwords do not match!", 400, res);

    next();
}

export function isUndefinedOrNull(prop: any){
    return prop === undefined || prop === null;
}