import { AddTodo } from "../Components/AddTodo";
import { TodoList } from "../Components/TodoList";
import { Todo, User } from "../Types/Types"
import { useNavigate } from "react-router-dom";

interface MainProps {
    user:User
    setUser: (user: User) => void;
}

export function Main({user, setUser}: MainProps): JSX.Element{
    const navigate = useNavigate();

    function addTodo(todo: Todo): void {
        const newUser: User = {...user};
        newUser.todos.push(todo);
        setUser(newUser);
    }

    function onSettingsClick(){
        navigate("/settings");
    }

    return (
    <div>
        <h1>Welcome {user.username}</h1>
        <button onClick={onSettingsClick}>Settings</button>
        <AddTodo addTodo={addTodo} />
        <TodoList user={user}/>
    </div>);
}