import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as adminActions from "../../redux/actions/admin-actions";
import * as userActions from "../../redux/actions/user-actions";
import * as RolesActions from "../../redux/actions/roles-actions";
import { notifyUser } from "../../services/notification-service";
import { Typography, Form, Input, Select, Button, Row, Col, Spin, Switch, Radio } from "antd";
import IntlMessages from "../../services/intlMesseges";
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import * as Permission from "../../services/permissions";
const { Option } = Select;

class MyAccount extends React.Component {
  state = {
    loading: true,
    user: [],
    countries: [],
    allRoles: [],
    labs: [],
    dataLoaded: false
  };

  async componentDidMount() {
    var _countries = [];
    if (typeof this.props.countries === "undefined" || this.props.countries.length <= 0) {
      _countries = await this.props.getCountries();
    } else {
      _countries = this.props.countries;
    }
    var args = {
      filters: {},
      pagination: {},
      sorter: { column: "name", order: "asc" }
    }
    var user = JSON.parse(localStorage.getItem("user"));
    var roles = await this.props.getAllRoles(args);
    var user = await this.props.getUser(user.id);
    var labs = await this.props.getLabs(args);
    this.setState({
      loading: false,
      countries: _countries,
      allRoles: roles,
      user: user.status == true ? user.data : [],
      labs: labs.data,
      dataLoaded: true
    });
  }

  handleSubmit = (data) => {
    this.setState({ loading: true });
    delete data.email;
    this.props.updateProfile(data).then(response => {
      if (response.status && response.status == true) {
        var user = JSON.parse(localStorage.getItem("user"));
        user.firstname = data.firstname;
        user.lastname = data.lastname;
        user.phone = data.phone;
        user.street = data.street;
        user.city = data.city;
        user.state = data.state;
        user.country = data.country;
        user.zip = data.zip;
        localStorage.setItem("user", JSON.stringify(user));
        this.props.history.push("./account");
        notifyUser(response.message, "success");
        this.setState({ loading: false });
      } else {
        if (response.message) {
          notifyUser(response.message, "error");
        } else {
          notifyUser("Unknown error. Please try again!", "error");
        }
        this.setState({ loading: false });
      }
    })
      .catch(err => {
        var res = JSON.parse(err.response.data);
        if (res.message) {
          notifyUser(res.message, "error");
        } else {
          notifyUser("Unknown error. Please try again!", "error");
        }
        this.setState({ loading: false });
      });
  };

  render() {
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === "horizontal"
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
        : null;
    const countriesSelector = <Select
      showSearch
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {this.state.countries.map(function (item) {
        return (
          <Option key={item.id.toString()} value={item.id.toString()}>
            {item.name}
          </Option>
        );
      })}
    </Select>;
    return (
      <div>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Typography.Title level={4}>
              Edit Profile
            </Typography.Title>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            style={{ textAlign: "right" }}
          >
            <Button
              type="primary"
              className=""
              htmlType="button"
              onClick={() => this.props.history.goBack()}
            >
              <ArrowLeftOutlined />
              <IntlMessages id="admin.userlisting.back" />
            </Button>
          </Col>
        </Row>
        <hr />
        <div>
          <Spin spinning={this.state.loading}>
            {this.state.user.id ?
              <Form layout="vertical" onFinish={this.handleSubmit} initialValues={this.state.user}>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="firstname"
                      label={<IntlMessages id="admin.userlisting.firstName" />}

                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message: <IntlMessages id="admin.input.required" />
                        },
                        {
                          pattern: new RegExp(/^(\S.*)[a-zA-Z-.']+$/),
                          message: <IntlMessages id="admin.name.valid"></IntlMessages>
                        }
                      ]}
                    >
                      <Input maxLength={20} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label={<IntlMessages id="admin.userlisting.lastName" />}
                      name="lastname"
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message: <IntlMessages id="admin.input.required" />
                        },
                        {
                          pattern: new RegExp(/^(\S.*)[a-zA-Z-.']+$/),
                          message: <IntlMessages id="admin.lname.valid"></IntlMessages>
                        }
                      ]}
                    >
                      <Input maxLength={20} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label={<IntlMessages id="admin.userlisting.email" />}
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: <IntlMessages id="admin.email.valid" />

                        },
                        {
                          whitespace: true,
                          required: true,
                          message: <IntlMessages id="admin.input.required" />
                        }
                      ]}
                    >
                      <Input maxLength={80} disabled />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label={<IntlMessages id="admin.userlisting.phonenumber" />}
                      name="phone"
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message: <IntlMessages id="admin.input.required" />
                        }
                      ]}
                    >
                      <Input maxLength={15} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label={<IntlMessages id="admin.userlisting.address" />}
                      name="street"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="City"
                      name="city"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="State"
                      name="state"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Country"
                      name="country"
                    >
                      {countriesSelector}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Zip Code"
                      name="zip"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  {Permission.canAccess("admin") ?
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item
                        {...formItemLayout}
                        label={<IntlMessages id="admin.userlisting.role" />}
                        name="roles"
                      >
                        <Select>
                          {this.state.allRoles.map(function (item) {
                            return <Option key={item.id}>{item.name}</Option>;
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    : ""}
                </Row>
                {/* <Row gutter={24}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item
                        {...formItemLayout}
                        label="Lab Assigned"
                        name="lab_assigned"
                      >
                        <Select>
                          {this.state.labs.map(function (item) {
                            return <Option key={item.id} value={item.id}>{item.name} ({item.state}, {item.zip})</Option>;
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="can_read_reports" label="Can Read Test Report?">
                        <Radio.Group defaultChecked={this.state.user.can_read_reports}>
                          <Radio value={1}>Yes</Radio>
                          <Radio value={0}>No</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="status" label="Status">
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={this.state.user.status == 1} />
                      </Form.Item>
                    </Col>
                  </Row> */}
                <Row>
                  <Col>
                    <Form.Item>
                      <Button
                        type="primary"
                        style={{ display: "inline-block", marginRight: "10px" }}
                        className="def-blue"
                        htmlType="submit"
                        size="large"
                      >
                        Save
                        <SaveOutlined />
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              : ""}
          </Spin>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.userConfig, ...state.countries, ...state.adminConfig };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...userActions, ...RolesActions, ...adminActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    MyAccount
  )
);
