package com.ospinadev.userManagement.dao;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

@Repository
@Transactional
public class RoleDaoImp implements RoleDao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public int getRoleByUserId(Long id) {
        String query = "SELECT ur.role.roleId FROM UserRole ur WHERE ur.user.id = :userId";
        TypedQuery<Long> typedQuery = entityManager.createQuery(query, Long.class);
        typedQuery.setParameter("userId", id);
        return Math.toIntExact(typedQuery.getSingleResult());
    }
}
