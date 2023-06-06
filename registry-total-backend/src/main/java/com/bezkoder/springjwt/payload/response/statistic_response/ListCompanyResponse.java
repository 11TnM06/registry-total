package com.bezkoder.springjwt.payload.response.statistic_response;

import com.bezkoder.springjwt.models.Company;
import lombok.Data;

@Data
public class ListCompanyResponse {
    private Company owner;


    public ListCompanyResponse(Company company) {
        this.owner = new Company(company.getCompanyId(),
            company.getName(),
            company.getRepresentative(),
            company.getPhone(),
            company.getAddress()
        );
    }
}
