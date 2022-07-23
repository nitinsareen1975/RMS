import React, { Component } from "react";
import { Result, Button } from "antd";
import * as UserService from "../../services/user-service";
class ServerError extends Component {
  render() {
    let currentUser = UserService.getUser();
    return (

      <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={<><Button type="primary" onClick={() => (currentUser && currentUser.redirect) ? this.props.history.push(currentUser.redirect) : this.props.history.push("/") }>Back Home</Button><Button type="primary" onClick={() => this.props.history.goBack() }>Back to previous page</Button></>}
  />
    );
  }
}
export default ServerError;