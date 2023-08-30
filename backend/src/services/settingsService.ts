import connection from "../db/db";

async function getUserSettings(username: string){
    const sql = `
    SELECT settings.theme, settings.expireAutomatically, settings.sendReminders, settings.reminderInterval 
    FROM settings 
    INNER JOIN usersettings 
    INNER JOIN users 
    WHERE settings.id = usersettings.settingsId AND usersettings.userID = users.id AND users.username = ?`;

    const result = await connection.promise().query(sql.split("\n").join(""), [username]);

    return result;
}

export default { getUserSettings };