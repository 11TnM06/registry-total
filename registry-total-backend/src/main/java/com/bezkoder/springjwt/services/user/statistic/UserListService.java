package com.bezkoder.springjwt.services.user.statistic;

import com.bezkoder.springjwt.payload.request.user_request.ListRegisteredCarRequest;
import org.springframework.http.ResponseEntity;

public interface UserListService {
    ResponseEntity<?> getAllRegisteredCarsInCenter(ListRegisteredCarRequest listRegisteredCarRequest);
    ResponseEntity<?> getAllExpiredCarsInCenter(ListRegisteredCarRequest listRegisteredCarRequest);

    ResponseEntity<?> getAll();

}
