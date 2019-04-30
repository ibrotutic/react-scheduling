package com.booking309.bookingapp309.notifications;

import com.booking309.bookingapp309.controllers.CalendarController;
import com.booking309.bookingapp309.objects.Appointment;
import net.bytebuddy.utility.RandomString;
import org.aspectj.weaver.ast.Not;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.ResponseEntity;

import java.util.Random;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

public class NotificationTest {
    private String employeeId =  "123-456-789";
    private NotificationManager notificationManager;

    @Before
    public void setUp() {
        notificationManager = new NotificationManager();
    }

    @Test
    public void newAppointmentNotificationContainsAppointmentWithValidInformation() {
        Appointment newAppointment = createRandomAppointment();
        Notification generatedNotification = notificationManager.createNotificationForNewAppointment(newAppointment);
        assertThat(generatedNotification.getNotificationBody(), is(newAppointment));
        assertThat(generatedNotification.getDestinationId(), is(employeeId));
        assertThat(generatedNotification.getNotificationType(), is(NotificationTypesMap.myMap.get(NotificationType.CREATE_APPOINTMENT)));

    }

    private Appointment createRandomAppointment() {
        long epoch = System.currentTimeMillis()/1000;

        Appointment appointment = new Appointment();

        Random rand = new Random();
        RandomString randString = new RandomString();

        appointment.setId(rand.nextInt());
        appointment.setClientId(randString.nextString());
        appointment.setEmpId(employeeId);
        appointment.setOrgId(randString.nextString());
        appointment.setStartTime(rand.nextLong()+epoch);
        appointment.setEndTime(appointment.getStartTime()+1000);


        return appointment;
    }
}
