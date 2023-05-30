package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Registrations;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistryInformationRepository extends JpaRepository<Registrations, Long> {
    List<Registrations> findAll();
}
