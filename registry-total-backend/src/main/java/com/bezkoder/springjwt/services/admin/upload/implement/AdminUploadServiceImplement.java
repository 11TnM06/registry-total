package com.bezkoder.springjwt.services.admin.upload.implement;

import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.payload.request.add_request.AddCarRequest;
import com.bezkoder.springjwt.payload.response.statistic_response.ListCarResponse;
import com.bezkoder.springjwt.payload.response.statistic_response.ListCompanyResponse;

import com.bezkoder.springjwt.repository.*;
import com.bezkoder.springjwt.respone_state.ResponseFactory;
import com.bezkoder.springjwt.respone_state.ResponseStatusEnum;
import com.bezkoder.springjwt.services.admin.upload.AdminUploadService;
import com.bezkoder.springjwt.utils.Utils;

import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.*;
import java.util.*;

import static com.bezkoder.springjwt.utils.Utils.*;

@Service
public class AdminUploadServiceImplement implements AdminUploadService {
    private final CarRepository carRepository;
    private final TechnicalRepository technicalRepository;
    private final PersonalRepository personalRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final PasswordEncoder encoder;


    @Autowired
    public AdminUploadServiceImplement(CarRepository carRepository, TechnicalRepository technicalRepository,
                                       PersonalRepository personalRepository, CompanyRepository companyRepository,
                                       UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder) {
        this.carRepository = carRepository;
        this.technicalRepository = technicalRepository;
        this.personalRepository = personalRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
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
            if(!companyRepository.existsByCompanyId(company.getCompanyId())){
                companyRepository.save(company);
            }
            car.setCompany(company);

        }

        if (personal != null) {
            if (!personalRepository.existsByPersonalId(personal.getPersonalId())) {
                personalRepository.save(personal);
            }
            car.setPersonal(personal);
        }

        technicalRepository.save(technicalData);
        car.setTechnical(technicalData);

        carRepository.save(car);

        return ResponseFactory.success("Thêm xe thành công!");
    }

    public ResponseEntity<?> uploadCars(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.FILE_IS_EMPTY);
        }


        String path = "./src/main/resources/file_data.xlsx";
        File file_data = convertMultipartFileToFile(multipartFile, path);

        List<TechnicalData> listTechnical = new ArrayList<>();
        List<Personal> listPersonal = new ArrayList<>();
        List<Car> listCar = new ArrayList<>();
        List<Company> listCompany = new ArrayList<>();

        List<ListCarResponse> listCarResponse = new ArrayList<>();
        List<ListCompanyResponse> listCompanyResponses = new ArrayList<>();
        try {

            // Reading file from local directory
            FileInputStream file = new FileInputStream(file_data);
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

            if (car.getCompany() != null) {
                if(!companyRepository.existsByCompanyId(car.getCompany().getCompanyId())){
                    companyRepository.save(car.getCompany());
                }
                car.setCompany(car.getCompany());

            }

            if (car.getPersonal() != null) {
                if (!personalRepository.existsByPersonalId(car.getPersonal().getPersonalId())) {
                    personalRepository.save(car.getPersonal());
                }
                car.setPersonal(car.getPersonal());
            }

            technicalRepository.save(car.getTechnical());
            carRepository.save(car);
        }
        return ResponseFactory.success("Thêm danh sách xe thành công!");
    }

    public ResponseEntity<?> uploadUsers(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.FILE_IS_EMPTY);
        }
        List<User> listUser = new ArrayList<>();
        String path = "./src/main/resources/file_data.xlsx";
        File file_data = convertMultipartFileToFile(multipartFile, path);
        try {

            // Reading file from local directory
            FileInputStream file = new FileInputStream(file_data);

            XSSFWorkbook workbook = new XSSFWorkbook(file);
            XSSFSheet sheet = workbook.getSheetAt(5);
            listUser = InitMultipleUsers(sheet);
            file.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        for (User user : listUser) {
            if (user == null) continue;
            if (userRepository.existsByUsername(user.getUsername())) {
                return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.REGISTERED_USERNAME);
            }
            if (userRepository.existsByEmail(user.getEmail())) {
                return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.REGISTERED_EMAIL);
            }

            Set<Role> roles = new HashSet<>();
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
            user.setRoles(roles);
            user.setPassword(encoder.encode(user.getPassword()));
            userRepository.save(user);
        }
        return ResponseFactory.success("Thêm danh sách người dùng thành công!");
    }


}
