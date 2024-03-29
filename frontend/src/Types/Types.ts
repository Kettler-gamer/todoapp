export type Theme = "DARK" | "LIGHT";
export type UserRole = "USER" | "ADMIN";
export type TodoState = "NEW" | "UNFINISHED" | "EXPIRED" | "FINISHED" | "ANY"

export interface UserSetting {
  preferredTheme: Theme;
  expireAutomatically: boolean; // set todo to expire if expireAt passed
  sendReminders: boolean; // send close to deadline reminders
  reminderInterval: number; // time in ms to send reminder if sendReminder is true
}

export interface Todo {
  id?: number;
  title: string;
  content: string;
  createdAt: Date;
  expiresAt: Date | null;
  state: TodoState;
}

export interface User {
  username: string;
  role: UserRole;
  todos: Todo[];
  settings: UserSetting;
}