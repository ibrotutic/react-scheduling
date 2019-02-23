package com.booking309.bookingapp309.objects;

import org.hibernate.validator.constraints.Length;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Person{

    @Id
    private String pId;

    private String email;
    private String name;
    private String[] employeeOfList;
    private String[] adminOfList;


// Ill take out these commented out portions once its done being a WIP


//    public Person(int respCode, int pid, String firstname, String lastname, String email,
//                  String employer, int empid, int adminid) {
//
//        super(respCode);
//
//        this.pid = pid;
//        this.firstname = firstname;
//        this.lastname = lastname;
//        this.email = email;
//        this.employer = employer;
//        this.empid = empid;
//        this.adminid = adminid;
//    }

    @Length(max=50)
    public String getId(){
        return pId;
    }

    public void setId(String id){
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

    public void setName(){
        this.name = name;
    }

    public String[] getEmployeeOfList(){
        return employeeOfList;
    }

    public void setEmployeeOfList(String orgName){
        this.employeeOfList = addEmployeeOf(orgName);
    }

    public String[] getAdminOfList(){
        return employeeOfList;
    }

    public void setAdminOfList(String orgName){
        this.employeeOfList = addAdminOf(orgName);
    }

    private String[] addEmployeeOf(String orgName){
        String[] newEmpOfList = new String[this.employeeOfList.length +1];
        for(int i = 0; i < this.employeeOfList.length; i++){
            newEmpOfList[i] = this.employeeOfList[i];
        }
        newEmpOfList[newEmpOfList.length-1] = orgName;

        return newEmpOfList;
    }

    private String[] addAdminOf(String orgName){
        String[] newAdOfList = new String[this.adminOfList.length +1];
        for(int i = 0; i < this.adminOfList.length; i++){
            newAdOfList[i] = this.adminOfList[i];
        }
        newAdOfList[newAdOfList.length-1] = orgName;

        return newAdOfList;
    }


}
