package com.booking309.bookingapp309.objects;


public class EmployeeList extends com.booking309.bookingapp309.objects.Response {

    private final Employee[] employeeList;

    public EmployeeList(int respcode, Employee[] employeeList){
        super(respcode);
        this.employeeList = employeeList;
    }

    public Employee[] getEmployees(){
        return employeeList;
    }

}
