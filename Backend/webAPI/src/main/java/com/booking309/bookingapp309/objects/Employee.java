package com.booking309.bookingapp309.objects;

import com.booking309.bookingapp309.compositeKeys.EmployeeCompositeKey;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;

/**
 * An class that represents an employee with a name, unique identifier, and status
 *
 * @author Seth Jones
 */
@Entity
@IdClass(EmployeeCompositeKey.class)
public class Employee {
    @Id
    @Column(length=50)
    private String empId;
    @Id
    @Column(length=50)
    private String orgId;

    private String status;

    @Length(max=50)
    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    @Length(max=50)
    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
