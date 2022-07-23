import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch , withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RouteOptions from "./routes/route";
import PrivateRoute from "./routes/private-routes.jsx";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import AppLocale from "./services/languageProvider";
import * as languageActions from "./redux/actions/language-actions";

class App extends Component {
    componentDidMount(){

    }
  render() {
    let routes = RouteOptions.routes.map(({ path, component, exact }, i) => (
      <Route
        key={Math.random() + "ROUTE_"}
        exact={exact}
        path={path}
        component={component}
      />
    ));
    let privateRoute = RouteOptions.private.map(
      ({ path, component, exact, roles, status }, i) => (
        <PrivateRoute
          key={Math.random() + "REDIRECT_"}
          roles={roles}
          exact={exact}
          path={path}
          component={component}
          status={status}
          currPath={this.props.location.pathname}
        />
      )
    );
    const { language } = this.props;
    const currentAppLocale = AppLocale[language.locale];
    return (
      <ConfigProvider>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <div className="app-container App">
            <Switch>
              {routes}
              {privateRoute}
            </Switch>
          </div>
        </IntlProvider>
      </ConfigProvider>
    );
  }
}
App.propTypes = {
  language: PropTypes.object,
  theme: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
};
function mapStateToProps(state) {
  return {
    ...state.language
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...languageActions }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
  )(App)
);
