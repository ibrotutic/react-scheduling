package com.booking309.bookingapp309.objects;

/**
 * A class that represents an organization with a unique identifier, service type,
 * address, description, and a list of employees
 *
 * @author Jake Veatch
 * @author Seth Jones
 */
public class Organization extends com.booking309.bookingapp309.objects.Response {
    private final int id;
    private final String serviceType;
    private final String address;
    private final String description;
    private final Employee[] employeeList = new Employee[3];


    public Organization(int respCode, int id, String serviceType, String address, String description) {
        super(respCode);

        this.id = id;
        this.serviceType = serviceType;
        this.address = address;
        this.description = description;
        setNewEmployeeList();
    }

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

    public void setNewEmployeeList(){
        employeeList[0] = new Employee("Hunter", 1,"owner");
        employeeList[1] = new Employee("Jake", 2, "employee");
        employeeList[2] = new Employee("Ibro", 3,"employee");
    }
}
