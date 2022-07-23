let AppConfig = window.AppConfig || {};
module.exports = {
  API: AppConfig && AppConfig.API ? AppConfig.API : "http://localhost:3010",
  AuthAPI: AppConfig && AppConfig.AuthAPI ? AppConfig.AuthAPI : "http://localhost:3010",
  DASHBOARD_URL: AppConfig && AppConfig.DASHBOARD_URL ? AppConfig.DASHBOARD_URL : "http://localhost:3010",
  WEB_URL: AppConfig && AppConfig.WEB_URL ? AppConfig.WEB_URL : "http://thetestsolution.com",
  GoogleMapsAPIkey: AppConfig && AppConfig.GoogleMapsAPIkey ? AppConfig.GoogleMapsAPIkey : "",
  StripeAPIKey: AppConfig && AppConfig.StripeAPIKey ? AppConfig.StripeAPIKey : "",
  StripeSecretKey: AppConfig && AppConfig.StripeSecretKey ? AppConfig.StripeSecretKey : "",
  StripeAccountId: AppConfig && AppConfig.StripeAccountId ? AppConfig.StripeAccountId : "",
  AllowedAPIHosts: AppConfig && AppConfig.AllowedAPIHosts ? AppConfig.AllowedAPIHosts : "",
  AdminRoles: AppConfig && AppConfig.AdminRoles ? AppConfig.AdminRoles : ["Administrator"],
  LabAdminRoles: AppConfig && AppConfig.LabAdminRoles ? AppConfig.LabAdminRoles : ["Lab Admin"],
  customerServiceNumber: AppConfig && AppConfig.customerServiceNumber ? AppConfig.customerServiceNumber : "786-301-7481"
};
