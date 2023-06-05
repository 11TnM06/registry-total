package com.bezkoder.springjwt.payload.request.user_request;

import lombok.Data;

import java.util.Set;

import javax.validation.constraints.*;

@Data
public class CreateAccountRequest {
    @NotBlank
    @Pattern(message = "Invalid username", regexp = "^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$")
    private String username;

    @NotBlank
    @Pattern(message = "Invalid company name", regexp = "^[0-9a-zA-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]+$")
    private String name;

    @NotBlank
    @Pattern(message = "Invalid email", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
    @Email
    private String email;

    private Set<String> role;

    @NotBlank
    @Pattern(message = "Invalid password", regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{7,20}$")
    private String password;

    @NotBlank
    @Pattern(message = "Invalid retype password", regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{7,20}$")
    private String retypePassword;

    @NotBlank
    @Pattern(message = "Invalid location name", regexp = "^[0-9a-zA-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]+$")
    private String location;


}
