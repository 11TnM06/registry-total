import React from "react";
import { Popup, Section, Table } from "../../components";
import { UseFetch } from "../../utils";
import { useEffect } from "react";
import Data from "../../data.json";
import { TableComponent } from "../../components/Table/TableComponents";

function RegisteredCar() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    let res = require("../../data.json");
    var _res = res.map((item) => {
      console.log(item);
      var _item = {
        id: item.id,
        licensePlate: item.licensePlate,
        carId: item.carId,
        registrationsDate: item.registrations_date,
        registrationsPlace: item.registrations_place,
        carBrand: item.carBrand,
        model: item.model,
        patch: item.patch,
        color: item.color,
        frameNumber: item.frameNumber,
        engineNumber: item.engineNumber,
        purpose: item.purpose,
        technical: (
          <Popup>
            <Popup.Trigger>
              <a href="#/">Xem thêm</a>
            </Popup.Trigger>
            <Popup.Content>
              <Section title="Thông số kỹ thuật" noContainer>
                <div>
                  <strong>Biển số xe:</strong> {item.licensePlate}
                </div>
                <div>
                  <strong>Kích thước bao (mm) :</strong> {item.size}
                </div>
                <div>
                  <strong>Khối lượng bản thân (kg) :</strong> {item.self_weight}
                </div>
                <div>
                  <strong>Số lượng người cho phép chở:</strong>{" "}
                  {item.max_people}
                </div>
                <div>
                  <strong>Chiều dài cơ sở (mm) : </strong> {item.length}
                </div>
                <div>
                  <strong>Kích thước thùng hàng:</strong> {item.container_size}
                </div>
                <div>
                  <strong>Khối lượng hàng hóa cho phép chở (kg) :</strong>{" "}
                  {item.max_container_weight}
                </div>
                <div>
                  <strong>Khối lượng toàn bộ cho phép chở (kg) :</strong>{" "}
                  {item.max_weight}
                </div>
                <div>
                  <strong>Khối lượng kéo theo cho phép (kg) :</strong>{" "}
                  {item.towing_mass}
                </div>
              </Section>
            </Popup.Content>
          </Popup>
        ),
        owner: (
          <Popup>
            <Popup.Trigger>
              <a href="#/">Xem thêm</a>
            </Popup.Trigger>
            <Popup.Content>
              <Section title="Thông tin chủ sở hữu" noContainer>
                {item.owner.type === "Cá nhân" ? (
                  <>
                    <div>
                      <strong>Tên chủ sở hữu:</strong> {item.owner.name}
                    </div>
                    <div>
                      <strong>Giới tính:</strong> {item.owner.gender}
                    </div>
                    <div>
                      <strong>Ngày sinh:</strong> {item.owner.DOB}
                    </div>

                    <div>
                      <strong>Số điện thoại:</strong> {item.owner.phone}
                    </div>
                    <div>
                      <strong>Địa chỉ thường trú:</strong> {item.owner.address}
                    </div>
                    <div>
                      <strong>Số CCCD:</strong> {item.owner.id}
                    </div>
                    <div>
                      <strong>Nơi cấp CCCD:</strong>{" "}
                      {item.owner.registrationPlace}
                    </div>
                    <div>
                      <strong>Ngày cấp CCCD:</strong>{" "}
                      {item.owner.registraionDate}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>Tên đơn vị:</strong> {item.owner.name}
                    </div>
                    <div>
                      <strong>Mã đơn vị:</strong> {item.owner.id}
                    </div>
                    <div>
                      <strong>Số điện thoại liên lạc:</strong>{" "}
                      {item.owner.phone}
                    </div>
                    <div>
                      <strong>Địa chỉ trụ sở:</strong> {item.owner.address}
                    </div>
                    <div>
                      <strong>Người đại diện:</strong>{" "}
                      {item.owner.representative}
                    </div>
                  </>
                )}
              </Section>
            </Popup.Content>
          </Popup>
        ),
        registrations: (
          <Popup>
            <Popup.Trigger>
              <a href="#/">Xem thêm</a>
            </Popup.Trigger>
            <Popup.Content>
              <Section title="Thông tin đăng kiểm" noContainer>
                <div>
                  <strong>Biển số xe:</strong> {item.licensePlate}
                </div>
                <div>
                  <strong>Số tem GCN:</strong> {item.GCN}
                </div>
                <div>
                  <strong>Ngày đăng kiểm:</strong> {item.registryDate}
                </div>
                <div>
                  <strong>Hạn hiệu lực đăng kiểm:</strong> {item.expiredDate}
                </div>
                <div>
                  <strong>Trung tâm đăng kiểm:</strong> {item.registryCenter}
                </div>
              </Section>
            </Popup.Content>
          </Popup>
        ),
      };
      return _item;
    });
    console.log(_res);
    setData(_res);
    setLoading(false);
  }, []);

  // React.useEffect(() => {
  //   UseFetch("/backend/product/all", "GET", null).then((res) => {
  //     if (res.status.code === "SUCCESS") {
  //       var _res = res.data.map((item) => {
  //         console.log(item);
  //         var _item = {
  //           id: item.id,
  //           productCode: item.productCode,
  //           productName: item.productName,
  //           category: item.category.category,
  //           price: item.price,
  //           status: item.status.status,
  //           location: item.location.companyName,
  //           warrantTime: item.warrantTime,
  //           description: (
  //             <Popup>
  //               <Popup.Trigger>
  //                 <a href="#/">Xem thêm</a>
  //               </Popup.Trigger>
  //               <Popup.Content>
  //                 <Section title="Thông tin sản phẩm" noContainer>
  //                   <div>
  //                     <strong>Mã sản phẩm:</strong> {item.productCode}
  //                   </div>
  //                   {Object.entries(
  //                     JSON.parse(item.description.replaceAll("'", '"'))
  //                   ).map(([key, value]) => {
  //                     return (
  //                       <div key={key}>
  //                         <strong>{key}</strong> {value !== "" ? value : "N/A"}
  //                       </div>
  //                     );
  //                   })}
  //                 </Section>
  //               </Popup.Content>
  //             </Popup>
  //           ),
  //           customer: item.customer ? (
  //             <Popup>
  //               <Popup.Trigger>
  //                 <a href="#/">Xem thêm</a>
  //               </Popup.Trigger>
  //               <Popup.Content>
  //                 <Section title="Thông tin khách hàng" noContainer>
  //                   <div>
  //                     <strong>Mã sản phẩm:</strong> {item.productCode}
  //                   </div>
  //                   <div>
  //                     <strong>Tên khách hàng:</strong> {item.customer.name}
  //                   </div>
  //                   <div>
  //                     <strong>Địa chỉ:</strong> {item.customer.address}
  //                   </div>
  //                   <div>
  //                     <strong>Số điện thoại:</strong> {item.customer.phone}
  //                   </div>
  //                   <div>
  //                     <strong>Thời gian bán:</strong> {item.salesTime}
  //                   </div>
  //                   <div>
  //                     <strong>Số lần bảo hành:</strong> {item.numberOfWarranty}
  //                   </div>
  //                 </Section>
  //               </Popup.Content>
  //             </Popup>
  //           ) : (
  //             "N/A"
  //           ),
  //         };
  //         return _item;
  //       });
  //       setData(_res);
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  if (loading || !data) return <React.Fragment />;

  return (
    <>
      <Table title="Danh sách xe đã đăng ký" data={data} noOption noAddRow />
    </>
  );
}

export default RegisteredCar;
