package com.booking309.bookingapp309.notifications;

public class Notification<T> {
    private NotificationType notificationType;
    private T notificationBody;

    public Notification(NotificationType notificationType, T notificationBody) {
        this.notificationType = notificationType;
        this.notificationBody = notificationBody;
    }

    public NotificationType getNotificationType() {
        return notificationType;
    }

    public T getNotificationBody() {
        return notificationBody;
    }
}
