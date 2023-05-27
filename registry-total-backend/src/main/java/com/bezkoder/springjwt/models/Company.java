package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "company")
public class Company extends BaseEntity {

    @Column(name = "company_id", nullable = false, unique = true)
    private String companyId;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "representative", nullable = false)
    private String representative;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "address", nullable = false)
    private String address;

    @OneToMany(mappedBy = "company_id", cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<Car> cars;
}
