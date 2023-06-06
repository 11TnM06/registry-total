package com.bezkoder.springjwt.payload.response.statistic_response;

import com.bezkoder.springjwt.models.*;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ListCarResponse {
    private Car car;
    private TechnicalData technical;
    private List<Registration> registrations = new ArrayList<>();
    private Personal personal;
    private Company company;
    //private String username;

    public ListCarResponse(Car car) {
        this.car = new Car(
                car.getId(),
                car.getLicensePlate(),
                car.getCarId(),
                car.getRegistrationDate(),
                car.getRegistrationPlace(),
                car.getBrand(),
                car.getModel(),
                car.getPatch(),
                car.getColor(),
                car.getFrameNumber(),
                car.getEngineNumber(),
                car.getPurpose()
        );

        if (car.getCompany() != null)
            this.company = new Company(
                    car.getCompany().getCompanyId(),
                    car.getCompany().getName(),
                    car.getCompany().getRepresentative(),
                    car.getCompany().getPhone(),
                    car.getCompany().getAddress()
            );
        if (car.getPersonal() != null)
            this.personal = new Personal(
                    car.getPersonal().getPersonalId(),
                    car.getPersonal().getName(),
                    car.getPersonal().getRegistrationPlace(),
                    car.getPersonal().getRegistrationDate(),
                    car.getPersonal().getDob(),
                    car.getPersonal().getGender(),
                    car.getPersonal().getAddress(),
                    car.getPersonal().getPhone()
            );

        this.technical = new TechnicalData(
                car.getTechnical().getSize(),
                car.getTechnical().getSelfWeight(),
                car.getTechnical().getMaxPeople(),
                car.getTechnical().getLength(),
                car.getTechnical().getContainerSize(),
                car.getTechnical().getMaxContainerWeight(),
                car.getTechnical().getMaxWeight(),
                car.getTechnical().getTowingMass()
        );
        if (car.getRegistrations() != null) {
            for (Registration registration : car.getRegistrations()) {
                this.registrations.add(new Registration(
                        registration.getGcn(),
                        registration.getRegistryDate(),
                        registration.getExpiredDate(),
                        registration.getRegistryCenter()
                ));
            }
        }

    }

    public ListCarResponse(Car car, String username) {
        this.car = new Car(
                car.getId(),
                car.getLicensePlate(),
                car.getCarId(),
                car.getRegistrationDate(),
                car.getRegistrationPlace(),
                car.getBrand(),
                car.getModel(),
                car.getPatch(),
                car.getColor(),
                car.getFrameNumber(),
                car.getEngineNumber(),
                car.getPurpose()
        );

        if (car.getCompany() != null)
            this.company = new Company(
                    car.getCompany().getCompanyId(),
                    car.getCompany().getName(),
                    car.getCompany().getRepresentative(),
                    car.getCompany().getPhone(),
                    car.getCompany().getAddress()
            );
        if (car.getPersonal() != null)
            this.personal = new Personal(
                    car.getPersonal().getPersonalId(),
                    car.getPersonal().getName(),
                    car.getPersonal().getRegistrationPlace(),
                    car.getPersonal().getRegistrationDate(),
                    car.getPersonal().getDob(),
                    car.getPersonal().getGender(),
                    car.getPersonal().getAddress(),
                    car.getPersonal().getPhone()
            );

        this.technical = new TechnicalData(
                car.getTechnical().getSize(),
                car.getTechnical().getSelfWeight(),
                car.getTechnical().getMaxPeople(),
                car.getTechnical().getLength(),
                car.getTechnical().getContainerSize(),
                car.getTechnical().getMaxContainerWeight(),
                car.getTechnical().getMaxWeight(),
                car.getTechnical().getTowingMass()
        );

        for (Registration registration : car.getRegistrations()) {
            if (registration.getRegistryCenter().equals(username)) {
                this.registrations.add(new Registration(
                        registration.getGcn(),
                        registration.getRegistryDate(),
                        registration.getExpiredDate(),
                        registration.getRegistryCenter()
                ));
            }
        }
    }

}