package com.example.bespring2.service.impl;

import com.example.bespring2.model.Role;
import com.example.bespring2.repository.IRoleRepository;
import com.example.bespring2.service.IRoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository iRoleRepository;
    @Override
    public Optional<Role> roleAdmin() {
        return iRoleRepository.roleAdmin();
    }

    @Override
    public Optional<Role> roleCustomer() {
        return iRoleRepository.roleCustomer();
    }
}