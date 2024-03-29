import React from "react";
import { Form } from "../../../components";
import { useLocation } from "react-router-dom";
import { UseAuth, UseFetch, UseValidation } from "../../../utils";

/*
 * @description: Login
 */
function Login() {
  const [loginUsername, setLoginUsername] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const loginInfo = React.useMemo(
    () => ({ username: loginUsername, password: loginPassword }),
    [loginUsername, loginPassword]
  );
  const [error, setError] = React.useState("");
  const [notify, setNotify] = React.useState(false);
  const { state } = useLocation();

  React.useEffect(() => {
    if (state) {
      setNotify(true);
      window.history.replaceState({}, document.title);
    }
  }, [state]);

  const validLogin = () => {
    return (
      UseValidation.loginUsername(loginUsername).state &&
      UseValidation.loginUsername(loginPassword).state
    );
  };

  const onLogin = () => {
    UseFetch("/api/auth/login", "POST", loginInfo).then((data) => {
      if (data.status.code === "SUCCESS") {
        UseAuth.set(data.data.token);
        UseAuth.setInfo(data.data);
        if (data.data.roles == "ROLE_ADMIN") {
          window.location.href = "/register";
        } else {
          window.location.href = "/center";
        }
      } else if (data.status.code === "E-003") {
        setError("Tên tài khoản hoặc mật khẩu không đúng");
      } else {
        setError("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
    });
  };

  return (
    <Form width="25rem">
      <Form.Title content="Đăng nhập hệ thống RegistryTotal" />
      <Form.Notify
        enabled={notify}
        content="Mật khẩu của bạn đã được đặt lại thành công. Bây giờ, hãy đăng nhập với mật khẩu mới"
      />
      <Form.Input
        label="Tên đăng nhập"
        type="text"
        reference={[
          loginUsername,
          setLoginUsername,
          UseValidation.loginUsername,
        ]}
      />
      <Form.Input
        label="Mật khẩu"
        type="password"
        reference={[
          loginPassword,
          setLoginPassword,
          UseValidation.loginPassword,
        ]}
      />
      <Form.Error enabled={error !== ""} content={error} />
      <Form.Submit
        onClick={onLogin}
        validation={validLogin}
        content="Đăng nhập"
      />
      <Form.Link href="../forgot-password" content="Quên mật khẩu?" />
    </Form>
  );
}
export { Login };
