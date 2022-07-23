import AxiosLib from "./lib/http-axios-lib";
import config from "../config";
import { configureFakeBackend } from "./fake-backend";
configureFakeBackend();
const _request = async (method, url, data, token, hitCount) => {
  if(hitCount > 2){
    window.location.href = "/login";
  }
  let options = {
    method: method,
    url: url,
    responseType: "json"
  };
  if (data && method === "GET") {
    options.params = data;
  } else if (data) {
    options.data = data;
    options.headers = {
      "Content-Type": "application/json;charset=UTF-8"
    };
  }

  return new Promise(async (resolve, reject) => {
    AxiosLib.request(options, token)
      .then(async (response) => {
          let data = response.data;
          if (typeof data != "object") data = JSON.parse(data);
          resolve(data);
      })
      .catch(error => {
        if(error.response && error.response.status === 401){
          refreshToken(method, url, data, hitCount,reject);
        } /* else {
          if(window.location.pathname.indexOf('404') <= -1){
            window.location = "/404";
          }
        } */
        if(typeof error.response !== "undefined" && typeof error.response.data !== "undefined" && error.response.data){
          resolve(JSON.parse(error.response.data));
        }
        reject(error);
      })
  })
};

const refreshToken = async (method, url, data, hitCount,reject) => {
    var tokenData = JSON.parse(localStorage.getItem("tokenData"))
    if(tokenData && tokenData !== null){
      var objTokenData = {
        "accessToken": tokenData.token,
        "refreshToken": tokenData.refreshToken
      }
      let optionsToken = {
        method: "POST",
        url: "/auth/refresh-token",
        responseType: "json",
        data:objTokenData,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      };
      
      AxiosLib.request(optionsToken, undefined)
      .then(async (responseToken) => {
        responseToken = JSON.parse(responseToken);
        if(responseToken.status === true){
          var tokenResponseData = responseToken.data;
          var expiry = new Date();
          expiry.setSeconds( expiry.getSeconds() + tokenResponseData.expires_in );
          var newTokenData = {
            "token_expiry":expiry,
            "token":tokenResponseData.token,
            "refreshToken":tokenResponseData.token+'re'
          }
          localStorage.setItem("tokenData", JSON.stringify(newTokenData));
          _request(method, url, data, tokenResponseData.token, hitCount+ 1)
        }
      })
      .catch(error => {
        window.location.href = "/login";
        reject(error);
      })
    }
      
};

const DataAccessService1 = {
  get(url, data, token) {
    return _request("GET", url, data, token,1);
  },
  post(url, data, token) {
    return _request("POST", url, data, token,1);
  },
  delete(url, token) {
    return _request("DELETE", url, undefined, token,1);
  },
  put(url, data, token) {
    return _request("PUT", url, data, token,1);
  },
  patch(url, data, token) {
    return _request("PATCH", url, data, token,1);
  }
};

const DataAccessService = {
  get(url, data, token) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return getFetchMethod(url) === "fake"
      ? fetch(`${config.API}` + url, requestOptions)
      : DataAccessService1.get(url, data, token);
  },
  post(url, data, token) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return getFetchMethod(url) === "fake"
      ? fetch(`${config.API}` + url, requestOptions)
      : DataAccessService1.post(url, data, token);
  },
  delete(url, data, token) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return getFetchMethod(url) === "fake"
      ? fetch(`${config.API}` + url, requestOptions)
      : DataAccessService1.delete(url, undefined, token);
  },
  put(url, data, token) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return getFetchMethod(url) === "fake"
      ? fetch(`${config.API}` + url, requestOptions)
      : DataAccessService1.put(url, data, token);
  },
  patch(url, data, token) {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return getFetchMethod(url) === "fake"
      ? fetch(`${config.API}` + url, requestOptions)
      : DataAccessService1.patch(url, data, token);
  }
};

function getFetchMethod(url, data, token) {
  var fetchType = "fake";
    var AllowedAPIHosts = config.AllowedAPIHosts;
    if (AllowedAPIHosts.indexOf(",") === -1) {
      AllowedAPIHosts = [AllowedAPIHosts];
    } else {
      AllowedAPIHosts = AllowedAPIHosts.split(",");
    }
    AllowedAPIHosts.map(host => {
      if (config.API.indexOf(host) !== -1) {
        fetchType = "real";
      }
    });
	return fetchType;
}

export default DataAccessService;
