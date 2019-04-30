package com.booking309.bookingapp309.objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Rating {

    @Id
    private int appointmentId;
    private String reviewerName;
    private int rating;
    private String description;
    private String empId;
    private String orgId;

    public String getDescription() {
        return description;
    }

    public String getEmpId() { return empId; }

    public String getOrgId() { return orgId; }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setReviewerName(String reviewerName){ this.reviewerName = reviewerName; }

    public String getReviewerName() {
        return reviewerName;
    }

    public int getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(int appointmentId) {
        this.appointmentId = appointmentId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
