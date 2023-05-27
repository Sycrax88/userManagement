package com.ospinadev.userManagement.dao;

import com.ospinadev.userManagement.models.User;

import java.util.List;

public interface UserDao {
    User getById(Long id);

    List<User> getAll();

    void delete(Long id);

    void register(User user);

    void update(User user);

    User getByEmail(String email);

    User getByCredentials(User user);
}
