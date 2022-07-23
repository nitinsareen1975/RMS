import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from "../../../app/redux/actions/user-actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.LogOutUser();
    this.props.history.push("/login");
  }

  render() {
    return (
      <div id="header" className="app-header">
        <div className="app-header-inner">
          {!this.props.isLoggedIn ? (<button className="login-button" onClick={this.logout}>LOG OUT</button>) : ("")}
        </div>
      </div>

    );
  }
}

Header.propTypes = {
  LogOutUser: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  location: PropTypes.object
};

function mapStateToProps(state) {
  return {
    ...state.userConfig,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...userActions }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
