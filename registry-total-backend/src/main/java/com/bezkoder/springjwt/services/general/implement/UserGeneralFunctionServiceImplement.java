package com.bezkoder.springjwt.services.general.implement;

import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.payload.request.user_request.ChangePasswordRequest;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.respone_state.ResponseFactory;
import com.bezkoder.springjwt.respone_state.ResponseStatusEnum;
import com.bezkoder.springjwt.services.general.UserGeneralFunctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserGeneralFunctionServiceImplement implements UserGeneralFunctionService {
    private final PasswordEncoder encoder;
    private final UserRepository userRepository;


    @Autowired
    public UserGeneralFunctionServiceImplement(PasswordEncoder encoder, UserRepository userRepository) {
        this.encoder = encoder;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> changePassword(ChangePasswordRequest changePasswordRequest) {
        if (!changePasswordRequest.getRetypePassword().equals(changePasswordRequest.getNewPassword())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.WRONG_INFORMATION);
        }
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
        User user = userRepository.findByUsername(username);

        if (!encoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
            return ResponseFactory.error(HttpStatus.valueOf(403), ResponseStatusEnum.WRONG_INFORMATION);
        }
        user.setPassword(encoder.encode(changePasswordRequest.getNewPassword()));
        userRepository.save(user);
        return ResponseFactory.success("Password has changed !");

    }
}
