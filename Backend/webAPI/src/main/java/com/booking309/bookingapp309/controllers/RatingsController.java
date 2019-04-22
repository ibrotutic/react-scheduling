package com.booking309.bookingapp309.controllers;


import com.booking309.bookingapp309.objects.Appointment;
import com.booking309.bookingapp309.objects.Employee;
import com.booking309.bookingapp309.objects.Rating;
import com.booking309.bookingapp309.repositories.AppointmentRepository;
import com.booking309.bookingapp309.repositories.OrgRepository;
import com.booking309.bookingapp309.repositories.RatingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
public class RatingsController {
    private RatingsRepository ratingsRepository;
    private AppointmentRepository appointmentRepository;

    @Autowired
    public RatingsController(RatingsRepository ratingsRepository, AppointmentRepository appointmentRepository) {
        this.ratingsRepository = ratingsRepository;
        this.appointmentRepository = appointmentRepository;
    }


    @CrossOrigin
    @GetMapping("/rating/employees")
    public @ResponseBody
    List<Rating> getEmployeeRating(@RequestParam String empId) {
        return appointmentRepository.findAllByEmpId(empId).stream()
                .map(appointment -> ratingsRepository.findByAppointmentId(appointment.getId()))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping("/rating/org")
    public @ResponseBody
    List<Rating> getOrgRating(@RequestParam String orgId) {
        return appointmentRepository.findAllByOrgId(orgId).stream()
                .map(appointment -> ratingsRepository.findByAppointmentId(appointment.getId()))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @PostMapping("/rating")
    public @ResponseBody
    Rating putRating(@RequestBody Rating rating) {
        updateAppointmentToRated(rating);
        ratingsRepository.save(rating);
        return rating;
    }

    private void updateAppointmentToRated(Rating rating) {
        Appointment reviewedAppointment = appointmentRepository.findById(rating.getAppointmentId());
        appointmentRepository.delete(reviewedAppointment);
        reviewedAppointment.setIsReviewed(true);
        appointmentRepository.save(reviewedAppointment);
    }
}
