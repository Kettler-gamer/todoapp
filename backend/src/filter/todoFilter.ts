import { Request, Response, NextFunction } from "express";
import { createError } from "../errorHandler/errorHandler";
import { isUndefinedOrNull } from "./loginFilter";

function addFilter(req: Request, res: Response, next: NextFunction){
    const {title, content} = req.body;
    
    if((isUndefinedOrNull(title) || isStringEmpty(title)) || 
    (isUndefinedOrNull(content) || isStringEmpty(content)))
        return createError("Title or content not provided!", 400, res);

    next();
}

function updateFilter(req: Request, res: Response, next: NextFunction){
    const {id, title, content, expiresAt, state} = req.body;

    if(id === undefined) return createError("id not provided!", 400, res);

    if(
        (isUndefinedOrNull(title) || isStringEmpty(title)) && 
        (isUndefinedOrNull(content) || isStringEmpty(content)) && 
        (isUndefinedOrNull(expiresAt) || isStringEmpty(expiresAt)) && 
        (isUndefinedOrNull(state) || isStringEmpty(state))
    ) return createError("No updates provided!", 400, res);

    next();
}

export function isStringEmpty(prop: string){
    return prop.length === 0;
}

export default { addFilter, updateFilter }