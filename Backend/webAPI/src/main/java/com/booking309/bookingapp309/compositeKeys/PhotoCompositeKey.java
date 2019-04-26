package com.booking309.bookingapp309.compositeKeys;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Id;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

public class PhotoCompositeKey implements Serializable {
    @Id
    @Size(max=50)
    private String orgId;
    @Id
    @Size(max=255)
    private String url;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PhotoCompositeKey)) return false;
        PhotoCompositeKey that = (PhotoCompositeKey) o;
        return getOrgId().equals(that.getOrgId()) &&
                getUrl().equals(that.getUrl());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getOrgId(), getUrl());
    }
}
