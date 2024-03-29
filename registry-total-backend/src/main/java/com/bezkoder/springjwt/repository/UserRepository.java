package com.bezkoder.springjwt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.springjwt.models.User;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  User findByUsername(String username);
  User findById(String id);
  Boolean existsById(String id);

  @Transactional
  void deleteById(String id);
  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

  User findByName(String name);
  User findByEmail(String email);

  User findByPassword(String password);

}
