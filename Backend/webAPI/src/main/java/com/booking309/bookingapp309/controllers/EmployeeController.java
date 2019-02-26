package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Employee;
import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmployeeController {
    @Autowired
    private EmployeeRepository empRepository;

    /**
     * A method that returns an organization of Response type as a JSON object
     *
     * @param orgId Id of the org to fetch
     * @return returns the organization information (id, service type, address, description)
     */
    @CrossOrigin
    @GetMapping("/employees")
    public @ResponseBody
    List<Employee> getOrgInfo(@RequestParam String orgId) {
        return empRepository.findAllByOrgId(orgId);
    }

    @CrossOrigin
    @GetMapping("/employees")
    public @ResponseBody
    List<Organization> getOrgs(@RequestParam String empId) {
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
}
