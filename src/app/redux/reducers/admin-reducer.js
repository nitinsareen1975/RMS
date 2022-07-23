import { Types } from "../constants/admin-types";
const initialState = {
  countries: [],
  payment_methods: [],
  patient_status_list: []
};
export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case Types.COUNTRIES_LIST:
      return {
        ...state,
        countries: action.payload
      };
    case Types.LOAD_EMERGENCY_CONTACTS:
      return {
        ...state,
        emergencyContacts: action.payload
      };
    case Types.GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      };
    case Types.PATIENT_STATUS_LIST:
      return {
        ...state,
        patient_status_list: action.payload
      };
    case Types.PAYMENT_METHODS:
      return {
        ...state,
        payment_methods: action.payload
      };
    default:
      return state;
  }
}
