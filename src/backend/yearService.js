import axios from "axios";
import { getServiceToken } from "./tokenService";

const BACKEND_URL = "http://localhost:4000";
axios.defaults.headers.common["api_key"] = "develop_key";

export const getYears = async () => {
  try {
    return await axios.get(BACKEND_URL +  "/api/years", { headers: { token: getServiceToken() } });
  } catch (error) {
    return error.data;
  }
};
