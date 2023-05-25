import { Link } from "react-router-dom";
import { Section } from "../../../components";

/*
 * @description: welcome page
 */
function Welcome() {
  return (
    <Section title="HỆ THỐNG REGISTRY TOTAL">
      <div>
        Đăng nhập với vai trò
        <Link to="register">Cục Đăng kiểm</Link>
      </div>
      <div>
        Đăng nhập với vai trò
        <Link to="center">Trung tâm Đăng kiểm</Link>
      </div>
      <div>
        Vào trang
        <Link to="user/login">đăng nhập</Link>
      </div>
    </Section>
  );
}

export { Welcome };
