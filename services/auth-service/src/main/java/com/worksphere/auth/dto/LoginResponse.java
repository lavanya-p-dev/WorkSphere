package com.worksphere.auth.dto;

public class LoginResponse {

    private String accessToken;
    private String tokenType;
    private UserResponse user;

    public LoginResponse(
            String accessToken,
            UserResponse user) {

        this.accessToken = accessToken;
        this.tokenType = "Bearer";
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public UserResponse getUser() {
        return user;
    }
}