package com.booking309.bookingapp309.notifications;

import com.booking309.bookingapp309.objects.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class NotificationWrapper {

    private static NotificationManager notificationManager;
    @Autowired
    private NotificationManager notificationManagerLayer;

    @PostConstruct
    public void init() {
        NotificationWrapper.notificationManager = notificationManagerLayer;
    }

    public Notification createNewAppointmentNotification(Appointment appointment) {
        return notificationManager.createNotificationForNewAppointment(appointment);
    }

    public Notification createAppointmentDeletedNotification(Appointment deletedAppointment){
        return notificationManager.createNotificationForCancelledAppointment(deletedAppointment);
    }

}
