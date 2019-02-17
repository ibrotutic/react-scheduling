package com.booking309.bookingapp309.objects;

public class Person extends com.booking309.bookingapp309.objects.Response {

    private final String email;
    private final String password;
    private final String employer;
    private final int eid;
    private final int adminid;
    private final String businessname;
    private final String firstname;
    private final String lastname;
    private final String businesstype;



    public Person(int respCode) {
        super(respCode);
    }
}
