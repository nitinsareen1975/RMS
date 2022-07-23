import { combineReducers } from 'redux';
import adminReducer from "./admin-reducer";
import paginationReducer from "./pagination-reducer";
import userReducer from "./user-reducer";
import languageReducer from "./language-reducer";

const reducers = combineReducers({
    adminConfig: adminReducer,
    userConfig: userReducer,
    pagination: paginationReducer,
    language: languageReducer
});

export default reducers;