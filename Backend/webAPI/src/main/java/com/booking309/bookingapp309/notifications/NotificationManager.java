package com.booking309.bookingapp309.notifications;

import com.booking309.bookingapp309.objects.Appointment;
import com.booking309.bookingapp309.objects.Organization;

public class NotificationManager {
    NotificationTypesMap notificationTypes;

    public NotificationManager(){
        this.notificationTypes = new NotificationTypesMap();
    }

    public static Notification createNotificationForNewAppointment(Appointment appointment){
        return new Notification(NotificationType.CREATE_APPOINTMENT, appointment);
    }

    public static Notification createNotificationForNewEmployee(Organization organization){
        return new Notification(NotificationType.ADD_EMPLOYEE, organization);
    }

    public static Notification createNotificationForCancelledAppointment(Appointment appointment){
        return new Notification(NotificationType.CANCEL_APPOINTMENT, appointment);
    }

    public static Notification createNotificationForRemovedEmployee(Organization organization){
        return new Notification(NotificationType.REMOVE_EMPLOYEE, organization);
    }
}
