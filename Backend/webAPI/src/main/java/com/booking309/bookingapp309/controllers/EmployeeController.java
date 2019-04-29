package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.notifications.Notification;
import com.booking309.bookingapp309.notifications.NotificationWrapper;
import com.booking309.bookingapp309.objects.Employee;
import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.objects.Person;
import com.booking309.bookingapp309.repositories.EmployeeRepository;
import com.booking309.bookingapp309.repositories.OrgRepository;
import com.booking309.bookingapp309.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
public class EmployeeController {
    private EmployeeRepository empRepository;
    private PersonRepository personRepository;
    private OrgRepository orgRepository;

    private SimpMessagingTemplate simp;
    private NotificationWrapper notificationWrapper;

    @Autowired
    public EmployeeController(EmployeeRepository employeeRepository, PersonRepository personRepository,
                              OrgRepository orgRepository, SimpMessagingTemplate simp, NotificationWrapper notificationWrapper) {
        this.empRepository = employeeRepository;
        this.personRepository = personRepository;
        this.orgRepository = orgRepository;
        this.simp = simp;
        this.notificationWrapper = notificationWrapper;
    }

    /**
     * A method that returns an organization of Response type as a JSON object
     *
     * @param orgId Id of the org to fetch
     * @return returns all people in an org
     */
    @CrossOrigin
    @GetMapping("/employees/org")
    public @ResponseBody
    List<Person> getOrgInfo(@RequestParam String orgId) {
        return empRepository.findAllByOrgId(orgId).stream()
                .map(emp -> personRepository.findBypId(emp.getEmpId()))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @PostMapping("/employees/org")
    public @ResponseBody Person addEmployeeByEmail(@RequestParam String email, @RequestParam String orgId) {
        Person person = personRepository.findByEmail(email);
		Organization org = orgRepository.findByOrgId(orgId);
		if (person != null) {
			Employee employee = new Employee();

			employee.setOrgId(orgId);
			employee.setEmpId(person.getpId());

			empRepository.save(employee);
			sendEmployeeAddedNotification(org, employee);
		}
		
        return person;
    }

    @CrossOrigin
    @GetMapping("/employees")
    public @ResponseBody
    List<Employee> getOrgs(@RequestParam String empId) {
        return empRepository.findAllByEmpId(empId);
    }

    @CrossOrigin
    @PostMapping("/employees")
    public @ResponseBody Employee[] putOrgInfo(@RequestBody Employee[] employees) {
        for(Employee e : employees) {
            empRepository.save(e);
        }

        return employees;
    }

    @CrossOrigin
    @PutMapping("/employees")
    public @ResponseBody Employee addSingleEmployee(@RequestBody Employee emp) {
        empRepository.save(emp);

        return emp;
    }

    @CrossOrigin
    @DeleteMapping("/employees")
    public @ResponseBody void deleteEmployee(@RequestParam String empId, String orgId){
        empRepository.deleteByEmpIdAndOrgId(empId, orgId);
    }


    private void sendRemovedEmployeeNotification(Organization org, Employee employee) {
        Notification removedEmployeeNotification = notificationWrapper.createRemovedEmployeeNotification(org, employee);
        simp.convertAndSend("/topic/appt/" + removedEmployeeNotification.getDestinationId(), removedEmployeeNotification);
    }

    private void sendEmployeeAddedNotification(Organization org, Employee employee) {
        Notification employeeAddedNotification = notificationWrapper.createEmployeeAddedNotification(org, employee);
        simp.convertAndSend("/topic/appt/" + employeeAddedNotification.getDestinationId(), employeeAddedNotification);
    }
}
