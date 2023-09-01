import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../Types/Types";

interface HeaderProps {
    user: User | undefined
}

export function Header({user}: HeaderProps) {
    const navigate = useNavigate();
    const href = useLocation();

    function onSettingsClick(){
        navigate("/settings");
    }

    function mainClick(){
        navigate("/main");
    }

    const button = href.pathname === "/main" ? 
    <button onClick={onSettingsClick}>Settings</button> : 
    href.pathname === "/settings" ? 
    <button onClick={mainClick}>Main</button> : undefined

    return (<header className="header">
        <h1>Welcome {user?.username}</h1>
        {user !== undefined && button}
    </header>);
}