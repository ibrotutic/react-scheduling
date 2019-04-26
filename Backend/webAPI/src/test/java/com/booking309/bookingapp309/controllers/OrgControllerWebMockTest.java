package com.booking309.bookingapp309.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.repositories.OrgRepository;
import com.booking309.bookingapp309.repositories.PhotoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class OrgControllerWebMockTest {
    private static final String orgId = "123-456-789";
    private static final String adminId = "12345";

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private OrgRepository mockOrgRepository;
    @Mock
    private PhotoRepository mockPhotoRepository;
    private OrgController orgController;

    @Before
    public void setUp() {
        orgController = new OrgController(mockOrgRepository, mockPhotoRepository);
        this.mockMvc = MockMvcBuilders.standaloneSetup(orgController).build();
    }

    @Test
    public void getValidOrgByOrgIdReturnsSuccess() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Organization testOrg = createTestOrg();
        when(mockOrgRepository.findByOrgId(orgId)).thenReturn(testOrg);

        MockHttpServletResponse response = this.mockMvc.perform(get("/org?orgId={orgId}", orgId))
                .andReturn()
                .getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(mapper.writeValueAsString(testOrg));
    }

    @Test
    public void postValidOrgReturnsSuccess() throws Exception {
        Organization testOrg = createTestOrg();

        this.mockMvc.perform( MockMvcRequestBuilders
                .post("/org")
                .content(asJsonString(testOrg))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.orgId").exists());
    }

    @Test
    public void getValidOrgByAdminIdReturnsSuccess() throws Exception {
        List<Organization> orgList = new ArrayList<>();
        Organization testOrg = createTestOrg();
        orgList.add(testOrg);

        MockHttpServletResponse response = this.mockMvc.perform(get("/org?orgId={orgId}", orgId))
                .andReturn()
                .getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    public void testOrgDeleteReturnsSuccess() throws Exception {
        MockHttpServletResponse response = this.mockMvc.perform(delete("/org?orgId={orgId}", orgId))
                .andReturn()
                .getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        verify(mockOrgRepository, times(1)).deleteByOrgId(orgId);
    }

    private Organization createTestOrg() {
        Organization testOrg = new Organization();

        testOrg.setName("Ibro's Cool Org");
        testOrg.setServiceType("Tutor");
        testOrg.setAddress("100 ISU Ave");
        testOrg.setDescription("I tutor stuff");
        testOrg.setDocumentId("1");
        testOrg.setAdminId(adminId);
        testOrg.setOrgId(orgId);

        return testOrg;
    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
