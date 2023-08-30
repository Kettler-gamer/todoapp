import { Todo, User } from "../Types/Types"
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSetting } from "../Types/Types";
import { fetchJson } from "../Other/fetchJson";

interface LoginProps {
    setUser: (userData: User) => void;
}


export function Login({setUser}: LoginProps): JSX.Element{
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = await fetchJson("/auth/login", "POST", {username, password});
        const json = await result.json();

        if(result.status < 400){
            sessionStorage.setItem("token", json.token);

            const settingsResult = await fetchJson("/user/settings", "GET");
            const settingsJson = await settingsResult.json();

            const userSettings: UserSetting = settingsJson.settings as UserSetting;
            
            const todosResult = await fetchJson("/todo/get", "GET");
            const todosJson = await todosResult.json();

            const payload = JSON.parse(atob(json.token.split(".")[1]));

            setUser({
                username,
                role: payload.role,
                todos: todosJson.result as Todo[],
                settings: userSettings
            })

            navigate("/main");
        }
    }

    function handleChange(value: string, setter: (value:string) => void){
        setter(value);
    }

    return (<div>
        <form onSubmit={onSubmit}>
            <input required placeholder="username" value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, setUsername)}/>
            <input required placeholder="password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, setPassword)} type="password"/>
            <button type="submit">Login</button>
        </form>
        </div>)
}