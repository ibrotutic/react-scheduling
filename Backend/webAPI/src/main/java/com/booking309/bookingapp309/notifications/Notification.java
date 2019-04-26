package com.booking309.bookingapp309.notifications;

public class Notification<T> {
    private String notificationType;
    private T notificationBody;
    private String destinationId;

    public Notification(NotificationType notificationType, T notificationBody, String destinationId) {
        this.notificationType = NotificationTypesMap.myMap.get(notificationType);
        this.notificationBody = notificationBody;
        this.destinationId = destinationId;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public T getNotificationBody() {
        return notificationBody;
    }

    public String getDestinationId() {
        return destinationId;
    }
}
