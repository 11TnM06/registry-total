package com.bezkoder.springjwt.payload.response.user_response;

import lombok.Data;

@Data
public class ListTechnicalResponse {
    private String technical_id;
    private String size;
    private Integer self_weight;
    private Integer max_people;
    private String axles_div_wheelbase;
    private String container_size;
    private String max_container_weight;
    private String max_weight;
    private String towing_mass;

    public ListTechnicalResponse(String technical_id, String size, Integer weight, Integer max_people, String axles_div_wheelbase, String container_size, String max_container_weight, String max_weight, String towing_mass) {
        this.technical_id = technical_id;
        this.size = size;
        this.self_weight = weight;
        this.max_people = max_people;
        this.axles_div_wheelbase = axles_div_wheelbase;
        this.container_size = container_size;
        this.max_container_weight = max_container_weight;
        this.max_weight = max_weight;
        this.towing_mass = towing_mass;
    }
}
