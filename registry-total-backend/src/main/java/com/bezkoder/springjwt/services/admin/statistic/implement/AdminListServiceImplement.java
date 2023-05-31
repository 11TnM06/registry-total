package com.bezkoder.springjwt.services.admin.statistic.implement;

import com.bezkoder.springjwt.models.Car;
import com.bezkoder.springjwt.models.Registrations;
import com.bezkoder.springjwt.models.TechnicalData;
import com.bezkoder.springjwt.payload.request.user_request.ListCarRequest;
import com.bezkoder.springjwt.payload.response.user_response.*;
import com.bezkoder.springjwt.repository.CarRepository;
import com.bezkoder.springjwt.respone_state.ResponseFactory;
import com.bezkoder.springjwt.respone_state.ResponseStatusEnum;
import com.bezkoder.springjwt.services.admin.statistic.AdminListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminListServiceImplement implements AdminListService {
    private final CarRepository carRepository;
    @Autowired
    public AdminListServiceImplement(CarRepository carRepository) {

        this.carRepository = carRepository;
    }

    public ResponseEntity<?> getAllCars() {
        if (carRepository.findAll().isEmpty()) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.NOT_MATCHING_PRODUCT_FOUND);
        }

        List<Car> cars = carRepository.findAll();
        List<ListCarResponse> listCarResponse = new ArrayList<>();

        for (Car car : cars) {
            TechnicalData technical = car.getTechnical();
            List<Registrations> registrations = car.getRegistrations();
            listCarResponse.add(new ListCarResponse(car));

        }
        return ResponseFactory.success(listCarResponse);
    }

    public ResponseEntity<?> getOwner(ListCarRequest listCarRequest) {
        if (!carRepository.existsByLicensePlate(listCarRequest.getLicensePlate())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.WRONG_INFORMATION);
        }

        Car car = carRepository.findByLicensePlate(listCarRequest.getLicensePlate()).orElseThrow(() -> new RuntimeException("Error: Car is not found."));

        if (car.getPersonal() == null) {
            ListCompanyResponse listCompanyResponse = new ListCompanyResponse(car.getCompany());
            return ResponseFactory.success(listCompanyResponse, ListCompanyResponse.class);
        }
        else {
            ListPersonalResponse listPersonalResponse = new ListPersonalResponse(car.getPersonal());

            return ResponseFactory.success(listPersonalResponse, ListPersonalResponse.class);
        }

    }

    public ResponseEntity<?> getTechnicalData(ListCarRequest listCarRequest) {
        if (!carRepository.existsByLicensePlate(listCarRequest.getLicensePlate())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.WRONG_INFORMATION);
        }

        Car car = carRepository.findByLicensePlate(listCarRequest.getLicensePlate()).orElseThrow(() -> new RuntimeException("Error: Car is not found."));
        TechnicalData technical = car.getTechnical();
        ListTechnicalResponse listTechnicalResponse = new ListTechnicalResponse(technical);

        return ResponseFactory.success(listTechnicalResponse, ListTechnicalResponse.class);
    }

    public ResponseEntity<?> getRegistrations(ListCarRequest listCarRequest) {
        if (!carRepository.existsByLicensePlate(listCarRequest.getLicensePlate())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.WRONG_INFORMATION);
        }

        Car car = carRepository.findByLicensePlate(listCarRequest.getLicensePlate()).orElseThrow(() -> new RuntimeException("Error: Car is not found."));

        List<Registrations> registrations = car.getRegistrations();

        return ResponseFactory.success(registrations);
    }
}


