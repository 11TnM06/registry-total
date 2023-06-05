package com.bezkoder.springjwt.services.user.upload;

import com.bezkoder.springjwt.payload.request.user_request.AddRegistrationRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserUploadService {
    ResponseEntity<?> uploadRegistration(AddRegistrationRequest addRegistrationRequest);
    ResponseEntity<?> uploadRegistrations(MultipartFile file);
}
