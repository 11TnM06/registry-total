package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistryInformationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findAll();
    Boolean existsByGcn(String gcn);


}
