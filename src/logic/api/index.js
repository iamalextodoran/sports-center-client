import axios from "axios";

import config from "../config";

const api = axios.create({
  baseURL: `${config.API_SERVER}${config.API_PATH_PREFIX}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const Api = {
  API_CALL: "API_CALL",
  API_ERROR: "API_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",

  auth_token: (token) => {
    if (token) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers["Authorization"];
    }
  },

  catchError: (error) => error,

  get: (path) => {
    const request = api.get(path);
    request.catch(Api.catchError);
    return request;
  },

  post: (path, body) => {
    const request = api.post(path, body);
    request.catch(Api.catchError);
    return request;
  },

  put: (path, body) => {
    const request = api.put(path, body);
    request.catch(Api.catchError);
    return request;
  },

  patch: (path, body) => {
    const request = api.patch(path, body);
    request.catch(Api.catchError);
    return request;
  },

  delete: (path) => {
    const request = api.delete(path);
    request.catch(Api.catchError);
    return request;
  },
};

export default Api;
