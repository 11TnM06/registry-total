import React, { useEffect } from "react";
import { Button, Form, Option, Popup, Section, Table } from "../../components";
import { UseFetch, UseValidation } from "../../utils";

function AdminStatisticalRegistered() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [loadingUsers, setLoadingUsers] = React.useState(true);
  const [timeType, setTimeType] = React.useState("Tháng");
  const [time, setTime] = React.useState("1");
  const [year, setYear] = React.useState("2020");
  const [locationType, setLocationType] = React.useState("Cả nước");
  const [location, setLocation] = React.useState("");
  const [users, setUsers] = React.useState(null);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const quarters = [1, 2, 3, 4];
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

  const onValidStatistic = () => {
    return (
      UseValidation.required(locationType).state &&
      UseValidation.required(timeType).state &&
      UseValidation.required(time).state
    );
  };

  const onGetAllUser = () => {
    UseFetch("/api/admin/user/all", "GET", null).then((res) => {
      if (res.status.code === "SUCCESS") {
        var _res = res.data.map((item) => {
          return item.username;
        });
        _res.shift();
        setUsers(_res);
        setLoadingUsers(false);
      }
    });
  };

  useEffect(() => {
    onGetAllUser();
    loadData();
  }, []);

  const loadData = () => {
    var item = {
      locationType: locationType,
      location: location.length == 0 ? null : location,
      timeType: timeType,
      time: time,
      year: timeType === "Năm" ? time : year,
    };
    console.log(item);
    setLoading(true);
    UseFetch("/api/admin/list/all/registered", "POST", item).then((res) => {
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

  if (loadingUsers || loading || !data) return <React.Fragment />;

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
          <Option Option title={timeType} value={time} onChange={setTime}>
            {timeType === "Tháng" && (
              <>
                {months.map((item) => {
                  return <Option.Item value={item} />;
                })}
              </>
            )}
            {timeType === "Quý" && (
              <>
                {quarters.map((item) => {
                  return <Option.Item value={item} />;
                })}
              </>
            )}
            {timeType === "Năm" && (
              <>
                {years.map((item) => {
                  return <Option.Item value={item} />;
                })}
              </>
            )}
          </Option>
          {timeType !== "Năm" && (
            <Option Option title="Năm" value={year} onChange={setYear}>
              {years.map((item) => {
                return <Option.Item value={item} />;
              })}
            </Option>
          )}
        </Form.SplitLeft>
        <Form.SplitLeft>
          <Option
            title="Địa điểm"
            value={locationType}
            onChange={setLocationType}
          >
            <Option.Item value="Trung tâm" />
            <Option.Item value="Khu vực" />
            <Option.Item value="Cả nước" />
          </Option>

          {locationType === "Trung tâm" && !loadingUsers && (
            <Option title="Trung tâm" value={location} onChange={setLocation}>
              {users.map((name) => {
                return <Option.Item value={name} />;
              })}
            </Option>
          )}

          {locationType === "Khu vực" && (
            <Option title="Khu vực" value={location} onChange={setLocation}>
              <Option.Item value="Hà Nội" />
              <Option.Item value="Thanh Hóa" />
            </Option>
          )}
        </Form.SplitLeft>

        <Form.Submit
          content="Thống kê"
          validation={onValidStatistic}
          onClick={handleButtonClick}
        />
      </Form>

      <Table title="Danh sách xe" data={data} noOption noAddRow />
    </>
  );
}
export default AdminStatisticalRegistered;
