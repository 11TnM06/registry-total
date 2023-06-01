package com.bezkoder.springjwt.utils;

import com.bezkoder.springjwt.models.Car;
import com.bezkoder.springjwt.models.Registration;
import com.bezkoder.springjwt.payload.response.user_response.ListCarResponse;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class Utils {
    public static List<Car> ListRegisteredCarUtils (Car car, Date date, String timeType, String time, String year, String location, String registryLocation) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        List<Car> cars = new ArrayList<>();
        int registryYear = cal.get(Calendar.YEAR);
        if (timeType.equals("Tháng")) {
            int month = cal.get(Calendar.MONTH) + 1;

            if (month == Integer.parseInt(time) && registryYear == Integer.parseInt(year) ) {
                if (registryLocation != null) {
                    if (registryLocation.equals(location)) {
                        cars.add(car);
                    }
                }
                else {
                    cars.add(car);
                }
            }

        }
        else if (timeType.equals("Năm")) {
            if (registryYear == Integer.parseInt(year)) {
                if (registryLocation != null) {
                    if (registryLocation.equals(location)) {
                        cars.add(car);
                    }
                }
                else {
                    cars.add(car);
                }
            }
        }
        else {
            int quarter = cal.get(Calendar.MONTH) / 3 + 1;
            if (quarter == Integer.parseInt(time) && registryYear == Integer.parseInt(year)) {
                if (registryLocation != null) {
                    if (registryLocation.equals(location)) {
                        cars.add(car);
                    }
                }
                else {
                    cars.add(car);
                }
            }
        }

        return cars;
    }

    public static List<Car> ListExpiredCarUtils (Car car, Date date, String timeType, String time, String year, String location, String registryLocation) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        List<Car> cars = new ArrayList<>();
        int registryYear = cal.get(Calendar.YEAR);
        if (timeType.equals("Tháng")) {
            int month = cal.get(Calendar.MONTH) + 1;

            if (month == Integer.parseInt(time) && registryYear == Integer.parseInt(year) ) {
                if (registryLocation != null) {
                    if (registryLocation.equals(location)) {
                        cars.add(car);
                    }
                }
                else {
                    cars.add(car);
                }
            }

        }

        return cars;
    }
}
