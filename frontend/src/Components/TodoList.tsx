import { User } from "../Types/Types"
import { TodoItem } from "./TodoItem"

interface TodoListProps {
    user:User
}

export function TodoList({user}: TodoListProps): JSX.Element{
    return (
    <div>
        {user.todos.map((todo, index) => <TodoItem key={`todo-${index}`} todo={todo}/>)}
    </div>)
}