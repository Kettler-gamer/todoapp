import { ChangeEvent } from "react";
import { Todo, TodoState } from "../Types/Types"
import { fetchJson } from "../Other/fetchJson";

interface TodoItemProps {
    todo: Todo
    updateTodo: (todo: Todo) => void
}

export function TodoItem({todo, updateTodo}: TodoItemProps): JSX.Element {

    async function onStateChange(e:ChangeEvent<HTMLSelectElement>){
        const newTodo = todo;
        const state = e.target.value as TodoState;
        newTodo.state = state;
        
        const result = await fetchJson("/todo/update", "PATCH", {id:todo.id, state});

        const json = await result.json();

        if(result.status < 400){
            updateTodo(newTodo);
        }else{
            console.log(json.message);
        }
    }

    return (
    <article>
        <h3>{todo.title}</h3>
        <p>{todo.content}</p>
        <p>Created: {todo.createdAt.toLocaleString()}</p>
        <p>Expires: {todo.expireAt?.toLocaleString() || "No expiration date"}</p>
        <p>Status: 
            <select defaultValue={todo.state} onChange={onStateChange}>
                <option value={"FINISHED"}>FINISHED</option>
                <option value={"UNFINISHED"}>UNFINISHED</option>
                <option value={"EXPIRED"}>EXPIRED</option>
                <option value={"NEW"}>NEW</option>
            </select>
            </p>
    </article>)
}