package com.worksphere.auth.service;

import com.worksphere.auth.dto.RegisterRequest;
import com.worksphere.auth.entity.User;
import com.worksphere.auth.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.worksphere.auth.exception.EmailAlreadyExistsException;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("USER");

        return userRepository.save(user);
    }
}