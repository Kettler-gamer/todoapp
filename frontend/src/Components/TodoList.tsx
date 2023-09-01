import { Todo, User } from "../Types/Types"
import { TodoItem } from "./TodoItem"

interface TodoListProps {
    user:User
    updateTodo: (newUser: Todo) => void
}

export function TodoList({user, updateTodo}: TodoListProps): JSX.Element{
    return (
    <div className="todo-list">
        {user.todos.map((todo, index) => <TodoItem key={`todo-${index}`} todo={todo} updateTodo={updateTodo}/>)}
    </div>)
}