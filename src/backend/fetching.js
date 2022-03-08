import { getServiceToken, setServiceToken } from "./tokenService";

const BACKEND_URL = "http://localhost:4000";
const API_KEY = "develop_key";

const config = (method, body) => {
  const config = {
    method,
    headers: { api_key: API_KEY },
  };

  config.headers["x-api-key"] = API_KEY;
  if (body) {
    if (body instanceof FormData) {
      config.body = body;
    } else {
      config.headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(body);
    }
  }

  const serviceToken = getServiceToken();

  if (serviceToken) {
    config.headers["token"] = serviceToken;
  }
  return config;
};

const fetching = async (url, method, body, onSuccess, onErrors) => {
  fetch(`${BACKEND_URL}/api/${url}`, config(method, body))
    .then(processResponse(onSuccess, onErrors))
    .catch((e) => {
      onErrors({ code: "ERROR", message: "Ha habido un error", data: e });
    });
};

const processResponse = (onSuccess, onErrors) => (response) => {
  if (response.status >= 200 && response.status <= 299) {
    response.json().then((r) => {
      if (r.data.token) setServiceToken(r.data.token);
      onSuccess(r);
    });
  } else if (response.status >= 400 && response.status <= 499) {
    response.json().then((r) => {
      onErrors(r);
    });
  } else if (response.status >= 500 && response.status <= 599) {
    response.json().then((r) => {
      onErrors(r);
    });
  } else {
    onErrors({ code: "ERROR", message: "Ha habido un error" });
  }
};

export default fetching;
