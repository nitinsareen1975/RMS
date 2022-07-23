import { Types } from "../constants/admin-types";
import API from "../api/admin-api";
import config from "../../config";

export function getCountriesList() {
  return async function(dispatch, _getState) {
    try {
      let countries = await API.getCountriesList();
      dispatch({ type: Types.COUNTRIES_LIST, payload: countries.data });
    } catch (e) {}
  };
}

export function getCountries() {
  return async function(dispatch, _getState) {
    try {
      let countries = await API.getCountriesList();
      return countries.data;
    } catch (e) {}
  };
}

export function getPaymentMethods() {
  return async function(dispatch, _getState) {
    try {
      let res = await API.getPaymentMethods();
      dispatch({ type: Types.PAYMENT_METHODS, payload: res.data });
    } catch (e) {}
  };
}

export function getPatientStatusList() {
  return async function(dispatch, _getState) {
    try {
      let res = await API.getPatientStatusList();
      dispatch({ type: Types.PATIENT_STATUS_LIST, payload: res.data });
    } catch (e) {}
  };
}

export function getCurrencyCodes() {
  return async function(dispatch, _getState) {
    try {
      let res = await API.getCurrencyCodes();
      return res.data;
    } catch (e) {}
  };
}
