package com.bezkoder.springjwt.payload.request.user_request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
public class AddRegistrationRequest {
    String licensePlate;

    String registryDate;

    String expiredDate;

    String gcn;

    public AddRegistrationRequest(String licensePlate, String registryDate, String expiredDate, String gcn) {
        this.licensePlate = licensePlate;
        this.registryDate = registryDate;
        this.expiredDate = expiredDate;
        this.gcn = gcn;
    }

}
