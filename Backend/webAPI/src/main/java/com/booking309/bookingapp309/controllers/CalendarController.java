package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.notifications.Notification;
import com.booking309.bookingapp309.notifications.NotificationManager;
import com.booking309.bookingapp309.notifications.NotificationWrapper;
import com.booking309.bookingapp309.objects.Appointment;
import com.booking309.bookingapp309.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;

@EnableWebMvc
@RestController
public class CalendarController {
    private AppointmentRepository appointmentRepository;
    private SimpMessagingTemplate simp;
    private NotificationWrapper notificationWrapper;

    @Autowired
    public CalendarController(AppointmentRepository appointmentRepository, SimpMessagingTemplate simp, final NotificationWrapper notificationWrapper) {
        this.appointmentRepository = appointmentRepository;
        this.simp = simp;
        this.notificationWrapper = notificationWrapper;
    }

    @CrossOrigin
    @GetMapping(value = "/calendar", params = "pid")
    public @ResponseBody
    List<Appointment> getAppointmentByPerson(@RequestParam String pid) {
        return appointmentRepository.findAllByClientIdOrEmpId(pid, pid);
    }

    @CrossOrigin
    @GetMapping(value = "/calendar", params = "id")
    public @ResponseBody
    Appointment getAppointmentById(@RequestParam int id) {
        return appointmentRepository.findById(id);
    }

    @CrossOrigin
    @PostMapping("/calendar")
    public @ResponseBody
    ResponseEntity<Appointment> putAppointment(@RequestBody Appointment appointment) {
        boolean validAppointment = isValidAppointment(appointment);
        if (validAppointment) {
            appointmentRepository.save(appointment);
            sendNewAppointmentNotification(appointment);
            return ResponseEntity.ok(appointment);
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(appointment);
        }
    }
    
    @CrossOrigin
    @DeleteMapping("/calendar")
    public @ResponseBody void deleteCalendar(@RequestParam int id){
        Appointment appointmentToDelte = appointmentRepository.findById(id);
        appointmentRepository.deleteById(id);
        sendAppointmentDeletedNotification(appointmentToDelte);
    }

    private void sendAppointmentDeletedNotification(Appointment deletedAppointment) {
        Notification deletedAppointmentNotification = notificationWrapper.createAppointmentDeletedNotificaiton(deletedAppointment);
        simp.convertAndSend("/topic/appt/" + deletedAppointmentNotification.getDestinationId(), deletedAppointmentNotification);
    }

    private void sendNewAppointmentNotification(Appointment appointment) {
        Notification newAppointmentNotification = notificationWrapper.createNewAppointmentNotification(appointment);
        simp.convertAndSend("/topic/appt/" + newAppointmentNotification.getDestinationId(), newAppointmentNotification);
    }

    private boolean isValidAppointment(Appointment requestedAppointment) {
        Long requestAppointmentStartTime = requestedAppointment.getStartTime();
        if (!appointmentStartTimeIsValid(requestAppointmentStartTime)) {
            return false;
        }
        return appointmentTimeConflictsWithClientOrEmployee(requestedAppointment);
    }

    private boolean appointmentTimeConflictsWithClientOrEmployee(Appointment appointment) {
        String clientId = appointment.getClientId();
        String employeeId = appointment.getEmpId();
        List<Appointment> allClientAndEmployeeAppointments = appointmentRepository.findAllByClientIdOrEmpId(clientId, employeeId);
        Long requestedAppointmentStartTime = appointment.getStartTime();

        return appointmentListHasConflictsWithGivenStartTime(requestedAppointmentStartTime, allClientAndEmployeeAppointments);
    }

    private boolean appointmentListHasConflictsWithGivenStartTime(Long requestedStartTime, List<Appointment> appointmentList) {

        for (Appointment appt : appointmentList) {
            if(appt.getStartTime() == requestedStartTime) {
                return false;
            }
        }

        return true;
    }

    private boolean appointmentStartTimeIsValid(Long requestedStartTime) {
        long epoch = System.currentTimeMillis()/1000;

        return requestedStartTime > epoch;
    }
}
