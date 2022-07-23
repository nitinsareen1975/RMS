import AxiosLib from './lib/http-axios-lib-auth';
import config from '../config';
import { configureFakeBackend } from "./fake-backend";
configureFakeBackend();
const _request = (method, url, data, token) => {
	let options = {
		method: method,
		url: url,
		responseType: 'json',
	};
	if (data && method === 'GET') {
		options.params = data;
	} else if (data) {
		options.data = data;
		options.headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		};
	}

	return new Promise((resolve, reject) => {
		AxiosLib.request(options, token)
			.then(response => {
				let data = response.data;
				if (typeof data != 'object') data = JSON.parse(data);
				resolve(data);
			})
			.catch(error => {
				if (typeof error.response !== "undefined" && typeof error.response.data !== "undefined" && error.response.data) {
					resolve(JSON.parse(error.response.data));
				}
				reject(error);
			});
	});
};

const DataAccessService1 = {
	get(url, data, token) {

		return _request('GET', url, data, token);
	},
	post(url, data, token) {
		return _request('POST', url, data, token);
	},
	delete(url, token) {
		return _request('DELETE', url, undefined, token);
	},
	put(url, data, token) {
		return _request('PUT', url, data, token);
	}
};

const DataAccessService = {
	get(url, data, token) {

		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		};
		return getFetchMethod(url) === 'fake'
			? fetch(`${config.AuthAPI}` + url, requestOptions)
			: DataAccessService1.get(url, data, token);
	},
	post(url, data, token) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		};
		return getFetchMethod(url) === 'fake'
			? fetch(`${config.AuthAPI}` + url, requestOptions)
			: DataAccessService1.post(url, data, token);
	},
	delete(url, data, token) {
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		};
		return getFetchMethod(url) === 'fake'
			? fetch(`${config.AuthAPI}` + url, requestOptions)
			: DataAccessService1.delete(url, undefined, token);
	},
	put(url, data, token) {

		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		};
		return getFetchMethod(url) === 'fake'
			? fetch(`${config.AuthAPI}` + url, requestOptions)
			: DataAccessService1.put(url, data, token);
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
