import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import LoginImage from "../../assets/images/register.gif";
import { notifyUser } from "../../services/notification-service";
import { Popover, Row, Button, Col, Form } from "antd";
import IntlMessages from "../../services/intlMesseges";
import { ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import API from "../../redux/api/user-api";

const validColor = '#52c41a', invalidColor = '#cb0019';
const validIcon = CheckCircleOutlined, invalidIcon = ExclamationCircleOutlined;
class ResetPassword extends Component {
  form = React.createRef();
  state = {
    username: "",
    token: "",
    npassword: "",
    rpassword: "",
    success: false,
    submitted: false,
    validated: false,
    submitButtonText: "Submit",
    password: {
      isValid: false,
      visibleHint: false,
      uppercase: {
        hasUppercase: false,
        iconColor: invalidColor,
        iconType: invalidIcon
      },
      lowercase: {
        hasLowercase: false,
        iconColor: invalidColor,
        iconType: invalidIcon
      },
      numeric: {
        hasNumer: false,
        iconColor: invalidColor,
        iconType: invalidIcon
      },
      specialCharacter: {
        hasSpecialChar: false,
        iconColor: invalidColor,
        iconType: invalidIcon
      },
      characters: {
        minLength: 8,
        iconColor: invalidColor,
        iconType: invalidIcon
      }
    }
  };

  async componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    this.setState({
      username: queryParams.get("email") ? encodeURIComponent(queryParams.get("email")) : "",
      token: queryParams.get("token") ? encodeURIComponent(queryParams.get("token")) : ""
    });
  }

  matchPasswords() {
    const { npassword, rpassword } = this.state;
    let _password = this.state.password;
    if (npassword === "" && rpassword === "") {
      this.setState({ validated: false });
    } else {
      if (npassword !== rpassword) {
        this.setState({ validated: false });
      } else {
        if (_password.specialCharacter.hasSpecialChar === true && _password.lowercase.hasLowercase === true && _password.uppercase.hasUppercase === true && _password.numeric.hasNumer === true && npassword.length >= _password.characters.minLength) {
          _password.isValid = true;
          this.setState({ validated: true });
        }
      }
      this.setState({ password: _password });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, function () {
      this.matchPasswords();
    });
  }

  onPasswordChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, function () {
      this.matchPasswords();
    });

    let _password = this.state.password;
    let regSpecialChars = /^[A-Za-z0-9 ]+$/,
      regNumbers = /\d/,
      regUppercase = /[A-Z]/,
      regLowercase = /[a-z]/,
      _value = e.target.value;

    if (_value !== '' && regSpecialChars.test(_value) === false) {
      _password.specialCharacter.hasSpecialChar = true;
      _password.specialCharacter.iconColor = validColor;
      _password.specialCharacter.iconType = validIcon;
    } else {
      _password.specialCharacter.hasSpecialChar = false;
      _password.specialCharacter.iconColor = invalidColor;
      _password.specialCharacter.iconType = invalidIcon;
    }

    if (regNumbers.test(_value) === true) {
      _password.numeric.hasNumer = true;
      _password.numeric.iconColor = validColor;
      _password.numeric.iconType = validIcon;
    } else {
      _password.numeric.hasNumer = false;
      _password.numeric.iconColor = invalidColor;
      _password.numeric.iconType = invalidIcon;
    }

    if (regUppercase.test(_value) === true) {
      _password.uppercase.hasUppercase = true;
      _password.uppercase.iconColor = validColor;
      _password.uppercase.iconType = validIcon;
    } else {
      _password.uppercase.hasUppercase = false;
      _password.uppercase.iconColor = invalidColor;
      _password.uppercase.iconType = invalidIcon;
    }

    if (regLowercase.test(_value) === true) {
      _password.lowercase.hasLowercase = true;
      _password.lowercase.iconColor = validColor;
      _password.lowercase.iconType = validIcon;
    } else {
      _password.lowercase.hasLowercase = false;
      _password.lowercase.iconColor = invalidColor;
      _password.lowercase.iconType = invalidIcon;
    }

    if (_value.length >= _password.characters.minLength) {
      _password.characters.iconColor = validColor;
      _password.characters.iconType = validIcon;
    } else {
      _password.characters.iconColor = invalidColor;
      _password.characters.iconType = invalidIcon;
    }

    if (_password.specialCharacter.hasSpecialChar === false || _password.lowercase.hasLowercase === false || _password.uppercase.hasUppercase === false || _password.numeric.hasNumer === false || _value.length < _password.characters.minLength) {
      _password.isValid = false;
    } else {
      _password.isValid = true;
    }

    this.form.current.setFieldsValue({ 'password': _value });
    this.setState({ password: _password });
  }

  togglePasswordHint = (status) => {
    let _password = this.state.password;
    _password.visibleHint = status;
    this.setState({ password: _password });
  }

  handleSubmit = async (values) => {
    const { npassword, rpassword } = this.state;
    this.setState({ submitted: true, submitButtonText: "Please wait..." });
    if (this.state.password.isValid === false) {
      notifyUser("Please correct all the errors and try again!", "error");
      this.setState({ submitButtonText: "Submit" });
      this.passwordInput.focus();
    } else if (npassword !== rpassword) {
      this.setState({
        validated: false,
        submitted: false,
        submitButtonText: "Submit"
      });
      notifyUser("Passwords did not match!", "error");
    } else if (this.state.validated) {
      try {
        let data = {
          email: this.state.username,
          password: this.state.npassword,
          token: this.state.token
        };
        let response = await API.resetPassword(data);
        if (response.status && response.status == true) {
          this.setState(response);
          this.setState({
            npassword: "",
            rpassword: ""
          });
          this.props.history.push("./login");
          notifyUser(
            "Your password has been reset successfully. Please login to your account with new credentials.",
            "success"
          );
        } else {
          let errorStr = response.message ? response.message : "Unknown error";
          notifyUser(errorStr, "error");
          this.setState({
            submitted: false,
            validated: false,
            submitButtonText: "Submit"
          });
        }
      } catch (e) {
        if (e.response && e.response.data && e.response.data.error && e.response.data.error !== "") {
          notifyUser(e.response.data.error, "error");
        } else if (
          e.response.data && e.response.data.errors &&
          e.response.data.errors.length > 0
        ) {
          notifyUser(e.response.data.errors[0], "error");
        } else {
          notifyUser(
            "Token expired. Please use Forgot Password link again to generate a new password reset request.",
            "error"
          );
        }
        this.setState({
          submitted: false,
          validated: false,
          submitButtonText: "Submit"
        });
      }
    } else {
      notifyUser("Please enter the valid details!", "error");
      this.setState({
        submitted: false,
        validated: false,
        submitButtonText: "Submit"
      });
    }
  }
  /* section skin */
  render() {
    const { password } = this.state;
    const UppercaseIcon = password.uppercase.iconType;
    const LowercaseIcon = password.lowercase.iconType;
    const SpecialCharIcon = password.specialCharacter.iconType;
    const NumericIcon = password.numeric.iconType;
    const CharactersIcon = password.characters.iconType;
    return (
      <Form ref={this.form} onFinish={this.handleSubmit}>
        <section id="reset-password" className="main-login">
          <Row className="login">
            <Col xs={24} lg={12}>
              <div className="form-column">
                <div className="form-column-inner">
                  <div className="logo">
                    <img src={logo} alt="Logo" />
                  </div>
                  <h2>Reset Password</h2>
                  <div className="login-form">
                    <Row>
                      <Col xs={24}>
                        <div className="form-group">
                          <i className="fas fa-lock"></i>
                          {/* <input
                          type="password"
                          name="npassword"
                          placeholder="Enter New Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        /> */}
                          <Popover
                            placement="bottomRight"
                            content={
                              <div>
                                <p style={{ color: password.uppercase.iconColor }}>
                                  <UppercaseIcon style={{ color: password.uppercase.iconColor }} />&nbsp;
                                  <span style={{ verticalAlign: "bottom" }}><IntlMessages id="admin.password.hint.uppercase" /></span>
                                </p>
                                <p style={{ color: password.lowercase.iconColor }}>
                                  <LowercaseIcon style={{ color: password.lowercase.iconColor }} />&nbsp;
                                  <span style={{ verticalAlign: "bottom" }}><IntlMessages id="admin.password.hint.lowercase" /></span>
                                </p>
                                <p style={{ color: password.specialCharacter.iconColor }}>
                                  <SpecialCharIcon style={{ color: password.specialCharacter.iconColor }} />&nbsp;
                                  <span style={{ verticalAlign: "bottom" }}><IntlMessages id="admin.password.hint.specialCharacter" /></span>
                                </p>
                                <p style={{ color: password.numeric.iconColor }}>
                                  <NumericIcon style={{ color: password.numeric.iconColor }} />&nbsp;
                                  <span style={{ verticalAlign: "bottom" }}><IntlMessages id="admin.password.hint.numeric" /></span>
                                </p>
                                <p style={{ color: password.characters.iconColor }}>
                                  <CharactersIcon style={{ color: password.characters.iconColor }} />&nbsp;
                                  <span style={{ verticalAlign: "bottom" }}><IntlMessages id="admin.password.hint.characters" /></span>
                                </p>
                              </div>
                            }
                            title={<IntlMessages id="admin.password.mustinclude" />}
                            visible={password.visibleHint}
                            style={{ width: '500px' }}
                          >
                            <input
                              type="password"
                              name="npassword"
                              placeholder="Enter New Password"
                              onChange={this.onPasswordChange}
                              onFocus={() => this.togglePasswordHint(true)}
                              onBlur={() => this.togglePasswordHint(false)}
                              ref={(input) => { this.passwordInput = input; }}
                            />
                          </Popover>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24}>
                        <div className="form-group">
                          <i className="fas fa-lock"></i>
                          <input
                            type="password"
                            name="rpassword"
                            placeholder="Re-enter New Password"
                            value={this.state.rpassword}
                            onChange={this.handleChange}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={24}>
                        <div className="form-group">
                          <Button type="primary" htmlType="submit" size={'large'}>{this.state.submitButtonText}</Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12} className="login-img-col">
              <div className="login-image-area">
                <img src={LoginImage} alt="reset password" />
              </div>
            </Col>
          </Row>
        </section>
      </Form>
    );
  }
}
export default ResetPassword;
