package com.booking309.bookingapp309.repositories;

import com.booking309.bookingapp309.compositeKeys.PhotoCompositeKey;
import com.booking309.bookingapp309.objects.Photo;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface PhotoRepository extends CrudRepository<Photo, PhotoCompositeKey> {
    List<Photo> findAllByOrgId(String orgId);
    @Transactional
    void deleteByOrgIdAndUrl(String orgId, String url);
}