package com.bezkoder.springjwt.services.general.implement;

import com.bezkoder.springjwt.payload.request.user_request.ChangePasswordRequest;
import com.bezkoder.springjwt.services.general.UserGeneralFunctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserGeneralFunctionServiceImplement implements UserGeneralFunctionService {
    private final PasswordEncoder encoder;

    @Autowired
    public UserGeneralFunctionServiceImplement(PasswordEncoder encoder) {
        this.encoder = encoder;
    }
    public ResponseEntity<?> changePassword(ChangePasswordRequest changePasswordRequest) {
        return null;
    }
}
