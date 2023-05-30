package com.bezkoder.springjwt.services.admin.statistic.implement;

import com.bezkoder.springjwt.models.Car;
import com.bezkoder.springjwt.models.Registrations;
import com.bezkoder.springjwt.payload.request.user_request.ListCarRequest;
import com.bezkoder.springjwt.payload.response.user_response.*;
import com.bezkoder.springjwt.repository.CarRepository;
import com.bezkoder.springjwt.repository.RegistryInformationRepository;
import com.bezkoder.springjwt.respone_state.ResponseFactory;
import com.bezkoder.springjwt.respone_state.ResponseStatusEnum;
import com.bezkoder.springjwt.services.admin.statistic.AdminListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

@Service
public class AdminListServiceImplement implements AdminListService {
    private final CarRepository carRepository;
    private final RegistryInformationRepository registryInformationRepository;
    @Autowired
    public AdminListServiceImplement(CarRepository carRepository, RegistryInformationRepository registryInformationRepository) {

        this.carRepository = carRepository;
        this.registryInformationRepository = registryInformationRepository;
    }
    public ResponseEntity<?> getCar(@Valid @RequestBody ListCarRequest listCarRequest) {
        if (!carRepository.existsByLicensePlate(listCarRequest.getLicensePlate())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.NOT_MATCHING_PRODUCT_FOUND);
        }

        Car car = carRepository.findByLicensePlate(listCarRequest.getLicensePlate()).orElseThrow(() -> new RuntimeException("Error: Car is not found."));
        ListCarResponse listCarResponse = new ListCarResponse(car.getLicensePlate(),
                car.getCarId(),
                car.getRegistrationDate(),
                car.getRegistrationPlace(),
                car.getBrand(),
                car.getModel(),
                car.getGeneration(),
                car.getColor(),
                car.getFrameNumber(),
                car.getEngineNumber(),
                car.getPurpose());

        return ResponseFactory.success(listCarResponse, ListCarResponse.class);
    }

    public ResponseEntity<?> getAllCars() {
        if (carRepository.findAll().isEmpty()) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.NOT_MATCHING_PRODUCT_FOUND);
        }

        List<Car> cars = carRepository.findAll();
        return ResponseFactory.success(cars);
    }

    public ResponseEntity<?> getOwner(ListCarRequest listCarRequest) {
        if (!carRepository.existsByLicensePlate(listCarRequest.getLicensePlate())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.WRONG_INFORMATION);
        }

        Car car = carRepository.findByLicensePlate(listCarRequest.getLicensePlate()).orElseThrow(() -> new RuntimeException("Error: Car is not found."));

        if (car.getPersonal() == null) {
            ListCompanyResponse listCompanyResponse = new ListCompanyResponse(car.getCompany().getCompanyId(),
                    car.getCompany().getName(),
                    car.getCompany().getAddress(),
                    car.getCompany().getRepresentative(),
                    car.getCompany().getPhone()
            );
            return ResponseFactory.success(listCompanyResponse, ListCompanyResponse.class);
        }
        else {
            ListPersonalResponse listPersonalResponse = new ListPersonalResponse(
                    car.getPersonal().getPersonalId(),
                    car.getPersonal().getName(),
                    car.getPersonal().getRegistrationPlace(),
                    car.getPersonal().getRegistrationDate(),
                    car.getPersonal().getDob(),
                    car.getPersonal().getGender(),
                    car.getPersonal().getAddress(),
                    car.getPersonal().getPhone()
            );

            return ResponseFactory.success(listPersonalResponse, ListPersonalResponse.class);
        }

    }

    public ResponseEntity<?> getTechnicalData(ListCarRequest listCarRequest) {
        if (!carRepository.existsByLicensePlate(listCarRequest.getLicensePlate())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.WRONG_INFORMATION);
        }

        Car car = carRepository.findByLicensePlate(listCarRequest.getLicensePlate()).orElseThrow(() -> new RuntimeException("Error: Car is not found."));
        ListTechnicalResponse listTechnicalResponse = new ListTechnicalResponse(
                car.getTechnical().getTechnicalId(),
                car.getTechnical().getSize(),
                car.getTechnical().getSelfWeight(),
                car.getTechnical().getMaxPeople(),
                car.getTechnical().getLength(),
                car.getTechnical().getContainerSize(),
                car.getTechnical().getMaxContainerWeight(),
                car.getTechnical().getMaxWeight(),
                car.getTechnical().getTowingMass()
        );


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


