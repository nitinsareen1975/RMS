import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import config from "./config";
import * as languageAction from "../../../redux/actions/language-actions";
import { Menu , Dropdown} from "antd";
import { CheckOutlined} from '@ant-design/icons';

class LanguageSwitcher extends Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(evt) {
    this.props.changeLanguage(evt.currentTarget.value);
  }
  render() {
    let language =  (
      <div className="SwitchBlock language">
        {/*<h4>
          <IntlMessages id="languageSwitcher.label" />
        </h4>*/}
        <Menu style={{ width: 200 }}>
          {config.options.map(option => {
            const { languageId, text } = option;
            let disabled = this.props.language.languageId === languageId ? true :false ;
            return (
              <Menu.Item
                key={languageId}
                onClick={() => {
                  this.props.changeLanguage(languageId);
                }}
                disabled={disabled}
              >
                {disabled? <CheckOutlined /> : ""} {text} 
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    );

    return (
    <Dropdown overlay={language} trigger={["click"]}>
    <a className="ant-dropdown-link bell-icon" href="#">
      <i className="fas fa-globe-americas"></i>
    </a>
  </Dropdown>   
    )

  }
}

LanguageSwitcher.propTypes = {
  changeLanguage: PropTypes.func,
  language: PropTypes.object
};
function mapStateToProps(state) {
  return {
    ...state.language
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...languageAction }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(LanguageSwitcher);
