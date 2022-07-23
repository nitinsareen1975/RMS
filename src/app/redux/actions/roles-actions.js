import API from "../api/roles-api";
import {notifyUser} from "../../services/notification-service"

export function getRoles({ filters, pagination, sorter }) {
  return async function(dispatch, getState) {
    try {
      let resp = await API.getRoles({
        filters: filters,
        pagination: pagination,
        sorter : sorter
      });
      return resp;
    } catch (e) {
      return {"error" : true};
    }
  };
}

export function updateRole(data) {
   return async function(dispatch, getState) {
    try {
      let resp = await API.updateRole(data);
      if(resp.data && resp.data.message){
        notifyUser(resp.data.message, 'success');
      } else if(resp.error && resp.error.message){
        notifyUser(resp.error.message, 'error');
      } else {
        notifyUser(data.id !== '' ? "Role updated successfully" : "Role added successfully.", 'success');
      }
    } catch (e) {
      console.log(e);
      return {"error" : true};
    }
  };
}
export function addRole(data) {
  return async function(dispatch, getState) {
    try {
      let resp = await API.addRole(data);
      if(resp.data && resp.data.message){
        notifyUser(resp.data.message, 'success');
      } else if(resp.error && resp.error.message){
        notifyUser(resp.error.message, 'error');
      } else {
        notifyUser(data.id !== '' ? "Role updated successfully." : "Role added successfully.", 'success');
      }
    } catch (e) {
      console.log(e);
      return {"error" : true};
    }
  };
}

export function getRole(idx) {
  return async function(dispatch, getState) {
    try {
      let resp = await API.getRole(idx);
     return resp.data;
    } catch (e) {
      return {"error" : true};
    }
  };
}

export function deleteRole(idx) {
  return async function(dispatch, getState) {
    try {
      let resp = await API.deleteRole(idx);
      notifyUser("Role deleted.", 'info');
     return resp;
    } catch (e) {
      return {"error" : true};
    }
  };
}