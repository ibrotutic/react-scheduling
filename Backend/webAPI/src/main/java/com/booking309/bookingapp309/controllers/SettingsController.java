package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Person;
import com.booking309.bookingapp309.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class SettingsController {
    @Autowired
    private PersonRepository personRepository;

    @CrossOrigin
    @GetMapping("/settings")
    public @ResponseBody Person getSetInfo(@RequestParam String pid) {
        return personRepository.findByPId(pid);
    }

    @CrossOrigin
    @PostMapping("/settings")
    public @ResponseBody Person putSetInfo(@RequestBody Person person) {
        personRepository.save(person);

        return person;
    }
}

