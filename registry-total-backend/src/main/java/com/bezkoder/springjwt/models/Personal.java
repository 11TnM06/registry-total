package com.bezkoder.springjwt.models;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
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

    @Column(name = "place", nullable = false)
    private String place;

    @Column(name = "date_id", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateId;

    @Column(name = "birthday", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date birthday;

    @Column(name = "sex", nullable = false)
    private String sex;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "phone", nullable = false)
    private String phone;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "personal_id", cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<Car> cars;


}
