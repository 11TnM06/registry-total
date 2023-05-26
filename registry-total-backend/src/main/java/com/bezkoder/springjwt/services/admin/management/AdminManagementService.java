package com.bezkoder.springjwt.services.admin.management;

import com.bezkoder.springjwt.payload.request.user_request.CreateAccountRequest;
import org.springframework.http.ResponseEntity;

public interface AdminManagementService {

    /*
     * @description: Admin can CRUD with all accounts that do not have admin rights
     */
    ResponseEntity<?> signupAccount(CreateAccountRequest createAccountRequest);

    ResponseEntity<?> getAllAccounts();

    ResponseEntity<?> deleteAccount(String id);

}