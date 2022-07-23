import { Types } from "../constants/user-types";
const initialState = {
  userData: {},
  isLoggedIn: false,
  token: "",
  loginErrorMessage: "",
  redirect: "",
  userListing: [],
  userListingError: {},
  alreadyVerfified:false,
  expirayDate:"",
  refreshToken:"",
  logo_url:"",
  notificationCount: 0,
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.SAVE_USER:
      return {
        ...state,
        userData: action.payload.user,
        token: action.payload.token.token,
        redirect:action.payload.user.redirect
      };
    case Types.VALIDATE_USER:
      return {
          ...state,
          userData: action.payload.user
        };
    case Types.LOGIN_SUCCESS:
      return { ...state, isLoggedIn: action.payload };
    case Types.LOGIN_FAIL:
      return {
        ...state,
        loginErrorMessage: action.payload.errorMessage,
        isLoggedIn: action.payload.isLoggedIn
      };
    case Types.LOG_OUT:
      return {
        ...state,
        userData: initialState.userData,
        token: initialState.token,
        isLoggedIn: false
      };
    case Types.USER_LISTING:
      return { ...state, userListing: action.payload };
    case Types.USER_LISTING_ERROR:
      return { ...state, userListingError: action.payload };
    case Types.SAVE_ALREADY_VERIFIED:
      return { ...state, alreadyVerfified: action.payload };
    case Types.TOKEN_EXPIRY_DATE:
      return { ...state, expirayDate: action.payload.token_expiry, 
        token: action.payload.token,refreshToken:action.payload.refreshToken};
    case Types.FLUSH_TOKEN_DATA:
      return { ...state, expirayDate: initialState.expirayDate};
    case Types.UPDATE_MY_ACCOUNT:
      let _userData = state.userData;
      _userData.firstName = action.payload.firstName;
      _userData.lastName = action.payload.lastName;
      _userData.email = action.payload.email;
      _userData.contactNo = action.payload.contactNo;
      return {
        ...state,
        userData: _userData
      };
    case Types.SAVE_LOGO_URL:
      return { ...state, logo_url: action.payload};
    case Types.UPDATE_NOTIFICATION_COUNT:
      return {...state, notificationCount:action.payload} 
    case Types.INC_NOTIFICATION_COUNT:
      return {...state, notificationCount:state.notificationCount+action.payload}      
    default:
      return state;
  }
}
