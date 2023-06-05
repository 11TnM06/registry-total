package com.bezkoder.springjwt.utils;

import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.repository.UserRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

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

    public static List<TechnicalData> InitMultipleTechnicals(XSSFSheet sheet) {
        List<TechnicalData> listTechnicalData = new ArrayList<>();
        //System.out.println(sheet.getLastRowNum());
        for (int row = 1; row < sheet.getLastRowNum(); row++) {
            TechnicalData technicalData = new TechnicalData();
            for (int cell = 1; cell < sheet.getRow(row).getLastCellNum(); cell++) {
                String cellValue = getCellValueAsString(sheet.getRow(row).getCell(cell));
                switch (cell) {
                    case 1:
                        if (!cellValue.isEmpty()) {
                            Car car = new Car();
                            car.setLicensePlate(cellValue);
                            technicalData.setCar(car);
                        }
                        break;
                    case 2:
                        if (!cellValue.isEmpty())
                            technicalData.setSize(cellValue);
                        break;
                    case 3:
                        if (!cellValue.isEmpty())
                            technicalData.setSelfWeight(cellValue);
                        break;
                    case 4:
                        if (!cellValue.isEmpty())
                            technicalData.setMaxPeople(cellValue);
                        break;
                    case 5:
                        if (!cellValue.isEmpty())
                            technicalData.setLength(cellValue);
                        break;
                    case 6:
                        if (!cellValue.isEmpty())
                            technicalData.setContainerSize(cellValue);
                        break;
                    case 7:
                        if (!cellValue.isEmpty())
                            technicalData.setMaxContainerWeight(cellValue);
                        break;
                    case 8:
                        if (!cellValue.isEmpty())
                            technicalData.setMaxWeight(cellValue);
                        break;
                    case 9:
                        if (!cellValue.isEmpty())
                            technicalData.setTowingMass(cellValue);
                        break;
                }
            }
            if (technicalData.getSize() != null && technicalData.getSelfWeight() != null && technicalData.getMaxPeople() != null
                    && technicalData.getLength() != null && technicalData.getMaxWeight() != null && technicalData.getTowingMass() != null) {
                listTechnicalData.add(technicalData);
            }

        }

        return listTechnicalData;
    }

    public static List<Personal> InitMultiplePersonals(XSSFSheet sheet) {
        List<Personal> listPersonal = new ArrayList<>();
        for (int row = 1; row < sheet.getLastRowNum(); row++) {
            Personal personal = new Personal();
            String tmp_licensePlate = "";
            boolean isExist = false;
            for (int cell = 1; cell < sheet.getRow(row).getLastCellNum(); cell++) {
                String cellValue = getCellValueAsString(sheet.getRow(row).getCell(cell));
                switch (cell) {
                    case 1:
                        tmp_licensePlate = cellValue;
                        break;
                    case 3:
                        if (!cellValue.isEmpty())
                            personal.setName(cellValue);
                        break;
                    case 4:
                        if (!cellValue.isEmpty()) {
                            for (Personal p : listPersonal) {
                                if (p.getPersonalId().equals(cellValue) && !tmp_licensePlate.isEmpty() && p.getCars() != null) {
                                    isExist = true;
                                    List<Car> listCar = p.getCars();
                                    Car car = new Car();
                                    car.setLicensePlate(tmp_licensePlate);
                                    listCar.add(car);
                                    p.setCars(listCar);
                                    personal = p;
                                    break;
                                }
                            }
                            if (isExist) {
                                break;
                            }
                            List<Car> listCar = new ArrayList<>();
                            Car car = new Car();
                            car.setLicensePlate(tmp_licensePlate);
                            listCar.add(car);
                            personal.setCars(listCar);
                            personal.setPersonalId(cellValue);
                        }
                        break;
                    case 5:
                        if (!cellValue.isEmpty())
                            personal.setRegistrationPlace(cellValue);
                        break;
                    case 6:
                        if (!cellValue.isEmpty()) {
                            Date date = sheet.getRow(row).getCell(cell).getDateCellValue();
                            personal.setRegistrationDate(date);
                        }
                        break;
                    case 7:
                        if (!cellValue.isEmpty()) {
                            Date date = sheet.getRow(row).getCell(cell).getDateCellValue();
                            personal.setDob(date);
                        }
                        break;
                    case 8:
                        if (!cellValue.isEmpty())
                            personal.setGender(cellValue);
                        break;
                    case 9:
                        if (!cellValue.isEmpty())
                            personal.setAddress(cellValue);
                        break;
                    case 10:
                        if (!cellValue.isEmpty())
                            personal.setPhone(cellValue);
                        break;
                }
                if (isExist) {
                    break;
                }
            }

            if (isExist) {

                continue;
            }

            if (personal.getName() != null && personal.getPersonalId() != null && personal.getRegistrationPlace() != null
                    && personal.getRegistrationDate() != null && personal.getDob() != null && personal.getAddress() != null
                    && personal.getPhone() != null && !tmp_licensePlate.isEmpty()) {
                listPersonal.add(personal);
            }
        }

        return listPersonal;
    }

    public static List<Company> InitMultipleCompanies(XSSFSheet sheet) {
        List<Company> listCompany = new ArrayList<>();
        for (int row = 1; row < sheet.getLastRowNum(); row++) {
            Company company = new Company();
            String tmp_licensePlate = "";
            boolean isExist = false;
            for (int cell = 1; cell < sheet.getRow(row).getLastCellNum(); cell++) {
                String cellValue = getCellValueAsString(sheet.getRow(row).getCell(cell));
                switch (cell) {
                    case 1:
                        tmp_licensePlate = cellValue;
                        break;
                    case 3:
                        if (!cellValue.isEmpty())
                            company.setName(cellValue);
                        break;
                    case 4:
                        if (!cellValue.isEmpty()) {
                            for (Company c : listCompany) {
                                if (c.getCompanyId().equals(cellValue) && !tmp_licensePlate.isEmpty() && c.getCars() != null) {
                                    isExist = true;
                                    List<Car> listCar = c.getCars();
                                    Car car = new Car();
                                    car.setLicensePlate(tmp_licensePlate);
                                    listCar.add(car);
                                    c.setCars(listCar);
                                    break;
                                }
                            }
                            if (isExist) {
                                break;
                            }
                            List<Car> listCar = new ArrayList<>();
                            Car car = new Car();
                            car.setLicensePlate(tmp_licensePlate);
                            listCar.add(car);
                            company.setCars(listCar);
                            company.setCompanyId(cellValue);
                        }
                        break;
                    case 5:
                        if (!cellValue.isEmpty())
                            company.setAddress(cellValue);
                        break;
                    case 6:
                        if (!cellValue.isEmpty()) {
                            company.setRepresentative(cellValue);
                        }
                        break;
                    case 7:
                        if (!cellValue.isEmpty())
                            company.setPhone(cellValue);
                        break;

                }
                if (isExist) {
                    break;
                }
            }
            if (isExist) {
                continue;
            }
            if (company.getName() != null && company.getCompanyId() != null && company.getAddress() != null
                    && company.getRepresentative() != null && company.getPhone() != null && !tmp_licensePlate.isEmpty()) {
                listCompany.add(company);
            }

        }
        return listCompany;
    }

    public static List<Car> InitMultipleCars(XSSFSheet sheet) {
        List<Car> listCar = new ArrayList<>();
        for (int row = 1; row < sheet.getLastRowNum(); row++) {
            Car car = new Car();
            for (int cell = 1; cell < sheet.getRow(row).getLastCellNum(); cell++) {
                String cellValue = getCellValueAsString(sheet.getRow(row).getCell(cell));
                //System.out.print(cellValue + " ");
                switch (cell) {
                    case 1:
                        if (!cellValue.isEmpty())
                            car.setLicensePlate(cellValue);
                        break;
                    case 2:
                        if (!cellValue.isEmpty())
                            car.setCarId(cellValue);
                        break;
                    case 3:
                        if (!cellValue.isEmpty()) {
                            Date date = sheet.getRow(row).getCell(cell).getDateCellValue();
                            car.setRegistrationDate(date);
                        }
                        break;
                    case 4:
                        if (!cellValue.isEmpty())
                            car.setRegistrationPlace(cellValue);
                        break;
                    case 5:
                        if (!cellValue.isEmpty()) {
                            car.setBrand(cellValue);
                        }
                        break;
                    case 6:
                        if (!cellValue.isEmpty())
                            car.setModel(cellValue);
                        break;
                    case 7:
                        if (!cellValue.isEmpty())
                            car.setPatch(cellValue);
                        break;
                    case 8:
                        if (!cellValue.isEmpty())
                            car.setColor(cellValue);
                        break;
                    case 9:
                        if (!cellValue.isEmpty())
                            car.setFrameNumber(cellValue);
                        break;
                    case 10:
                        if (!cellValue.isEmpty())
                            car.setEngineNumber(cellValue);
                        break;
                    case 12:
                        if (!cellValue.isEmpty())
                            car.setPurpose(cellValue);
                        break;
                    default:
                        break;
                }
            }
            //System.out.println();
            if (car.getLicensePlate() != null && car.getCarId() != null && car.getRegistrationDate() != null
                    && car.getRegistrationPlace() != null && car.getBrand() != null && car.getModel() != null
                    && car.getPatch() != null && car.getColor() != null && car.getFrameNumber() != null
                    && car.getEngineNumber() != null && car.getPurpose() != null)
                listCar.add(car);
        }
        return listCar;
    }

    public static List<User> InitMultipleUsers(XSSFSheet sheet) {
        List<User> users = new ArrayList<>();
        for (int row = 1; row < sheet.getLastRowNum(); row++) {
            User user = new User();
            for (int cell = 1; cell < sheet.getRow(row).getLastCellNum(); cell++) {
                String cellValue = getCellValueAsString(sheet.getRow(row).getCell(cell));
                switch (cell) {
                    case 1:
                        if (!cellValue.isEmpty())
                            user.setUsername(cellValue);
                        break;
                    case 2:
                        if (!cellValue.isEmpty())
                            user.setName(cellValue);
                        break;
                    case 3:
                        if (!cellValue.isEmpty())
                            user.setEmail(cellValue);
                        break;
                    case 4:
                        if (!cellValue.isEmpty()) {
                            user.setPassword(cellValue);
                        }
                        break;
                    case 5:
                        if (!cellValue.isEmpty()) {
                           user.setLocation(cellValue);
                        }

                        break;

                }
            }
            if (user.getName() != null && user.getUsername() != null && user.getEmail() != null
                    && user.getPassword() != null && user.getLocation() != null)
                users.add(user);
        }
        return users;
    }


    private static String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }

        if (cell.getCellType() == CellType.STRING) {
            return cell.getStringCellValue().trim();
        } else if (cell.getCellType() == CellType.NUMERIC) {
            int integerValue = (int) cell.getNumericCellValue();
            return String.valueOf(integerValue);
        } else if (cell.getCellType() == CellType.BOOLEAN) {
            return String.valueOf(cell.getBooleanCellValue());
        } else if (cell.getCellType() == CellType.FORMULA) {
            return cell.getCellFormula();
        } else {
            return "";
        }
    }

    public static Date removeTime(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }
}
