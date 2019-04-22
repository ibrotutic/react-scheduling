package com.booking309.bookingapp309.notifications;

import com.booking309.bookingapp309.objects.Appointment;
import com.booking309.bookingapp309.objects.Organization;

public class Notification<T extends  Appointment, Organization> {
    private NotificationType notificationType;
    private T notificationBody;
    private String destinationId;

    public Notification(NotificationType notificationType, T notificationBody, String destinationId) {
        this.notificationType = notificationType;
        this.notificationBody = notificationBody;
        this.destinationId = destinationId;
    }

    public NotificationType getNotificationType() {
        return notificationType;
    }

    public T getNotificationBody() {
        return notificationBody;
    }

    public String getDestinationId() {
        return destinationId;
    }
}
