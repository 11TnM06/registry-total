package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
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
public class Registration extends BaseEntity {
    @Column(name = "gcn", nullable = false, unique = true)
    private String gcn;

    @Column(name = "registry_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date registryDate;

    @Column(name = "expired_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date expiredDate;

    @Column(name = "registry_center", nullable = false)
    private String registryCenter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "registry_car_id", nullable = false)
    private Car registryCar;

    public Registration(String gcn, Date registryDate, Date expiredDate, String registryCenter) {
        this.gcn = gcn;
        this.registryDate = registryDate;
        this.expiredDate = expiredDate;
        this.registryCenter = registryCenter;
    }

    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING, timezone = "GMT+7")
    @JsonDeserialize(as = java.sql.Date.class)
    public void setExpiredDate(Date expiredDate) {
        this.expiredDate = expiredDate;
    }

    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING, timezone = "GMT+7")
    @JsonDeserialize(as = java.sql.Date.class)
    public void setRegistryDate(Date registryDate) {
        this.registryDate = registryDate;
    }
}

