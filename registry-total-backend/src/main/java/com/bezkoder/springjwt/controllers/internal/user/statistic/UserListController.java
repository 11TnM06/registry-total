package com.bezkoder.springjwt.controllers.internal.user.statistic;

import com.bezkoder.springjwt.payload.request.user_request.ListRegisteredCarRequest;
import com.bezkoder.springjwt.services.user.statistic.UserListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/user/list")
@PreAuthorize("hasRole('USER')")
public class UserListController {
    private final UserListService userListService;

    @Autowired
    public UserListController(UserListService userListService) {
        this.userListService = userListService;
    }

    @GetMapping("/all/registered")
    public ResponseEntity<?> getAllRegisteredCarsInCenter(@Valid @RequestBody ListRegisteredCarRequest listRegisteredCarRequest) {
        return userListService.getAllRegisteredCarsInCenter(listRegisteredCarRequest);
    }
    @GetMapping("/all/expired")
    public ResponseEntity<?> getAllExpiredCarsInCenter(@Valid @RequestBody ListRegisteredCarRequest listRegisteredCarRequest) {
        return userListService.getAllExpiredCarsInCenter(listRegisteredCarRequest);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return userListService.getAll();
    }

}
