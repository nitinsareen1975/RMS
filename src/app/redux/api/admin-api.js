import Axios from "../../services/axios-service";

const getCountriesList = async () => {
  return await Axios.get("/api/get-countries", undefined, undefined);
};
const getCountriesListByRegion = async () => {
  return await Axios.get(
    "/api/get-region-countries",
    undefined,
    undefined
  );
};
const getPatientStatusList = async () => {
  return await Axios.get("/global/patient-status-list", undefined, undefined);
};
const getPaymentMethods = async () => {
  return await Axios.get("/global/payment-methods", undefined, undefined);
};
const getCurrencyCodes = async () => {
  return await Axios.get("/global/currency-codes", undefined, undefined);
};

export default {
  getCountriesList,
  getCountriesListByRegion,
  getPatientStatusList,
  getPaymentMethods,
  getCurrencyCodes
};
