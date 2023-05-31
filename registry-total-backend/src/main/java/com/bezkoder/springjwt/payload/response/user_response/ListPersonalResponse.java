package com.bezkoder.springjwt.payload.response.user_response;

import com.bezkoder.springjwt.models.Personal;
import lombok.Data;

import java.util.Date;

@Data
public class ListPersonalResponse {
    private Personal owner;
    public ListPersonalResponse (Personal personal) {
        this.owner = new Personal(
            personal.getPersonalId(),
            personal.getName(),
            personal.getRegistrationPlace(),
            personal.getRegistrationDate(),
            personal.getDob(),
            personal.getGender(),
            personal.getAddress(),
            personal.getPhone()
        );
    }

}
