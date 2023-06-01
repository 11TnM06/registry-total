package com.bezkoder.springjwt.services.admin.statistic;
import com.bezkoder.springjwt.payload.request.user_request.ListCarRequest;
import com.bezkoder.springjwt.payload.request.user_request.ListRegisteredCarRequest;
import org.springframework.http.ResponseEntity;
public interface AdminListService {

    ResponseEntity<?> getAllCars();

    ResponseEntity<?> getOwner(ListCarRequest listCarRequest);

    ResponseEntity<?> getTechnicalData(ListCarRequest listCarRequest);

    ResponseEntity<?> getRegistrations(ListCarRequest listCarRequest);

    ResponseEntity<?> getAllRegisteredCars(ListRegisteredCarRequest listRegisteredCarRequest);

    ResponseEntity<?> getAllExpiredCars(ListRegisteredCarRequest listRegisteredCarRequest);
}
