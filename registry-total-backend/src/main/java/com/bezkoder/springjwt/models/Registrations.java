package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "registry_information")
public class Registrations extends BaseEntity {
    @Column(name = "gcn_id", nullable = false, unique = true)
    private String registryId;

    @Column(name = "registry_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date registryDate;

    @Column(name = "expired_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date expiredDate;

    @Column(name = "registry_name", nullable = false)
    private String registryName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "license_plate", nullable = false)
    private Car registryCar;
}

