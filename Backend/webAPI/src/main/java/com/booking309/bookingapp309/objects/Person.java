package com.booking309.bookingapp309.objects;

public class Person extends com.booking309.bookingapp309.objects.Response {

    private final int pid;
    private final String firstname;
    private final String lastname;
    private final String email;
    private final String employer;
    private final int empid;
    private final int adminid;



    public Person(int respCode, int pid, String firstname, String lastname, String email,
                  String employer, int empid, int adminid) {

        super(respCode);

        this.pid = pid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.employer = employer;
        this.empid = empid;
        this.adminid = adminid;
    }

    public int getPid(){
        return pid;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getEmail() {
        return email;
    }

    public String getEmployer() {
        return employer;
    }

    public int getEmpid() {
        return empid;
    }

    public int getAdminid() {
        return adminid;
    }
}
