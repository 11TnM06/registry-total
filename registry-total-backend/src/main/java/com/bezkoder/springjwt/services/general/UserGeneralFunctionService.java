package com.bezkoder.springjwt.services.general;

import com.bezkoder.springjwt.payload.request.user_request.ChangePasswordRequest;
import org.springframework.http.ResponseEntity;

public interface UserGeneralFunctionService {
    public ResponseEntity<?> changePassword(ChangePasswordRequest changePasswordRequest);
}
