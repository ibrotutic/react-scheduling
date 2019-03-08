package com.booking309.bookingapp309.repositories;

import com.booking309.bookingapp309.compositeKeys.EmployeeCompositeKey;
import com.booking309.bookingapp309.objects.Employee;
import com.booking309.bookingapp309.objects.Organization;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface EmployeeRepository extends CrudRepository<Employee, EmployeeCompositeKey> {
    List<Employee> findAllByOrgId(String orgId);

    List<Employee> findAllByEmpId(String empId);

    @Transactional
    void deleteByEmpIdAndOrgId(String empId, String orgId);
}
