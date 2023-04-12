package com.example.bespring2.service;

import com.example.bespring2.model.Role;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> roleAdmin();

    Optional<Role> roleCustomer();
}