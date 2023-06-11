package com.bezkoder.springjwt.services.user.statistic.implement;

import com.bezkoder.springjwt.models.Car;
import com.bezkoder.springjwt.models.Registration;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.payload.request.statistic_request.ListRegisteredCarRequest;
import com.bezkoder.springjwt.payload.response.statistic_response.ListCarResponse;
import com.bezkoder.springjwt.payload.response.statistic_response.ListExpiredCarResponse;
import com.bezkoder.springjwt.repository.CarRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.respone_state.ResponseFactory;
import com.bezkoder.springjwt.respone_state.ResponseStatusEnum;
import com.bezkoder.springjwt.services.user.statistic.UserListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.bezkoder.springjwt.utils.Utils.*;

@Service
public class UserListServiceImplement implements UserListService {
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    @Autowired
    public UserListServiceImplement(CarRepository carRepository, UserRepository userRepository) {
        this.carRepository = carRepository;
        this.userRepository = userRepository;
    }
    public ResponseEntity<?> getAllRegisteredCarsInCenter(ListRegisteredCarRequest listRegisteredCarRequest) {
        String timeType = listRegisteredCarRequest.getTimeType();
        String time = listRegisteredCarRequest.getTime();
        User user = currentUser(userRepository);
        String location = user.getUsername();
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
                if (ListRegisteredCarUtils(date, timeType, time, year, location, registration.getRegistryCenter())) {
                    cars.add(car);
                }
            }
        }
        for (Car car : cars) {
            listCarResponse.add(new ListCarResponse(car));
        }
        return ResponseFactory.success(listCarResponse);
    }

    public ResponseEntity<?> getAllExpiredCarsInCenter(ListRegisteredCarRequest listRegisteredCarRequest) {
        String timeType = listRegisteredCarRequest.getTimeType();
        String time = listRegisteredCarRequest.getTime();
        User user = currentUser(userRepository);
        String location = user.getUsername();
        String year = listRegisteredCarRequest.getYear();

        if (carRepository.findAll().isEmpty()) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.NOT_MATCHING_PRODUCT_FOUND);
        }
        List<ListCarResponse> listCarResponse = new ArrayList<>();
        List<Car> cars = new ArrayList<>();
        List<Car> tmp_car = carRepository.findAll();

        int firstRegistration = 0;
        for (Car car : tmp_car) {
            List<Registration> registrations = car.getRegistrations();
            if (registrations.isEmpty()) {
                Date date = car.getRegistrationDate();
                if (predictFirstTimeRegistry(date, timeType, time, year, user.getLocation(), car.getRegistrationPlace())) {
                    firstRegistration++;
                }
                continue;
            }
            for (Registration registration : registrations) {
                if (registration == null) {
                    continue;
                }
                Date date = registration.getExpiredDate();
                if (ListExpiredCarUtils(date, timeType, time, year, location, registration.getRegistryCenter())) {
                    cars.add(car);
                }
            }
        }

        int expiredDate = cars.size();
        for (Car car : cars) {
            listCarResponse.add(new ListCarResponse(car));
        }

        ListExpiredCarResponse listExpiredCarResponse = new ListExpiredCarResponse(listCarResponse, expiredDate, firstRegistration);
        return ResponseFactory.success(listExpiredCarResponse);
    }

    public ResponseEntity<?> getAll() {
        User user = currentUser(userRepository);
        List<Car> cars = carRepository.findAll();

        List<ListCarResponse> listCarResponses = new ArrayList<>();

        for (Car car : cars) {
            for (Registration registration : car.getRegistrations()) {
                if (registration == null) {
                    continue;
                }
                if (registration.getRegistryCenter().equals(user.getUsername())) {
                    listCarResponses.add(new ListCarResponse(car, user.getUsername()));
                    break;
                }
            }
        }

        return ResponseFactory.success(listCarResponses);
    }


}
