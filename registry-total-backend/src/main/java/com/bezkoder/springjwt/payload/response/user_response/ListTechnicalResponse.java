package com.bezkoder.springjwt.payload.response.user_response;

import lombok.Data;

@Data
public class ListTechnicalResponse {
    private String technicalId;
    private String size;
    private Integer self_weight;
    private Integer max_people;
    private Integer length;
    private String container_size;
    private String max_container_weight;
    private String max_weight;
    private String towing_mass;

    public ListTechnicalResponse(String technicalId, String size, Integer weight, Integer max_people, Integer length, String container_size, String max_container_weight, String max_weight, String towing_mass) {
        this.technicalId = technicalId;
        this.size = size;
        this.self_weight = weight;
        this.max_people = max_people;
        this.length = length;
        this.container_size = container_size;
        this.max_container_weight = max_container_weight;
        this.max_weight = max_weight;
        this.towing_mass = towing_mass;
    }
}
