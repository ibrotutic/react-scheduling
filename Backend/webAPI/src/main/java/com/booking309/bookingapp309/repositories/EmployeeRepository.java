package com.booking309.bookingapp309.repositories;

import com.booking309.bookingapp309.objects.Employee;
import com.booking309.bookingapp309.objects.Organization;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EmployeeRepository extends CrudRepository<Employee, String> {
    public List<Employee> findAllByOrgId(String orgId);

    public List<Employee> findAllByEmpId(String empId);
}
