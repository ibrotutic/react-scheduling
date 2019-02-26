package com.booking309.bookingapp309.compositeKeys;

import org.hibernate.validator.constraints.Length;

import java.io.Serializable;
import java.util.Objects;

public class EmployeeCompositeKey implements Serializable {
    private String empId;
    private String orgId;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EmployeeCompositeKey)) return false;
        EmployeeCompositeKey that = (EmployeeCompositeKey) o;
        return empId.equals(that.empId) &&
                orgId.equals(that.orgId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(empId, orgId);
    }
}
