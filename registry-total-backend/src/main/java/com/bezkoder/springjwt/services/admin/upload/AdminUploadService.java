package com.bezkoder.springjwt.services.admin.upload;

import com.bezkoder.springjwt.payload.request.add_request.AddCarRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface AdminUploadService {
    ResponseEntity<?> uploadCar(AddCarRequest addCarRequest);
    ResponseEntity<?> uploadCars(MultipartFile file);

    ResponseEntity<?> uploadUsers(MultipartFile file);
}
