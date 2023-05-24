package com.ospinadev.userManagement.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @RequestMapping(value = "Hola Mundo SOG!")
    public String test(){
        return "Hola Mundo SOG!";
    }
}
