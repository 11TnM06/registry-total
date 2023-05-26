package com.bezkoder.springjwt.services.admin.statistic;
import com.bezkoder.springjwt.payload.request.user_request.ListCarRequest;
import org.springframework.http.ResponseEntity;
public interface AdminListService {
    ResponseEntity<?> getCar(ListCarRequest listCarRequest);

    ResponseEntity<?> getAllCars();

    ResponseEntity<?> getOwner(ListCarRequest listCarRequest);
}
