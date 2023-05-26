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
    private int selfWeight;

    @Column(name = "max_people", nullable = false)
    private int maxPeople;

    @Column(name = "axles_div_wheelbase", nullable = false)
    private String axlesDivWheelbase;

    @Column(name = "container_size", nullable = false)
    private String containerSize;

    @Column(name = "max_container_weight", nullable = false)
    private int maxContainerWeight;

    @Column(name = "max_weight", nullable = false)
    private int maxWeight;

    @Column(name = "towing_mass", nullable = false)
    private int towingMass;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "technicalData")
    @JsonIgnore
    private Car car;
}
