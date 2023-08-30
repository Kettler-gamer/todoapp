import { ResultSetHeader } from "mysql2";
import connection from "../db/db";

async function createUser(username: string, hashedPassword: string) {
    const sql = `
    INSERT INTO users (username, password, role) VALUES (?, ?, 'USER');
    INSERT INTO settings (theme, expireAutomatically, sendReminders, reminderInterval) VALUES ('DARK', 0, 0, 0);
    INSERT INTO userSettings (userID, settingsID) SELECT MAX(users.id), MAX(settings.id) FROM users INNER JOIN settings;`;

    const result = await connection.promise().query(sql.split("\n").join(""), [username, hashedPassword]);

    return result[0] as ResultSetHeader[] | void;
}

export default { createUser };