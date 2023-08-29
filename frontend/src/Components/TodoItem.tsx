import { Todo } from "../Types/Types"

interface TodoItemProps {
    todo: Todo
}

export function TodoItem({todo}: TodoItemProps): JSX.Element {
    return (
    <article>
        <h3>{todo.title}</h3>
        <p>{todo.content}</p>
        <p>Created: {todo.createdAt.toLocaleString()}</p>
        <p>Expires: {todo.expireAt?.toLocaleString() || "No expiration date"}</p>
    </article>)
}