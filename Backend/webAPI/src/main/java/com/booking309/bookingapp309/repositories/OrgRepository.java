package com.booking309.bookingapp309.repositories;

import com.booking309.bookingapp309.objects.Organization;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface OrgRepository extends CrudRepository<Organization, String> {
    Organization findByOrgId(String id);
    List<Organization> findAllByAdminId(String adminId);

    @Transactional
    void deleteByOrgId(String orgId);
}
