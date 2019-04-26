package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Appointment;
import com.booking309.bookingapp309.objects.Employee;
import com.booking309.bookingapp309.objects.Person;
import com.booking309.bookingapp309.objects.Rating;
import com.booking309.bookingapp309.repositories.AppointmentRepository;
import com.booking309.bookingapp309.repositories.EmployeeRepository;
import com.booking309.bookingapp309.repositories.PersonRepository;
import com.booking309.bookingapp309.repositories.RatingsRepository;
import org.hamcrest.CoreMatchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.Silent.class)
public class RatingsControllerTest {
    private static final int APP_ID = 123;
    private static final String EMP_ID = "1234-567-89";
    private static final String ORG_ID = "123-456-789";

    @Mock
    private AppointmentRepository mockAppointmentRepository;
    @Mock
    private RatingsRepository mockRatingsRepository;
    private RatingsController ratingsController;

    @Before
    public void setUp() throws Exception {
        ratingsController = new RatingsController(mockRatingsRepository, mockAppointmentRepository);
    }

    @Test
    public void getEmployeeRating() {
        List<Rating> employeeRatingList = createRatingsList();
        Rating rating = createRating();
        List<Appointment> employeeAppointmentList = createAppointmentList();
        Appointment appointment = createAppointment();

        Mockito.when(mockRatingsRepository.findByAppointmentId(APP_ID)).thenReturn(rating);
        Mockito.when(mockAppointmentRepository.findAllByEmpId(Mockito.anyString())).thenReturn(employeeAppointmentList);

        List<Rating> expectedRatingList = createExpectedRatingList(rating, employeeAppointmentList.size());

        assertThat(ratingsController.getEmployeeRating(EMP_ID), is(expectedRatingList));
    }

    @Test
    public void getOrgRating() {
        List<Rating> orgRatingList = createRatingsList();
        Rating rating = createRating();
        List<Appointment> orgAppointmentList = createAppointmentList();

        Mockito.when(mockRatingsRepository.findByAppointmentId(APP_ID)).thenReturn(rating);
        Mockito.when(mockAppointmentRepository.findAllByOrgId(Mockito.anyString())).thenReturn(orgAppointmentList);

        List<Rating> expectedRatingList = createExpectedRatingList(rating, orgAppointmentList.size());

        assertThat(ratingsController.getOrgRating(ORG_ID), is(expectedRatingList));
    }

    @Test
    public void appointmentIsUpdatedToReviewedAfterClientRates() {
        Rating rating = createRating();
        Appointment appointment = createAppointment();
        Mockito.when(mockAppointmentRepository.findById(rating.getAppointmentId())).thenReturn(appointment);
        assertThat(ratingsController.putRating(rating), CoreMatchers.is(ResponseEntity.ok(rating)));
        assertTrue(mockAppointmentRepository.findById(rating.getAppointmentId()).getIsReviewed());
    }

    @Test
    public void employeeWithNoRatingsReturnsBadRequest(){
        List<Appointment> emptyList = new ArrayList<>();
        Mockito.when(mockAppointmentRepository.findAllByEmpId(Mockito.anyString())).thenReturn(emptyList);
        assertThat(ratingsController.getAverageRatingForEmployee(Mockito.anyString()), CoreMatchers.is(new ResponseEntity<>(
                "No ratings for specified parameter", new HttpHeaders(), HttpStatus.BAD_REQUEST)));
    }

    @Test
    public void orgWithNoRatingsReturnsBadRequest(){
        List<Appointment> emptyList = new ArrayList<>();
        Mockito.when(mockAppointmentRepository.findAllByOrgId(Mockito.anyString())).thenReturn(emptyList);
        assertThat(ratingsController.getAverageRatingForOrg(Mockito.anyString()), CoreMatchers.is(new ResponseEntity<>(
                "No ratings for specified parameter", new HttpHeaders(), HttpStatus.BAD_REQUEST)));
    }

    @Test
    public void putOrgInfo() {
        Rating rating = createRating();
        Appointment appointment = createAppointment();
        Mockito.when(mockAppointmentRepository.findById(rating.getAppointmentId())).thenReturn(appointment);
        assertThat(ratingsController.putRating(rating), CoreMatchers.is(ResponseEntity.ok(rating)));
    }

    private List<Rating> createExpectedRatingList(Rating rating, int length) {
        List<Rating> ratingList = new ArrayList<>();

        for (int i = 0; i < length; i++) {
            ratingList.add(rating);
        }

        return ratingList;
    }

    private Rating createRating() {
        Rating rating = new Rating();
        Random rand = new Random();
        int random = rand.nextInt(4) + 1;
        rating.setRating(random);
        rating.setDescription("abcde");
        rating.setAppointmentId(random);

        return rating;
    }

    private List<Rating> createRatingsList() {
        List<Rating> ratingList = new ArrayList<>();
        Random rand = new Random();

        for (int i = 0; i < rand.nextInt(10); i++) {
            ratingList.add(createRating());
        }

        return ratingList;
    }

    private Appointment createAppointment(){
        Appointment appointment = new Appointment();
        appointment.setId(APP_ID);
        appointment.setIsReviewed(false);
        return appointment;
    }

    private List<Appointment> createAppointmentList(){
        List<Appointment> appointmentList = new ArrayList<>();
        Random rand = new Random();

        for (int i = 0; i < rand.nextInt(10); i++) {
            appointmentList.add(createAppointment());
        }

        return appointmentList;

    }
}