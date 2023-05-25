package com.bezkoder.springjwt.payload.response.user_response;

import lombok.Data;

import java.util.List;

@Data
public class LoginResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String username;
    private String email;

    private String name;
    private List<String> roles;

    public LoginResponse(String accessToken, String id, String username, String email, String name, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

}
