package com.bezkoder.springjwt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "car",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class Car extends BaseEntity {
//    license_plate VARCHAR(100) NOT NULL,
//    registration_date DATE NOT NULL,
//    registration_place VARCHAR(100) NOT NULL,
//    brand VARCHAR(100) NOT NULL,
//    model VARCHAR(100) NOT NULL,
//    type VARCHAR(100) NOT NULL,
//    color VARCHAR(100) NOT NULL,
//    frame_number VARCHAR(100) NOT NULL,
//    engine_number VARCHAR(100) NOT NULL,
//    purpose VARCHAR(100) NOT NULL,
//    owner_id VARCHAR(20) NOT NULL,
}
