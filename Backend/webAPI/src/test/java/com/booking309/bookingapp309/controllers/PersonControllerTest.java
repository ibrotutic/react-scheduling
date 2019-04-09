package com.booking309.bookingapp309.controllers;

import com.booking309.bookingapp309.objects.Person;
import com.booking309.bookingapp309.repositories.PersonRepository;
import net.bytebuddy.utility.RandomString;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class PersonControllerTest {

    private static final String PERSON_ID = "1234-5678-910";

    @Mock
    private PersonRepository mockPersonRepository;

    @Mock
    private PersonController personController;

    @Before
    public void setUp(){
        personController = new PersonController(mockPersonRepository);
    }

    @Test
    public void getSetInfo(){
        Person person = createPerson();

        Mockito.when(mockPersonRepository.findBypId(PERSON_ID)).thenReturn(person);

        assertThat(personController.getSetInfo(PERSON_ID), is(person));
    }
    @Test
    public void putSetInfo(){
        Person person = createPerson();

        assertThat(personController.putSetInfo(person), is(person));
    }

    private Person createPerson() {
        Person person = new Person();

        person.setFname(getRandomString());
        person.setLname(getRandomString());
        person.setEmail(getRandomString());
        person.setpId(PERSON_ID);
        person.setUsername(getRandomString());

        return person;
    }

    private String getRandomString() {
        RandomString randString = new RandomString();

        return randString.nextString();
    }





}
