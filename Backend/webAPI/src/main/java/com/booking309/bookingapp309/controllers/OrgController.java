package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.ClientError;
import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.objects.Response;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * A class that controls the endpoints that are being utilized
 * @author Jake Veatch
 * @author Seth Jones
 */
@RestController
public class OrgController {

    /**
     * A method that returns an organization of Response type as a JSON object
     *
     * @param orgId
     * @return returns the organization information (id, service type, address, description)
     */
    @RequestMapping("/org")
    public Response getOrgInfo(@RequestParam(value="orgId", defaultValue = "") String orgId) {
        if (orgId.equals("")) {
            return new ClientError(400, "Must provide an orgId.");
        } else {
            return new Organization(200, 1, "Barber", "123 Seseme St.", "I provide good haircuts!");
        }
    }
}


