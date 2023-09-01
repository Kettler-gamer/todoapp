import { AddTodo } from "../Components/AddTodo";
import { TodoList } from "../Components/TodoList";
import { Todo, User } from "../Types/Types"

interface MainProps {
    user:User
    setUser: (user: User) => void;
}

export function Main({user, setUser}: MainProps): JSX.Element{

    function addTodo(todo: Todo): void {
        const newUser: User = {...user};
        newUser.todos.push(todo);
        setUser(newUser);
    }

    function updateTodo(todoUpdate: Todo){
        const newUser = user;
        newUser.todos = newUser.todos.map(todo => {
            if(todo === todoUpdate){
                return todoUpdate
            }
            return todo;
        })
    }

    return (
    <div>
        <AddTodo addTodo={addTodo} />
        <TodoList user={user} updateTodo={updateTodo}/>
    </div>);
}