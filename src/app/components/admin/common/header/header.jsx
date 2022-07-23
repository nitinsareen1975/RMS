import React from "react";
import { Row, Button, Badge, Dropdown, Menu } from "antd";
import { BellOutlined, UserOutlined, SettingOutlined, UnlockOutlined, PoweroffOutlined } from '@ant-design/icons';
// import LanguageSwitcher from "../../../../services/languageProvider/switcher";
import * as UserService from "../../../../services/user-service";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
const AdminHeader = ({ ...props }) => {
  var user = JSON.parse(localStorage.getItem("user"));
  const menu = (
    <Menu>
      <Menu.Item key="admin-account" icon={<SettingOutlined />}>
        <a onClick={() => props.history.push("/admin/account")}>
          My Account
        </a>
      </Menu.Item>
      <Menu.Item key="admin-account-changepassword" icon={<UnlockOutlined />}>
        <a onClick={() => props.history.push("/admin/account/change-password")}>
          Change Password
        </a>
      </Menu.Item>
      <Menu.Item key="logout" icon={<PoweroffOutlined />}>
        <a onClick={() => UserService.logOut()}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );
  return <Row justify="space-between">
    <Button className="menu-toggle" onClick={props.onCollapse}>
      {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
    </Button>
    {/* <LanguageSwitcher /> */}
    <div className="right-nav">
      {/* <div className="notifation">
        <Badge count={5}>
          <BellOutlined />
        </Badge>
      </div> */}
      <Dropdown.Button overlay={menu} trigger={['click']} placement="bottomCenter" icon={<UserOutlined />}>Hi{user.firstname ? " " + user.firstname : ""}</Dropdown.Button>
    </div>
  </Row>
}
export default AdminHeader;