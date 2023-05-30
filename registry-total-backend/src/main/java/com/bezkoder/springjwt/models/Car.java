package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "car")
public class Car extends BaseEntity {

    @Column(name = "license_plate", nullable = false, unique = true)
    @Size(max = 100)
    private String licensePlate;

    @Column(name = "car_id", nullable = false, unique = true)
    @Size(max = 100)
    private String carId;

    @Column(name = "registration_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date registrationDate;

    @Column(name = "registration_place", nullable = false)
    @Size(max = 100)
    private String registrationPlace;

    @Column(name = "brand", nullable = false)
    @Size(max = 100)
    private String brand;

    @Column(name = "model", nullable = false)
    @Size(max = 100)
    private String model;

    @Column(name = "generation", nullable = false)
    @Size(max = 100)
    private String generation;

    @Column(name = "color", nullable = false)
    @Size(max = 100)
    private String color;

    @Column(name = "frame_number", nullable = false, unique = true)
    @Size(max = 100)
    private String frameNumber;

    @Column(name = "engine_number", nullable = false, unique = true)
    @Size(max = 100)
    private String engineNumber;

    @Column(name = "purpose", nullable = false)
    @Size(max = 100)
    private String purpose;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "personal_id")
    private Personal personal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "company_id")
    private Company company;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "technical_id", referencedColumnName = "id")
    private TechnicalData technical;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "registryCar", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Registrations> registrations;


}
