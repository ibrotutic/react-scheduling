package com.booking309.bookingapp309.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.booking309.bookingapp309.objects.Appointment;
import com.booking309.bookingapp309.repositories.AppointmentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.bytebuddy.utility.RandomString;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RunWith(MockitoJUnitRunner.class)
public class CalendarControllerWebMockTest {
    private static final int APP_ID = 123;
    private static final String PERSON_ID = "1234-567-89";

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private AppointmentRepository mockApptRepository;
    private CalendarController calendarController;
    private SimpMessagingTemplate simp;

    @Before
    public void setUp(){
        calendarController = new CalendarController(mockApptRepository, simp);
        this.mockMvc = MockMvcBuilders.standaloneSetup(calendarController).build();
    }

    @Test
    public void getValidApptByPersonIdReturnsSuccess() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        List<Appointment> apptList = createRandomAppointmentList();

        when(mockApptRepository.findAllByClientIdOrEmpId(PERSON_ID, PERSON_ID)).thenReturn(apptList);

        MockHttpServletResponse response = this.mockMvc.perform(get("/calendar?pid={pid}", PERSON_ID))
                .andReturn()
                .getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(mapper.writeValueAsString(apptList));
    }

    @Test
    public void postValidApptReturnsSuccess() throws Exception{
        Appointment testAppt = createRandomAppointment();

        this.mockMvc.perform( MockMvcRequestBuilders
                .post("/calendar")
                .content(asJsonString(testAppt))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.pid").exists());
    }

    @Test
    public void testApptDeleteReturnsSuccess() throws Exception{
        MockHttpServletResponse response = this.mockMvc.perform(delete("/calendar?id={id}", APP_ID))
                .andReturn()
                .getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        verify(mockApptRepository, times(1)).deleteById(APP_ID);
    }


    private Appointment createRandomAppointment() {
        Appointment appointment = new Appointment();

        Random rand = new Random();
        RandomString randString = new RandomString();

        appointment.setId(rand.nextInt());
        appointment.setClientId(randString.nextString());
        appointment.setEmpId(randString.nextString());
        appointment.setOrgId(randString.nextString());
        appointment.setEndTime(rand.nextLong());


        return appointment;
    }

    private List<Appointment> createRandomAppointmentList() {
        List<Appointment> appointments = new ArrayList<>();
        Random rand = new Random();

        for (int i = 0; i < rand.nextInt(10); i++) {
            appointments.add(createRandomAppointment());
        }

        return appointments;
    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
