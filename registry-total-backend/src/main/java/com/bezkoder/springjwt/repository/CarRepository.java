package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface CarRepository extends JpaRepository<Car, Long> {

    List<Car> findAll();
    Optional<Car> findByLicensePlate(String licensePlate);

    Boolean existsByLicensePlate(String licensePlate);


}
