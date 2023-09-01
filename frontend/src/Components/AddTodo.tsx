import { ChangeEvent, FormEvent, useState } from "react"
import { Todo } from "../Types/Types"
import { fetchJson } from "../Other/fetchJson";
import { convertToLocalDateFormat } from "../Other/convertDate";

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

    async function onSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        const newTodo: Todo = {
            title: info.title,
            content: info.content,
            createdAt: new Date(),
            expiresAt: info.expireDate || null,
            state: "NEW"
        }

        const result = await fetchJson("/todo/add", "POST", {
            title:info.title, 
            content:info.content, 
            expiresAt: (info.expireDate !== null && info.expireDate !== undefined) ? convertToLocalDateFormat(info.expireDate.toLocaleString()) : null});

        const jsonResult = await result.json();

        if(result.status < 400){
            newTodo.id = jsonResult.todoid[0].id;
            addTodo(newTodo);
            setInfo({title:"", content:""});
            e.currentTarget?.reset();
        }
        console.log(jsonResult.message);
    }

    return (
    <form className="add-todo-form" onSubmit={onSubmit}>
        <h2>Add Todo</h2>
        <input name="title" required value={info.title} onChange={handleChange} placeholder="Title"/>
        <input name="content" required value={info.content} onChange={handleChange} placeholder="Content"/>
        <label htmlFor="expireAt" >Expire at:</label>
        <input id="expireAt" type="datetime-local" onChange={handleDateChange}/>
        <button type="submit">Add Todo</button>
    </form>
    )
}