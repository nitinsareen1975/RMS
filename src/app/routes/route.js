import Admin from "../components/admin/admin.jsx";
import Login from "../components/login/login.jsx";
import ForgotPassword from "../components/forgot-password/forgot-password.jsx";
import ResetPassword from "../components/reset-password/reset-password.jsx";
import NotFound from "../components/common/404.jsx";
import ServerError from "../components/common/500.jsx";
import Register from "../components/register/register.jsx";
export default {
  routes: [
    {
      path: "/login",
      component: Login,
      exact: true
    },
    {
      path: "/",
      component: Login,
      exact: true
    },
    {
      path: "/forgot-password",
      component: ForgotPassword,
      exact: true
    },
    {
      path: "/reset-password",
      component: ResetPassword,
      exact: true
    },
    {
      path: "/404",
      component: NotFound,
      exact: true
    },
    ,
    {
      path: "/500",
      component: ServerError,
      exact: true
    },
    {
      path: "/register",
      component: Register,
      exact: true
    }
  ],
  private: [
    {
      path: "/admin",
      component: Admin,
      exact: false,
      roles: ["Administrator"],
      status: 200
    }
  ],
  urls: {}
};