package com.booking309.bookingapp309.repositories;

import com.booking309.bookingapp309.objects.Employee;
import com.booking309.bookingapp309.objects.Rating;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RatingsRepository extends CrudRepository<Rating, Integer> {
    Rating findByAppointmentId(int appointmentId);
    List<Rating> findByEmpId(String employeeId);
    List<Rating> findByOrgId(String orgId);
}

