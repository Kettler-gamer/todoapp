import { Todo, User, UserRole, UserSetting } from "../Types/Types";
import { fetchJson } from "./fetchJson";

export async function fetchUserData(token: string): Promise<User>{
    const settingsResult = await fetchJson("/user/settings", "GET");
    const settingsJson = await settingsResult.json();

    const userSettings: UserSetting = settingsJson.settings as UserSetting;
            
    const todosResult = await fetchJson("/todo/get", "GET");
    const todosJson = await todosResult.json();

    const payload = JSON.parse(atob(token.split(".")[1]));

    return {
        username: payload.username as string,
        role: payload.role as UserRole,
        todos: todosJson.result as Todo[],
        settings: userSettings
    } as User
}