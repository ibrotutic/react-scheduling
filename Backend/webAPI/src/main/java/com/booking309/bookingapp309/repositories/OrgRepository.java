package com.booking309.bookingapp309.repositories;

import com.booking309.bookingapp309.objects.Organization;
import org.springframework.data.repository.CrudRepository;

public interface OrgRepository extends CrudRepository<Organization, String> {

    Organization findById(Integer id);
}
