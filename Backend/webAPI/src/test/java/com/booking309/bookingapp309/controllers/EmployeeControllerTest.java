package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.notifications.Notification;
import com.booking309.bookingapp309.notifications.NotificationType;
import com.booking309.bookingapp309.notifications.NotificationWrapper;
import com.booking309.bookingapp309.objects.Employee;
import com.booking309.bookingapp309.objects.Organization;
import com.booking309.bookingapp309.objects.Person;
import com.booking309.bookingapp309.repositories.EmployeeRepository;
import com.booking309.bookingapp309.repositories.OrgRepository;
import com.booking309.bookingapp309.repositories.PersonRepository;
import net.bytebuddy.utility.RandomString;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.Silent.class)
public class EmployeeControllerTest {
    private static final String ORG_ID = "1234-4567-69";

    @Mock
    private EmployeeRepository mockEmployeeRepository;
    @Mock
    private PersonRepository mockPersonRepository;
    private EmployeeController employeeController;

    @Mock
    private OrgRepository mockOrgRepository;

    @Mock
    private NotificationWrapper mockNotificationWrapper;

    @Mock
    private SimpMessagingTemplate mockedSimpMessageingTemplate;

    @Before
    public void setUp() {
        employeeController = new EmployeeController(mockEmployeeRepository, mockPersonRepository,
                mockOrgRepository, mockedSimpMessageingTemplate, mockNotificationWrapper);
    }

    @Test
    public void getOrgInfo() {
        List<Employee> employeeList = createEmployeesList();
        Person person = createPerson();

        Mockito.when(mockEmployeeRepository.findAllByOrgId(ORG_ID)).thenReturn(employeeList);
        Mockito.when(mockPersonRepository.findBypId(Mockito.anyString())).thenReturn(person);

        List<Person> expectedPersonList = createExpectedPersonList(person, employeeList.size());

        assertThat(employeeController.getOrgInfo(ORG_ID), is(expectedPersonList));
    }

    @Test
    public void employeeIsNotifiedOfNewJob() {
        Employee employee = createEmployee();
        Organization org = createRandomOrg();
        Person person = createPerson();

        Notification generatedNotification = new Notification<>(NotificationType.ADD_EMPLOYEE, org, employee.getEmpId());
        when(mockNotificationWrapper.createEmployeeAddedNotification(any(Organization.class), any(Employee.class))).thenReturn(generatedNotification);
        when(mockOrgRepository.findByOrgId(anyString())).thenReturn(org);
        when(mockPersonRepository.findByEmail(anyString())).thenReturn(person);
        employeeController.addEmployeeByEmail(person.getEmail(), org.getOrgId());
        verify(mockedSimpMessageingTemplate, times(1)).convertAndSend("/topic/appt/" + generatedNotification.getDestinationId(), generatedNotification);
    }

    @Test
    public void employeeIsNotifiedOfRemovedJob() {
        Organization org = createRandomOrg();
        Person person = createPerson();

        Notification generatedNotification = new Notification<>(NotificationType.REMOVE_EMPLOYEE, org, person.getpId());
        when(mockNotificationWrapper.createRemovedEmployeeNotification(any(Organization.class), any(Person.class))).thenReturn(generatedNotification);
        when(mockOrgRepository.findByOrgId(anyString())).thenReturn(org);
        when(mockPersonRepository.findBypId(anyString())).thenReturn(person);
        employeeController.deleteEmployee(person.getpId(), org.getOrgId());
        verify(mockedSimpMessageingTemplate, times(1)).convertAndSend("/topic/appt/" + generatedNotification.getDestinationId(), generatedNotification);
    }

    private List<Person> createExpectedPersonList(Person person, int length) {
        List<Person> personList = new ArrayList<>();

        for (int i = 0; i < length; i++) {
            personList.add(person);
        }

        return personList;
    }

    private Person createPerson() {
        Person person = new Person();

        person.setFname(getRandomString());
        person.setLname(getRandomString());
        person.setEmail(getRandomString());
        person.setpId(getRandomString());
        person.setUsername(getRandomString());

        return person;
    }

    private Employee createEmployee() {
        Employee employee = new Employee();

        employee.setEmpId(getRandomString());
        employee.setOrgId(getRandomString());
        employee.setStatus(getRandomString());

        return employee;
    }

    private List<Employee> createEmployeesList() {
        List<Employee> employeeList = new ArrayList<>();
        Random rand = new Random();

        for (int i = 0; i < rand.nextInt(10); i++) {
            employeeList.add(createEmployee());
        }

        return employeeList;
    }

    private Organization createRandomOrg() {
        Organization org = new Organization();
        org.setOrgId("abcd");
        return org;
    }

    private String getRandomString() {
        RandomString randString = new RandomString();

        return randString.nextString();
    }
}