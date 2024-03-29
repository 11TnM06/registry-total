package com.bezkoder.springjwt.controllers.internal.admin.upload;

import com.bezkoder.springjwt.payload.request.add_request.AddCarRequest;
import com.bezkoder.springjwt.services.admin.upload.AdminUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/admin/upload/")
@PreAuthorize("hasRole('ADMIN')")

public class AdminUploadController {

    private final AdminUploadService adminUploadService;

    @Autowired
    public AdminUploadController(
            AdminUploadService adminUploadService) {
        this.adminUploadService = adminUploadService;
    }

    @PostMapping("/car")
    public ResponseEntity<?> uploadCar(@Valid @RequestBody AddCarRequest addCarRequest) {
        return adminUploadService.uploadCar(addCarRequest);
    }

    @PostMapping("/cars")
    public ResponseEntity<?> uploadCars(@Valid @RequestBody @RequestParam("file") MultipartFile file ) {
        return adminUploadService.uploadCars(file);
    }

    @PostMapping("/users")
    public ResponseEntity<?> uploadUsers(@Valid @RequestBody @RequestParam("file") MultipartFile file ) {
        return adminUploadService.uploadUsers(file);
    }


}
