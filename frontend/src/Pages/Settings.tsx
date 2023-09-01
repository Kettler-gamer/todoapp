import { ChangeEvent, useState } from "react";
import { Theme, User, UserSetting } from "../Types/Types"
import { useNavigate } from "react-router-dom";
import { fetchJson } from "../Other/fetchJson";

interface SettingsProps {
    user: User,
    setUser: (user: User) => void
}

export function Settings({user, setUser}: SettingsProps): JSX.Element {
    const [settings, setSettings] = useState<UserSetting>(user.settings);

    const navigate = useNavigate();

    function handleExpireAutomaticallyChange(e: ChangeEvent<HTMLInputElement>) {
        const expireAutomatically = e.target.checked;
        setSettings( {...settings, expireAutomatically } );
    }
    
    function handleSendReminderChange(e: ChangeEvent<HTMLInputElement>) {
        const sendReminders = e.target.checked;
        setSettings( {...settings, sendReminders } );
    }

    function handleReminderIntervalChange(e: ChangeEvent<HTMLInputElement>) {
        const reminderInterval = e.target.valueAsNumber;
        setSettings( {...settings, reminderInterval } );
    }

    function handleThemeChange(e: ChangeEvent<HTMLSelectElement>) {
        const preferredTheme = e.target.value.toUpperCase() as Theme;
        console.log(preferredTheme);
        
        setSettings( {...settings, preferredTheme } );
    }

    async function saveClick(){
        const result = await fetchJson("/settings/update", "PATCH", {...settings});

        const jsonResult = await result.json();

        if(result.status < 400){
            setUser({...user, settings});
        }

        console.log(jsonResult.message);
    }

    function mainClick(){
        navigate("/main");
    }

    return (
    <div>
        <h1>{user.username}s Settings</h1>
        <button onClick={mainClick}>Main</button>
        <p>Expire Automatically <input type="checkbox" onChange={handleExpireAutomaticallyChange} checked={settings.expireAutomatically}/></p>
        <p>Send reminder <input type="checkbox" onChange={handleSendReminderChange} checked={settings.sendReminders}/></p>
        <p>Reminder interval <input type="number" onChange={handleReminderIntervalChange} value={settings.reminderInterval}/></p>
        <p>Theme <select defaultValue={settings.preferredTheme} onChange={handleThemeChange}>
            <option value={"DARK"}>Dark</option>
            <option value={"LIGHT"}>Light</option>
            </select></p>
            <button onClick={saveClick}>Save settings</button>
    </div>)
}