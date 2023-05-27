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

    @Column(name = "technical_id", nullable = false)
    private String technicalId;

    @Column(name = "size", nullable = false)
    private String size;

    @Column(name = "self_weight", nullable = false)
    private Integer selfWeight;

    @Column(name = "max_people", nullable = false)
    private Integer maxPeople;

    @Column(name = "axles_div_wheelbase", nullable = false)
    private String axlesDivWheelbase;

    @Column(name = "container_size")
    private String containerSize;

    @Column(name = "max_container_weight")
    private String maxContainerWeight;

    @Column(name = "max_weight", nullable = false)
    private String maxWeight;

    @Column(name = "towing_mass")
    private String towingMass;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "technicalData")
    @JsonIgnore
    private Car car;
}
