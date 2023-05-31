package com.bezkoder.springjwt.services.admin.upload.implement;

import com.bezkoder.springjwt.models.Car;
import com.bezkoder.springjwt.models.Company;
import com.bezkoder.springjwt.models.Personal;
import com.bezkoder.springjwt.models.TechnicalData;
import com.bezkoder.springjwt.payload.request.user_request.AddCarRequest;
import com.bezkoder.springjwt.repository.CarRepository;
import com.bezkoder.springjwt.repository.CompanyRepository;
import com.bezkoder.springjwt.repository.PersonalRepository;
import com.bezkoder.springjwt.repository.TechnicalRepository;
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
    private final TechnicalRepository technicalRepository;
    private final PersonalRepository personalRepository;
    private final CompanyRepository companyRepository;
    @Autowired
    public AdminUploadServiceImplement(CarRepository carRepository, TechnicalRepository technicalRepository,
                                       PersonalRepository personalRepository, CompanyRepository companyRepository) {
        this.carRepository = carRepository;
        this.technicalRepository = technicalRepository;
        this.personalRepository = personalRepository;
        this.companyRepository = companyRepository;
    }

    public ResponseEntity<?> uploadCar(AddCarRequest addCarRequest) {
        Car car = addCarRequest.getCar();
        Company company = addCarRequest.getCompany();
        Personal personal = addCarRequest.getPersonal();
        TechnicalData technicalData = addCarRequest.getTechnical();

        if (carRepository.existsByLicensePlate(car.getLicensePlate())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.EXISTED_CAR);
        }

        if (carRepository.existsByCarId(car.getCarId())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.EXISTED_CAR);
        }

        if (carRepository.existsByEngineNumber(car.getEngineNumber())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.EXISTED_CAR);
        }

        if (carRepository.existsByFrameNumber(car.getFrameNumber())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.EXISTED_CAR);
        }


        if (company != null) {
            if (companyRepository.existsByCompanyId(company.getCompanyId())) {
                return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.EXISTED_COMPANY);
            }

            companyRepository.save(company);
            car.setCompany(company);

        }

        if (personal != null) {
            if (personalRepository.existsByPersonalId(personal.getPersonalId())) {
                return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.EXISTED_PERSONAL);
            }

            personalRepository.save(personal);
            car.setPersonal(personal);
        }

        technicalRepository.save(technicalData);
        car.setTechnical(technicalData);

        carRepository.save(car);

        return ResponseFactory.success("add car successfully!");
    }

}
