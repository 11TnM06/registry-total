import React from "react";
import { Popup, Section, Table, Option, Button } from "../../components";
import { useEffect } from "react";
import { UseFetch } from "../../utils";
import { Form } from "react-router-dom";

function StatisticalTime() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [timeType, setTimeType] = React.useState("Tháng");
  const [time, setTime] = React.useState("1");
  let [year, setYear] = React.useState("2020");

  var item = {
    locationType: null,
    location: null,
    timeType: timeType,
    time: time,
    year: year,
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    item = {
      locationType: null,
      location: null,
      timeType: timeType,
      time: time,
      year: timeType === "Năm" ? time : year,
    };
    console.log(item);
    setLoading(true);
    UseFetch("/api/user/list/all/registered", "POST", item).then((res) => {
      if (res.status.code === "SUCCESS") {
        var _res = res.data.map((item) => {
          var _item = {
            id: item.car.id,
            licensePlate: item.car.licensePlate,
            carId: item.car.carId,
            registrationsDate: item.car.registrationDate,
            registrationsPlace: item.car.registrationPlace,
            carBrand: item.car.brand,
            model: item.car.model,
            patch: item.car.patch,
            color: item.car.color,
            frameNumber: item.car.frameNumber,
            engineNumber: item.car.engineNumber,
            purpose: item.car.purpose,
            technical: (
              <Popup>
                <Popup.Trigger>
                  <a href="#/">Xem thêm</a>
                </Popup.Trigger>
                <Popup.Content>
                  <Section title="Thông số kỹ thuật" noContainer>
                    <div>
                      <strong>Biển số xe:</strong> {item.car.licensePlate}
                    </div>
                    <div>
                      <strong>Kích thước bao (mm) :</strong>{" "}
                      {item.technical.size}
                    </div>
                    <div>
                      <strong>Khối lượng bản thân (kg) :</strong>{" "}
                      {item.technical.selfWeight}
                    </div>
                    <div>
                      <strong>Số lượng người cho phép chở:</strong>{" "}
                      {item.technical.maxPeople}
                    </div>
                    <div>
                      <strong>Chiều dài cơ sở (mm) : </strong>{" "}
                      {item.technical.length}
                    </div>
                    <div>
                      <strong>Kích thước thùng hàng:</strong>{" "}
                      {item.technical.containerSize}
                    </div>
                    <div>
                      <strong>Khối lượng hàng hóa cho phép chở (kg) :</strong>{" "}
                      {item.technical.maxContainerWeight}
                    </div>
                    <div>
                      <strong>Khối lượng toàn bộ cho phép chở (kg) :</strong>{" "}
                      {item.technical.maxWeight}
                    </div>
                    <div>
                      <strong>Khối lượng kéo theo cho phép (kg) :</strong>{" "}
                      {item.technical.towingMass}
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
                    {item.personal ? (
                      <>
                        <div>
                          <strong>Tên chủ sở hữu:</strong> {item.personal.name}
                        </div>
                        <div>
                          <strong>Giới tính:</strong> {item.personal.gender}
                        </div>
                        <div>
                          <strong>Ngày sinh:</strong> {item.personal.dob}
                        </div>

                        <div>
                          <strong>Số điện thoại:</strong> {item.personal.phone}
                        </div>
                        <div>
                          <strong>Địa chỉ thường trú:</strong>{" "}
                          {item.personal.address}
                        </div>
                        <div>
                          <strong>Số CCCD:</strong> {item.personal.personalId}
                        </div>
                        <div>
                          <strong>Nơi cấp CCCD:</strong>{" "}
                          {item.personal.registrationPlace}
                        </div>
                        <div>
                          <strong>Ngày cấp CCCD:</strong>{" "}
                          {item.personal.registrationDate}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <strong>Tên đơn vị:</strong> {item.company.name}
                        </div>
                        <div>
                          <strong>Mã đơn vị:</strong> {item.company.companyId}
                        </div>
                        <div>
                          <strong>Số điện thoại liên lạc:</strong>{" "}
                          {item.company.phone}
                        </div>
                        <div>
                          <strong>Địa chỉ trụ sở:</strong>{" "}
                          {item.company.address}
                        </div>
                        <div>
                          <strong>Người đại diện:</strong>{" "}
                          {item.company.representative}
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
                      <strong>Biển số xe:</strong> {item.car.licensePlate}
                    </div>

                    {item.registrations.length == 0 ? (
                      <div>
                        <strong>Chưa đăng kiểm</strong>
                      </div>
                    ) : (
                      item.registrations.map((registraion, count) => {
                        return (
                          <>
                            <div>
                              <strong>Lần {count + 1} </strong>
                            </div>
                            <div>
                              <strong>Số tem GCN:</strong> {registraion.gcn}
                            </div>
                            <div>
                              <strong>Ngày đăng kiểm</strong>{" "}
                              {registraion.registryDate}
                            </div>
                            <div>
                              <strong>Hạn hiệu lực đăng kiểm:</strong>{" "}
                              {registraion.expiredDate}{" "}
                            </div>
                            <div>
                              <strong>Trung tâm đăng kiểm</strong>{" "}
                              {registraion.registryCenter}{" "}
                            </div>
                          </>
                        );
                      })
                    )}
                  </Section>
                </Popup.Content>
              </Popup>
            ),
          };
          return _item;
        });
        setData(_res);
        setLoading(false);
      }
    });
  };

  const handleButtonClick = () => {
    loadData();
  };

  if (loading || !data) return <React.Fragment />;

  return (
    <>
      <Form>
        <Form.Title content="Chọn phân loại" />
        <Form.SplitLeft>
          <Option title="Thời gian" value={timeType} onChange={setTimeType}>
            <Option.Item value="Tháng" />
            <Option.Item value="Quý" />
            <Option.Item value="Năm" />
          </Option>

          {timeType && (
            <Option Option title={timeType} value={time} onChange={setTime}>
              {timeType === "Tháng" && (
                <>
                  <Option.Item value="1" />
                  <Option.Item value="2" />
                  <Option.Item value="3" />
                  <Option.Item value="4" />
                  <Option.Item value="5" />
                  <Option.Item value="6" />
                  <Option.Item value="7" />
                  <Option.Item value="8" />
                  <Option.Item value="9" />
                  <Option.Item value="10" />
                  <Option.Item value="11" />
                  <Option.Item value="12" />
                </>
              )}
              {timeType === "Quý" && (
                <>
                  <Option.Item value="1" />
                  <Option.Item value="2" />
                  <Option.Item value="3" />
                  <Option.Item value="4" />
                </>
              )}
              {timeType === "Năm" && (
                <>
                  <Option.Item value="2018" />
                  <Option.Item value="2019" />
                  <Option.Item value="2020" />
                  <Option.Item value="2021" />
                  <Option.Item value="2022" />
                  <Option.Item value="2023" />
                </>
              )}
            </Option>
          )}

          {timeType && (timeType === "Tháng" || timeType === "Quý") && (
            <Option Option title="Năm" value={year} onChange={setYear}>
              <>
                <Option.Item value="2018" />
                <Option.Item value="2019" />
                <Option.Item value="2020" />
                <Option.Item value="2021" />
                <Option.Item value="2022" />
                <Option.Item value="2023" />
              </>
            </Option>
          )}
        </Form.SplitLeft>
      </Form>
      <Form.Submit content="Thống kê" onClick={handleButtonClick} />

      <Table title="Danh sách xe" data={data} noOption noAddRow />
    </>
  );
}

export default StatisticalTime;
