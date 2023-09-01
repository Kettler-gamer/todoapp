import { User } from "../Types/Types"
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJson } from "../Other/fetchJson";
import { fetchUserData } from "../Other/fetchUserData";

interface LoginProps {
    setUser: (userData: User) => void;
}


export function Login({setUser}: LoginProps): JSX.Element{
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [serverMessage, setServerMessage] = useState<string>("");
    const navigate = useNavigate();

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setServerMessage("");

        const result = await fetchJson("/auth/login", "POST", {username, password});
        const json = await result.json();

        if(result.status < 400){
            sessionStorage.setItem("token", json.token);

            const user = await fetchUserData(json.token);

            setUser(user);

            navigate("/main");
        }

        setServerMessage(json.message);
    }

    function handleChange(value: string, setter: (value:string) => void){
        setter(value);
    }

    return (
        <form onSubmit={onSubmit} className="login-form">
            <h2>Login</h2>
            <input required placeholder="Username" value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, setUsername)}/>
            <input required placeholder="Password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, setPassword)} type="password"/>
            <button type="submit">Login</button>
            <p className="server-message">{serverMessage}</p>
        </form>
        )
}