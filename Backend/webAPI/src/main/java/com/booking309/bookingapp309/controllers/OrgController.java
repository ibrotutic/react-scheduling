package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.repositories.OrgRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * A class that controls the endpoints that are being utilized
 * @author Jake Veatch
 * @author Seth Jones
 */
@RestController
public class OrgController {
    @Autowired
    private OrgRepository orgRepository;

    /**
     * A method that returns an organization of Response type as a JSON object
     *
     * @param orgId
     * @return returns the organization information (id, service type, address, description)
     */
    @GetMapping("/org")
    public @ResponseBody Organization getOrgInfo(@RequestParam String orgId) {
        if (orgId.equals("")) {
            return null;
        }

        return orgRepository.findById(Integer.parseInt(orgId));
    }

    @PostMapping("/org")
    public @ResponseBody Organization putOrgInfo(@RequestBody Organization org) {
        orgRepository.save(org);

        return org;
    }
}


