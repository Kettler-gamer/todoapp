import { ChangeEvent, FormEvent, useState } from "react"
import { Todo } from "../Types/Types"

interface AddTodoProps {
    addTodo: (todo: Todo) => void
}

export function AddTodo({addTodo}: AddTodoProps): JSX.Element {
    const [info, setInfo] = useState<{title: string, content: string, expireDate?: Date}>({title:"", content:""});

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const property: string = e.target.name;
        setInfo({...info, [property]: e.target.value});
    }

    function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
        const expireDate = new Date(e.target.value);
        setInfo({...info, expireDate});
    }

    function onSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        const newTodo: Todo = {
            title: info.title,
            content: info.content,
            createdAt: new Date(),
            expireAt: info.expireDate || null
        }

        addTodo(newTodo);

        setInfo({title:"", content:""});

        e.currentTarget.reset();
    }

    return (
    <div>
        <h2>Add Todo</h2>
        <form onSubmit={onSubmit}>
            <input name="title" required value={info.title} onChange={handleChange} placeholder="title"/>
            <input name="content" required value={info.content} onChange={handleChange} placeholder="content"/>
            <label htmlFor="expireAt" >Expire at</label>
            <input id="expireAt" type="datetime-local" onChange={handleDateChange}/>
            <button type="submit">Add Todo</button>
        </form>
    </div>)
}