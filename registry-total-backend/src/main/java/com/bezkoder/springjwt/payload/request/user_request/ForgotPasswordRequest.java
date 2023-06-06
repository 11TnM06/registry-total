package com.bezkoder.springjwt.payload.request.user_request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class ForgotPasswordRequest {
    @NotBlank
    @Pattern(message = "Invalid username", regexp = "^(?=[a-zA-Z0-9._]{7,20}$)(?!.*[_.]{2})[^_.].*[^_.]$")
    private String username;

    @NotBlank
    @Pattern(message = "Invalid email", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
    private String email;
}
