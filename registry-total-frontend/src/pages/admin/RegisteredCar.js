import React from "react";
import { Popup, Section, Table, Form, Option } from "../../components";
import { useEffect } from "react";
import { UseFetch, UseValidation } from "../../utils";

function RegisteredCar() {
  const ref = React.useRef(null);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [licensePlate, setLicensePlate] = React.useState("");
  const [carId, setCarId] = React.useState("");
  const [registrationDate, setRegistrationDate] = React.useState("");
  const [registrationPlace, setRegistrationPlace] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [patch, setPatch] = React.useState("");
  const [color, setColor] = React.useState("");
  const [frameNumber, setFrameNumber] = React.useState("");
  const [engineNumber, setEngineNumber] = React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [size, setSize] = React.useState("");
  const [selfWeight, setSelfWeight] = React.useState("");
  const [maxPeople, setMaxPeople] = React.useState("");
  const [length, setLength] = React.useState("");
  const [containerSize, setContainerSize] = React.useState("");
  const [maxContainerWeight, setMaxContainerWeight] = React.useState("");
  const [maxWeight, setMaxWeight] = React.useState("");
  const [towingMass, setTowingMass] = React.useState("");
  const [personalId, setPersonalId] = React.useState("");
  const [name, setName] = React.useState("");
  const [personalRegistrationPlace, setPersonalRegistrationPlace] =
    React.useState("");
  const [personalRegistrationDate, setPersonalRegistrationDate] =
    React.useState("");
  const [dob, setDob] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [companyId, setCompanyId] = React.useState("");
  const [representative, setRepresentative] = React.useState("");
  const [type, setType] = React.useState("Cá nhân");
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState("");

  const onValidCarPersonal = () => {
    return (
      UseValidation.required(licensePlate).state &&
      UseValidation.required(carId).state &&
      UseValidation.required(registrationDate).state &&
      UseValidation.required(registrationPlace).state &&
      UseValidation.required(brand).state &&
      UseValidation.required(model).state &&
      UseValidation.required(patch).state &&
      UseValidation.required(color).state &&
      UseValidation.required(frameNumber).state &&
      UseValidation.required(engineNumber).state &&
      UseValidation.required(purpose).state &&
      UseValidation.required(size).state &&
      UseValidation.required(selfWeight).state &&
      UseValidation.required(maxPeople).state &&
      UseValidation.required(length).state &&
      UseValidation.required(containerSize).state &&
      UseValidation.required(maxContainerWeight).state &&
      UseValidation.required(maxWeight).state &&
      UseValidation.required(towingMass).state &&
      UseValidation.required(type).state &&
      UseValidation.required(personalId).state &&
      UseValidation.required(name).state &&
      UseValidation.required(personalRegistrationPlace).state &&
      UseValidation.required(personalRegistrationDate).state &&
      UseValidation.required(dob).state &&
      UseValidation.required(gender).state &&
      UseValidation.required(address).state &&
      UseValidation.required(phone).state
    );
  };
  const onValidCarCompany = () => {
    return (
      UseValidation.required(licensePlate).state &&
      UseValidation.required(carId).state &&
      UseValidation.required(registrationDate).state &&
      UseValidation.required(registrationPlace).state &&
      UseValidation.required(brand).state &&
      UseValidation.required(model).state &&
      UseValidation.required(patch).state &&
      UseValidation.required(color).state &&
      UseValidation.required(frameNumber).state &&
      UseValidation.required(engineNumber).state &&
      UseValidation.required(purpose).state &&
      UseValidation.required(size).state &&
      UseValidation.required(selfWeight).state &&
      UseValidation.required(maxPeople).state &&
      UseValidation.required(length).state &&
      UseValidation.required(containerSize).state &&
      UseValidation.required(maxContainerWeight).state &&
      UseValidation.required(maxWeight).state &&
      UseValidation.required(towingMass).state &&
      UseValidation.required(type).state &&
      UseValidation.required(name).state &&
      UseValidation.required(address).state &&
      UseValidation.required(phone).state &&
      UseValidation.required(companyId).state &&
      UseValidation.required(representative).state
    );
  };

  const onAddCar = () => {
    var item;
    if (type === "Cá nhân") {
      item = {
        car: {
          licensePlate: licensePlate,
          carId: carId,
          registrationDate: registrationDate,
          registrationPlace: registrationPlace,
          brand: brand,
          model: model,
          patch: patch,
          color: color,
          frameNumber: frameNumber,
          engineNumber: engineNumber,
          purpose: purpose,
        },
        technical: {
          size: size,
          selfWeight: selfWeight,
          maxPeople: maxPeople,
          length: length,
          containerSize: containerSize,
          maxContainerWeight: maxContainerWeight,
          maxWeight: maxWeight,
          towingMass: towingMass,
        },
        personal: {
          personalId: personalId,
          name: name,
          registrationPlace: registrationPlace,
          registrationDate: registrationDate,
          dob: dob,
          gender: gender,
          address: address,
          phone: phone,
          type: type,
        },
        company: null,
      };
    } else {
      item = {
        car: {
          licensePlate: licensePlate,
          carId: carId,
          registrationDate: registrationDate,
          registrationPlace: registrationPlace,
          brand: brand,
          model: model,
          patch: patch,
          color: color,
          frameNumber: frameNumber,
          engineNumber: engineNumber,
          purpose: purpose,
        },
        technical: {
          size: size,
          selfWeight: selfWeight,
          maxPeople: maxPeople,
          length: length,
          containerSize: containerSize,
          maxContainerWeight: maxContainerWeight,
          maxWeight: maxWeight,
          towingMass: towingMass,
        },
        personal: null,
        company: {
          companyId: companyId,
          name: name,
          address: address,
          representative: representative,
          phone: phone,
        },
      };
    }

    UseFetch("/api/admin/upload/car", "POST", item).then((res) => {
      if (res.status.code === "SUCCESS") {
        var newRow = {
          id: (parseInt(data[data.length - 1].id) + 1).toString(),
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
                    <strong>Kích thước bao (mm) :</strong> {item.technical.size}
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
                        <strong>Địa chỉ trụ sở:</strong> {item.company.address}
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
                  {item.registrations === null ||
                  item.registrations.length == 0 ? (
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
        setData((prev) => {
          prev.push(newRow);
          return prev;
        });
        onReset();
        ref.current.updateTable(newRow, "add");
        ref.current.forceAddRowClose();
      } else if (res.status.message.length == "0") {
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
    UseFetch.File("/api/admin/upload/cars", "POST", formData).then((res) => {
      if (res.status.code === "SUCCESS") {
        alert("Add cars successfully");
        window.location.reload();
      } else if (!res.status.message) {
        setError("Lỗi không xác định");
      } else {
        setError(res.status.message);
      }
    });
  };

  const onResetFile = () => {
    setFile(null);
  };

  const onReset = () => {
    setLicensePlate("");
    setCarId("");
    setRegistrationDate("");
    setRegistrationPlace("");
    setBrand("");
    setModel("");
    setPatch("");
    setColor("");
    setFrameNumber("");
    setEngineNumber("");
    setPurpose("");
    setSize("");
    setSelfWeight("");
    setMaxPeople("");
    setLength("");
    setContainerSize("");
    setMaxContainerWeight("");
    setMaxWeight("");
    setTowingMass("");
    setType("");
    setName("");
    setPersonalId("");
    setPersonalRegistrationDate("");
    setPersonalRegistrationPlace("");
    setDob("");
    setGender("");
    setAddress("");
    setPhone("");
    setCompanyId("");
    setRepresentative("");
    setType("Cá nhân");
  };

  useEffect(() => {
    UseFetch("/api/admin/list/all", "GET", null).then((res) => {
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
    let res = require("../../data.json");
  }, []);

  if (loading || !data) return <React.Fragment />;

  return (
    <>
      <Table
        title="Danh sách xe đã đăng ký"
        data={data}
        noOption
        uploadFile={
          <Form>
            <Form.Title content="Tải file xe đăng ký mới" />
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
          <Form registeredCar>
            <Form.Title content="Thêm xe đăng ký mới" />
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
                label="Mã số"
                type="text"
                reference={[carId, setCarId, UseValidation.required]}
              />
              <Form.Input
                label="Ngày cấp"
                type="date"
                reference={[
                  registrationDate,
                  setRegistrationDate,
                  UseValidation.required,
                ]}
              />
              <Form.Input
                label="Nơi đăng ký"
                type="text"
                reference={[
                  registrationPlace,
                  setRegistrationPlace,
                  UseValidation.required,
                ]}
              />
            </Form.Split>
            <Form.Split>
              <Form.Input
                label="Nhãn hiệu"
                type="text"
                reference={[brand, setBrand, UseValidation.required]}
              />
              <Form.Input
                label="Dòng xe"
                type="text"
                reference={[model, setModel, UseValidation.required]}
              />{" "}
              <Form.Input
                label="Phiên bản"
                type="text"
                reference={[patch, setPatch, UseValidation.required]}
              />
            </Form.Split>
            <Form.Split>
              <Form.Input
                label="Màu sơn"
                type="text"
                reference={[color, setColor, UseValidation.required]}
              />
              <Form.Input
                label="Số khung"
                type="text"
                reference={[
                  frameNumber,
                  setFrameNumber,
                  UseValidation.required,
                ]}
              />
              <Form.Input
                label="Số máy"
                type="text"
                reference={[
                  engineNumber,
                  setEngineNumber,
                  UseValidation.required,
                ]}
              />
            </Form.Split>
            <Form.Split>
              <Form.Input
                label="Mục đích sử dụng"
                type="text"
                reference={[purpose, setPurpose, UseValidation.required]}
              />
              <Form.Input
                label="Kích thước bao"
                type="text"
                reference={[size, setSize, UseValidation.required]}
              />
              <Form.Input
                label="Khối lượng bản thân"
                type="text"
                reference={[selfWeight, setSelfWeight, UseValidation.required]}
              />
            </Form.Split>
            <Form.Split>
              <Form.Input
                label="Số lượng người cho phép chở"
                type="text"
                reference={[maxPeople, setMaxPeople, UseValidation.required]}
              />
              <Form.Input
                label="Chiều dài cơ sở"
                type="text"
                reference={[length, setLength, UseValidation.required]}
              />{" "}
              <Form.Input
                label="Kích thước thùng hàng"
                type="text"
                reference={[
                  containerSize,
                  setContainerSize,
                  UseValidation.required,
                ]}
              />
            </Form.Split>
            <Form.Split>
              <Form.Input
                label="Khối lượng hàng hóa cho phép chở"
                type="text"
                reference={[
                  maxContainerWeight,
                  setMaxContainerWeight,
                  UseValidation.required,
                ]}
              />
              <Form.Input
                label="Khối lượng toàn bộ cho phép"
                type="text"
                reference={[maxWeight, setMaxWeight, UseValidation.required]}
              />
              <Form.Input
                label="Khối lượng kéo theo cho phép"
                type="text"
                reference={[towingMass, setTowingMass, UseValidation.required]}
              />
            </Form.Split>

            <Option title="Chủ sở hữu" value={type} onChange={setType}>
              <Option.Item value="Cá nhân" />
              <Option.Item value="Cơ quan" />
            </Option>

            {type === "Cá nhân" ? (
              <>
                <Form.Split>
                  <Form.Input
                    label="Tên chủ sở hữu"
                    type="text"
                    reference={[name, setName, UseValidation.required]}
                  />
                  <Form.Input
                    label="Giới tính"
                    type="text"
                    reference={[gender, setGender, UseValidation.required]}
                  />
                  <Form.Input
                    label="Ngày sinh"
                    type="date"
                    reference={[dob, setDob, UseValidation.required]}
                  />
                  <Form.Input
                    label="Số điện thoại"
                    type="text"
                    reference={[phone, setPhone, UseValidation.required]}
                  />
                </Form.Split>
                <Form.Split>
                  <Form.Input
                    label="Số CCCD"
                    type="text"
                    reference={[
                      personalId,
                      setPersonalId,
                      UseValidation.required,
                    ]}
                  />
                  <Form.Input
                    label="Nơi cấp CCCD"
                    type="text"
                    reference={[
                      personalRegistrationPlace,
                      setPersonalRegistrationPlace,
                      UseValidation.required,
                    ]}
                  />
                  <Form.Input
                    label="Ngày cấp"
                    type="date"
                    reference={[
                      personalRegistrationDate,
                      setPersonalRegistrationDate,
                      UseValidation.required,
                    ]}
                  />
                  <Form.Input
                    label="Địa chỉ thường trú"
                    type="text"
                    reference={[address, setAddress, UseValidation.required]}
                  />
                </Form.Split>
              </>
            ) : (
              <>
                <Form.Split>
                  <Form.Input
                    label="Tên đơn vị"
                    type="text"
                    reference={[name, setName, UseValidation.required]}
                  />
                  <Form.Input
                    label="Mã đơn vị"
                    type="text"
                    reference={[
                      companyId,
                      setCompanyId,
                      UseValidation.required,
                    ]}
                  />
                  <Form.Input
                    label="Người đại diện"
                    type="text"
                    reference={[
                      representative,
                      setRepresentative,
                      UseValidation.required,
                    ]}
                  />
                </Form.Split>
                <Form.Split>
                  <Form.Input
                    label="Địa chỉ trụ sở"
                    type="text"
                    reference={[address, setAddress, UseValidation.required]}
                  />

                  <Form.Input
                    label="Số điện thoại liên hệ"
                    type="text"
                    reference={[phone, setPhone, UseValidation.required]}
                  />
                </Form.Split>
              </>
            )}
            <Form.Error enabled={error !== ""} content={error} />

            <Form.Submit
              content="Thêm xe đăng ký"
              validation={
                type === "Cá nhân" ? onValidCarPersonal : onValidCarCompany
              }
              onClick={onAddCar}
            />
          </Form>
        }
        onReset={onReset}
        onResetFile={onResetFile}
      />
    </>
  );
}

export default RegisteredCar;
