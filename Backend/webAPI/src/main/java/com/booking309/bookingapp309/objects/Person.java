package com.booking309.bookingapp309.objects;

import org.hibernate.validator.constraints.Length;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.Arrays;

@Entity
public class Person{

    @Id
    private String pId;

    private String email;
    private String name;
    private String[] employeeOfList;
    private String[] adminOfList;


    @Length(max=50)
    public String getpId(){
        return pId;
    }

    public void setpId(String id){
        this.pId = pId;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getName(){
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getEmployeeOfList(){
        return employeeOfList;
    }

    public void setEmployeeOfList(String[] employeeOfList) {
        this.employeeOfList = employeeOfList;
    }

    public String[] getAdminOfList(){
        return employeeOfList;
    }

    public void setAdminOfList(String[] adminOfList) {
        this.adminOfList = adminOfList;
    }

}
