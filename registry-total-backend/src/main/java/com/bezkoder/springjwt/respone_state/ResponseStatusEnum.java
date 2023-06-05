package com.bezkoder.springjwt.respone_state;

import lombok.Getter;

@Getter
public enum ResponseStatusEnum {

    SUCCESS("SUCCESS", "Request successfully"),
    UNKNOWN_ERROR("E-000", "Lỗi không xác định"),
    NOT_ENOUGH_PARAM("E-001", "Lỗi không đủ tham số đầu vào"),
    INVALID_REQUEST_PARAM("E-002",
            "Lỗi tham số đầu vào không hợp lệ"),
    WRONG_INFORMATION("E-003", "Lỗi thông tin không chính xác"),
    REGISTERED_USERNAME("E-004", "Username đã tồn tại"),
    REGISTERED_EMAIL("E-005", "Email đã tồn tại"),
    REGISTERED_COMPANY_NAME("E-006", "Tên công ty đã tồn tại"),
    NOT_MATCHING_PRODUCT_FOUND("E-008", "Không tìm thấy sản phẩm phù hợp"),
    EXISTED_CAR("E-009", "Xe đã tồn tại"),
    EXISTED_PERSONAL("E-010", "Cá nhân đã tồn tại"),
    EXISTED_COMPANY("E-011", "Công ty đã tồn tại"),
    EXISTED_REGISTERED("E-013", "Thông tin đăng kiểm đã tồn tại"),
    NOT_EXPIRED_REGISTERED("E-014", "Thời gian đăng kiểm trước lần đăng kiểm gần nhất"),
    NOT_MATCHING_RETYPE_PASSWORD("E-015", "Mật khẩu nhập lại không khớp"),
    FILE_IS_EMPTY("E-015", "File rỗng");

    private final String code;
    private final String message;

    ResponseStatusEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }
}

