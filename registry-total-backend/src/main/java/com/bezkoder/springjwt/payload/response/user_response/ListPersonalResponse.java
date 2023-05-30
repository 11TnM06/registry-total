package com.bezkoder.springjwt.payload.response.user_response;

import lombok.Data;

import java.util.Date;

@Data
public class ListPersonalResponse {
    private String personalId;
    private String name;
    private String registrationPlace;
    private Date registrationDate;
    private Date dob;
    private String gender;
    private String address;
    private String phone;
    private String type;

    public ListPersonalResponse (String personalId, String name, String registrationPlace, Date registrationDate,
                                 Date dob, String gender, String address, String phone) {
        this.personalId = personalId;
        this.name = name;
        this.registrationPlace = registrationPlace;
        this.registrationDate = registrationDate;
        this.dob = dob;
        this.gender = gender;
        this.address = address;
        this.phone = phone;
        this.type = "personal";
    }

}
