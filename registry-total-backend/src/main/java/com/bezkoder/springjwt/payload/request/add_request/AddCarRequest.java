package com.bezkoder.springjwt.payload.request.add_request;

import com.bezkoder.springjwt.models.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class AddCarRequest {
    @NotNull
    @JsonProperty("car")
    Car car;

    @NotNull
    @JsonProperty("technical")
    TechnicalData technical;

    @JsonProperty("personal")
    Personal personal;

    @JsonProperty("company")
    Company company;

    public AddCarRequest() {
    }
    public AddCarRequest(Car car) {
        this.car = new Car(
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
    }

}
