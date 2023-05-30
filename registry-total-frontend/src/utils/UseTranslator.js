/*
 * @description: Translate the key of object to Vietnamese
 */

const key = {
  "no.": "Stt.",
  licensePlate: "Biển số xe",
  carId: "Mã số",
  registrationsDate: "Ngày cấp",
  registrationsPlace: "Nơi cấp",
  carBrand: "Nhãn hiệu",
  model: "Dòng xe",
  patch: "Phiên bản",
  color: "Màu sơn",
  frameNumber: "Số khung",
  engineNumber: "Số máy",
  purpose: "Mục đích sử dụng",
  registrations: "Thông tin đăng kiểm",
  owner: "Chủ sở hữu",
  technical: "Thông số kỹ thuật",
  username: "Tên đăng nhập",
  email: "Email",
  role: "Chức vụ",
  companyName: "Tên công ty",
  address: "Địa chỉ",
  phone: "Số điện thoại",
  option: "Tùy chọn",
  numberOfErrorProduct: "Số lượng sản phẩm lỗi",
  numberOfRestProduct: "Số lượng sản phẩm không có lỗi",
};
const UseTranslator = {};

UseTranslator.translate = function (word) {
  return key[word] ? key[word] : word;
};

export { UseTranslator };
