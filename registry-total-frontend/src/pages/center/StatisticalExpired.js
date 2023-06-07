import React from "react";
import {Popup, Section, Table, Option, Button} from "../../components";
import { useEffect } from "react";
import { UseFetch } from "../../utils";

function StatisticalExpired() {

    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [timeType, setTimeType] = React.useState("Tháng");
    const [time, setTime] = React.useState("10");
    let [year, setYear] = React.useState("2024");

    var item = {
        locationType: null,
        location: null,
        timeType: timeType,
        time: time,
        year: year
    }

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {

        console.log(item)
        setLoading(true);
            UseFetch("/api/user/list/all/expired", "POST", item).then((res) => {
                if (res.status.code === "SUCCESS") {
                    var _res = res.data.map((item) => {
                        var _item = {
                            id: item.cars.car.id,
                            licensePlate: item.cars.car.licensePlate,
                            carId: item.car.carId,
                            registrationsDate: item.cars.car.registrationDate,
                            registrationsPlace: item.cars.car.registrationPlace,
                            carBrand: item.cars.car.brand,
                            model: item.cars.car.model,
                            patch: item.cars.car.patch,
                            color: item.cars.car.color,
                            frameNumber: item.cars.car.frameNumber,
                            engineNumber: item.cars.car.engineNumber,
                            purpose: item.cars.car.purpose,
                            technical: (
                                <Popup>
                                    <Popup.Trigger>
                                        <a href="#/">Xem thêm</a>
                                    </Popup.Trigger>
                                    <Popup.Content>
                                        <Section title="Thông số kỹ thuật" noContainer>
                                            <div>
                                                <strong>Biển số xe:</strong> {item.cars.car.licensePlate}
                                            </div>
                                            <div>
                                                <strong>Kích thước bao (mm) :</strong>{" "}
                                                {item.cars.technical.size}
                                            </div>
                                            <div>
                                                <strong>Khối lượng bản thân (kg) :</strong>{" "}
                                                {item.cars.technical.selfWeight}
                                            </div>
                                            <div>
                                                <strong>Số lượng người cho phép chở:</strong>{" "}
                                                {item.cars.technical.maxPeople}
                                            </div>
                                            <div>
                                                <strong>Chiều dài cơ sở (mm) : </strong>{" "}
                                                {item.cars.technical.length}
                                            </div>
                                            <div>
                                                <strong>Kích thước thùng hàng:</strong>{" "}
                                                {item.cars.technical.containerSize}
                                            </div>
                                            <div>
                                                <strong>Khối lượng hàng hóa cho phép chở (kg) :</strong>{" "}
                                                {item.cars.technical.maxContainerWeight}
                                            </div>
                                            <div>
                                                <strong>Khối lượng toàn bộ cho phép chở (kg) :</strong>{" "}
                                                {item.cars.technical.maxWeight}
                                            </div>
                                            <div>
                                                <strong>Khối lượng kéo theo cho phép (kg) :</strong>{" "}
                                                {item.cars.technical.towingMass}
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
                                            {item.cars.personal ? (
                                                <>
                                                    <div>
                                                        <strong>Tên chủ sở hữu:</strong> {item.cars.personal.name}
                                                    </div>
                                                    <div>
                                                        <strong>Giới tính:</strong> {item.cars.personal.gender}
                                                    </div>
                                                    <div>
                                                        <strong>Ngày sinh:</strong> {item.cars.personal.dob}
                                                    </div>

                                                    <div>
                                                        <strong>Số điện thoại:</strong> {item.cars.personal.phone}
                                                    </div>
                                                    <div>
                                                        <strong>Địa chỉ thường trú:</strong>{" "}
                                                        {item.cars.personal.address}
                                                    </div>
                                                    <div>
                                                        <strong>Số CCCD:</strong> {item.cars.personal.personalId}
                                                    </div>
                                                    <div>
                                                        <strong>Nơi cấp CCCD:</strong>{" "}
                                                        {item.cars.personal.registrationPlace}
                                                    </div>
                                                    <div>
                                                        <strong>Ngày cấp CCCD:</strong>{" "}
                                                        {item.cars.personal.registrationDate}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <strong>Tên đơn vị:</strong> {item.cars.company.name}
                                                    </div>
                                                    <div>
                                                        <strong>Mã đơn vị:</strong> {item.cars.company.companyId}
                                                    </div>
                                                    <div>
                                                        <strong>Số điện thoại liên lạc:</strong>{" "}
                                                        {item.cars.company.phone}
                                                    </div>
                                                    <div>
                                                        <strong>Địa chỉ trụ sở:</strong>{" "}
                                                        {item.cars.company.address}
                                                    </div>
                                                    <div>
                                                        <strong>Người đại diện:</strong>{" "}
                                                        {item.cars.company.representative}
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
                                                <strong>Biển số xe:</strong> {item.cars.car.licensePlate}
                                            </div>

                                            {item.cars.registrations.length == 0 ? (
                                                <div>
                                                    <strong>Chưa đăng kiểm</strong>
                                                </div>
                                            ) : (
                                                item.cars.registrations.map((registraion, count) => {
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
                            expiredDate: item.expiredDate,
                            firstRegistration: item.firstRegistration,
                        };
                        return _item;
                    });
                    setData(_res);
                    setLoading(false);
                }
            });
    }

    const handleButtonClick = () => {
        loadData();
    };

    if (loading || !data) return <React.Fragment />;

    return (
        <>

            {timeType && (
                <Option Option title={timeType} value={time} onChange={setTime}>
                    {timeType === 'Tháng' && (
                        <>
                            <Option.Item value='1' />
                            <Option.Item value='2' />
                            <Option.Item value='3' />
                            <Option.Item value='4' />
                            <Option.Item value='5' />
                            <Option.Item value='6' />
                            <Option.Item value='7' />
                            <Option.Item value='8' />
                            <Option.Item value='9' />
                            <Option.Item value='10' />
                            <Option.Item value='11' />
                            <Option.Item value='12' />
                        </>
                    )}
                </Option>
            )}

            <Option Option title='Năm' value={year} onChange={setYear}>
                <>
                    <Option.Item value='2018' />
                    <Option.Item value='2019' />
                    <Option.Item value='2020' />
                    <Option.Item value='2021' />
                    <Option.Item value='2022' />
                    <Option.Item value='2023' />
                    <Option.Item value='2024' />
                    <Option.Item value='2025' />
                </>
            </Option>

            <Button onClick={handleButtonClick}>Thống kê</Button>

            <Table
                title="Danh sách xe sắp hết hạn"
                data={data}
                noOption
                noAddRow
            />
        </>
    );
}

export default StatisticalExpired;
