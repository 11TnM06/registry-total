package com.bezkoder.springjwt.services.admin.upload.implement;

import com.bezkoder.springjwt.models.Car;
import com.bezkoder.springjwt.models.Company;
import com.bezkoder.springjwt.models.Personal;
import com.bezkoder.springjwt.models.TechnicalData;
import com.bezkoder.springjwt.payload.request.user_request.AddCarRequest;
import com.bezkoder.springjwt.payload.response.user_response.ListCarResponse;
import com.bezkoder.springjwt.payload.response.user_response.ListCompanyResponse;
import com.bezkoder.springjwt.payload.response.user_response.ListPersonalResponse;
import com.bezkoder.springjwt.payload.response.user_response.ListTechnicalResponse;
import com.bezkoder.springjwt.repository.CarRepository;
import com.bezkoder.springjwt.repository.CompanyRepository;
import com.bezkoder.springjwt.repository.PersonalRepository;
import com.bezkoder.springjwt.repository.TechnicalRepository;
import com.bezkoder.springjwt.respone_state.ResponseFactory;
import com.bezkoder.springjwt.respone_state.ResponseStatusEnum;
import com.bezkoder.springjwt.services.admin.upload.AdminUploadService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import static com.bezkoder.springjwt.utils.Utils.*;

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
            companyRepository.save(company);
            car.setCompany(company);

        }

        if (personal != null) {
            personalRepository.save(personal);
            car.setPersonal(personal);
        }

        technicalRepository.save(technicalData);
        car.setTechnical(technicalData);

        carRepository.save(car);

        return ResponseFactory.success("add car successfully!");
    }

    public ResponseEntity<?> uploadCars(MultipartFile name) {
        if (name.isEmpty()) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.FILE_IS_EMPTY);
        }
        List<TechnicalData> listTechnical = new ArrayList<>();
        List<Personal> listPersonal = new ArrayList<>();
        List<Car> listCar = new ArrayList<>();
        List<Company> listCompany = new ArrayList<>();

        List<ListCarResponse> listCarResponse = new ArrayList<>();
        List<ListCompanyResponse> listCompanyResponses = new ArrayList<>();
        try {

            // Reading file from local directory
            FileInputStream file = new FileInputStream(
                    new File("./src/main/resources/Web_Data_final.xlsx"));

            XSSFWorkbook workbook = new XSSFWorkbook(file);

            for (int i = 0; i <= workbook.getNumberOfSheets() - 1; i++) {
                XSSFSheet sheet = workbook.getSheetAt(i);

                switch (i) {
                    case 0:
                        listCar = InitMultipleCars(sheet);
                    case 1:
                        listTechnical = InitMultipleTechnicals(sheet);
                        break;
                    case 2:
                        listPersonal = InitMultiplePersonals(sheet);
                        break;
                    case 3:
                        listCompany = InitMultipleCompanies(sheet);
                        break;
                    default:
                        break;
                }

            }

            file.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        for (Car car : listCar) {
            if (car == null) continue;
            for (Personal personal : listPersonal) {
                if (personal == null) continue;
                for (Car personalCar : personal.getCars()) {
                    if (car.getLicensePlate().equals(personalCar.getLicensePlate())) {
                        personal.getCars().remove(personalCar);
                        personal.getCars().add(car);
                        car.setPersonal(personal);
                        break;
                    }
                }
            }

            for (Company company : listCompany) {
                if (company == null) continue;
                for (Car companyCar : company.getCars()) {
                    if (car.getLicensePlate().equals(companyCar.getLicensePlate())) {
                        company.getCars().remove(companyCar);
                        company.getCars().add(car);
                        car.setCompany(company);
                        break;
                    }
                }
            }

            for (TechnicalData technicalData : listTechnical) {
                if (technicalData == null) continue;
                if (car.getLicensePlate().equals(technicalData.getCar().getLicensePlate())) {
                    technicalData.setCar(car);
                    car.setTechnical(technicalData);
                    break;
                }
            }
            listCarResponse.add(new ListCarResponse(car));

        }

        for (Car car : listCar) {
            if (car == null) continue;
            if (car.getPersonal() != null) {
                personalRepository.save(car.getPersonal());
            }
            if(car.getCompany() != null ) {
                companyRepository.save(car.getCompany());
            }

            technicalRepository.save(car.getTechnical());
            carRepository.save(car);
        }
        return ResponseFactory.success("Thêm danh sách xe thành công!");
    }


}
