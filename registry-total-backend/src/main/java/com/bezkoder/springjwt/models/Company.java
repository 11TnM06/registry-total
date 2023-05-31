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

    private String type;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<Car> cars;

    public Company (String companyId, String name, String representative, String phone, String address) {
        this.companyId = companyId;
        this.name = name;
        this.representative = representative;
        this.phone = phone;
        this.address = address;
        this.type = "Cơ quan";
    }
}
