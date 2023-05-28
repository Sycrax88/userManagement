package com.ospinadev.userManagement.controllers;

import com.ospinadev.userManagement.dao.RoleDao;
import com.ospinadev.userManagement.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RoleController {

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validateToken(String token){
        String userId = jwtUtil.getKey(token);
        return userId != null;
    }

    @RequestMapping(value = "api/roles/{id}", method = RequestMethod.GET)
    public int getUserRole(@RequestHeader(value="Authorization") String token,
                           @PathVariable Long id){
        if (validateToken(token)){
            System.out.println("Id de rol obtenido: "+roleDao.getRoleByUserId(id));
            return roleDao.getRoleByUserId(id);
        }

        return 2;
    }

}
