package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Appointment;
import com.booking309.bookingapp309.objects.Rating;
import com.booking309.bookingapp309.repositories.AppointmentRepository;
import com.booking309.bookingapp309.repositories.RatingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return getRatingsListForEmployee(empId);
    }

    @CrossOrigin
    @GetMapping("/rating/org")
    public @ResponseBody
    List<Rating> getOrgRating(@RequestParam String orgId) {
        return getRatingsListForOrg(orgId);
    }

    @CrossOrigin
    @GetMapping(value = "/rating/average", params = "orgId")
    public @ResponseBody
    ResponseEntity<String> getAverageRatingForOrg(@RequestParam String orgId) {
        List<Rating> ratings = getRatingsListForOrg(orgId);
        return calculateAverageAndRespond(ratings);
    }

    @CrossOrigin
    @GetMapping(value = "/rating/average", params = "empId")
    public @ResponseBody
    ResponseEntity<String> getAverageRatingForEmployee(@RequestParam String empId) {
        List<Rating> ratings = getRatingsListForEmployee(empId);
        return calculateAverageAndRespond(ratings);
    }

    @CrossOrigin
    @PostMapping("/rating")
    public @ResponseBody
    ResponseEntity<Rating> putRating(@RequestBody Rating rating) {
        updateAppointmentToRated(rating);
        ratingsRepository.save(rating);
        return ResponseEntity.ok(rating);
    }

    private List<Rating> getRatingsListForEmployee(String empId){
        return ratingsRepository.findByEmpId(empId);
    }

    private List<Rating> getRatingsListForOrg(String orgId){
        return ratingsRepository.findByOrgId(orgId);
    }

    private void updateAppointmentToRated(Rating rating) {
        Appointment reviewedAppointment = appointmentRepository.findById(rating.getAppointmentId());
        reviewedAppointment.setIsReviewed(true);
        appointmentRepository.save(reviewedAppointment);
    }

    private static double round(double value, int precision) {
        int scale = (int) Math.pow(10, precision);
        return (double) Math.round(value * scale) / scale;
    }

    private ResponseEntity<String> calculateAverageAndRespond(List<Rating> ratings) {
        if (ratings.isEmpty()) {
            return new ResponseEntity<>(
                    "No ratings for specified parameter", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        double averageOfRatings = getAverageOfRatings(ratings);
        return ResponseEntity.ok(Double.toString(round(averageOfRatings, 2)));
    }

    private double getAverageOfRatings(List<Rating> ratings) {
        double markSum = 0;
        double average;
        for (Rating rating: ratings) {
            markSum = markSum + rating.getRating();
        }
        average = markSum / ratings.size();
        return average;
    }
}
