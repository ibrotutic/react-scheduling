package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Appointment;
import com.booking309.bookingapp309.objects.Person;
import com.booking309.bookingapp309.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

@EnableWebMvc
@RestController
public class CalendarController {
    private AppointmentRepository appointmentRepository;
    private SimpMessagingTemplate simp;

    @Autowired
    public CalendarController(AppointmentRepository appointmentRepository, SimpMessagingTemplate simp) {
        this.appointmentRepository = appointmentRepository;
        this.simp = simp;
    }

    @CrossOrigin
    @GetMapping("/calendar")
    public @ResponseBody
    List<Appointment> getAppointmentByPerson(@RequestParam String pid) {
        return appointmentRepository.findAllByClientIdOrEmpId(pid, pid);
    }

    @CrossOrigin
    @PostMapping("/calendar")
    public @ResponseBody
    ResponseEntity<Appointment> putAppointment(@RequestBody Appointment appointment) {
        boolean validAppointment = appointmentStartTimeIsValid(appointment);
        if (validAppointment) {
            appointmentRepository.save(appointment);
            subscribeAppointment(appointment);
            return ResponseEntity.ok(appointment);
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(appointment);
        }
    }
    
    @CrossOrigin
    @DeleteMapping("/calendar")
    public @ResponseBody void deleteCalendar(@RequestParam int id){
        appointmentRepository.deleteById(id);
    }

    private void subscribeAppointment(Appointment appointment) {
        simp.convertAndSend("/topic/appt/" + appointment.getEmpId(), appointment);
    }

    private boolean appointmentStartTimeIsValid(Appointment appointment) {
        long epoch = System.currentTimeMillis()/1000;
        return appointment.getStartTime() >= epoch;
    }
}
