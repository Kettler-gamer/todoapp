export type Theme = "DARK" | "LIGHT";

export interface SettingsUpdate {
    theme?: Theme;
    expireAutomatically?: boolean;
    sendReminders?: boolean;
    reminderInterval?: number;
}