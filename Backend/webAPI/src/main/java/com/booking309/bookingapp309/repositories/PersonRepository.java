package com.booking309.bookingapp309.repositories;

import com.booking309.bookingapp309.objects.Person;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface PersonRepository extends CrudRepository<Person, String> {
    Person findBypId(String pId);

    @Transactional
    void deleteBypId(String pId);
}

