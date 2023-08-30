import { Request, Response } from "express";
import settingsService from "../services/settingsService";
import { RowDataPacket } from "mysql2";

async function getSettings(req: Request, res: Response){
    const { jwtPayload } = res.locals; 

    const result = await settingsService.getUserSettings(jwtPayload.username);

    res.send({settings: (result[0] as RowDataPacket)[0]});
    
}

export default { getSettings };