import { Button, Col, Row, Form, Spin } from "antd";
import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import LoginImage from "../../assets/images/register.gif";
import { notifyUser } from "../../services/notification-service";
import API from "../../redux/api/user-api";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      email: "",
      message: "",
      submitted: false,
      submitButtonText: "Send"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ message: "" });
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(values) {
    let regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({ submitted: true, submitButtonText: "Please wait..." });
    if (this.state.email) {
      if (regEx.test(this.state.email) !== true) {
        notifyUser("Please provide a valid email address.", "error");
        this.setState({
          email: "",
          submitted: false,
          submitButtonText: "Send"
        });
      } else {
        try {
          let response = await API.forgotPassword({
            email: this.state.email
          });
          this.setState(response);
          if (response.status && response.status == true) {
            notifyUser(response.message, "success");
            this.setState({
              email: "",
              submitted: false,
              submitButtonText: "Send"
            });
          } else {
            notifyUser("Unknown error! Please try again.", "error");
          }
        } catch (e) {
          /* if(e.response.data.error && e.response.data.error != ''){
            notifyUser(e.response.data.error, 'error');
          } */
          if (e && e.response && e.response.data.errors && e.response.data.errors.length > 0) {
            notifyUser(e.response.data.errors[0].externalMessage, "success");

          } else {
            notifyUser("Unknown error! Please try again.", "error");

          }

          this.setState({
            email: "",
            submitted: false,
            submitButtonText: "Send"
          });
        }
      }
    } else {
      notifyUser("Please enter the details.", "error");
      this.setState({ submitted: false, submitButtonText: "Send" });
    }
  }

  /* section skin */
  render() {
    return (
      <Spin spinning={this.state.submitted}>
        <Form onFinish={this.handleSubmit}>
          <section id="forgot-password" className="main-login">
            <Row className="login">
              {/*Login section left side */}
              {/* logo */}
              <Col xs={24} lg={12}>
                {/* logo */}
                <div className="form-column">
                  <div className="form-column-inner">
                    <div className="logo">
                      <img src={logo} alt="Logo" />
                    </div>
                    {/* logo ends */}
                    {/* title */}
                    <h2>Forgot Password</h2>
                    <hr className="title-hr" />
                    {/* title ends */}
                    {/* logi form */}
                    <div className="login-form">
                      <Row>
                        <Col xs={24}>
                          <div className="form-group">
                            <i className="far fa-envelope"></i>
                            <input
                              type="email"
                              name="email"
                              placeholder="Enter Email Address..."
                              value={this.state.success ? "" : this.state.email}
                              onChange={this.handleChange}
                            />
                          </div>
                        </Col>
                      </Row>
                      {/* Email ends*/}
                      {/* submit button */}
                      <Row>
                        <Col xs={24}>
                          <div className="form-group">
                            <Button type="primary" htmlType="submit" size={'large'}>submit</Button>
                          </div>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "10px" }}>
                        <Col xs={24} style={{ textAlign: "center" }}>
                          <div className="form-group">
                            <a onClick={() => this.props.history.push("/login")}><span>Back to Login</span></a>
                          </div>
                        </Col>
                      </Row>
                      {/* submit button ends */}
                    </div>
                    {/* login form ends */}
                  </div>
                </div>
                {/*login section left side ends */}
              </Col>
              {/* Image area  */}
              <Col xs={24} lg={12} className="login-img-col">
                <div className="login-image-area">
                  <img src={LoginImage} alt="login" />
                </div>
                {/* image are ends  */}
              </Col>
              {/* image are ends  */}
            </Row>
          </section>
        </Form>
      </Spin>
    );
  }
}
export default ForgotPassword;
