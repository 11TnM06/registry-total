package com.bezkoder.springjwt.payload.request.user_request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class LoginRequest {
    @NotBlank
    @Pattern(message = "Invalid username", regexp = "^[a-zA-Z0-9]*$")
    private String username;

    @NotBlank
    @Pattern(message = "Invalid password", regexp = "^[a-zA-Z0-9]*$")
    private String password;

}
