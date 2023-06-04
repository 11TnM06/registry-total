import React from "react";
import { Form } from "../../components";
import { UseFetch, UseValidation } from "../../utils";

function AddCerti() {
  const [licensePlate, setLicensePlate] = React.useState("");
  const [registryDate, setRegistryDate] = React.useState("");
  const [expiredDate, setExpiredDate] = React.useState("");
  const [gcn, setGcn] = React.useState("");
  const [error, setError] = React.useState("");

  const onValidCerti = () => {
    return (
      UseValidation.required(licensePlate).state &&
      UseValidation.required(registryDate).state &&
      UseValidation.required(expiredDate).state &&
      UseValidation.required(gcn).state
    );
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day}/${month}/${year}`;
  }

  const onReset = () => {
    setLicensePlate("");
    setRegistryDate("");
    setExpiredDate("");
    setGcn("");
    setError("");
  };

  const onAddCerti = () => {
    var item = {
      licensePlate: licensePlate,
      registryDate: formatDate(registryDate),
      expiredDate: formatDate(expiredDate),
      gcn: gcn,
    };
    console.log(item);
    UseFetch("/api/user/upload/registration", "POST", item).then((res) => {
      if (res.status.code === "SUCCESS") {
        console.log("add certi successfully");
        onReset();
      } else {
        setError(res.status.message);
      }
    });
  };

  return (
    <>
      <Form>
        <Form.Title content="Cấp giấy chứng nhận" />
        <Form.Input
          label="Biển số xe"
          type="text"
          reference={[licensePlate, setLicensePlate, UseValidation.required]}
        />
        <Form.Input
          label="Số tem GCN"
          type="text"
          reference={[gcn, setGcn, UseValidation.required]}
        />
        <Form.Input
          label="Ngày đăng kiểm"
          type="date"
          reference={[registryDate, setRegistryDate, UseValidation.required]}
        />
        <Form.Input
          label="Ngày hết hạn hiệu lực đăng kiểm"
          type="date"
          reference={[expiredDate, setExpiredDate, UseValidation.required]}
        />
        <Form.Error enabled={error !== ""} content={error} />

        <Form.Submit
          content="Thêm giấy chứng nhận"
          validation={onValidCerti}
          onClick={onAddCerti}
        />
      </Form>
    </>
  );
}

export default AddCerti;
