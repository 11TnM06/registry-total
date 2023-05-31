package com.bezkoder.springjwt.services.admin.upload;

import com.bezkoder.springjwt.payload.request.user_request.AddCarRequest;
import org.springframework.http.ResponseEntity;

public interface AdminUploadService {
    ResponseEntity<?> uploadCar(AddCarRequest addCarRequest);
}
