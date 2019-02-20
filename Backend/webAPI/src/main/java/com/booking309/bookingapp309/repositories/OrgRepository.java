package com.booking309.bookingapp309.repositories;

import com.booking309.bookingapp309.objects.Organization;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface OrgRepository extends CrudRepository<Organization, String> {

    Organization findById(Integer id);
}
