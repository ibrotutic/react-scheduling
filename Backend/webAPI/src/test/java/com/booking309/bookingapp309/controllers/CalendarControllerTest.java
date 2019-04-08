package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Appointment;
import com.booking309.bookingapp309.repositories.AppointmentRepository;
import net.bytebuddy.utility.RandomString;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class CalendarControllerTest {
    private static final String PERSON_ID = "1234-5678-910";

    @Mock
    private AppointmentRepository mockedAppointmentRepository;
    @Mock
    private SimpMessagingTemplate mockedSimpMessageingTemplate;
    private CalendarController calendarController;

    @Before
    public void setUp() {
        calendarController = new CalendarController(mockedAppointmentRepository, mockedSimpMessageingTemplate);
    }

    @Test
    public void getAppointmentByPerson() {
        List<Appointment> apptList = createRandomAppointmentList();

        Mockito.when(mockedAppointmentRepository.findAllByClientIdOrEmpId(PERSON_ID, PERSON_ID))
                .thenReturn(apptList);

        assertThat(calendarController.getAppointmentByPerson(PERSON_ID), is(apptList));
    }

    @Test
    public void putAppointmentInFutureByPersonReturnsSuccess() {
        Appointment appointment = createValidFutureAppointment();

        assertThat(calendarController.putAppointment(appointment), is(ResponseEntity.ok(appointment)));
    }

    @Test
    public void putAppointmentInPastByPersonReturnsBadRequest() {
        Appointment appointment = createInvalidPastAppointment();

        assertThat(calendarController.putAppointment(appointment), is(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(appointment)));
    }

    private Appointment createRandomAppointment() {
        Appointment appointment = new Appointment();

        Random rand = new Random();
        RandomString randString = new RandomString();

        appointment.setId(rand.nextInt());
        appointment.setClientId(randString.nextString());
        appointment.setEmpId(randString.nextString());
        appointment.setOrgId(randString.nextString());
        appointment.setEndTime(rand.nextLong());


        return appointment;
    }

    private Appointment createInvalidPastAppointment() {
        long epoch = System.currentTimeMillis()/1000;
        Appointment appointment = new Appointment();

        Random rand = new Random();
        RandomString randString = new RandomString();

        appointment.setId(rand.nextInt());
        appointment.setClientId(randString.nextString());
        appointment.setEmpId(randString.nextString());
        appointment.setOrgId(randString.nextString());
        appointment.setStartTime(epoch-1100);
        appointment.setEndTime(epoch+-1000);


        return appointment;
    }

    private Appointment createValidFutureAppointment() {
        long epoch = System.currentTimeMillis()/1000;
        Appointment appointment = new Appointment();

        Random rand = new Random();
        RandomString randString = new RandomString();

        appointment.setId(rand.nextInt());
        appointment.setClientId(randString.nextString());
        appointment.setEmpId(randString.nextString());
        appointment.setOrgId(randString.nextString());
        appointment.setStartTime(epoch+10000);
        appointment.setEndTime(epoch+11000);


        return appointment;
    }

    private List<Appointment> createRandomAppointmentList() {
        List<Appointment> appointments = new ArrayList<>();
        Random rand = new Random();

        for (int i = 0; i < rand.nextInt(10); i++) {
            appointments.add(createRandomAppointment());
        }

        return appointments;
    }
}