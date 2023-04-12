package com.example.bespring2.service.impl;

import com.example.bespring2.dto.IUser;
import com.example.bespring2.dto.request.UpdateUserForm;
import com.example.bespring2.model.User;
import com.example.bespring2.repository.IUserRepository;
import com.example.bespring2.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository iUserRepository;

    @Override
    public List<User> findAll() {
        return iUserRepository.findAll();
    }

    @Override
    public boolean existsByUsername(String username) {
        return iUserRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return iUserRepository.existsByEmail(email);
    }

    @Override
    public void save(User user) {
        iUserRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return Optional.empty();
    }

    @Override
    public void changePassword(String password, String username) {

    }

    @Override
    public void updateUser(UpdateUserForm updateUserForm) {

    }

    @Override
    public User userLogin(int id) {
        return iUserRepository.findById(id).orElse(null);
    }

    @Override
    public IUser getInfoUserId(int idUser) {
        return iUserRepository.getInfoUserId(idUser);
    }

}