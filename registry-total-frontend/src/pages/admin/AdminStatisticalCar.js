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
  const regions = [
    "Hà Nội",
    "Hải Phòng",
    "Thanh Hóa",
    "Đà Nẵng",
    "Nghệ An",
    "Hà Tĩnh",
  ];

  /**
   * Creates an array of numbers from min to max, inclusive.
   *
   * @param {number} min - The minimum number in the range.
   * @param {number} max - The maximum number in the range.
   * @return {array} Returns the created array of numbers.
   */
  function createArray(min, max) {
    let arr = [];
    for (let i = min; i <= max; i++) {
      arr.push(i);
    }
    return arr;
  }

  /**
   * Fetches all users from the server and sets the users state.
   *
   * @return {void} This function does not return anything.
   */
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

  /**
   * This function handles the country data fetched from the server and sets the
   * data for plotting a chart based on the time type and car type selected by the user.
   *
   * @return {void} No return value.
   */
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
                  if (date.expiredDate.split("-")[0] == year) {
                    dateData.push(date.expiredDate);
                  }
                });
              }
            });
          }
        }

        let _data = UsePreprocessChart(dateData, "Xe đăng kiểm", timeType);

        setData(_data);
      }
    });
  };

  /**
   * This function handles region data when timetype is month or quarter
   *
   * @return {void} No return value.
   */
  const handleRegion = () => {
    var item = {
      locationType: locationType,
      location: location.length == 0 ? null : location,
      timeType: "Năm",
      time: year,
      year: year,
    };
    console.log(item);

    if (carType == "Xe đăng kiểm") {
      UseFetch(`/api/admin/list/all/registered`, "POST", item).then((res) => {
        if (res.status.code === "SUCCESS") {
          console.log(res);
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

          let _data = UsePreprocessChart(dateData, "Xe đăng kiểm", timeType);

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
          console.log(res);
          var _res = res.data.cars.map((item) => {
            if (item.registrations.length > 0) {
              var _item = {
                registraions: item.registrations,
              };
              return _item;
            }
            return null;
          });
          console.log(_res);
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
                  console.log(date);
                  if (date.expiredDate.split("-")[0] == year) {
                    dateData.push(date.expiredDate);
                  }
                });
              }
            });
          }

          let _data = UsePreprocessChart(dateData, "Xe hết hạn", timeType);

          setData(_data);
        }
      });
    }
  };

  /**
   * Handles the region data for all locations and times.
   *
   * @return {type} void
   */
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
                  if (date.expiredDate.split("-")[0] == year) {
                    dateData.push(date.expiredDate);
                  }
                });
              }
            });
          }
        }
        let _data = UsePreprocessChart(dateData, "Xe đăng kiểm", timeType);
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
              <Option.Item value="Chọn" />
              {users.map((name) => {
                return <Option.Item value={name} />;
              })}
            </Option>
          )}
          {locationType === "Khu vực" && (
            <Option title="Khu vực" value={location} onChange={setLocation}>
              {" "}
              <Option.Item value="Chọn" />
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
