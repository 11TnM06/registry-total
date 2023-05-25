import React from "react";
import { Outlet } from "react-router-dom";
import { Dropdown, Icon } from "../components";
import { Navigation } from "./Navigation/Navigation";
import { ResponsiveNavigation } from "./Navigation/ResponsiveNavigation";
import "./style.css";

/*
 * @description: Layout for main page
 */
function Layout(props) {
  const onLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  const onForgotPassword = () => {
    window.location.href = "/change-password";
  };

  return (
    <div className="container">
      <nav>
        <NavigationComponent
          type={props.type}
          companyName={props.companyName}
        />
      </nav>
      <main>
        <header>
          <div className="left-header">
            <ResponsiveNavigation>
              <ResponsiveNavigation.Trigger>
                <Icon.Navigation />
              </ResponsiveNavigation.Trigger>
              <ResponsiveNavigation.Content>
                <NavigationComponent
                  type={props.type}
                  companyName={props.companyName}
                />
              </ResponsiveNavigation.Content>
            </ResponsiveNavigation>
          </div>
          <div className="right-header">
            <Dropdown>
              <Dropdown.Main
                item={
                  <Icon.AvatarBox>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgf5GvxhVHYUqV9roWJ4I4xyszcLCUHxRpxXKfx6R-5gSQuxrApw2QADJwvxF6OLnM810&usqp=CAU"
                      alt=""
                    />
                  </Icon.AvatarBox>
                }
              />
              <Dropdown.Menu right zIndex={5}>
                <Dropdown.Info
                  userName={props.companyName}
                  userEmail={props.email}
                />
                <Dropdown.Item
                  label="Đổi mật khẩu"
                  onClick={onForgotPassword}
                />
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

function NavigationComponent(props) {
  return (
    <React.Fragment>
      <div className="info">
        <span>Registry Total</span>
        <a className="personal-info" href="/">
          <Icon.AvatarBox>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgf5GvxhVHYUqV9roWJ4I4xyszcLCUHxRpxXKfx6R-5gSQuxrApw2QADJwvxF6OLnM810&usqp=CAU"
              alt=""
            />
          </Icon.AvatarBox>
          <div>
            <div>
              <strong>{props.companyName}</strong>
            </div>{" "}
          </div>
        </a>
      </div>
      <div className="navigation">
        <Navigation>
          <Navigation.Category
            label="Quản lý xe và trung tâm đăng kiểm"
            role={["register"]}
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
            role={["register"]}
            type={props.type}
          >
            <Navigation.Item
              label="Xe đã được đăng kiểm"
              link="inspected-car"
            />
            <Navigation.Item label="Xe sắp hết hạn" link="expired-car" />
          </Navigation.Category>

          <Navigation.Category
            label="Quản lý giấy chứng nhận"
            role={["center"]}
            type={props.type}
          >
            <Navigation.Item label="Cấp giấy chứng nhận" link="add-certi" />
          </Navigation.Category>
          <Navigation.Category
            label="Thống kê"
            role={["center"]}
            type={props.type}
          >
            <Navigation.Item
              label="Xe đã được đăng kiểm"
              link="inspected-car"
            />
            <Navigation.Item label="Xe sắp hết hạn" link="expired-car" />
          </Navigation.Category>
        </Navigation>
      </div>
    </React.Fragment>
  );
}
