import { ChangeEvent, useState } from "react";
import { Todo, TodoState, User } from "../Types/Types"
import { TodoItem } from "./TodoItem"

interface TodoListProps {
    user:User
    updateTodo: (newUser: Todo) => void
}

export function TodoList({user, updateTodo}: TodoListProps): JSX.Element{
    const [querySearch, setQuerySearch] = useState<string>("");
    const [stateSearch, setStateSearch] = useState<TodoState>("ANY");

    function onQueryChange(e:ChangeEvent<HTMLInputElement>){
        setQuerySearch(e.target.value);
    }

    function todoFilter(todo: Todo){
        const queryMatch: boolean = 
            todo.title.includes(querySearch) || todo.content.includes(querySearch);
        return queryMatch;
    }

    return (
    <div className="list-container">
        <div className="todo-search-container">
            <p className="cursor-default">Search fields</p>
            <input value={querySearch} onChange={onQueryChange} placeholder="Search..."/>
            <span>State: <select defaultValue={"ANY"}>
                <option value={"ANY"}>ANY</option>
                <option value={"NEW"}>New</option>
                <option value={"FINISHED"}>Finished</option>
                <option value={"UNFINISHED"}>Unfinished</option>
                <option value={"EXPIRED"}>Expired</option>
                </select>
            </span>
        </div>
        <ul className="todo-list">
            {user.todos.filter(todoFilter).map((todo) => <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo}/>)}
        </ul>
    </div>)
}