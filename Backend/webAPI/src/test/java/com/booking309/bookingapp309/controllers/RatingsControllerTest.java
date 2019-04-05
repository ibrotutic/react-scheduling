package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Employee;
import com.booking309.bookingapp309.objects.Rating;
import com.booking309.bookingapp309.repositories.AppointmentRepository;
import com.booking309.bookingapp309.repositories.EmployeeRepository;
import com.booking309.bookingapp309.repositories.PersonRepository;
import com.booking309.bookingapp309.repositories.RatingsRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class RatingsControllerTest {
    private static final String Appointment_ID = "1234-4567-69";

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
    }

    @Test
    public void getOrgRating() {

    }

    @Test
    public void putOrgInfo() {

    }

    private Rating createRating() {
        Rating rating = new Rating();
        Random rand = new Random();
        int random = rand.nextInt(4) + 1;
        rating.setRating(random);

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
}