import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import logo from "../../assets/images/logo.png";
import LoginImage from "../../assets/images/register.gif";
import { notifyUser } from "../../services/notification-service";
import * as UserActions from "../../redux/actions/user-actions";
import { Button, Col, Form, Input, Row, Spin, Checkbox } from "antd";

class Login extends Component {
  constructor(props) {
    super(props);
    if (window.performance) {
      if (performance.navigation.type === 1) {
        //this.unsetTempData();
      }
    }
    this.state = {
      email: localStorage.getItem("email_submitted") || "",
      password: localStorage.getItem("password_submitted") || "",
      remember_me: false,
      submitted: false
    };
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    if (this.props.isLoggedIn === true) {
      this.props.history.push(JSON.parse(localStorage.getItem("user")).redirect);
    } else {
      let isRemember = localStorage.getItem("remember_me") || this.state.remember_me;
      if (isRemember == "false") {
        localStorage.clear();
      }
      this.emailInput.focus();
    };
  }

  handleChange = e => {
    this.setState({ loginMessage: "" });
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      this.setState({ [name]: e.target.checked });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = (values) => {
    this.setState({ submitted: true });
    const { email, password, remember_me } = this.state;
    this.setTempData(email, password, remember_me);
    if (email && password) {
      this.signIn(email, password);
    } else {
      notifyUser("Please enter the details.", "error");
      this.setState({ submitted: false });
    }
  };
  signIn = async (email, password) => {
    var self = this;
    await self.props.login(email, password);
    if (self.props.redirect && self.props.redirect !== "") {
      self.unsetTempData();
      self.props.history.push(self.props.redirect, { isLoggedIn: true });
    } else {
      self.setState({ submitted: false });
    }
  };
  setTempData = (email, password, remember_me) => {
    localStorage.setItem("email_submitted", email);
    localStorage.setItem("password_submitted", password);
    localStorage.setItem("remember_me", remember_me);
  };
  unsetTempData = () => {
    localStorage.removeItem("email_submitted");
    localStorage.removeItem("password_submitted");
    localStorage.removeItem("remember_me");
  };
  render() {
    const { email, password, submitted } = this.state;
    return (
      <Spin size="large" spinning={submitted}>
          <section id="login" className="main-login" >
            <Row className="login">
              <Col xs={24} lg={12}>
                <div className="form-column">
                  <div className="form-column-inner">
                    <div className="logo">
                      <img src={logo} alt="Logo" />
                    </div>
                    <h2>Login</h2>
                    <hr className="title-hr" />
                    <Form onFinish={this.handleSubmit}>
                      <div className="login-form">
                        {/* Email */}
                        <div className="row">
                          <div className="form-group">
                            <i className="las la-envelope"></i>
                            <input
                              type="email"
                              placeholder="Email"
                              name="email"
                              value={email}
                              onChange={this.handleChange}
                              ref={input => {
                                this.emailInput = input;
                              }}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group">
                            <i className="las la-lock"></i>
                            <input
                              type="password"
                              placeholder="Password"
                              name="password"
                              value={password}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                          <Col xs={24} sm={12}>
                            <Checkbox name="remember_me" onChange={this.handleChange}>Remember Me</Checkbox>
                          </Col>
                          <Col xs={24} sm={12}>
                            <div className="form-group" style={{ textAlign: "right" }}>
                              <a onClick={() => this.props.history.push("/forgot-password")}>
                                Forgot password
                              </a>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={24}>
                            <Button type="primary" htmlType="submit" size={'large'}>Login</Button>
                          </Col>
                        </Row>
                        <div className="clear">&nbsp;</div>

                        <p>{this.state.loginMessage}</p>
                      </div>
                    </Form>
                  </div>
                </div>
              </Col>
              <Col xs={24} lg={12} className="login-img-col">
                <div className="login-image-area">
                  <img src={LoginImage} alt="login" />
                </div>
              </Col>
            </Row>
          </section>
      </Spin>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  loginErrorMessage: PropTypes.string,
  redirect: PropTypes.string,
  userData: PropTypes.object
};
function mapStateToProps(state) {
  return {
    ...state.userConfig
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...UserActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
  })(Login)
);
