import axios from "axios";
import { getServiceToken } from "./tokenService";

const BACKEND_URL = "http://localhost:4000";
axios.defaults.headers.common["x-api-key"] = "develop_key";

export const getSubjects = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/api/subjects", {
      headers: { token: getServiceToken() },
    });
    return response;
  } catch (error) {
    return error.data;
  }
};

export const getEnabledSubjects = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/api/subjects/enabled", {
      headers: {
        token: getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error.data;
  }
};

export const changeEnabled = async (subject) => {
  try {
    const response = await axios.put(
      BACKEND_URL + "/api/subjects/adm/edit",
      { subject },
      {
        headers: {
          token: getServiceToken(),
        },
      }
    );
    return response;
  } catch (error) {
    return error.data;
  }
};

export const createSubject = async (subjectName) => {
  try {
    const response = await axios.post(
      BACKEND_URL + "/api/subjects/adm/add",
      { subject: { name: subjectName } },
      {
        headers: {
          token: getServiceToken(),
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
