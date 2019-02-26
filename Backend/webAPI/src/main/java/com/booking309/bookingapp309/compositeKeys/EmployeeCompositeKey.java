package com.booking309.bookingapp309.compositeKeys;

import java.io.Serializable;
import java.util.Objects;

public class EmployeeCompositeKey implements Serializable {
    private String empId;
    private String orgId;

    public EmployeeCompositeKey(String empId, String orgId) {
        this.empId = empId;
        this.orgId = orgId;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

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
