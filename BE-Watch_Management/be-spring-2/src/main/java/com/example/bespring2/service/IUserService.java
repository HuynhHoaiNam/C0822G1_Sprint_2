package com.example.bespring2.service;

import com.example.bespring2.dto.IUser;
import com.example.bespring2.dto.request.UpdateUserForm;
import com.example.bespring2.model.User;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> findAll();

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    void save(User user);

    Optional<User> findByUsername(String username);

    void changePassword(String password,String username);

    void updateUser(UpdateUserForm updateUserForm);

    User userLogin(int id);

    IUser getInfoUserId(int idUser);
}