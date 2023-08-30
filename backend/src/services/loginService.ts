import connection from "../db/db";

async function getUser(username: string) {
    const sql: string = "SELECT username, password, role FROM users WHERE username = ?";

    const result = await connection.promise().query(sql, [username]);

    return result;
}

export default { getUser };