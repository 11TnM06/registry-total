package com.bezkoder.springjwt.payload.response.user_response;

import lombok.Data;

@Data
public class ListCompanyResponse {
    private String companyId;
    private String type;
    private String name;
    private String address;
    private String representative;
    private String phone;

    public ListCompanyResponse(String companyId, String name, String address, String representative, String phone) {
        this.companyId = companyId;
        this.name = name;
        this.address = address;
        this.representative = representative;
        this.phone = phone;
        this.type = "company";
    }
}
