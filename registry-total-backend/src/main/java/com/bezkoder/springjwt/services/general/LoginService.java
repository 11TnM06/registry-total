package com.bezkoder.springjwt.services.general;

import org.springframework.http.ResponseEntity;
import com.bezkoder.springjwt.payload.request.user_request.LoginRequest;
public interface LoginService {
    ResponseEntity<?> loginAccount(LoginRequest loginRequest);
}
