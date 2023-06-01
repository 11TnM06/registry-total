package com.bezkoder.springjwt.payload.response.user_response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class ListExpiredCarResponse {
    List<ListCarResponse> cars;
    int expiredDate;
    int firstRegistration;

    public ListExpiredCarResponse(List<ListCarResponse> cars, int expiredDate, int firstRegistration) {
        this.cars = cars;
        this.expiredDate = expiredDate;
        this.firstRegistration = firstRegistration;
    }


}
