package com.booking309.bookingapp309.objects;

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
    private int id;
    private String serviceType;
    private String address;
    private String description;
    private Employee[] employeeList;

    public int getId() {
        return id;
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

    public void setId(int id) {
        this.id = id;
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

    public void setEmployeeList(Employee[] employeeList) {
        this.employeeList = employeeList;
    }
}
