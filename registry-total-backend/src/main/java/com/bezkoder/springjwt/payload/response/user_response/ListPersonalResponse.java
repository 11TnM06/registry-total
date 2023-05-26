package com.bezkoder.springjwt.payload.response.user_response;

import lombok.Data;

import java.util.Date;

@Data
public class ListPersonalResponse {
    private String personalId;
    private String name;
    private String place;
    private Date date_id;
    private Date birthday;
    private String sex;
    private String address;
    private String phone;
    private String object;

    public ListPersonalResponse (String personalId, String name, String place, Date date_id,
                                 Date birthday, String sex, String address, String phone) {
        this.personalId = personalId;
        this.name = name;
        this.place = place;
        this.date_id = date_id;
        this.birthday = birthday;
        this.sex = sex;
        this.address = address;
        this.phone = phone;
    }

}
