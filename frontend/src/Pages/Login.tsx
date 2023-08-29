import { User } from "../Types/Types"
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSetting } from "../Types/Types";

interface LoginProps {
    setUser: (userData: User) => void;
}


export function Login({setUser}: LoginProps): JSX.Element{
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    function onSubmit(e: FormEvent<HTMLFormElement>):void{
        e.preventDefault();

        const userSettings: UserSetting = {
            preferredTheme: "DARK",
            expireAutomatically: false,
            sendReminder: false,
            reminderInterval: 0
        }

        setUser({
            username,
            role: "USER",
            todos: [],
            settings: userSettings
        })

        navigate("/main");
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