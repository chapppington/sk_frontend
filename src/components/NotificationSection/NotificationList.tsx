"use client"

import { Notification } from "./types/ProviderTypes"
import { useNotification } from "./NotificationProvider";
import { useEffect } from "react";


function NotificationItem({notification}: {notification: Notification}) {
    const { removeNotification } = useNotification();

    useEffect(() => {
    if (!notification.autoHideMs || notification.sticky) return;
    const id = setTimeout(() => removeNotification(notification.id), notification.autoHideMs);
    return () => clearTimeout(id);
  }, [notification.autoHideMs, notification.sticky, notification.id, removeNotification]);

    const color =
     notification.variant === "info" ? "bg-blue-600" :
     notification.variant === "success" ? "bg-green-600" :
     notification.variant === "warning" ? "bg-yellow-600" :
     notification.variant === "error" ? "bg-red-600" : "bg-gray-600";

    return (
        <div className={`${color} text-white px-4 py-3 rounded-md shadow-lg max-w-[92vw] sm:max-w-md`}> 
      <div className="flex items-start gap-3">
        <span className="text-sm leading-5">{notification.message}</span>
        <button
          aria-label="Закрыть уведомление"
          className="ml-auto shrink-0 opacity-80 hover:opacity-100 transition-opacity"
          onClick={() => removeNotification(notification.id)}
        >
          ✕
        </button>
      </div>
    </div>
    )
}
export default function NotificationList() {
    const { notifications } = useNotification();

    return (
        <div className="fixed top-4 right-4 z-[1000] flex flex-col gap-3">
            {notifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}
        </div>
    );
}