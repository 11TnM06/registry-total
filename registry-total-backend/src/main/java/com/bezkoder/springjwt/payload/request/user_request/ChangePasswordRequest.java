package com.bezkoder.springjwt.payload.request.user_request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class ChangePasswordRequest {

    @NotBlank
    @Pattern(message = "Invalid old password", regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{7,20}$")
    private String oldPassword;

    @NotBlank
    @Pattern(message = "Invalid new password", regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{7,20}$")
    private String newPassword;

    @NotBlank
    @Pattern(message = "Invalid confirmed password", regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{7,20}$")
    private String retypePassword;
}