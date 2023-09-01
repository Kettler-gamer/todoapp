import { Request, Response, NextFunction } from "express";
import { createError } from "../errorHandler/errorHandler";
import { isUndefinedOrNull } from "./loginFilter";
import { isStringEmpty } from "./todoFilter";

function updateFilter(req: Request, res: Response, next: NextFunction){
    const { preferredTheme, expireAutomatically, sendReminders, reminderInterval } = req.body;
    
    if((isUndefinedOrNull(preferredTheme) || isStringEmpty(preferredTheme)) && 
    isUndefinedOrNull(expireAutomatically) &&
    isUndefinedOrNull(sendReminders) &&
    isUndefinedOrNull(reminderInterval)
    )
        return createError("No updates provided!", 400, res);

    next();
}

export default { updateFilter }