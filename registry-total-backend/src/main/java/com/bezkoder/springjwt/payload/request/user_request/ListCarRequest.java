package com.bezkoder.springjwt.payload.request.user_request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ListCarRequest {
    @NotBlank
    private String licensePlate;


}
