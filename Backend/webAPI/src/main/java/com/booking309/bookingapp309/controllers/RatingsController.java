package com.booking309.bookingapp309.controllers;


import com.booking309.bookingapp309.objects.Rating;
import com.booking309.bookingapp309.repositories.AppointmentRepository;
import com.booking309.bookingapp309.repositories.RatingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
public class RatingsController {

    @Autowired
    private RatingsRepository ratingsRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;

    @CrossOrigin
    @GetMapping("/rating/employees")
    public @ResponseBody
    List<Rating> getEmployeeRating(@RequestParam String empId) {
        return appointmentRepository.findAllByEmpId(empId).stream()
                .map(appointment -> ratingsRepository.findByAppointmentId(appointment.getId()))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}
