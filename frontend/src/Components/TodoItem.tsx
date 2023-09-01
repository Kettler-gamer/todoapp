import { ChangeEvent, useState } from "react";
import { Todo, TodoState } from "../Types/Types"
import { fetchJson } from "../Other/fetchJson";
import { convertToLocalDateFormat } from "../Other/convertDate";

interface TodoItemProps {
    todo: Todo
    updateTodo: (todo: Todo) => void
}

export function TodoItem({todo, updateTodo}: TodoItemProps): JSX.Element {
    const [title, setTitle] = useState<string>(todo.title);
    const [editTitle, setEditTitle] = useState<boolean>(false);

    const [content, setContent] = useState<string>(todo.content);
    const [editContent, setEditContent] = useState<boolean>(false);

    const [expireAt, setExpireAt] = useState<Date | null>(todo.expiresAt);
    const [editExpireAt, setEditExpireAt] = useState<boolean>(false);

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

    function titleEditSwitch(){
        setEditTitle(!editTitle);
    }

    function onTitleValueChanged(e: ChangeEvent<HTMLInputElement>){
        setTitle(e.target.value);
    }

    async function onTitleEditBlur(){
        setEditTitle(false);

        if(title === todo.title) return;

        const result = await fetchJson("/todo/update", "PATCH", {id:todo.id, title});

        const json = await result.json();

        console.log(json.message);
    }

    function contentEditSwitch(){
        setEditContent(!editContent);
    }

    function onContentValueChanged(e: ChangeEvent<HTMLInputElement>){
        setContent(e.target.value);
    }

    async function onContentEditBlur(){
        setEditContent(false);

        if(content === todo.content) return;

        const result = await fetchJson("/todo/update", "PATCH", {id:todo.id, content});

        const json = await result.json();

        console.log(json.message);
    }

    function expireAtSwitch(){
        setEditExpireAt(!editExpireAt);
    }

    function onExpireAtValueChanged(e: ChangeEvent<HTMLInputElement>){
        const date = new Date(e.target.value);
        console.log(date.toLocaleString());
        setExpireAt(date);
    }

    async function onExpireAtBlur(){
        setEditExpireAt(false);

        if(expireAt === null || expireAt === todo.expiresAt) return;

        const result = await fetchJson("/todo/update", "PATCH", {
            id:todo.id, 
            expiresAt: convertToLocalDateFormat(expireAt.toLocaleString())
        });

        const json = await result.json();

        if(result.status < 400){
            todo.expiresAt = expireAt;
            updateTodo(todo);
        }

        console.log(json.message);
    }

    const titleElement = editTitle ? 
        <input autoFocus onBlur={onTitleEditBlur} value={title} onChange={onTitleValueChanged}/> : 
        <h3 className="cursor-pointer" onClick={titleEditSwitch}>{title}</h3>;

    const contentElement = editContent ? 
        <input autoFocus onBlur={onContentEditBlur} value={content} onChange={onContentValueChanged}/> : 
        <p className="cursor-pointer" onClick={contentEditSwitch}>{content}</p>

    const expireAtElement = editExpireAt ? <input autoFocus type="datetime-local" onChange={onExpireAtValueChanged} onBlur={onExpireAtBlur}/> : 
        <span className="cursor-pointer" onClick={expireAtSwitch}>{todo.expiresAt !== null ? 
            convertToLocalDateFormat(todo.expiresAt.toLocaleString()) : 
        "No expiration date"}</span>;

    return (<li>
        <article className="todo-item">
        {titleElement}
        {contentElement}
        <p className="created-at-text cursor-default">Created: {convertToLocalDateFormat(todo.createdAt.toLocaleString())}</p>
        <p className="cursor-default">Expires: {expireAtElement}</p>
        <p className="cursor-default">Status: 
            <select className="cursor-pointer" defaultValue={todo.state} onChange={onStateChange}>
                <option value={"FINISHED"}>FINISHED</option>
                <option value={"UNFINISHED"}>UNFINISHED</option>
                <option value={"EXPIRED"}>EXPIRED</option>
                <option value={"NEW"}>NEW</option>
            </select>
            </p>
        </article>
    </li>);
}