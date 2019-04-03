package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.repositories.OrgRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class OrgControllerTest {
    private static final String orgId = "123-456-789";
    private static final String adminId = "12345";

    @Mock
    private OrgRepository mockOrgRepository;
    @Mock
    private OrgController orgController;

    @Before
    public void setUp() {
        orgController = new OrgController(mockOrgRepository);
    }

    @Test
    public void getOrgInfo() {
        when(mockOrgRepository.findByOrgId(orgId)).thenReturn(createTestOrg());

        Organization returnedOrg = orgController.getOrgInfo(orgId);

        assertEquals("Ibro's Cool Org", returnedOrg.getName());
        assertEquals("Tutor", returnedOrg.getServiceType());
        assertEquals("100 ISU Ave", returnedOrg.getAddress());
        assertEquals("I tutor stuff", returnedOrg.getDescription());
        assertEquals(adminId, returnedOrg.getAdminId());
        assertEquals(orgId, returnedOrg.getOrgId());
    }

    @Test
    public void getOrgAdminInfo() {
        List<Organization> expectedOrgList = createTestOrgList();
        when(mockOrgRepository.findAllByAdminId(adminId)).thenReturn(expectedOrgList);

        List<Organization> actualOrgList = orgController.getOrgAdminInfo(adminId);

        assertEquals(expectedOrgList.size(), actualOrgList.size());
        assertThat(actualOrgList, is(expectedOrgList));
        verify(mockOrgRepository, times(1)).findAllByAdminId(adminId);
    }

    @Test
    public void putOrgInfo() {
        Organization organization = createTestOrg();

        assertThat(orgController.putOrgInfo(organization), is(organization));
    }

    private Organization createTestOrg() {
        Organization testOrg = new Organization();

        testOrg.setName("Ibro's Cool Org");
        testOrg.setServiceType("Tutor");
        testOrg.setAddress("100 ISU Ave");
        testOrg.setDescription("I tutor stuff");
        testOrg.setAdminId(adminId);
        testOrg.setOrgId(orgId);

        return testOrg;
    }

    private List<Organization> createTestOrgList() {
        List<Organization> orgList = new ArrayList<>();

        Organization testOrg1 = new Organization();
        Organization testOrg2 = new Organization();

        testOrg1.setName("Ibro's Cool Org");
        testOrg1.setServiceType("Tutor");
        testOrg1.setAddress("100 ISU Ave");
        testOrg1.setDescription("I tutor stuff");
        testOrg1.setAdminId(adminId);
        testOrg1.setOrgId(orgId);

        testOrg2.setName("Ibro's Other Cool Org");
        testOrg2.setServiceType("Hacker");
        testOrg2.setAddress("200 ISU Ave");
        testOrg2.setDescription("I hack stuff");
        testOrg2.setAdminId(adminId);
        testOrg2.setOrgId("132-555-666");

        orgList.add(testOrg1);
        orgList.add(testOrg2);

        return orgList;
    }

}
