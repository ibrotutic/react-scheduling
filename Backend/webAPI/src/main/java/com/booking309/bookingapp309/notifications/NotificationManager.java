package com.booking309.bookingapp309.notifications;

import com.booking309.bookingapp309.objects.Appointment;
import com.booking309.bookingapp309.objects.Employee;
import com.booking309.bookingapp309.objects.Organization;
import org.springframework.stereotype.Service;

@Service
public class NotificationManager {

    public Notification createNotificationForNewAppointment(Appointment appointment){
        return new Notification<>(NotificationType.CREATE_APPOINTMENT, appointment, appointment.getEmpId());
    }

    public Notification createNotificationForNewEmployee(Organization organization, Employee addedEmployee){
        return new Notification<>(NotificationType.ADD_EMPLOYEE, organization, addedEmployee.getEmpId());
    }

    public Notification createNotificationForCancelledAppointment(Appointment appointment){
        return new Notification<>(NotificationType.CANCEL_APPOINTMENT, appointment,appointment.getEmpId());
    }

    public Notification createNotificationForRemovedEmployee(Organization organization, Employee removedEmployee){
        return new Notification<>(NotificationType.REMOVE_EMPLOYEE, organization, removedEmployee.getEmpId());
    }
}
