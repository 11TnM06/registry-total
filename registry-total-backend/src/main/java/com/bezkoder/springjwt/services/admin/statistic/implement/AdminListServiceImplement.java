package com.bezkoder.springjwt.services.admin.statistic.implement;

import com.bezkoder.springjwt.models.Car;
import com.bezkoder.springjwt.models.Registration;
import com.bezkoder.springjwt.models.TechnicalData;
import com.bezkoder.springjwt.payload.request.statistic_request.ListCarRequest;
import com.bezkoder.springjwt.payload.request.statistic_request.ListRegisteredCarRequest;
import com.bezkoder.springjwt.payload.response.statistic_response.*;
import com.bezkoder.springjwt.repository.CarRepository;
import com.bezkoder.springjwt.respone_state.ResponseFactory;
import com.bezkoder.springjwt.respone_state.ResponseStatusEnum;
import com.bezkoder.springjwt.services.admin.statistic.AdminListService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import static com.bezkoder.springjwt.utils.Utils.ListExpiredCarUtils;
import static com.bezkoder.springjwt.utils.Utils.ListRegisteredCarUtils;

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
            listCarResponse.add(new ListCarResponse(car));

        }
        return ResponseFactory.success(listCarResponse);
    }

    public ResponseEntity<?> getOwner(ListCarRequest listCarRequest) {
        if (!carRepository.existsByLicensePlate(listCarRequest.getLicensePlate())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.WRONG_INFORMATION);
        }

        Car car = carRepository.findByLicensePlate(listCarRequest.getLicensePlate());

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

        Car car = carRepository.findByLicensePlate(listCarRequest.getLicensePlate());
        TechnicalData technical = car.getTechnical();
        ListTechnicalResponse listTechnicalResponse = new ListTechnicalResponse(technical);

        return ResponseFactory.success(listTechnicalResponse, ListTechnicalResponse.class);
    }

    public ResponseEntity<?> getRegistrations(ListCarRequest listCarRequest) {
        if (!carRepository.existsByLicensePlate(listCarRequest.getLicensePlate())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.WRONG_INFORMATION);
        }

        Car car = carRepository.findByLicensePlate(listCarRequest.getLicensePlate());

        List<Registration> registrations = car.getRegistrations();

        return ResponseFactory.success(registrations);
    }

    public ResponseEntity<?> getAllRegisteredCars(ListRegisteredCarRequest listRegisteredCarRequest) {
        String locationType = listRegisteredCarRequest.getLocationType();
        String timeType = listRegisteredCarRequest.getTimeType();
        String time = listRegisteredCarRequest.getTime();
        String location = listRegisteredCarRequest.getLocation();
        String year = listRegisteredCarRequest.getYear();

        if (carRepository.findAll().isEmpty()) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.NOT_MATCHING_PRODUCT_FOUND);
        }
        List<ListCarResponse> listCarResponse = new ArrayList<>();
        List<Car> cars = new ArrayList<>();
        List<Car> tmp_car = carRepository.findAll();


        for (Car car : tmp_car) {
            List<Registration> registrations = car.getRegistrations();
            for (Registration registration : registrations) {
                if (registration == null) {
                    continue;
                }
                Date date = registration.getRegistryDate();
                if (locationType.equals("Khu vực")) {
                    if (ListRegisteredCarUtils(car, date, timeType, time, year, location, car.getRegistrationPlace())) {
                        cars.add(car);
                    }
                }
                else if (locationType.equals("Trung tâm")) {
                    if(ListRegisteredCarUtils(car, date, timeType, time, year, location, registration.getRegistryCenter())) {
                        cars.add(car);
                    }
                }
                else {
                    if (ListRegisteredCarUtils(car, date, timeType, time, year, location, location)) {
                        cars.add(car);
                    }
                }

            }
        }

        for (Car car : cars) {
            listCarResponse.add(new ListCarResponse(car));
        }
        return ResponseFactory.success(listCarResponse);
    }

    public ResponseEntity<?> getAllExpiredCars(ListRegisteredCarRequest listRegisteredCarRequest) {
        String locationType = listRegisteredCarRequest.getLocationType();
        String timeType = listRegisteredCarRequest.getTimeType();
        String time = listRegisteredCarRequest.getTime();
        String location = listRegisteredCarRequest.getLocation();
        String year = listRegisteredCarRequest.getYear();

        if (carRepository.findAll().isEmpty()) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.NOT_MATCHING_PRODUCT_FOUND);
        }
        List<ListCarResponse> listCarResponse = new ArrayList<>();
        List<Car> cars = new ArrayList<>();
        List<Car> tmp_car = carRepository.findAll();


        for (Car car : tmp_car) {
            List<Registration> registrations = car.getRegistrations();
            for (Registration registration : registrations) {
                if (registration == null) {
                    continue;
                }
                Date date = registration.getExpiredDate();
                if (locationType.equals("Khu vực")) {
                    if (ListExpiredCarUtils(car, date, timeType, time, year, location, car.getRegistrationPlace())) {
                        cars.add(car);
                    }
                }
                else if (locationType.equals("Trung tâm")) {
                    if(ListExpiredCarUtils(car, date, timeType, time, year, location, registration.getRegistryCenter())) {
                        cars.add(car);
                    }
                }
                else {
                    if (ListExpiredCarUtils(car, date, timeType, time, year, location, location)) {
                        cars.add(car);
                    }
                }

            }
        }

        int expiredDate = cars.size();
        int firstRegistration = 0;
        for (Car car : cars) {
            listCarResponse.add(new ListCarResponse(car));
            if (car.getRegistrations() == null && car.getRegistrationPlace().equals(location)) {
                firstRegistration++;
            }
        }

        firstRegistration += expiredDate;
        ListExpiredCarResponse listExpiredCarResponse = new ListExpiredCarResponse(listCarResponse, expiredDate, firstRegistration);
        return ResponseFactory.success(listExpiredCarResponse);
    }



}


