"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  NotificationVariant,
  Notification,
  NotificationsContextType,
} from "./types/ProviderTypes";

const NotificationContext = createContext<NotificationsContextType | undefined>(
  undefined
);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const seqRef = useRef(0);

  const addNotification = useCallback(
    (input: Omit<Notification, "id"> & { id?: string }) => {
      const id = input.id ?? `n_${Date.now()}_${seqRef.current++}`;
      setNotifications((prev) => [
        {
          id,
          message: input.message,
          variant: input.variant,
          autoHideMs: input.autoHideMs,
          sticky: input.sticky,
        },
        ...prev.filter((n) => n.id !== id),
      ]);
      return id;
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);
  const upsertNotification = useCallback((input: Notification) => {
    setNotifications((prev) => [
      { ...input },
      ...prev.filter((n) => n.id !== input.id),
    ]);
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
      upsertNotification,
    }),
    [notifications, addNotification, removeNotification, upsertNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
