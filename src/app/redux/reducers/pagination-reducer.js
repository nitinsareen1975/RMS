import { Types } from "../constants/pagination-types";
const initialState = {
  paginginfo : {},
  currentModule : ""
};
  
export default function paginationReducer(state = initialState, action) {
  switch (action.type) {
    case Types.UPDATE_PAGINATION:
      let newState = { ...state };
      if(newState.paginginfo[action.payload.module]){
        newState.paginginfo[action.payload.module].pagination = action.payload.pagination;
        newState.paginginfo[action.payload.module].filter = action.payload.filter;
      } else {
        newState.paginginfo[action.payload.module] = {pagination : action.payload.pagination,filter: action.payload.filter};
      }
      newState.currentModule = action.payload.module;
      return newState;
    case Types.UPDATE_PAGINATION_REMOVE_OLD:
      let newState3 = { ...state };
      let oldStateCurrentModule = newState3.paginginfo[action.payload.module];
      newState3.paginginfo = {};
      newState3.paginginfo[action.payload.module] = oldStateCurrentModule;

      if(newState3.paginginfo[action.payload.module]){
        newState3.paginginfo[action.payload.module].pagination = action.payload.pagination;
        newState3.paginginfo[action.payload.module].filter = action.payload.filter;
      } else {
        newState3.paginginfo[action.payload.module] = {pagination : action.payload.pagination,filter: action.payload.filter};
      }
      newState3.currentModule = action.payload.module;
      return newState3;
    case Types.UPDATE_FILTER:
      let newState2 = { ...state };
      let filters =action.payload.filters;
      if(newState2.paginginfo[action.payload.module]){
        newState2.paginginfo[action.payload.module].filters = filters;
      } else {
        newState2.paginginfo[action.payload.module] = {filters : filters}
      }
      newState2.currentModule = action.payload.module;
      return newState2;
    case Types.CLEAR_PAGINATION:
      let newState1 = { ...state };
      delete newState1.paginginfo[action.payload.module];
      newState1.currentModule = action.payload.module;
      return newState1;
    case Types.CLEAR_PAGINATION_EXCEPT_ME:
      let newState5 = { ...state };
      let oldStateCurrentModule5 = newState5.paginginfo[action.payload.module];
      newState5.paginginfo = {};
      newState5.paginginfo[action.payload.module] = oldStateCurrentModule5;
      newState5.currentModule = action.payload.module;
      return newState5;
    case Types.CLEAR_PAGINATION_ALL:
      let newState4 = { ...state };
      newState4.paginginfo = {};
      newState4.currentModule = action.payload.module;
      return newState4;
    case Types.CLEAR_FILTERS:
      let newState6 = { ...state };
      if(typeof newState6.paginginfo[action.payload.module] === "undefined"){
        newState6.paginginfo[action.payload.module] = {pagination: {}, filters: {}, sorter: {}};
      }
      newState6.paginginfo[action.payload.module].filters = {};
      newState6.currentModule = action.payload.module;
      return newState6;
    default:
      return state;
  }
}
