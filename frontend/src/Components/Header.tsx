import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../Types/Types";

interface HeaderProps {
    user: User | undefined;
    setUser: (user: undefined) => void;
}

export function Header({user, setUser}: HeaderProps) {
    const navigate = useNavigate();
    const href = useLocation();

    function onSettingsClick(){
        navigate("/settings");
    }

    function mainClick(){
        navigate("/main");
    }

    function logoutClick(){
        sessionStorage.clear();
        setUser(undefined);
        navigate("/");
    }

    const logoutBtn = <button onClick={logoutClick}>Logout</button>

    const button = href.pathname === "/main" ? 

    <><button onClick={onSettingsClick}>Settings</button>{logoutBtn}</> : 

    href.pathname === "/settings" ? 

    <><button onClick={mainClick}>Main</button>{logoutBtn}</> : 

    undefined;
    

    return (<header className="header">
        <h1>Welcome {user?.username}</h1>
        <div className="header-btns">{user !== undefined && button}</div>
    </header>);
}