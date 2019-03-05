package com.booking309.bookingapp309.repositories;

import com.booking309.bookingapp309.objects.Appointment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AppointmentRepository extends CrudRepository<Appointment, Integer> {
    List<Appointment> findAllByClientIdOrEmpId(String clientId, String empId);
}
