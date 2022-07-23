import * as UserService from './user-service';
import Roles from './../user-roles';
const permissions = Roles.permissions;

export function canAccess(permission) {
	let status = false;
	if(permission === '') return status;
	let currentUser = UserService.getUser();
	if(currentUser.roles === "") return status;
	if(permissions[permission].indexOf(currentUser.roles) > -1){
		status = true;
	} else {
		status = false;
	}
	return status;
}

export function isRole(role) {
	let status = false;
	if(role === '') return status;
	let currentUser = UserService.getUser();
	if(currentUser.roles === "") return status;
	if(Array.isArray(role)){
		status = false;
		role.map(function(item){
			if(item == currentUser.roles){
				status = true;
			}
		});
	} else {
		if(currentUser.roles === "") return status;
		if(role == currentUser.roles){
			status = true;
		} else {
			status = false;
		}
	}
	return status;
}