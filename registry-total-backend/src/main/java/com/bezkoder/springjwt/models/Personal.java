package com.bezkoder.springjwt.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "personal")
public class Personal extends BaseEntity {

    @Column(name = "personal_id", nullable = false, unique = true)
    private String personalId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "registration_place", nullable = false)
    private String registrationPlace;

    @Column(name = "registration_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date registrationDate;

    @Column(name = "DOB", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dob;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "phone", nullable = false)
    private String phone;

    private String type;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "personal", cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<Car> cars;
    public Personal(String personalId, String name, String registrationPlace, Date registrationDate,
                    Date dob, String gender, String address, String phone) {
        this.personalId = personalId;
        this.name = name;
        this.registrationPlace = registrationPlace;
        this.registrationDate = registrationDate;
        this.dob = dob;
        this.gender = gender;
        this.address = address;
        this.phone = phone;
        this.type = "Cá nhân";
    }


}
