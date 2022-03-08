import axios from "axios";
import { getServiceToken } from "./tokenService";

const BACKEND_URL = "http://localhost:4000";
axios.defaults.headers.common["x-api-key"] = "develop_key";

export const getClasses = async () => {
  try {
    const response = await axios.get(BACKEND_URL +  "/api/classes", {
      headers: {
        token: getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error.data;
  }
};

export const getClassesByTeacher = async () => {
  try {
    const response = await axios.get(BACKEND_URL +  "/api/classes/by_teacher", {
      headers: { token: getServiceToken() } });
    return response;
  } catch (error) {
    return error.data;
  }
};

export const getBasicClasses = async () => {
  try {
    const response = await axios.get(BACKEND_URL +  "/api/classes/basic", {
      headers: { token: getServiceToken() },
    });
    return response;
  } catch (error) {
    return error.data;
  }
};

export const createClass = async (auxClass) => {
  try {
    const response = await axios.post(
      BACKEND_URL +  "/api/classes/adm/add",
      { class: auxClass },
      { headers: { token: getServiceToken() } }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteClass = async (id) => {
  try {
    const response = await axios.delete(BACKEND_URL +  `/api/classes/adm/${id}`, {
      headers: { token: await getServiceToken() },
    });
    return response;
  } catch (error) {
    return error.data;
  }
}

export const assignTeachers = async (class_id, teachers) => {
  try {
    const response = await axios.post(
      BACKEND_URL +  "/api/classes/adm/update_teachers",
      { class_id, teachers },
      { headers: { token: getServiceToken() } }
    );
    return response;
  } catch (error) {
    return error;
  }
} 

export const assignStudents = async (class_id, students) => {
  try {
    const response = await axios.post(
      BACKEND_URL +  "/api/classes/adm/update_students",
      { class_id, students },
      { headers: { token: getServiceToken() } }
    );
    return response;
  } catch (error) {
    return error;
  }
} 
