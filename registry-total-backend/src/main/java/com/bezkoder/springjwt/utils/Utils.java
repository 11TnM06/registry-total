package com.bezkoder.springjwt.utils;

import com.bezkoder.springjwt.models.Car;
import com.bezkoder.springjwt.models.Registration;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.payload.response.user_response.ListCarResponse;
import com.bezkoder.springjwt.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class Utils {
    public static boolean ListRegisteredCarUtils(Car car, Date date, String timeType, String time, String year, String location, String registryLocation) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int registryYear = cal.get(Calendar.YEAR);
        if (timeType.equals("Tháng")) {
            int month = cal.get(Calendar.MONTH) + 1;

            if (month == Integer.parseInt(time) && registryYear == Integer.parseInt(year)) {
                if (registryLocation != null) {
                    if (registryLocation.equals(location)) {
                        return true;
                    }
                } else {
                    return true;
                }
            }

            //System.out.println("month: " + month + " time: " + time + " year: " + year + " registryYear: " + registryYear + " location: " + location + " registryLocation: " + registryLocation);

        } else if (timeType.equals("Năm")) {
            if (registryYear == Integer.parseInt(year)) {
                if (registryLocation != null) {
                    if (registryLocation.equals(location)) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        } else {
            int quarter = cal.get(Calendar.MONTH) / 3 + 1;
            if (quarter == Integer.parseInt(time) && registryYear == Integer.parseInt(year)) {
                if (registryLocation != null) {
                    if (registryLocation.equals(location)) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }

        return false;
    }

    public static boolean ListExpiredCarUtils(Car car, Date date, String timeType, String time, String year, String location, String registryLocation) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);

        int registryYear = cal.get(Calendar.YEAR);
        if (timeType.equals("Tháng")) {
            int month = cal.get(Calendar.MONTH) + 1;

            if (month == Integer.parseInt(time) && registryYear == Integer.parseInt(year)) {
                if (registryLocation != null) {
                    if (registryLocation.equals(location)) {
                        return true;
                    }
                } else {
                    return true;
                }
            }

        }

        return false;
    }

    public static User currentUser(UserRepository userRepository) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
        return userRepository.findByUsername(username);
    }
}
