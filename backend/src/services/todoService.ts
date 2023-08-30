import { ResultSetHeader } from "mysql2";
import connection from "../db/db";

async function addNewTodo(username:string, newTodo: AddTodo): Promise<ResultSetHeader[]> {
    const columnsUpdate: Array<[string, any]> = new Array<[string, any]>;

    Object.entries(newTodo).forEach(update => {
        if(update[1] !== undefined){
            columnsUpdate.push([`${update[0]}`, update[1]]);
        }
    })

    const currentDate = new Date().toLocaleString();
    
    const sql = `
    INSERT INTO todos (${columnsUpdate.map(up => up[0]).join(", ")}, createdAt, state) 
    VALUES (${columnsUpdate.map(() => "?").join(", ")}, '${currentDate}', 'NEW');
    INSERT INTO usertodos (todoID, userID) SELECT MAX(todos.id), users.id FROM todos 
    INNER JOIN users WHERE username = ?`.split("\n").join("");

    const result = await connection.promise().query(sql, 
        [...columnsUpdate.map(up => up[1]), username]);

    return result[0] as ResultSetHeader[];
}

export default { addNewTodo };