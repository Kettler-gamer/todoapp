import { Request, Response } from "express";
import settingsService from "../services/settingsService";
import { RowDataPacket } from "mysql2";
import { SettingsUpdate, Theme } from "../types/settingsUpdate";

async function getSettings(req: Request, res: Response){
    const { jwtPayload } = res.locals; 

    const result = await settingsService.getUserSettings(jwtPayload.username);

    res.send({settings: (result[0] as RowDataPacket)[0]});
}

async function updateSettings(req:Request, res:Response){
    const { jwtPayload } = res.locals;
    const { theme, expireAutomatically, sendReminders, reminderInterval } = req.body;

    const updates: SettingsUpdate = {theme: theme as Theme, expireAutomatically, sendReminders, reminderInterval};

    const result = await settingsService.updateSettings(jwtPayload.username, updates);
}

export default { getSettings, updateSettings };