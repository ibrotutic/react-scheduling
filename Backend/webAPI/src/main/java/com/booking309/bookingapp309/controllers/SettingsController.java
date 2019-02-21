package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.ClientError;
import com.booking309.bookingapp309.objects.Person;
import com.booking309.bookingapp309.objects.Response;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SettingsController {

    @RequestMapping("/settings")
    public Response getSetInfo(@RequestParam(value="pid", defaultValue = "") String pid) {
        if (pid.equals("")) {
            return new ClientError(400, "Must provide an pid.");
        } else {
            return new Person(200, 1, "Rimothy", "Timothy",
                    "sethsux@jakesux2.com", "Iowa State",
                    0, 0);
        }
    }
}

