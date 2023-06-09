import { Form, Option, Table } from "../../components";
import { UseFetch, UseValidation } from "../../utils";
import React from "react";

/*
 * @description: show and manage user list
 */
function UserList() {
  const ref = React.useRef(null);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [id, setId] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [retypePassword, setRetypePassword] = React.useState("");
  const [role, setRole] = React.useState("user");
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [error, setError] = React.useState("");
  const [file, setFile] = React.useState(null);

  const validRetypePassword = (input) => {
    return UseValidation.retypePassword(input, password);
  };

  const onValidUser = () => {
    return (
      UseValidation.username(username).state &&
      UseValidation.email(email).state &&
      UseValidation.password(password).state &&
      UseValidation.name(name).state &&
      UseValidation.required(location) &&
      validRetypePassword(retypePassword).state
    );
  };

  const onGetAll = () => {
    UseFetch("/api/admin/user/all", "GET", null).then((res) => {
      if (res.status.code === "SUCCESS") {
        var _res = res.data.map((item, count) => {
          var fetchRole;
          if (item.roles[0].name == "ROLE_ADMIN") {
            fetchRole = "admin";
          } else {
            fetchRole = "user";
          }
          var _item = {
            id: item.id,
            username: item.username,
            email: item.email,
            name: item.name,
            location: item.location,
            role: fetchRole,
          };

          return _item;
        });

        setData(_res);
        setLoading(false);
      }
    });
  };

  React.useEffect(() => {
    onGetAll();
  }, []);

  const onAddUser = () => {
    UseFetch("/api/admin/user/signup", "POST", {
      username: username,
      email: email,
      password: password,
      retypePassword: retypePassword,
      name: name,
      location: location,
      role: ["user"],
    }).then((res) => {
      if (res.status.code === "SUCCESS") {
        onReset();
        ref.current.forceAddRowClose();
        alert("Add user successfully");
        window.location.reload();
      } else {
        setError(res.status.message);
      }
    });
  };

  const onEditRow = () => {
    var item = {
      username: username,
      email: email,
      name: name,
      password: password,
      retypePassword: retypePassword,
      role: [role],
    };
    UseFetch(`/api/admin/user/update/${userId}`, "PUT", item).then((res) => {
      if (res.status.code === "SUCCESS") {
        setData((prev) => {
          prev[id] = {
            id: userId,
            username: username,
            email: email,
            name: name,
            location: location,
            role: role,
          };
          return prev;
        });
        onReset();
        ref.current.updateTable(
          {
            id: userId,
            username: username,
            email: email,
            name: name,
            location: location,
            role: role,
          },
          "edit"
        );
        ref.current.forceEditRowClose();
        alert("Edit user successfully");
      } else if (res.status.message.length == "0") {
        setError("Lỗi không xác định");
      } else {
        setError(res.status.message);
      }
    });
  };

  const onDeleteRow = (row) => {
    UseFetch(`/api/admin/user/delete/${row.id}`, "DELETE", null).then((res) => {
      if (res.status.code === "SUCCESS") {
        ref.current.updateTable(
          {
            id: userId,
          },
          "delete"
        );
        alert("Delete user successfully");
      } else {
        alert(res.status.message);
      }
    });
  };

  const onFetchEditRow = (row, i) => {
    setId(i);
    setUserId(row.id);
    setUsername(row.username);
    setEmail(row.email);
    setName(row.name);
    setRole(row.role);
    setPassword("");
    setLocation(row.location);
    setRetypePassword("");
  };

  const onResetFile = () => {
    setFile(null);
  };
  const onReset = () => {
    setId("");
    setUsername("");
    setEmail("");
    setPassword("");
    setRetypePassword("");
    setName("");
    setRole("user");
    setError("");
    setLocation("");
  };

  const onUploadFile = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    UseFetch.File("/api/admin/upload/users", "POST", formData).then((res) => {
      if (res.status.code === "SUCCESS") {
        alert("Add users successfully");
        window.location.reload();
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

  if (loading || !data.length) return <React.Fragment />;

  return (
    <React.Fragment>
      <Table
        title="Danh sách tài khoản"
        ref={ref}
        data={data}
        uploadFile={
          <Form>
            <Form.Title content="Tải file người dùng" />
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
                  retypePassword,
                  setRetypePassword,
                  validRetypePassword,
                ]}
              />
            </Form.Split>
            <Form.Split>
              <Form.Input label="Tên" type="text" reference={[name, setName]} />
              <Form.Input
                label="Khu vực"
                type="text"
                reference={[location, setLocation]}
              />
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
          <Form noContainer maxWidth="500px">
            <Form.Title content="Sửa thông tin tài khoản" />
            <Form.Split>
              <Form.Input label="Stt." type="text" reference={[id]} disabled />
              <Form.Input
                label="Tên đăng nhập"
                type="text"
                reference={[username, setUsername, UseValidation.username]}
                disabled
              />
            </Form.Split>
            <Form.Split>
              <Form.Input
                label="Mật khẩu mới"
                type="password"
                reference={[password, setPassword, UseValidation.password]}
              />
              <Form.Input
                label="Nhập lại mật khẩu"
                type="password"
                reference={[
                  retypePassword,
                  setRetypePassword,
                  validRetypePassword,
                ]}
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
              <Form.Input
                label="Khu vực"
                type="text"
                reference={[location, setLocation]}
              />
              <Form.Input
                label="Vai trò"
                type="text"
                reference={[role, setRole]}
                disabled
              />
            </Form.Split>

            <Form.Error enabled={error !== ""} content={error} />
            <Form.Submit
              content="Cập nhật"
              validation={onValidUser}
              onClick={onEditRow}
            />
          </Form>
        }
        onFetchEditRow={onFetchEditRow}
        onReset={onReset}
        onResetFile={onResetFile}
      />
    </React.Fragment>
  );
}
export { UserList };
