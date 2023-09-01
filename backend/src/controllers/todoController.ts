import { Request, Response } from "express";
import todoService from "../services/todoService";
import { ResultSetHeader } from "mysql2";
import { createError } from "../errorHandler/errorHandler";
import { TodoUpdate } from "../types/TodoUpdate";

async function addTodo(req:Request, res:Response) {
    const {username} = res.locals.jwtPayload;
    const {title, content, expiresAt} = req.body;

    const newTodo: AddTodo = {title, content, expiresAt};

    const result: ResultSetHeader[] = (await todoService.addNewTodo(username, newTodo)
        .catch(error => console.log(error))) as ResultSetHeader[];

    if(result === undefined) return createError("Something went wrong!", 500, res);
    
    if(result[0].affectedRows === 1 && result[1].affectedRows === 1){
        res.status(201).send({message: "The todo was added!", todoid:result[2]});
    }else{
        createError("Something went wrong!", 500, res);
    }
}

async function getTodos(req:Request, res:Response) {
    const {username} = res.locals.jwtPayload;

    const result = await todoService.getTodos(username)
        .catch(error => console.log(error));

    if(result === undefined) return createError("Something went wrong!", 500, res);
    
    res.status(200).send({result});
}

async function updateTodo(req:Request, res:Response) {
    const {username} = res.locals.jwtPayload;
    const {id, title, content, expiresAt, state} = req.body;

    const todoUpdate: TodoUpdate = { title, content, expiresAt, state };

    const result: ResultSetHeader = await todoService.updateTodo(username, id, todoUpdate)
        .catch(error => console.log(error)) as ResultSetHeader;

    if(result === undefined) return createError("Something went wrong!", 500, res);
    
    if(result.changedRows > 0){
        res.status(200).send({message:"The todo was updated!"});
    }else{
        res.status(400).send({message:"The todo was not updated!"});
    }
}

export default {addTodo, getTodos, updateTodo};