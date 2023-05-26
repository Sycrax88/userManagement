package com.ospinadev.userManagement.dao;

import com.ospinadev.userManagement.models.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class UserDaoImp implements UserDao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<User> getAll() {
        String query = "FROM User";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public User getById(Long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User getByEmail(String email) {
        String query = "FROM User WHERE email = :email";
        return entityManager.createQuery(query, User.class)
                .setParameter("email", email)
                .getSingleResult();
    }

    @Override
    public void delete(Long id) {
        User user = this.getById(id);
        entityManager.remove(user);
    }

    @Override
    public void register(User user) {
        entityManager.merge(user);
    }

    @Override
    public boolean verifyCredentials(User user) {
        User foundUser = this.getByEmail(user.getEmail());
        System.out.println("SOG: "+ foundUser);
        System.out.println("SOG: "+ user);

        String passwordHashed = foundUser.getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        System.out.println("SOG "+argon2.verify(passwordHashed, user.getPassword().toCharArray()));
        return argon2.verify(passwordHashed, user.getPassword().toCharArray());
    }

}
