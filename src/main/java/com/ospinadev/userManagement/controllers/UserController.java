package com.ospinadev.userManagement.controllers;

import com.ospinadev.userManagement.dao.UserDao;
import com.ospinadev.userManagement.models.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class UserController implements UserDao {

    @RequestMapping(value = "user/{id}")
    public User get(@PathVariable Long id){
        User userTest = new User();
        userTest.setId(id);
        userTest.setName("Sebastian");
        userTest.setLastName("Ospina");
        userTest.setEmail("sebastian47121@gmail.com");
        userTest.setPhone("3137292067");
        userTest.setPassword("zaq12345");
        return userTest;
    }
    @RequestMapping(value = "users")
    public List<User> getAll(){
        List<User> users = new ArrayList<>();
        User userTest1 = new User();
        userTest1.setId(4712L);
        userTest1.setName("Sebastian");
        userTest1.setLastName("Ospina");
        userTest1.setEmail("sebastian47121@gmail.com");
        userTest1.setPhone("3137292067");
        userTest1.setPassword("zaq12345");

        User userTest2 = new User();
        userTest2.setId(2501L);
        userTest2.setName("Mariana");
        userTest2.setLastName("Gomez");
        userTest2.setEmail("marianagp2501@gmail.com");
        userTest2.setPhone("3106384258");
        userTest2.setPassword("zaq12345");

        users.add(userTest1);
        users.add(userTest2);

        return users;
    }
}
