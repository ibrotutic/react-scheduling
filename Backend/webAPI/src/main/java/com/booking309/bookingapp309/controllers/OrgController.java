package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.ClientError;
import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.objects.Response;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class OrgController {

    @RequestMapping("/org")
    public Response getOrgInfo(@RequestParam(value="orgId", defaultValue = "") String orgId) {
        if (orgId.equals("")) {
            return new ClientError(400, "Must provide an orgId.");
        } else {
            return new Organization(200, 1, "Barber", "123 Seseme St.", "I provide good haircuts!");
        }
    }
}
