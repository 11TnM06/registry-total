import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Dropdown, Icon } from "../components";
import { Navigation } from "./Navigation/Navigation";
import { ResponsiveNavigation } from "./Navigation/ResponsiveNavigation";
import "./style.css";
import Avatar from "../assets/avatar.png";
import Logo from "../assets/logo.png";

/*
 * @description: Layout for main page
 */
function Layout(props) {
  const onLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/user/login";
  };

  return (
    <div className="container">
      {/* <nav>
        <NavigationComponent type={props.type} name={props.name} />
      </nav> */}
      <main>
        <header>
          <div className="left-header">
            <ResponsiveNavigation>
              <ResponsiveNavigation.Trigger>
                <Icon.Navigation />
              </ResponsiveNavigation.Trigger>
              <ResponsiveNavigation.Content>
                <NavigationComponent type={props.type} name={props.name} />
              </ResponsiveNavigation.Content>
            </ResponsiveNavigation>
          </div>
          <div className="logo logo-left">
            <img
              src={Logo}
              width="50"
              height="50"
              style={{ marginRight: "10px" }}
            ></img>
            <div className="logo-text"> Registry Total</div>
          </div>
          <TopNavigationComponent type={props.type} name={props.name} />
          <div className="right-header">
            <Dropdown>
              <Dropdown.Main
                item={
                  <Icon.AvatarBox>
                    <img src={Avatar} alt="" width="50" height="50" />
                  </Icon.AvatarBox>
                }
              />
              <Dropdown.Menu right zIndex={5}>
                <Dropdown.Info userName={props.name} userEmail={props.email} />
                <Link
                  to="change-password"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Dropdown.Item label="Đổi mật khẩu" />
                </Link>
                <Dropdown.Item label="Đăng xuất" onClick={onLogout} />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
export { Layout };

function TopNavigationComponent(props) {
  return (
    <React.Fragment>
      {props.type == "admin" ? (
        <div className="top-navigation">
          <div className="top-item">
            <div className="dropbtn">QUẢN LÝ</div>
            <div class="dropdown-content">
              <Link to="registered-car">XE ĐÃ ĐĂNG KÝ</Link>
              <Link to="add-center">CẤP TÀI KHOẢN</Link>
            </div>
          </div>
          <div className="top-item">
            <div className="dropbtn">THỐNG KÊ</div>
            <div class="dropdown-content">
              <Link to="inspected-car">XE ĐÃ ĐĂNG KIỂM</Link>
              <Link to="expired-car">XE SẮP HẾT HẠN</Link>
              <Link to="statistic-car">THỐNG KÊ XE</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="top-navigation">
          <div className="top-item">
            <Link
              to="add-certi"
              style={{ textDecoration: "none" }}
              className="dropbtn"
            >
              CẤP GIẤY CHỨNG NHẬN
            </Link>
          </div>
          <div className="top-item">
            <div className="dropbtn">THỐNG KÊ</div>
            <div class="dropdown-content">
              <Link to="inspected-car">XE ĐÃ ĐĂNG KIỂM</Link>
              <Link to="expired-car">XE SẮP HẾT HẠN</Link>
              <Link to="statistic-car">THỐNG KÊ XE</Link>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

function NavigationComponent(props) {
  return (
    <React.Fragment>
      <div className="info">
        <div className="logo">
          <img
            src={Logo}
            width="50"
            height="50"
            style={{ marginRight: "10px" }}
          ></img>
          <div className="logo-text"> Registry Total</div>
        </div>
        <span className="personal-info">
          <Icon.AvatarBox>
            <img src={Avatar} alt="" />
          </Icon.AvatarBox>

          <div style={{ marginLeft: "10px" }}>{props.name}</div>
        </span>
      </div>
      <div className="navigation">
        <Navigation>
          <Navigation.Category
            label="Quản lý xe và trung tâm đăng kiểm"
            role={["admin"]}
            type={props.type}
          >
            <Navigation.Item label="Xe đã qua đăng ký" link="registered-car" />
            <Navigation.Item
              label="Cấp tài khoản trung tâm"
              link="add-center"
            />
          </Navigation.Category>
          <Navigation.Category
            label="Theo dõi và thống kê"
            role={["admin"]}
            type={props.type}
          >
            <Navigation.Item
              label="Xe đã được đăng kiểm"
              link="inspected-car"
            />
            <Navigation.Item label="Xe sắp hết hạn" link="expired-car" />
            <Navigation.Item label="Thống kê xe" link="statistic-car" />
          </Navigation.Category>

          <Navigation.Category
            label="Quản lý giấy chứng nhận"
            role={["user"]}
            type={props.type}
          >
            <Navigation.Item label="Cấp giấy chứng nhận" link="add-certi" />
          </Navigation.Category>
          <Navigation.Category
            label="Thống kê"
            role={["user"]}
            type={props.type}
          >
            <Navigation.Item
              label="Xe đã được đăng kiểm"
              link="inspected-car"
            />
            <Navigation.Item label="Xe sắp hết hạn" link="expired-car" />
            <Navigation.Item label="Thống kê xe" link="statistic-car" />
          </Navigation.Category>
        </Navigation>
      </div>
    </React.Fragment>
  );
}
