import React from "react";
import Chart from "react-apexcharts";
import { Form, Option, Section } from "../../components";
import { UseFetch, UsePreprocessChart } from "../../utils";

function CenterStatisticalCar() {
  const [data, setData] = React.useState(null);
  const [timeType, setTimeType] = React.useState("Tháng");
  const [year, setYear] = React.useState("2020");
  const [carType, setCarType] = React.useState("Xe đăng kiểm");

  const years = createArray(2018, 2027);

  function createArray(min, max) {
    let arr = [];
    for (let i = min; i <= max; i++) {
      arr.push(i);
    }
    return arr;
  }

  const handleData = () => {
    UseFetch(`/api/user/list/all`, "GET").then((res) => {
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
    handleData();
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
export { CenterStatisticalCar };
