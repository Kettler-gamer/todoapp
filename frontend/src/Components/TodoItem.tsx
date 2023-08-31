import { ChangeEvent } from "react";
import { Todo, TodoState } from "../Types/Types"

interface TodoItemProps {
    todo: Todo
    updateTodo: (todo: Todo) => void
}

export function TodoItem({todo, updateTodo}: TodoItemProps): JSX.Element {

    function onStateChange(e:ChangeEvent<HTMLSelectElement>){
        const newTodo = todo;
        newTodo.state = e.target.value as TodoState;
        updateTodo(newTodo);
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