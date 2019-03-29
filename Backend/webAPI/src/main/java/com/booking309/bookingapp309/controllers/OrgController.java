package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.repositories.OrgRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * A class that controls the endpoints that are being utilized
 * @author Jake Veatch
 * @author Seth Jones
 */
@RestController
public class OrgController {
    private OrgRepository orgRepository;

    @Autowired
    public OrgController(OrgRepository orgRepository) {
        this.orgRepository = orgRepository;
    }

    /**
     * A method that returns an organization of Response type as a JSON object
     *
     * @param orgId Id of the org to fetch
     * @return returns the organization information (id, service type, address, description)
     */
    @CrossOrigin
    @GetMapping("/org")
    public @ResponseBody Organization getOrgInfo(@RequestParam String orgId) {
        return orgRepository.findByOrgId(orgId);
    }

    @CrossOrigin
    @PostMapping("/org")
    public @ResponseBody Organization putOrgInfo(@RequestBody Organization org) {
        orgRepository.save(org);

        return org;
    }

    @CrossOrigin
    @GetMapping("/org/admin")
    public @ResponseBody
    List<Organization> getOrgAdminInfo(@RequestParam String adminId) {
        return orgRepository.findAllByAdminId(adminId);
    }
}
