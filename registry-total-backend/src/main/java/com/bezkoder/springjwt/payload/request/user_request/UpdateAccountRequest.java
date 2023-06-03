package com.bezkoder.springjwt.payload.request.user_request;

import lombok.Data;

import java.util.Set;

import javax.validation.constraints.*;

@Data
public class UpdateAccountRequest {
    @NotBlank
    @Pattern(message = "Invalid registry center", regexp = "^[0-9a-zA-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]+$")
    private String name;

    @NotBlank
    @Pattern(message = "Invalid email", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
    @Email
    private String email;

    @NotBlank
    @Pattern(message = "Invalid password", regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{7,20}$")
    private String password;

    @NotBlank
    @Pattern(message = "Invalid retype password", regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{7,20}$")
    private String retypePassword;


}
