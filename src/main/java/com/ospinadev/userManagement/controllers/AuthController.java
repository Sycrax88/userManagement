package com.ospinadev.userManagement.controllers;

import com.ospinadev.userManagement.models.User;
import com.ospinadev.userManagement.dao.UserDao;
import com.ospinadev.userManagement.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody User user) {

        User loggedUser = userDao.getByCredentials(user);
        if (loggedUser != null) {
            String tokenJwt = jwtUtil.create(loggedUser.getId().toString(), loggedUser.getEmail());
            return tokenJwt;
        }
        return "Fail";
    }

    /*@RequestMapping(value = "api/logout", method = RequestMethod.POST)
    public String logout(@RequestHeader(value = "Authorization") String token){
        if (token != null){

        }
    }
*/
}
