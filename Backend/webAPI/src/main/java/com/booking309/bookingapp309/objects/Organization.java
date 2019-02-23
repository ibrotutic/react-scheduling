package com.booking309.bookingapp309.objects;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * A class that represents an organization with a unique identifier, service type,
 * address, description, and a list of employees
 *
 * @author Jake Veatch
 * @author Seth Jones
 */
@Entity
public class Organization {
    @Id
    private String orgId;
    private String serviceType;
    private String address;
    private String description;
    private Employee[] employeeList;

    @Length(max=50)
    public String getOrgId() {
        return orgId;
    }

    public String getServiceType() {
        return serviceType;
    }

    public String getAddress() {
        return address;
    }

    public String getDescription() {
        return description;
    }

    public Employee[] getEmployeeList(){
        return employeeList;
    }

    public void setOrgId(String id) {
        this.orgId = id;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setEmployeeList(Employee employee) {
        this.employeeList = addEmployee(employee);
    }

    private Employee[] addEmployee(Employee emp){
        Employee[] newEmpList = new Employee[this.employeeList.length +1];
        for(int i = 0; i < this.employeeList.length; i++){
            newEmpList[i] = this.employeeList[i];
        }
        newEmpList[newEmpList.length-1] = emp;

        return newEmpList;
    }
}
