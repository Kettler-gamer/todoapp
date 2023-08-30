import { Response } from "express";
import { createError } from "./errorHandler";
import { ErrorPacketParams } from "mysql2";

function createUserError(error: ErrorPacketParams, res: Response){
    switch(error.code){
        case "ER_DUP_ENTRY":
            createError("A user with that username already exists!", 400, res);
            break;
        default: 
            console.error(error);
            createError("Server error!", 500, res);
            break;
    }
}

export default {createUserError};