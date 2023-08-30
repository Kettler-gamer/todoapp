import { Request, Response } from "express";
import todoService from "../services/todoService";
import { ResultSetHeader } from "mysql2";
import { createError } from "../errorHandler/errorHandler";

async function addTodo(req:Request, res:Response){
    const {username} = res.locals.jwtPayload;
    const newTodo: AddTodo = req.body;

    const result: ResultSetHeader[] = (await todoService.addNewTodo(username, newTodo)
        .catch(error => console.log(error))) as ResultSetHeader[];
    
    if(result[0].affectedRows === 1 && result[1].affectedRows === 1){
        res.status(201).send({message: "The todo was added!"});
    }else{
        createError("Something went wrong!", 500, res);
    }
}

async function getTodos(req:Request, res:Response){
    const {username} = res.locals.jwtPayload;

    const result = await todoService.getTodos(username).catch(error => console.log(error));
    
    res.status(200).send({result});
}

export default {addTodo, getTodos};