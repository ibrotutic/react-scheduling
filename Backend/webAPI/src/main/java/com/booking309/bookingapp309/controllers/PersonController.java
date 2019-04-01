package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Person;
import com.booking309.bookingapp309.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class PersonController {
    private PersonRepository personRepository;

    @Autowired
    public PersonController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @CrossOrigin
    @GetMapping("/person")
    public @ResponseBody Person getSetInfo(@RequestParam String pid) {
        return personRepository.findBypId(pid);
    }

    @CrossOrigin
    @PostMapping("/person")
    public @ResponseBody Person putSetInfo(@RequestBody Person person) {
        personRepository.save(person);

        return person;
    }
}

