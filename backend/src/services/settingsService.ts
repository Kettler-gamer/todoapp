import connection from "../db/db";
import { SettingsUpdate } from "../types/settingsUpdate";

async function getUserSettings(username: string){
    const sql = `
    SELECT settings.theme AS preferredTheme, settings.expireAutomatically, settings.sendReminders, settings.reminderInterval 
    FROM settings 
    INNER JOIN usersettings 
    INNER JOIN users 
    WHERE settings.id = usersettings.settingsId AND usersettings.userID = users.id AND users.username = ?`;

    const result = await connection.promise().query(sql.split("\n").join(""), [username]);

    return result;
}

async function updateSettings(username: string, updates:SettingsUpdate) {
    const columnsUpdate: Array<[string, any]> = new Array<[string, any]>;

    Object.entries(updates).forEach(update => {
        if(update[1] !== undefined){
            columnsUpdate.push([`${update[0]} = ?`, update[1]]);
        }
    })

    const sql = `
    UPDATE settings  
    INNER JOIN usersettings 
    INNER JOIN users 
    SET ${columnsUpdate.map(update => update[0]).join(", ")} 
    WHERE usersettings.settingsID = settings.id AND 
    userSettings.userID = users.id AND 
    users.username = ?;
    `.split("\n").join("");
    
    const result = await connection.promise().query(sql, [...columnsUpdate.map(update => update[1]), username]);

    return result[0];
}

export default { getUserSettings, updateSettings };