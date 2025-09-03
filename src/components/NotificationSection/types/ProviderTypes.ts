export type NotificationVariant = "info" | "success" | "warning" | "error";
export interface Notification {
    id: string;
    variant: NotificationVariant;
    message: string;
    autoHideMs?: number;
    sticky?: boolean;
}
export interface NotificationsContextType {
    notifications: Notification[];
    addNotification: (input: Omit<Notification, "id"> & { id?: string }) => string;
    removeNotification: (id: string) => void;
    upsertNotification: (input: Notification) => void;
}