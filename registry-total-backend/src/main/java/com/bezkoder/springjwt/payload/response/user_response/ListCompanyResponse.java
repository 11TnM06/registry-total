package com.bezkoder.springjwt.payload.response.user_response;

import lombok.Data;

@Data
public class ListCompanyResponse {
    private String company_id;
    private String object;
    private String name;
    private String address;
    private String representative;
    private String phone;

    public ListCompanyResponse(String company_id, String name, String address, String representative, String phone) {
        this.company_id = company_id;
        this.name = name;
        this.address = address;
        this.representative = representative;
        this.phone = phone;
        this.object = "company";
    }
}
