package com.bezkoder.springjwt.payload.response.user_response;

import com.bezkoder.springjwt.models.Personal;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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
