package com.booking309.bookingapp309.objects;

public class Employee{
    private final String name;
    private final int id;
    private final String status;

    public Employee(String name, int id, String status){
        this.name = name;
        this.id = id;
        this.status = status;
    }

    public String getName(){
        return name;
    }

    public int getId(){
        return id;
    }

    public String getStatus(){
        return status;
    }
}
