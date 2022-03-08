import axios from "axios";
import { getServiceToken } from "./tokenService";

const BACKEND_URL = "http://localhost:4000";
axios.defaults.headers.common["api_key"] = "develop_key";

export const createQuestionnaire = async (questions, questionnaireInfo, definitiveClasses) => {
  try {
    const response = await axios.post(
      BACKEND_URL + "/api/questionnaires/tch/add",
      {
        classes: definitiveClasses,
        info: questionnaireInfo,
        questions,
      },
      { headers: { token: getServiceToken() } }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateQuestionnaire = async (questions, questionnaireInfo, definitiveClasses) => {
  try {
    const response = await axios.put(
      BACKEND_URL + "/api/questionnaires/tch/update",
      {
        classes: definitiveClasses,
        info: questionnaireInfo,
        questions,
      },
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

export const evaluateQuestionnaire = async (questionnaire) => {
  try {
    const response = await axios.post(
      BACKEND_URL + "/api/questionnaires/std/correct",
      { questionnaire },
      { headers: { token: getServiceToken() } }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getQuestionnairesForTeachers = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/api/questionnaires/tch", {
      headers: {
        token: getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getQuestionnairesForStudents = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/api/questionnaires/std", {
      headers: {
        token: getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getQuestionnaire = async (id) => {
  try {
    const response = await axios.get(BACKEND_URL + `/api/questionnaires/tch/questionnaire/${id}`, {
      headers: {
        token: getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getStudentQuestionnaire = async (id) => {
  try {
    const response = await axios.get(BACKEND_URL + `/api/questionnaires/std/questionnaire/${id}`, {
      headers: {
        token: getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const changeQuestionnaireOption = async (id, value, option) => {
  try {
    const response = await axios.patch(
      BACKEND_URL + `/api/questionnaires/tch/change_${option}`,
      {
        id,
        value,
      },
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

export const changeQuestionnaireReviewable = async (id, value) => {
  try {
    const response = await axios.patch(
      BACKEND_URL + "/api/questionnaires/tch/change_reviewable",
      {
        id,
        value,
      },
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

export const changeQuestionnaireRemake = async (id, value) => {
  try {
    const response = await axios.patch(
      BACKEND_URL + "/api/questionnaires/tch/change_can_remake",
      {
        id,
        value,
      },
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

export const changeQuestionnaireViewGrade = async (id, value) => {
  try {
    const response = await axios.patch(
      BACKEND_URL + "/api/questionnaires/tch/change_view_grade",
      {
        id,
        value,
      },
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

export const deleteQuestionnaire = async (id) => {
  try {
    const response = await axios.delete(BACKEND_URL + `/api/questionnaires/tch/delete/${id}`, {
      headers: {
        token: getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getRevisionquestionnaire = async (id) => {
  try {
    const response = await axios.get(BACKEND_URL + `/api/questionnaires/std/revision/${id}`, {
      headers: {
        token: getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getGrades = async (id) => {
  try {
    const response = await axios.get(BACKEND_URL + `/api/questionnaires/tch/questionnaire/${id}/grades`, {
      headers: {
        token: getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getGradesByUser = async (id) => {
  try {
    const response = await axios.get(BACKEND_URL + `/api/questionnaires/std/user/${id}/grades`, {
      headers: {
        token: getServiceToken(),
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
