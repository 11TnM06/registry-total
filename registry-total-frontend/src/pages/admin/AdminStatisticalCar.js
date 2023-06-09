import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { Form, Option, Section } from "../../components";
import { UseFetch, UsePreprocessChart } from "../../utils";

function AdminStatisticalCar() {
  const [data, setData] = React.useState(null);

  const [loadingUsers, setLoadingUsers] = React.useState(true);
  const [users, setUsers] = React.useState(null);
  const [locationType, setLocationType] = React.useState("Khu vực");
  const [location, setLocation] = React.useState("Hà Nội");
  const [timeType, setTimeType] = React.useState("Tháng");
  const [year, setYear] = React.useState("2020");
  const [carType, setCarType] = React.useState("Xe đăng kiểm");

  const years = createArray(2018, 2027);
  const regions = ["Hà Nội", "Thanh Hóa", "Đà Nẵng", "Nghệ An", "Đà Nẵng"];

  function createArray(min, max) {
    let arr = [];
    for (let i = min; i <= max; i++) {
      arr.push(i);
    }
    return arr;
  }

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
  }, []);

  React.useEffect(() => {}, []);

  const handleCountry = () => {
    UseFetch(`/api/admin/list/all`, "GET").then((res) => {
      if (res.status.code === "SUCCESS") {
        var _res = res.data.map((item) => {
          if (item.registrations.length > 0) {
            var _item = {
              registraions: item.registrations,
            };
            return _item;
          }
          return null;
        });
        var dateData = [];
        if (timeType === "Năm") {
          if (carType == "Xe đăng kiểm") {
            _res.map((item) => {
              if (item) {
                item.registraions.map((date) => {
                  dateData.push(date.registryDate);
                });
              }
            });
          } else {
            _res.map((item) => {
              if (item) {
                item.registraions.map((date) => {
                  dateData.push(date.expiredDate);
                });
              }
            });
          }
        } else {
          if (carType == "Xe đăng kiểm") {
            _res.map((item) => {
              if (item) {
                item.registraions.map((date) => {
                  if (date.registryDate.split("-")[0] == year) {
                    dateData.push(date.registryDate);
                  }
                });
              }
            });
          } else {
            _res.map((item) => {
              if (item) {
                item.registraions.map((date) => {
                  if (date.registryDate.split("-")[0] == year) {
                    dateData.push(date.expiredDate);
                  }
                });
              }
            });
          }
        }

        let _data = UsePreprocessChart.Admin(
          dateData,
          "Xe đăng kiểm",
          timeType
        );

        setData(_data);
      }
    });
  };

  const handleRegion = () => {
    var item = {
      locationType: locationType,
      location: location.length == 0 ? null : location,
      timeType: "Năm",
      time: year,
      year: year,
    };
    if (carType == "Xe đăng kiểm") {
      UseFetch(`/api/admin/list/all/registered`, "POST", item).then((res) => {
        if (res.status.code === "SUCCESS") {
          var _res = res.data.map((item) => {
            if (item.registrations.length > 0) {
              var _item = {
                registraions: item.registrations,
              };
              return _item;
            }
            return null;
          });
          var dateData = [];
          if (timeType === "Năm") {
            _res.map((item) => {
              if (item) {
                item.registraions.map((date) => {
                  dateData.push(date.registryDate);
                });
              }
            });
          } else {
            _res.map((item) => {
              if (item) {
                item.registraions.map((date) => {
                  if (date.registryDate.split("-")[0] == year) {
                    dateData.push(date.registryDate);
                  }
                });
              }
            });
          }

          let _data = UsePreprocessChart.Admin(
            dateData,
            "Xe đăng kiểm",
            timeType
          );

          setData(_data);
        }
      });
    } else {
      UseFetch(`/api/admin/list/all/expired`, "POST", item).then((res) => {
        if (res.status.code === "SUCCESS") {
          if (Object.keys(res.data).length === 0) {
            setData({ options: {}, series: [] });
            return;
          }
          var _res = res.data.cars.map((item) => {
            if (item.registrations.length > 0) {
              var _item = {
                registraions: item.registrations,
              };
              return _item;
            }
            return null;
          });
          var dateData = [];
          if (timeType === "Năm") {
            _res.map((item) => {
              if (item) {
                item.registraions.map((date) => {
                  dateData.push(date.expiredDate);
                });
              }
            });
          } else {
            _res.map((item) => {
              if (item) {
                item.registraions.map((date) => {
                  if (date.registryDate.split("-")[0] == year) {
                    dateData.push(date.expiredDate);
                  }
                });
              }
            });
          }

          let _data = UsePreprocessChart.Admin(
            dateData,
            "Xe hết hạn",
            timeType
          );

          setData(_data);
        }
      });
    }
  };

  const handleRegionAll = () => {
    var item = {
      locationType: locationType,
      location: location.length == 0 ? null : location,
      timeType: "Tất cả",
      time: null,
      year: null,
    };
    UseFetch(`/api/admin/list/all/registered`, "POST", item).then((res) => {
      if (res.status.code === "SUCCESS") {
        var _res = res.data.map((item) => {
          if (item.registrations.length > 0) {
            var _item = {
              registraions: item.registrations,
            };
            return _item;
          }
          return null;
        });
        var dateData = [];
        if (timeType === "Năm") {
          if (carType == "Xe đăng kiểm") {
            _res.map((item) => {
              if (item) {
                item.registraions.map((date) => {
                  dateData.push(date.registryDate);
                });
              }
            });
          } else {
            _res.map((item) => {
              if (item) {
                item.registraions.map((date) => {
                  dateData.push(date.expiredDate);
                });
              }
            });
          }
        } else {
          if (carType == "Xe đăng kiểm") {
            _res.map((item) => {
              if (item) {
                item.registraions.map((date) => {
                  if (date.registryDate.split("-")[0] == year) {
                    dateData.push(date.registryDate);
                  }
                });
              }
            });
          } else {
            _res.map((item) => {
              if (item) {
                item.registraions.map((date) => {
                  if (date.registryDate.split("-")[0] == year) {
                    dateData.push(date.expiredDate);
                  }
                });
              }
            });
          }
        }
        let _data = UsePreprocessChart.Admin(
          dateData,
          "Xe đăng kiểm",
          timeType
        );
        setData(_data);
      }
    });
  };

  const handleButtonClick = () => {
    if (locationType == "Cả nước") {
      handleCountry();
    } else if (timeType != "Năm") {
      handleRegion();
    } else {
      handleRegionAll();
    }
  };

  return (
    <>
      <Form>
        <Form.Title content="Chọn phân loại" />
        <Section.Div inline>
          <Option title="Thời gian" value={timeType} onChange={setTimeType}>
            <Option.Item value="Tháng" />
            <Option.Item value="Quý" />
            <Option.Item value="Năm" />
          </Option>
          {timeType != "Năm" && (
            <Option title="Năm" value={year} onChange={setYear}>
              {years.map((item) => {
                return <Option.Item value={item} />;
              })}
            </Option>
          )}
        </Section.Div>

        <Section.Div inline>
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
              {regions.map((item) => {
                return <Option.Item value={item} />;
              })}
            </Option>
          )}
        </Section.Div>

        <Section.Div inline>
          <Option title="Loại xe" value={carType} onChange={setCarType}>
            <Option.Item value="Xe đăng kiểm" />
            <Option.Item value="Xe hết hạn" />
          </Option>
        </Section.Div>

        <Form.Submit content="Thống kê" onClick={handleButtonClick} />
      </Form>
      <Section>
        {!data ? (
          <div className="text-center">Không có dữ liệu để hiện thị</div>
        ) : (
          <Chart
            options={data.options}
            series={data.series}
            type="line"
            height={"200%"}
          />
        )}
      </Section>
    </>
  );
}
export { AdminStatisticalCar };
