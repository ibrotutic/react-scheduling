package com.booking309.bookingapp309.notifications;

import com.booking309.bookingapp309.objects.Appointment;
import com.booking309.bookingapp309.objects.Employee;
import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.objects.Person;
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

    public Notification createAppointmentDeletedNotification(Appointment deletedAppointment, String destinationId){
        return notificationManager.createNotificationForCancelledAppointment(deletedAppointment, destinationId);
    }

    public Notification createEmployeeAddedNotification(Organization org, Employee employee) {
        return notificationManager.createNotificationForNewEmployee(org, employee);
    }

    public Notification createRemovedEmployeeNotification(Organization org, Person person) {
        return notificationManager.createNotificationForRemovedEmployee(org, person);
    }

}
