package com.example.cs310_frontend.data.model;

import java.util.Map;

/**
 * Data class that captures user information for logged in users retrieved from LoginRepository
 */
public class LoggedInUser {

    private String userID;
    private String username;
    private int caffeineIntake;

    // have json object of previous orders that is acquired when user signs in
    private Map<String, String> prevOrders;
    // add any other user info we need here

    public LoggedInUser(String userID, String username, int caffeineIntake) {
        this.userID = userID;
        this.username = username;
        this.caffeineIntake = caffeineIntake;
    }

    public String getUsername() {
        return username;
    }

    public int getCaffeineIntake() {
        return caffeineIntake;
    }
}