package com.booking309.bookingapp309.objects;

public class Organization extends com.booking309.bookingapp309.objects.Response {
    private final int id;
    private final String serviceType;
    private final String address;
    private final String description;

    public Organization(int respCode, int id, String serviceType, String address, String description) {
        super(respCode);

        this.id = id;
        this.serviceType = serviceType;
        this.address = address;
        this.description = description;
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
}
