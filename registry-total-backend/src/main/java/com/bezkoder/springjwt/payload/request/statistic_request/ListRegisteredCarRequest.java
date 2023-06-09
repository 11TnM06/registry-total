package com.bezkoder.springjwt.payload.request.statistic_request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ListRegisteredCarRequest {
    String locationType;

    String location;

    @NotBlank
    String timeType;

    String time;

    String year;


    public ListRegisteredCarRequest(String locationType, String location, String timeType, String time, String year) {
        this.locationType = locationType;
        this.location = location;
        this.timeType = timeType;
        this.time = time;
        this.year = year;
    }


}
