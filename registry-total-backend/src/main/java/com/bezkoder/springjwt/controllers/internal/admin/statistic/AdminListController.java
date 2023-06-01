package com.bezkoder.springjwt.controllers.internal.admin.statistic;

import com.bezkoder.springjwt.payload.request.user_request.ListCarRequest;
import com.bezkoder.springjwt.payload.request.user_request.ListRegisteredCarRequest;
import com.bezkoder.springjwt.services.admin.statistic.AdminListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/admin/list")
@PreAuthorize("hasRole('ADMIN')")

public class AdminListController {

    private final AdminListService adminListService;

    @Autowired
    public AdminListController(
            AdminListService adminListService) {
        this.adminListService = adminListService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCars() {
        return adminListService.getAllCars();
    }

    @GetMapping("/owner")
    public ResponseEntity<?> getOwner(@Valid @RequestBody ListCarRequest listCarRequest) {
        return adminListService.getOwner(listCarRequest);
    }

    @GetMapping("/technical")
    public ResponseEntity<?> getTechnicalData(@Valid @RequestBody ListCarRequest listCarRequest) {
        return adminListService.getTechnicalData(listCarRequest);
    }

    @GetMapping("/registration")
    public ResponseEntity<?> getRegistrations(@Valid @RequestBody ListCarRequest listCarRequest) {
        return adminListService.getRegistrations(listCarRequest);
    }

    @GetMapping("/all/registered")
    public ResponseEntity<?> getAllRegisteredCars(@Valid @RequestBody ListRegisteredCarRequest listRegisteredCarRequest) {
        return adminListService.getAllRegisteredCars(listRegisteredCarRequest);
    }

    @GetMapping("/all/expired")
    public ResponseEntity<?> getAllExpiredCars(@Valid @RequestBody ListRegisteredCarRequest listRegisteredCarRequest) {
        return adminListService.getAllExpiredCars(listRegisteredCarRequest);
    }
}
