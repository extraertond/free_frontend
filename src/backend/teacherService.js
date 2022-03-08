import axios from "axios";
import { getServiceToken } from "./tokenService";

const BACKEND_URL = "http://localhost:4000";
axios.defaults.headers.common["api_key"] = "develop_key";

export const getTeachers = async () => {
  try {
    const response = await axios.get(BACKEND_URL +  "/api/users/adm/teachers", {
      headers: {
        token: await getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error.data;
  }
};

export const getStudents = async () => {
  try {
    const response = await axios.get(BACKEND_URL +  "/api/users/students", {
      headers: {
        token: await getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error.data;
  }
};

export const getStudentsByClass = async () => {
  try {
    const response = await axios.get(BACKEND_URL +  "/api/users/students_by_class", {
      headers: {
        token: await getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error.data;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(BACKEND_URL +  `/api/users/adm/${id}`, {
      headers: {
        token: await getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error.data;
  }
}
