package com.bezkoder.springjwt.services.user.upload;

import com.bezkoder.springjwt.payload.request.user_request.AddRegistrationRequest;
import org.springframework.http.ResponseEntity;

public interface UserUploadService {
    ResponseEntity<?> uploadRegistration(AddRegistrationRequest addRegistrationRequest);
}
