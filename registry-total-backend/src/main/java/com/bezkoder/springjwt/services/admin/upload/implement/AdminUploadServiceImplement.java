package com.bezkoder.springjwt.services.admin.upload.implement;

import com.bezkoder.springjwt.payload.request.user_request.AddCarRequest;
import com.bezkoder.springjwt.repository.CarRepository;
import com.bezkoder.springjwt.respone_state.ResponseFactory;
import com.bezkoder.springjwt.respone_state.ResponseStatusEnum;
import com.bezkoder.springjwt.services.admin.upload.AdminUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AdminUploadServiceImplement implements AdminUploadService {
    private final CarRepository carRepository;

    @Autowired
    public AdminUploadServiceImplement(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public ResponseEntity<?> uploadCar(AddCarRequest addCarRequest) {
        if (!carRepository.existsByLicensePlate(addCarRequest.getCar().getLicensePlate())) {
            ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.CAR_EXIST);
        }
        System.out.println(addCarRequest.getCar().getLicensePlate());
        return ResponseFactory.success("add car successfully!");
    }
}
