import { Form, Option, Table } from "../../components";
import { UseFetch, UseValidation } from "../../utils";
import React from "react";

/*
 * @description: show and manage user list
 */
function UserList() {
  const rolePos = {
    admin: 1,
    user: 2,
  };

  const ref = React.useRef(null);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [id, setId] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [role, setRole] = React.useState("admin");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");

  const validRetypePassword = (input) => {
    return UseValidation.retypePassword(input, password);
  };

  const onValidUser = () => {
    return (
      UseValidation.username(username).state &&
      UseValidation.email(email).state &&
      UseValidation.password(password).state &&
      UseValidation.name(name).state &&
      validRetypePassword(confirmPassword).state
    );
  };

  React.useEffect(() => {
    UseFetch("/api/admin/user/all", "GET", null).then((res) => {
      if (res.status.code === "SUCCESS") {
        var _res = res.data.map((item, count) => {
          console.log(item);
          var _item = {
            id: count,
            username: item.username,
            email: item.email,
            name: item.name,
            role: item.roles[0].name,
          };
          return _item;
        });

        setData(_res);
        setLoading(false);
      }
    });
  }, []);

  const onAddUser = () => {
    UseFetch("/api/admin/user/signup", "POST", {
      username: username,
      email: email,
      password: password,
      name: name,
      role: [role],
    }).then((res) => {
      if (res.status.code === "SUCCESS") {
        var newRow = {
          id: (parseInt(data[data.length - 1].id) + 1).toString(),
          username: username,
          email: email,
          role: role,
          name: name,
        };
        setData((prev) => {
          prev.push(newRow);
          return prev;
        });
        onReset();
        ref.current.updateTable(newRow, "add");
        ref.current.forceAddRowClose();
      } else {
        setError(res.status.message);
      }

      //   } else if (res.status.code === "E-004") {
      //     setError("Username đã được đăng ký");
      //   } else if (res.status.code === "E-005") {
      //     setError("Email đã được đăng ký");
      //   } else if (res.status.code === "E-006") {
      //     setError("Tên công ty đã được đăng ký");
      //   } else {
      //     setError("Lỗi không xác định");
      //   }
    });
  };

  const onEditRow = () => {
    // UseFetch(`/api/admin/user/update/${userId}`, "PUT", {
    //   username: username,
    //   email: email,
    //   name: name,
    //   role_id: rolePos[role].toString(),
    // }).then((res) => {
    //   if (res.status.code === "SUCCESS") {
    //     setData((prev) => {
    //       prev[id] = {
    //         id: userId,
    //         username: username,
    //         email: email,
    //         role: role,
    //         name: name,
    //       };
    //       return prev;
    //     });
    //     onReset();
    //     ref.current.updateTable(
    //       {
    //         id: userId,
    //         username: username,
    //         email: email,
    //         role: role,
    //         name: name,
    //       },
    //       "edit"
    //     );
    //     ref.current.forceEditRowClose();
    //   } else if (res.status.code === "E-004") {
    //     setError("Username đã được đăng ký");
    //   } else if (res.status.code === "E-005") {
    //     setError("Email đã được đăng ký");
    //   } else if (res.status.code === "E-006") {
    //     setError("Tên công ty đã được đăng ký");
    //   } else {
    //     setError("Lỗi không xác định");
    //   }
    // });
  };

  const onDeleteRow = (row) => {
    // console.log(row);
  };

  const onFetchEditRow = (row, i) => {
    // setId(i);
    // setUserId(row.id);
    // setUsername(row.username);
    // setEmail(row.email);
    // setName(row.name);
    // setRole(row.role);
  };

  const onReset = () => {
    setId("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setRole("admin");
    setError("");
  };

  if (loading || !data.length) return <React.Fragment />;

  return (
    <React.Fragment>
      <Table
        title="Danh sách tài khoản"
        ref={ref}
        data={data}
        addRow={
          <Form>
            <Form.Title content="Thêm người dùng mới" />
            <Form.Split>
              <Form.Input
                label="Tên đăng nhập"
                type="text"
                reference={[username, setUsername, UseValidation.username]}
              />
              <Form.Input
                label="Email"
                type="text"
                reference={[email, setEmail, UseValidation.email]}
              />
            </Form.Split>
            <Form.Split>
              <Form.Input
                label="Mật khẩu"
                type="password"
                reference={[password, setPassword, UseValidation.password]}
              />
              <Form.Input
                label="Nhập lại mật khẩu"
                type="password"
                reference={[
                  confirmPassword,
                  setConfirmPassword,
                  validRetypePassword,
                ]}
              />
            </Form.Split>
            <Form.Split>
              <Form.Input label="Tên" type="text" reference={[name, setName]} />
            </Form.Split>
            <Form.Split>
              <Option title="Chức vụ" value={role} onChange={setRole}>
                <Option.Item value="admin" />
                <Option.Item value="user" />
              </Option>
            </Form.Split>
            <Form.Error enabled={error !== ""} content={error} />
            <Form.Submit
              content="Thêm người dùng"
              validation={onValidUser}
              onClick={onAddUser}
            />
          </Form>
        }
        onDelete={onDeleteRow}
        editRow={
          <Form noContainer>
            <Form.Title content="Sửa thông tin người dùng" />
            <Form.Split>
              <Form.Input label="Stt." type="text" reference={[id]} disabled />
              <Form.Input
                label="Tên đăng nhập"
                type="text"
                reference={[username, setUsername, UseValidation.username]}
              />
            </Form.Split>
            <Form.Split>
              <Form.Input
                label="Email"
                type="text"
                reference={[email, setEmail, UseValidation.email]}
              />
              <Form.Input label="Tên" type="text" reference={[name, setName]} />
            </Form.Split>
            <Form.Split>
              <Option title="Chức vụ" value={role} onChange={setRole}>
                <Option.Item value="admin" />
                <Option.Item value="user" />
              </Option>
            </Form.Split>

            <Form.Error enabled={error !== ""} content={error} />
            <Form.Submit content="Cập nhật" onClick={onEditRow} />
          </Form>
        }
        onFetchEditRow={onFetchEditRow}
        onReset={onReset}
      />
    </React.Fragment>
  );
}
export { UserList };
