package com.booking309.bookingapp309.objects;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * A class that represents an organization with a unique identifier, service type,
 * address, description, and a list of employees
 *
 * @author Jake Veatch
 * @author Seth Jones
 */
@Entity
public class Organization {
    @Id
    private String orgId;
    private String name;
    private String serviceType;
    private String address;
    private String description;
    private String adminId;

    @Length(max = 50)
    public String getOrgId() {
        return orgId;
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

    public void setOrgId(String id) {
        this.orgId = id;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
