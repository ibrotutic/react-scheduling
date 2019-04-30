package com.booking309.bookingapp309.notifications;

import com.booking309.bookingapp309.objects.Appointment;
import com.booking309.bookingapp309.objects.Employee;
import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.objects.Person;
import org.springframework.stereotype.Service;

@Service
public class NotificationManager {

    public Notification createNotificationForNewAppointment(Appointment appointment){
        return new Notification<>(NotificationType.CREATE_APPOINTMENT, appointment, appointment.getEmpId());
    }

    public Notification createNotificationForNewEmployee(Organization organization, Employee addedEmployee){
        return new Notification<>(NotificationType.ADD_EMPLOYEE, organization, addedEmployee.getEmpId());
    }

    public Notification createNotificationForCancelledAppointment(Appointment appointment, String destinationId){
        return new Notification<>(NotificationType.CANCEL_APPOINTMENT, appointment, destinationId);
    }

    public Notification createNotificationForRemovedEmployee(Organization organization, Person removedPerson){
        return new Notification<>(NotificationType.REMOVE_EMPLOYEE, organization, removedPerson.getpId());
    }
}
