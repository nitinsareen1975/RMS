import React, { Component } from "react";
import { Typography, Row, Col, Form, Input, Button, Popover, Spin } from "antd";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActions from "../../redux/actions/user-actions";
import * as paginationActions from "../../redux/actions/pagination-actions";
import IntlMessages from "../../services/intlMesseges";
import { notifyUser } from "../../services/notification-service";
import * as UserService from '../../services/user-service';
import { ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const validColor = '#52c41a', invalidColor = '#cb0019';
const validIcon = CheckCircleOutlined, invalidIcon = ExclamationCircleOutlined;
class ChangePassword extends Component {
  form = React.createRef();
  state = {
    forceChangePasswordText: '',
    loading: false,
    formLayout: "vertical",
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

  componentDidMount = async () => {

  }

  compareToNewPassword = (_rule, value, callback) => {
    let _password = this.state.password;
    if (value && value !== this.form.current.getFieldValue('password')) {
      callback(<IntlMessages id="admin.password.notmatch" />);
      _password.isValid = false;
    } else {
      if (_password.specialCharacter.hasSpecialChar === true && _password.lowercase.hasLowercase === true && _password.uppercase.hasUppercase === true && _password.numeric.hasNumer === true && value.length >= _password.characters.minLength) {
        _password.isValid = true;
      }
      callback();
    }
    this.setState({ password: _password });
  };

  onPasswordChange = (e) => {
    let _password = this.state.password;
    let regSpecialChars = /^[A-Za-z0-9 ]+$/,
      regNumbers = /\d/,
      regUppercase = /[A-Z]/,
      regLowercase = /[a-z]/,
      value = e.target.value;

    if (value !== '' && regSpecialChars.test(value) === false) {
      _password.specialCharacter.hasSpecialChar = true;
      _password.specialCharacter.iconColor = validColor;
      _password.specialCharacter.iconType = validIcon;
    } else {
      _password.specialCharacter.hasSpecialChar = false;
      _password.specialCharacter.iconColor = invalidColor;
      _password.specialCharacter.iconType = invalidIcon;
    }

    if (regNumbers.test(value) === true) {
      _password.numeric.hasNumer = true;
      _password.numeric.iconColor = validColor;
      _password.numeric.iconType = validIcon;
    } else {
      _password.numeric.hasNumer = false;
      _password.numeric.iconColor = invalidColor;
      _password.numeric.iconType = invalidIcon;
    }

    if (regUppercase.test(value) === true) {
      _password.uppercase.hasUppercase = true;
      _password.uppercase.iconColor = validColor;
      _password.uppercase.iconType = validIcon;
    } else {
      _password.uppercase.hasUppercase = false;
      _password.uppercase.iconColor = invalidColor;
      _password.uppercase.iconType = invalidIcon;
    }

    if (regLowercase.test(value) === true) {
      _password.lowercase.hasLowercase = true;
      _password.lowercase.iconColor = validColor;
      _password.lowercase.iconType = validIcon;
    } else {
      _password.lowercase.hasLowercase = false;
      _password.lowercase.iconColor = invalidColor;
      _password.lowercase.iconType = invalidIcon;
    }

    if (value.length >= _password.characters.minLength) {
      _password.characters.iconColor = validColor;
      _password.characters.iconType = validIcon;
    } else {
      _password.characters.iconColor = invalidColor;
      _password.characters.iconType = invalidIcon;
    }

    if (_password.specialCharacter.hasSpecialChar === false || _password.lowercase.hasLowercase === false || _password.uppercase.hasUppercase === false || _password.numeric.hasNumer === false || value.length < _password.characters.minLength) {
      _password.isValid = false;
    } else {
      _password.isValid = true;
    }

    this.form.current.setFieldsValue({ 'password': value });
    this.setState({ password: _password });
  }

  togglePasswordHint = (status) => {
    let _password = this.state.password;
    _password.visibleHint = status;
    this.setState({ password: _password });
  }

  handleSubmit = (values) => {
    let _this = this;
    if (_this.state.password.isValid === false) {
      notifyUser("Please correct all the errors and try again!", "error");
      _this.passwordInput.focus();
    } else {
      _this.setState({ loading: true });
      _this.props
        .updatePassword(values)
        .then(response => {
          if(response.status && response.status === true){
            notifyUser(response.message, "success");
            _this.props.history.push("../account");
          } else {
            if (response.message) {
              notifyUser(response.message, "error");
            } else {
              notifyUser("Unknown error. Please try again!", "error");
            }
            _this.setState({ loading: false });
          }
        })
        .catch(_err => {
          _this.setState({ loading: false });
        });
    }
  };

  render() {
    const { password } = this.state;
    const UppercaseIcon = password.uppercase.iconType;
    const LowercaseIcon = password.lowercase.iconType;
    const SpecialCharIcon = password.specialCharacter.iconType;
    const NumericIcon = password.numeric.iconType;
    const CharactersIcon = password.characters.iconType;
    return (
      <div>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Typography.Title level={4}>
              <IntlMessages id="admin.profile.changepassword" />
            </Typography.Title>
          </Col>
        </Row>
        <hr />
        <Spin spinning={this.state.loading}>
          {this.state.forceChangePasswordText != '' ?
            <h5 className="text-danger" style={{ border: 'none', fontWeight: '400' }}>{this.state.forceChangePasswordText}</h5>
            : ''}
          <Form ref={this.form} onFinish={this.handleSubmit} layout="vertical">
            <Row gutter={24}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Form.Item
                  label={<IntlMessages id="admin.profile.oldpassword" />}
                  name="oldPassword"
                  rules={[
                    {
                      required: true,
                      message: <IntlMessages id="admin.input.required" />
                    }
                  ]}
                ><Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Form.Item
                  label={<IntlMessages id="admin.profile.newpassword" />}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: <IntlMessages id="admin.input.required" />
                    }
                  ]}
                >
                  <Popover
                    placement="rightTop"
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
                    <Input.Password
                      onChange={this.onPasswordChange}
                      onFocus={() => this.togglePasswordHint(true)}
                      onBlur={() => this.togglePasswordHint(false)}
                      ref={(input) => { this.passwordInput = input; }}
                    />
                  </Popover>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Form.Item
                  label={<IntlMessages id="admin.profile.confrimpassword" />}
                  name="cpassword"
                  rules={[
                    {
                      required: true,
                      message: <IntlMessages id="admin.input.required" />
                    },
                    {
                      validator: this.compareToNewPassword,
                    }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Button type="primary" htmlType="submit">Update Password</Button>
              </Col>
            </Row>
          </Form>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.user };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...UserActions, ...paginationActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    ChangePassword
  )
);
