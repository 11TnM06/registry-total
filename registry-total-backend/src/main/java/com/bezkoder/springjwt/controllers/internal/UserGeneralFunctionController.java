package com.bezkoder.springjwt.controllers.internal;

import com.bezkoder.springjwt.payload.request.user_request.ChangePasswordRequest;
import com.bezkoder.springjwt.services.general.UserGeneralFunctionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(value = "*")
@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserGeneralFunctionController {

  private final UserGeneralFunctionService userGeneralFunctionService;

  @Autowired
  public UserGeneralFunctionController(
      UserGeneralFunctionService userGeneralFunctionService) {
    this.userGeneralFunctionService = userGeneralFunctionService;
  }


  @PostMapping("/change_password")
  public ResponseEntity<?> changePassword(
      @Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
    return userGeneralFunctionService.changePassword(changePasswordRequest);
  }

}
