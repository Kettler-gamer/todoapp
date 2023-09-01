import { ResultSetHeader } from "mysql2";
import connection from "../db/db";
import { TodoUpdate } from "../types/TodoUpdate";

async function addNewTodo(username:string, newTodo: AddTodo): Promise<ResultSetHeader[]> {
    const columnsUpdate: Array<[string, any]> = new Array<[string, any]>;

    Object.entries(newTodo).forEach(update => {
        if(update[1] !== undefined && update[1] !== null){
            columnsUpdate.push([`${update[0]}`, update[1]]);
        }
    })

    const currentDate = new Date().toLocaleString();
    
    const sql = `
    INSERT INTO todos (${columnsUpdate.map(up => up[0]).join(", ")}, createdAt, state) 
    VALUES (${columnsUpdate.map(() => "?").join(", ")}, '${currentDate}', 'NEW');
    INSERT INTO usertodos (todoID, userID) SELECT MAX(todos.id), users.id FROM todos 
    INNER JOIN users WHERE username = ?;
    SELECT MAX(id) AS id FROM todos;`.split("\n").join("");

    const result = await connection.promise().query(sql, 
        [...columnsUpdate.map(up => up[1]), username]);

    return result[0] as ResultSetHeader[];
}

async function getTodos(username: string){
    const sql = `
    SELECT todos.id, title, content, createdAt, expiresAt, state FROM todos 
    INNER JOIN usertodos 
    INNER JOIN users
    WHERE users.username = ? AND
    users.id = usertodos.userID AND
    usertodos.todoID = todos.id`.split("\n").join("");

    const result = await connection.promise().query(sql, [username]);

    return result[0];
}

async function updateTodo(username: string, id:number, todoUpdates: TodoUpdate): Promise<ResultSetHeader> {
    const columnsUpdate: Array<[string, any]> = new Array<[string, any]>;

    Object.entries(todoUpdates).forEach(update => {
        if(update[1] !== undefined){
            columnsUpdate.push([`todos.${update[0]} = ?`, update[1]]);
        }
    })
    
    const sql = `
    UPDATE todos 
    JOIN usertodos ON todos.id = usertodos.todoID 
    JOIN users ON usertodos.userID = users.id AND todos.id = ? AND users.username = ? 
    SET ${columnsUpdate.map(upd => upd[0]).join(", ")}`.split("\n").join("");

    const result = await connection.promise().query(sql, [id, username, ...columnsUpdate.map(upd => upd[1])]);

    return result[0] as ResultSetHeader;
}

export default { addNewTodo, getTodos, updateTodo };