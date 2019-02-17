package com.booking309.bookingapp309.objects;

public class Person extends com.booking309.bookingapp309.objects.Response {

    private final int pid;
    private final String firstname;
    private final String lastname;
    private final String email;
    private final String password;
    private final String employer;
    private final int empid;
    private final int adminid;
    private final String businessname;
    private final String businesstype;


    public Person(int respCode, int pid, String firstname, String lastname, String email, String password,
                  String employer, int empid, int adminid, String businessname, String businesstype) {

        super(respCode);

        this.pid = pid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.employer = employer;
        this.empid = empid;
        this.adminid = adminid;
        this.businessname = businessname;
        this.businesstype = businesstype;
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

    public String getPassword() {
        return password;
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

    public String getBusinessname() {
        return businessname;
    }

    public String getBusinesstype() {
        return businesstype;
    }
}
