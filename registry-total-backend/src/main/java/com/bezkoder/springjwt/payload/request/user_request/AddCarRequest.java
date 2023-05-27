//package com.bezkoder.springjwt.payload.request.user_request;
//
//import lombok.Data;
//
//import javax.persistence.Temporal;
//import javax.persistence.TemporalType;
//import javax.validation.constraints.NotBlank;
//import java.util.Date;
//
//@Data
//public class AddCarRequest {
//    @NotBlank
//    private String licensePlate;
//
//    @NotBlank
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date registrationDate;
//
//    @NotBlank
//    private String registrationPlace;
//
//    @NotBlank
//    private String brand;
//
//    @NotBlank
//    private String model;
//
//    @NotBlank
//    private String type;
//
//    @NotBlank
//    private String color;
//
//    @NotBlank
//    private String frameNumber;
//
//    @NotBlank
//    private String engineNumber;
//
//    @NotBlank
//    private String purpose;
//
//    @NotBlank
//    private String personalId;
//
//    @NotBlank
//    private String companyId;
//
//    @NotBlank
//    private String technicalId;
//
//    @NotBlank
//    private String registrationsId;
//
//    public AddCarRequest(String licensePlate, Date registrationDate, String registrationPlace,
//                         String brand, String model, String type, String color, String frameNumber,
//                         String engineNumber, String purpose, String personalId, String companyId, String technicalId) {
//        this.licensePlate = licensePlate;
//        this.registrationDate = registrationDate;
//        this.registrationPlace = registrationPlace;
//        this.brand = brand;
//        this.model = model;
//        this.type = type;
//        this.color = color;
//        this.frameNumber = frameNumber;
//        this.engineNumber = engineNumber;
//        this.purpose = purpose;
//        this.personalId = personalId;
//        this.companyId = companyId;
//        this.technicalId = technicalId;
//    }
//
//}
