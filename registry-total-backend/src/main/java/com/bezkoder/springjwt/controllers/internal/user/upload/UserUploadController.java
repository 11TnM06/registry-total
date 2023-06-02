package com.bezkoder.springjwt.controllers.internal.user.upload;

import com.bezkoder.springjwt.payload.request.user_request.AddRegistrationRequest;
import com.bezkoder.springjwt.services.user.upload.UserUploadService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/user/upload/")
@PreAuthorize("hasRole('USER')")
public class UserUploadController {
    private final UserUploadService userUploadService;
    public UserUploadController(UserUploadService userUploadService) {
        this.userUploadService = userUploadService;
    }

    @PostMapping("/registration")
    public ResponseEntity<?> uploadRegistration(@Valid @RequestBody AddRegistrationRequest addRegistrationRequest) {
        return userUploadService.uploadRegistration(addRegistrationRequest);
    }
}
