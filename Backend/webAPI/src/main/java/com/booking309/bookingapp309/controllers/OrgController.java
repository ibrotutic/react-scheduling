package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.objects.Photo;
import com.booking309.bookingapp309.repositories.OrgRepository;
import com.booking309.bookingapp309.repositories.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A class that controls the endpoints that are being utilized
 *
 * @author Jake Veatch
 * @author Seth Jones
 */
@RestController
public class OrgController {
    private OrgRepository orgRepository;
    private PhotoRepository photoRepository;

    @Autowired
    public OrgController(OrgRepository orgRepository, PhotoRepository photoRepository) {
        this.orgRepository = orgRepository;
        this.photoRepository = photoRepository;
    }

    /**
     * A method that returns an organization of Response type as a JSON object
     *
     * @param orgId Id of the org to fetch
     * @return returns the organization information (id, service type, address, description)
     */
    @CrossOrigin
    @GetMapping("/org")
    public @ResponseBody
    Organization getOrgInfo(@RequestParam String orgId) {
        return orgRepository.findByOrgId(orgId);
    }

    @CrossOrigin
    @PostMapping("/org")
    public @ResponseBody
    Organization putOrgInfo(@RequestBody Organization org) {
        orgRepository.save(org);

        return org;
    }

    @CrossOrigin
    @GetMapping("/org/admin")
    public @ResponseBody
    List<Organization> getOrgAdminInfo(@RequestParam String adminId) {
        return orgRepository.findAllByAdminId(adminId);
    }

    @CrossOrigin
    @DeleteMapping("/org")
    public @ResponseBody
    void deleteOrg(@RequestParam String orgId) {
        orgRepository.deleteByOrgId(orgId);
    }

    @CrossOrigin
    @PostMapping("/org/photos")
    public @ResponseBody
    Photo addPhoto(@RequestParam String orgId, @RequestParam String url) {
        Photo photo = new Photo();
        photo.setOrgId(orgId);
        photo.setUrl(url);

        photoRepository.save(photo);
        return photo;
    }

    @CrossOrigin
    @GetMapping("/org/photos")
    public List<String> getPhotoUrlsForOrg(@RequestParam String orgId) {
        return photoRepository.findAllByOrgId(orgId).stream()
                .filter(Objects::nonNull)
                .map(Photo::getUrl)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @DeleteMapping("/org/photos")
    public @ResponseBody
    String deletePhoto(@RequestParam String orgId, @RequestParam String url) {
        photoRepository.deleteByOrgIdAndUrl(orgId, url);
        return url;
    }
}
