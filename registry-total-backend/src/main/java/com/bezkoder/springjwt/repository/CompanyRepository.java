package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}
