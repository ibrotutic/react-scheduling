package com.booking309.bookingapp309.objects;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * An class that represents an employee with a name, unique identifier, and status
 *
 * @author Seth Jones
 */
@Entity
public class Employee{
    private final String name;
    @Id
    private final int id;
    private final String status;

    /**
     * Constructor for employee, sets the name, id, and status of the new employee
     * to the given parameters that are passed into the constructor
     *
     * @param name
     * @param id
     * @param status
     */
    public Employee(String name, int id, String status){
        this.name = name;
        this.id = id;
        this.status = status;
    }

    /**
     * Getter function for the name field
     * @return returns the name of the employee
     */
    public String getName(){
        return name;
    }

    /**
     * Getter function for the id field
     * @return returns the id (primary key) of the employee
     */
    public int getId(){
        return id;
    }

    /**
     * Getter function for the status field
     * @return returns if the empoyee is an owner or employee
     */
    public String getStatus(){
        return status;
    }
}
