package com.bezkoder.springjwt.payload.response.user_response;

import com.bezkoder.springjwt.models.TechnicalData;
import lombok.Data;

@Data
public class ListTechnicalResponse {
    private TechnicalData technical;

    public ListTechnicalResponse(TechnicalData technical) {
        this.technical = new TechnicalData(
                technical.getSize(),
                technical.getSelfWeight(),
                technical.getMaxPeople(),
                technical.getLength(),
                technical.getContainerSize(),
                technical.getMaxContainerWeight(),
                technical.getMaxWeight(),
                technical.getTowingMass()
        );
    }
}
