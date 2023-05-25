package com.bezkoder.springjwt.controllers.internal.admin.management;

import com.bezkoder.springjwt.services.admin.management.AdminManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bezkoder.springjwt.payload.request.user_request.CreateAccountRequest;

import javax.validation.Valid;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/admin/user")
//@PreAuthorize("hasAuthority('admin')")

public class AdminManagementController {

    private final AdminManagementService adminManagementService;

    @Autowired
    public AdminManagementController(
            AdminManagementService adminManagementService, AdminManagementService adminManagementService1) {
        this.adminManagementService = adminManagementService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody CreateAccountRequest createAccountRequest) {
        return adminManagementService.signupAccount(createAccountRequest);
    }
}
