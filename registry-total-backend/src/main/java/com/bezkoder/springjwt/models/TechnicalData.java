package com.bezkoder.springjwt.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "technical_information")
public class TechnicalData extends BaseEntity {

    @Column(name = "size", nullable = false)
    private String size;

    @Column(name = "self_weight", nullable = false)
    private String selfWeight;

    @Column(name = "max_people", nullable = false)
    private String maxPeople;

    @Column(name = "length", nullable = false)
    private String length;

    @Column(name = "container_size")
    private String containerSize;

    @Column(name = "max_container_weight")
    private String maxContainerWeight;

    @Column(name = "max_weight", nullable = false)
    private String maxWeight;

    @Column(name = "towing_mass")
    private String towingMass;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "technical")
    @JsonIgnore
    private Car car;

    public TechnicalData(String size, String selfWeight, String maxPeople, String length, String containerSize, String maxContainerWeight, String maxWeight, String towingMass) {
        this.size = size;
        this.selfWeight = selfWeight;
        this.maxPeople = maxPeople;
        this.length = length;
        this.containerSize = containerSize;
        this.maxContainerWeight = maxContainerWeight;
        this.maxWeight = maxWeight;
        this.towingMass = towingMass;
    }
}
