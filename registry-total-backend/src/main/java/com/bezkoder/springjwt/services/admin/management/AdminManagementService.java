package com.bezkoder.springjwt.services.admin.management;

import com.bezkoder.springjwt.payload.request.user_request.CreateAccountRequest;
import com.bezkoder.springjwt.payload.request.user_request.UpdateAccountRequest;
import org.springframework.http.ResponseEntity;

public interface AdminManagementService {

    /*
     * @description: Admin can CRUD with all accounts that do not have admin rights
     */
    ResponseEntity<?> signupAccount(CreateAccountRequest createAccountRequest);

    ResponseEntity<?> getAllAccounts();

    ResponseEntity<?> deleteAccount(String id);
    ResponseEntity<?> updateAccount(String id, UpdateAccountRequest updateAccountRequest);


}