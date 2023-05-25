package com.ospinadev.userManagement.dao;

import com.ospinadev.userManagement.models.User;

import java.util.List;

public interface UserDao {
    User get(Long id);
    List<User> getAll();


}
