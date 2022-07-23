import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Menu, Button } from "antd";
import Logo from "../../assets/images/logo-full.png";
import LogoIcon from "../../assets/images/logo-icon.png";


const { SubMenu } = Menu;

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { roleName: "" };
  }
  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser.roles) this.setState({ roleName: currentUser.roles });
  }



  getMenuItem = ({ singleOption }) => {
    const { key, label, leftIcon, children } = singleOption;
    if (singleOption.key == "--hr--") {
      return <hr style={{ borderColor: '#2a2562' }} />;
    }
    if (children) {
      return (
        singleOption.roles &&
        singleOption.roles.indexOf(this.state.roleName) !== -1 && (
          <SubMenu
            key={key}
            title={
              <span className="isoMenuHolder">
                {leftIcon}
                <span className="nav-text">
                  {label}
                </span>
              </span>
            }
          >
            {children.map(child => {
              if (child.key == "--hr--") {
                return <hr style={{ borderColor: '#2a2562' }} />;
              }
              return (
                child.roles &&
                child.roles.indexOf(this.state.roleName) !== -1 && (
                  <Menu.Item key={child.key}>
                    <Link to={child.key}>
                      {child.leftIcon}
                      {child.label}
                      {child.alertsCount}
                    </Link>
                  </Menu.Item>
                )
              );
            })}
          </SubMenu>
        )
      );
    }
    return (
      singleOption.roles &&
      singleOption.roles.indexOf(this.state.roleName) !== -1 && (
        <Menu.Item key={key}>
          <Link to={`${key}`}>
            <span className="isoMenuHolder">
              {leftIcon}
              <span className="nav-text">
                {label}
              </span>
            </span>
          </Link>
        </Menu.Item>
      )
    );
  };

  render() {
    var selectedKeys = [this.props.history.location.pathname];
    var selectedKeysArr = selectedKeys[0].split("/");
    selectedKeysArr = selectedKeysArr.filter(function (el) { return el != null && el != ""; });
    selectedKeysArr.pop();
    var openedKeys = [];
    if (selectedKeysArr.length <= 1) {
      openedKeys = [this.props.history.location.pathname];
    } else {
      openedKeys = ["/" + selectedKeysArr.join("/")];
    }
    var childOpenedKey = "";
    var openedKeyExists = false;
    for (var i = 0; i < this.props.options.length; i++) {
      if (this.props.options[i].key == openedKeys[0]) {
        openedKeyExists = true;
        break;
      } else {
        if (this.props.options[i].children && this.props.options[i].children.length > 0) {
          for (var j = 0; j < this.props.options[i].children.length; j++) {
            if (this.props.options[i].children[j].key == openedKeys[0]) {
              childOpenedKey = this.props.options[i].key;
            }
          }
        }
      }
    }
    if (!openedKeyExists) { //submenu with different key than parent
      openedKeys = [childOpenedKey];
    }
    if (openedKeys.length == 0 || openedKeys[0] == "") { //third level e.g. /edit/id
      for (var i = 0; i < this.props.options.length; i++) {
        if (selectedKeysArr.length > 1) {
          var selectedKeysArrJoined = ['/'+selectedKeysArr[0]+'/'+selectedKeysArr[1]];
          if(selectedKeysArrJoined.indexOf(this.props.options[i].key) > -1) {
            openedKeys = [this.props.options[i].key];
            break;
          }
        }
      }
    }
    return (
      <div className="menu">
        <div className="logo">
          <img className="logo-icon" style={{ display: (this.props.collapsed && this.props.collapsed === true) ? "block" : "none" }} src={LogoIcon} />
          <img className="logo-full" style={{ display: (this.props.collapsed && this.props.collapsed === true) ? "none" : "block" }} src={Logo} />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          inlineCollapsed={true}
          defaultOpenKeys={openedKeys}
          selectedKeys={selectedKeys}
        >
          {this.props.options &&
            this.props.options.map(singleOption =>
              this.getMenuItem({ singleOption })
            )}
        </Menu>
      </div>
    );
  }
}

export default withRouter(SideBar);
