package com.bezkoder.springjwt.payload.response.user_response;

import lombok.Data;

import java.util.Date;

@Data
public class ListCarResponse {
    private String licensePlate;
    private String carId;
    private Date registrations_date;
    private String registrations_place;
    private String carBrand;
    private String model;
    private String type;
    private String color;
    private String frameNumber;
    private String engineNumber;
    private String purpose;

    public ListCarResponse(String licensePlate, String carId, Date registrations_date, String registrations_place, String carBrand, String model, String type, String color, String frameNumber, String engineNumber, String purpose) {
        this.licensePlate = licensePlate;
        this.carId = carId;
        this.registrations_date = registrations_date;
        this.registrations_place = registrations_place;
        this.carBrand = carBrand;
        this.model = model;
        this.type = type;
        this.color = color;
        this.frameNumber = frameNumber;
        this.engineNumber = engineNumber;
        this.purpose = purpose;

    }

}