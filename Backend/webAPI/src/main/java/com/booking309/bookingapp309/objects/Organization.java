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
    private String address2;
    private String city;
    private double cLat;
    private double cLong;
    private String state;
    private String tags;
    private String zipCode;
    private String documentId;

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

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public double getcLat() {
        return cLat;
    }

    public void setcLat(double cLat) {
        this.cLat = cLat;
    }

    public double getcLong() {
        return cLong;
    }

    public void setcLong(double cLong) {
        this.cLong = cLong;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }
}
