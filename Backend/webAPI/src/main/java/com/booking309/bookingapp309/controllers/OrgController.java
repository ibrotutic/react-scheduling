package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.repositories.OrgRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class OrgController {
    @Autowired
    private OrgRepository orgRepository;

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
