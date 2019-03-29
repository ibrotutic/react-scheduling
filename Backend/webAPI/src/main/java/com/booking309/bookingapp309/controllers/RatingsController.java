package com.booking309.bookingapp309.controllers;


import com.booking309.bookingapp309.repositories.AppointmentRepository;
import com.booking309.bookingapp309.repositories.RatingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RatingsController {

    @Autowired
    private RatingsRepository ratingsRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
}
