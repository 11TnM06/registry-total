package com.bezkoder.springjwt.services.user.upload.implement;

import com.bezkoder.springjwt.models.Car;
import com.bezkoder.springjwt.models.Registration;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.payload.request.user_request.AddRegistrationRequest;
import com.bezkoder.springjwt.repository.CarRepository;
import com.bezkoder.springjwt.repository.RegistryInformationRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.respone_state.ResponseFactory;
import com.bezkoder.springjwt.respone_state.ResponseStatusEnum;
import com.bezkoder.springjwt.services.user.upload.UserUploadService;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.text.SimpleDateFormat;

import static com.bezkoder.springjwt.utils.Utils.*;

@Service
public class UserUploadServiceImplement implements UserUploadService {

    private final CarRepository carRepository;
    private final RegistryInformationRepository registryInformationRepository;

    private final UserRepository userRepository;

    @Autowired
    public UserUploadServiceImplement(CarRepository carRepository, RegistryInformationRepository registryInformationRepository
    , UserRepository userRepository) {
        this.carRepository = carRepository;
        this.registryInformationRepository = registryInformationRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> uploadRegistration(AddRegistrationRequest addRegistrationRequest) {
        if (!carRepository.existsByLicensePlate(addRegistrationRequest.getLicensePlate())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.WRONG_INFORMATION);
        }
        Car car = carRepository.findByLicensePlate(addRegistrationRequest.getLicensePlate());
        String gcn = addRegistrationRequest.getGcn();
        String licensePlate = addRegistrationRequest.getLicensePlate();
        String sRegistryDate = addRegistrationRequest.getRegistryDate();
        String sExpiredDate = addRegistrationRequest.getExpiredDate();



        if (registryInformationRepository.existsByGcn(gcn)) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.EXISTED_REGISTERED);
        }

        Collections.sort(car.getRegistrations(), new Comparator<Registration>() {
            @Override
            public int compare(Registration o1, Registration o2) {
                return o2.getRegistryDate().compareTo(o1.getRegistryDate());
            }
        });


        Date expiredDateOfCar =  car.getRegistrations().get(0).getRegistryDate();
        //Convert string to date
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date registryDate = null;
        Date expiredDate = null;
        try {
            registryDate = formatter.parse(sRegistryDate);
            expiredDate = formatter.parse(sExpiredDate);
        } catch (ParseException e) {
            System.out.println("Invalid date format: " + sRegistryDate);
        }


        Calendar calendar = Calendar.getInstance();
        calendar.setTime(registryDate);

        if (expiredDateOfCar.compareTo(calendar.getTime()) > 0) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.NOT_EXPIRED_REGISTERED);
        }

        User user = currentUser(userRepository);
        Registration registration = new Registration(
                gcn,
                registryDate,
                expiredDate,
                user.getUsername(),
                car
        );

        registryInformationRepository.save(registration);
        return ResponseFactory.success("Thêm thông tin đăng kiểm thành công!");
    }

    public ResponseEntity<?> uploadRegistrations(MultipartFile name) {
        if (name.isEmpty()) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.FILE_IS_EMPTY);
        }
        List<Registration> listRegistration = new ArrayList<>();
        try {
            FileInputStream file = new FileInputStream(
                    new File("./src/main/resources/Web_Data_final.xlsx"));

            XSSFWorkbook workbook = new XSSFWorkbook(file);
            XSSFSheet sheet = workbook.getSheetAt(4);
            listRegistration = InitMultipleRegistrations(sheet, carRepository);
            file.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        User user = currentUser(userRepository);
        for (Registration registration : listRegistration) {
            System.out.println(registration.getRegistryCar().getLicensePlate());
            registration.setRegistryCenter(user.getUsername());
            registryInformationRepository.save(registration);
        }
        return ResponseFactory.success("Thêm thông tin đăng kiểm thành công!");

    }
}
