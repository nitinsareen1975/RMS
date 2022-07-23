import React, { Component } from "react";
import { withRouter } from "react-router-dom";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SideBar from "../sidebar/sidebar.jsx";
import AdminHeader from "./common/header/header.jsx";
import AdminRouter from "../../routes/admin-router";
import * as adminActions from "../../redux/actions/admin-actions";
import * as userActions from "../../redux/actions/user-actions";
import { Layout, Modal, Form } from "antd";
import options from "../sidebar/options.js";

const { Header, Sider, Content } = Layout;
class AdminDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  async componentDidMount() {
    if(typeof this.props.adminConfig.countries === "undefined" || this.props.adminConfig.countries.length <= 0){
      await this.props.getCountriesList();
    }
    if(typeof this.props.adminConfig.patient_status_list === "undefined" || this.props.adminConfig.patient_status_list.length <= 0){
      await this.props.getPatientStatusList();
    }
    if(typeof this.props.adminConfig.payment_methods === "undefined" || this.props.adminConfig.payment_methods.length <= 0){
      await this.props.getPaymentMethods();
    }
    if(typeof this.props.userData === "undefined" || Object.keys(this.props.userData).length <= 0){
      await this.props.getUserData();
    }
  }
  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }
  render() {
    const { url } = this.props.match;
    return (
      <div id="components-layout-demo-custom-trigger">
        <Layout>
          <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              className="dashboard-sidebar"
              theme="dark"
              style={{
                height: "100vh",
                position: "sticky",
                top: 0,
                left: 0
              }}
              width={280}
            >
              <SideBar collapsed={this.state.collapsed} options={options.adminOptions} userType="admin" />
            </Sider>
          <Layout>
         
          <Header
            className="header"
            style={{
              background: "#fff",
              position: "sticky",
              zIndex: 100,
              top: 0,
              left: 0,
            }}
            match={this.props.match}
            selectedtheme={this.props.theme}
            location={this.props.location}
            history={this.props.history}
          //userData={this.props.userData}
          
          >
            <AdminHeader collapsed={this.state.collapsed} onCollapse={this.onCollapse} {...this.props}/>
          </Header>
            
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                /* background: "#fff", */
                maxWidth: "100%",
                position: "relative",
                minHeight: 280
              }}
            >
              <AdminRouter url={url} />
            </Content>
          </Layout>
        </Layout>
        {/*<AuthTokenTimer/>*/}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    adminConfig: state.adminConfig,
    ...state.userConfig
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...userActions, ...adminActions },
    dispatch
  );
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    AdminDash
  )
);