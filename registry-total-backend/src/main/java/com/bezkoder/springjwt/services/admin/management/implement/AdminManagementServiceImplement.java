package com.bezkoder.springjwt.services.admin.management.implement;

import com.bezkoder.springjwt.models.*;
//import com.bezkoder.springjwt.payload.request.user_request.AddCarRequest;
import com.bezkoder.springjwt.payload.request.user_request.CreateAccountRequest;
import com.bezkoder.springjwt.payload.request.user_request.UpdateAccountRequest;
import com.bezkoder.springjwt.payload.response.user_response.MessageResponse;
import com.bezkoder.springjwt.repository.RoleRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.respone_state.ResponseFactory;
import com.bezkoder.springjwt.respone_state.ResponseStatusEnum;
import com.bezkoder.springjwt.services.admin.management.AdminManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@Service
public class AdminManagementServiceImplement implements AdminManagementService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder encoder;


    @Autowired
    public AdminManagementServiceImplement(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder encoder
            ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
    }

    public ResponseEntity<?> signupAccount(@Valid @RequestBody CreateAccountRequest createAccountRequest) {

        if (!createAccountRequest.getRetypePassword().equals(createAccountRequest.getPassword())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.NOT_MATCHING_RETYPE_PASSWORD);
        }

        if (userRepository.existsByUsername(createAccountRequest.getUsername())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.REGISTERED_USERNAME);
        }

        if (userRepository.existsByEmail(createAccountRequest.getEmail())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.REGISTERED_EMAIL);
        }


        // Create new user's account
        User user = new User(createAccountRequest.getUsername(),
                createAccountRequest.getEmail(),
                createAccountRequest.getName(),
                encoder.encode(createAccountRequest.getPassword()));

        Set<String> strRoles = createAccountRequest.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);
        return ResponseFactory.success("User registered successfully!");
    }

    public ResponseEntity<?> getAllAccounts() {
        if (userRepository.findAll().isEmpty()) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.NOT_MATCHING_PRODUCT_FOUND);
        }

        return ResponseFactory.success(userRepository.findAll());
    }

    public ResponseEntity<?> deleteAccount(String id) {
        User user = userRepository.findById(id);
        if (user == null) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.NOT_MATCHING_PRODUCT_FOUND);
        }
        if (user.getRoles().contains(ERole.ROLE_ADMIN)) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.WRONG_INFORMATION);
        }

        if (userRepository.existsById(id)) {
            System.out.println("Username: " + userRepository.findById(id).getUsername() + " is deleted");
        }

        userRepository.deleteById(id);
        return ResponseFactory.success("Delete account successfully!");
    }

    public ResponseEntity<?> updateAccount(String id, UpdateAccountRequest updateAccountRequest) {
        User user = userRepository.findById(id);
        if (user == null) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.NOT_MATCHING_PRODUCT_FOUND);
        }

        if (userRepository.existsByEmail(updateAccountRequest.getEmail())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.REGISTERED_EMAIL);
        }

        if (!user.getUsername().equals(updateAccountRequest.getUsername())) {
            if (userRepository.findByUsername(updateAccountRequest.getUsername()) != null) {
                return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.REGISTERED_USERNAME);
            }
        }

        if (!user.getEmail().equals(updateAccountRequest.getEmail())) {
            if (userRepository.findByEmail(updateAccountRequest.getEmail()) != null) {
                return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.REGISTERED_EMAIL);
            }
        }

        if (!user.getName().equals(updateAccountRequest.getName())) {
            if (userRepository.findByName(updateAccountRequest.getName()) != null) {
                return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.REGISTERED_COMPANY_NAME);
            }
        }

        user.setUsername(updateAccountRequest.getUsername());
        user.setEmail(updateAccountRequest.getEmail());
        user.setName(updateAccountRequest.getName());
        user.setPassword(encoder.encode(updateAccountRequest.getPassword()));
        userRepository.save(user);
        return ResponseFactory.success("Update account successfully!");
    }


}
