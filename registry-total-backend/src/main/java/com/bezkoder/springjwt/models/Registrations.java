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
    @Column(name = "gcn", nullable = false, unique = true)
    private String gcn;

    @Column(name = "registry_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date registryDate;

    @Column(name = "expired_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date expiredDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "registry_car_id", nullable = false)
    private Car registryCar;
}

