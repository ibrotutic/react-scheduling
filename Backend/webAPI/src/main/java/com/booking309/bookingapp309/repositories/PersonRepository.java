package com.booking309.bookingapp309.repositories;

import com.booking309.bookingapp309.objects.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, String> {
    Person findBypId(String pId);
    Person findByEmail(String email);
}

