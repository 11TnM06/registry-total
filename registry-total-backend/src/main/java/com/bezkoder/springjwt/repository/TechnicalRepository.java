package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.TechnicalData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnicalRepository extends JpaRepository<TechnicalData, Long> {
}
