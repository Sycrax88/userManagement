package com.ospinadev.userManagement.controllers;

import com.ospinadev.userManagement.dao.UserDao;
import com.ospinadev.userManagement.models.User;
import com.ospinadev.userManagement.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validateToken(String token){
        String userId = jwtUtil.getKey(token);
        return userId != null;
    }

    @RequestMapping(value = "api/users", method = RequestMethod.GET)
    public List<User> getAll(@RequestHeader(value="Authorization") String token){
        if (validateToken(token))
            return userDao.getAll();
        return new ArrayList<>();
    }

    @RequestMapping(value = "api/users/{id}", method = RequestMethod.GET)
    public User getById(@RequestHeader(value="Authorization") String token,
            @PathVariable Long id){
        if (validateToken(token))
            return userDao.getById(id);
        return null;
    }

    @RequestMapping(value = "api/users/email/{email}", method = RequestMethod.GET)
    public User getByEmail(@PathVariable String email) {
        return userDao.getByEmail(email);
    }

    @RequestMapping(value = "api/users",method = RequestMethod.POST)
    public void register(@RequestBody User user){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1,user.getPassword());
        user.setPassword(hash);
        userDao.register(user);
    }

    @RequestMapping(value = "api/users/{id}", method = RequestMethod.DELETE)
    public void delete(@RequestHeader(value="Authorization") String token,
                       @PathVariable Long id){
        if (validateToken(token))
            userDao.delete(id);
    }

    @RequestMapping(value = "api/users/{id}", method = RequestMethod.PUT)
    public void update(@RequestHeader(value="Authorization") String token,
                           @PathVariable Long id,
                           @RequestBody User updatedUser){
        if (validateToken(token)){
            User existingUser = userDao.getById(id);
            System.out.println("SOG existingUser1: "+ existingUser);
            if (existingUser != null){
                System.out.println("SOG existingUser2: "+ existingUser);
                System.out.println("SOG updatedUser: "+ updatedUser);
                // Actualizar los campos del usuario existente con los valores del objeto actualizado
                existingUser.setName(updatedUser.getName());
                existingUser.setLastName(updatedUser.getLastName());
                existingUser.setPhone(updatedUser.getPhone());
                System.out.println("SOG existingUser3: "+ existingUser);


                userDao.update(existingUser);
            }
        }
    }


}
