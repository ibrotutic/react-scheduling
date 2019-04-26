package com.booking309.bookingapp309.objects;

import com.booking309.bookingapp309.compositeKeys.PhotoCompositeKey;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.validation.constraints.Size;

@Entity
@IdClass(PhotoCompositeKey.class)
public class Photo {
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
}
