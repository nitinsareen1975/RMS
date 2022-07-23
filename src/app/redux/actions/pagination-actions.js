import { Types } from "../constants/pagination-types";

export function updatePagination(data) {
    return async function(dispatch, _getState) {
      dispatch({type: Types.UPDATE_PAGINATION, payload:data});
    };
  }

  export function updatePaginationRemoveOld(data) {
    return async function(dispatch, _getState) {
      dispatch({type: Types.UPDATE_PAGINATION_REMOVE_OLD, payload:data});
    };
  }

  export function updateFilters(data) {
    return async function(dispatch, _getState) {
      dispatch({type: Types.UPDATE_FILTER, payload:data});
    };
  }

  export function clearPagination(module) {
    return async function(dispatch, _getState) {
      dispatch({type: Types.CLEAR_PAGINATION,payload:{module : module}});
    };
  }

  export function clearPaginationExceptMe(module) {
    return async function(dispatch, _getState) {
      dispatch({type: Types.CLEAR_PAGINATION_EXCEPT_ME,payload:{module : module}});
    };
  }

  export function clearFilters(module) {
    return async function(dispatch, _getState) {
      dispatch({type: Types.CLEAR_FILTERS,payload:{module : module}});
    };
  }