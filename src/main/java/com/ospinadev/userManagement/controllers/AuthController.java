package com.ospinadev.userManagement.controllers;

import com.ospinadev.userManagement.models.User;
import com.ospinadev.userManagement.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private UserDao userDao;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public void login(@RequestBody User user) {
        userDao.verifyCredentials(user);
    }

}
