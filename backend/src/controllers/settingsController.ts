import { Request, Response } from "express";
import settingsService from "../services/settingsService";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { SettingsUpdate, Theme } from "../types/settingsUpdate";

async function getSettings(req: Request, res: Response){
    const { jwtPayload } = res.locals; 

    const result = await settingsService.getUserSettings(jwtPayload.username);

    res.send({settings: (result[0] as RowDataPacket)[0]});
}

async function updateSettings(req:Request, res:Response){
    const { jwtPayload } = res.locals;
    const { preferredTheme, expireAutomatically, sendReminders, reminderInterval } = req.body;

    const updates: SettingsUpdate = {theme: preferredTheme as Theme, expireAutomatically, sendReminders, reminderInterval};

    const result = await settingsService.updateSettings(jwtPayload.username, updates) as ResultSetHeader;

    if(result.affectedRows >= 1){
        res.status(200).send({message:"Settings were updated!"});
    }else{
        res.status(500).send({message:"Something went wrong!"});
    }
}

export default { getSettings, updateSettings };