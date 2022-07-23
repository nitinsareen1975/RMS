import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserRoles from "../user-roles";
import routeOptions from "./route";

const  PrivateRoute =  ({ component: Component, roles,status,isLoggedIn,urls,currPath,...rest }) => {

    const currentUser =JSON.parse(localStorage.getItem("user"));
    let loggedInUserroleURL = "";
    
    if(currentUser)
        loggedInUserroleURL = UserRoles.types[currentUser.roles].url;
    else
        loggedInUserroleURL ="/";

   return( <Route {...rest} render={({props }) => {
        if(currentUser){
            if((roles && roles.indexOf(currentUser.roles) === -1) || 
            (routeOptions.urls[currPath] && routeOptions.urls[currPath].indexOf(currentUser.roles) === -1)) {
                return (<Redirect to={{ pathname: loggedInUserroleURL }} />)
            }else{
                return (<Component {...props} />)
            }
        }else{
            return (<Redirect to={{ pathname: "/login" }} />)
        }
    }} />)
}
export default  PrivateRoute
