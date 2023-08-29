export type Theme = "DARK" | "LIGHT";
export type UserRole = "USER" | "ADMIN";
export type TodoState = "NEW" | "UNFINISHED" | "EXPIRED" | "FINISHED"

export interface UserSetting {
  preferredTheme: Theme;
  expireAutomatically: boolean; // set todo to expire if expireAt passed
  sendReminder: boolean; // send close to deadline reminders
  reminderInterval: number; // time in ms to send reminder if sendReminder is true
}

export interface Todo {
  title: string;
  content: string;
  createdAt: Date;
  expireAt: Date | null;
}

export interface User {
  username: string;
  role: UserRole;
  todos: Todo[];
  settings: UserSetting;
}