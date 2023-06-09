import React, { useEffect } from "react";
import { Form, Popup, Section, Table } from "../../components";
import { UseFetch, UseValidation } from "../../utils";

function AddCerti() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [licensePlate, setLicensePlate] = React.useState("");
  const [registryDate, setRegistryDate] = React.useState("");
  const [expiredDate, setExpiredDate] = React.useState("");
  const [gcn, setGcn] = React.useState("");
  const [error, setError] = React.useState("");
  const [error2, setError2] = React.useState("");

  const [file, setFile] = React.useState(null);

  const onValidCerti = () => {
    return (
      UseValidation.required(licensePlate).state &&
      UseValidation.required(registryDate).state &&
      UseValidation.required(expiredDate).state &&
      UseValidation.required(gcn).state
    );
  };

  const onReset = () => {
    setLicensePlate("");
    setRegistryDate("");
    setExpiredDate("");
    setGcn("");
    setError("");
    setError2("");
  };

  const onResetFile = () => {
    setFile(null);
  };
  const onAddCerti = () => {
    var item = {
      licensePlate: licensePlate,
      registryDate: registryDate,
      expiredDate: expiredDate,
      gcn: gcn,
    };
    console.log(item);
    UseFetch("/api/user/upload/registration", "POST", item).then((res) => {
      if (res.status.code === "SUCCESS") {
        alert("Đăng kiểm thành công!");
        window.location.reload();
        // onReset();
      } else if (!res.status.message) {
        setError("Lỗi không xác định");
      } else {
        setError(res.status.message);
      }
    });
  };

  const onValidFile = () => {
    return UseValidation.requiredFile(file).state;
  };
  const onUploadFile = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    UseFetch.File("/api/user/upload/registrations", "POST", formData).then(
      (res) => {
        if (res.status.code === "SUCCESS") {
          alert("Tải file thành công");
          window.location.reload();
        } else if (!res.status.message) {
          setError2("Lỗi không xác định");
        } else {
          setError2(res.status.message);
        }
      }
    );
  };

  useEffect(() => {
    UseFetch("/api/user/list/all", "GET", null).then((res) => {
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

                    {item.registrations.length === 0 ? (
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
    console.log(data);
  }, []);

  if (loading || !data) return <React.Fragment />;

  return (
    <>
      {data == "" ? (
        <>
          <Form>
            <Form.Title content="Tải file cấp giấy chứng nhận" />
            <Form.Input
              label="File"
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
            />
            <Form.Error enabled={error2 !== ""} content={error2} />

            <Form.Submit
              content="Tải file"
              validation={onValidFile}
              onClick={onUploadFile}
            />
          </Form>
          <Form>
            <Form.Title content="Cấp giấy chứng nhận" />
            <Form.Split>
              <Form.Input
                label="Biển số xe"
                type="text"
                reference={[
                  licensePlate,
                  setLicensePlate,
                  UseValidation.required,
                ]}
              />
              <Form.Input
                label="Số tem GCN"
                type="text"
                reference={[gcn, setGcn, UseValidation.required]}
              />
            </Form.Split>
            <Form.Split>
              <Form.Input
                label="Ngày đăng kiểm"
                type="date"
                reference={[
                  registryDate,
                  setRegistryDate,
                  UseValidation.required,
                ]}
              />
              <Form.Input
                label="Ngày hết hạn hiệu lực đăng kiểm"
                type="date"
                reference={[
                  expiredDate,
                  setExpiredDate,
                  UseValidation.required,
                ]}
              />
            </Form.Split>
            <Form.Error enabled={error !== ""} content={error} />

            <Form.Submit
              content="Thêm giấy chứng nhận"
              validation={onValidCerti}
              onClick={onAddCerti}
            />
          </Form>
        </>
      ) : (
        <Table
          title="Danh sách xe đã đăng kiểm"
          data={data}
          noOption
          uploadFile={
            <Form>
              <Form.Title content="Tải file cấp giấy chứng nhận" />
              <Form.Input
                label="File"
                type="file"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
              />
              <Form.Error enabled={error !== ""} content={error} />

              <Form.Submit
                content="Tải file"
                validation={onValidFile}
                onClick={onUploadFile}
              />
            </Form>
          }
          addRow={
            <Form>
              <Form.Title content="Cấp giấy chứng nhận" />
              <Form.Split>
                <Form.Input
                  label="Biển số xe"
                  type="text"
                  reference={[
                    licensePlate,
                    setLicensePlate,
                    UseValidation.required,
                  ]}
                />
                <Form.Input
                  label="Số tem GCN"
                  type="text"
                  reference={[gcn, setGcn, UseValidation.required]}
                />
              </Form.Split>
              <Form.Split>
                <Form.Input
                  label="Ngày đăng kiểm"
                  type="date"
                  reference={[
                    registryDate,
                    setRegistryDate,
                    UseValidation.required,
                  ]}
                />
                <Form.Input
                  label="Ngày hết hạn hiệu lực đăng kiểm"
                  type="date"
                  reference={[
                    expiredDate,
                    setExpiredDate,
                    UseValidation.required,
                  ]}
                />
              </Form.Split>
              <Form.Error enabled={error !== ""} content={error} />

              <Form.Submit
                content="Thêm giấy chứng nhận"
                validation={onValidCerti}
                onClick={onAddCerti}
              />
            </Form>
          }
          onReset={onReset}
          onResetFile={onResetFile}
        />
      )}
    </>
  );
}

export default AddCerti;
