import React, { Component } from "react";
import { Result, Button } from "antd";
import * as UserService from "../../services/user-service";
class NotFound extends Component {
  render() {
    let currentUser = UserService.getUser();
    return (
        <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<><Button type="primary" onClick={() => (currentUser.redirect) ? this.props.history.push(currentUser.redirect) : this.props.history.push("/") }>Back Home</Button><Button type="primary" onClick={() => this.props.history.goBack() }>Back to previous page</Button></>}
      />
    );
  }
}
export default NotFound;