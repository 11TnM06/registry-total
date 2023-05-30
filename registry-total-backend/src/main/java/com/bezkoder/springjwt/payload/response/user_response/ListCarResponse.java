package com.bezkoder.springjwt.payload.response.user_response;

import lombok.Data;

import java.util.Date;

@Data
public class ListCarResponse {
    private String licensePlate;
    private String carId;
    private Date registrationsDate;
    private String registrationsPlace;
    private String carBrand;
    private String model;
    private String generation;
    private String color;
    private String frameNumber;
    private String engineNumber;
    private String purpose;

    public ListCarResponse(String licensePlate, String carId, Date registrationsDate, String registrationsPlace, String carBrand, String model, String generation, String color, String frameNumber, String engineNumber, String purpose) {
        this.licensePlate = licensePlate;
        this.carId = carId;
        this.registrationsDate = registrationsDate;
        this.registrationsPlace = registrationsPlace;
        this.carBrand = carBrand;
        this.model = model;
        this.generation = generation;
        this.color = color;
        this.frameNumber = frameNumber;
        this.engineNumber = engineNumber;
        this.purpose = purpose;

    }

}