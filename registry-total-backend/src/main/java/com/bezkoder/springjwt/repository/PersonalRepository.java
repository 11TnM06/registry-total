package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Personal;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface PersonalRepository extends JpaRepository<Personal, Long> {
    Optional<Personal> findByPersonalId(String personal_id);
    Boolean existsByPersonalId(String personal_id);
}
