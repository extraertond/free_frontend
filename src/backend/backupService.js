const setItem = async (key, value) => localStorage.setItem(key, value);

const getItem = async (key) => localStorage.getItem(key);

const removeItem = async (key) => localStorage.removeItem(key);

export const saveQuestionnaire = async (questionnaire, username) => {
    if (questionnaire && username) {
        setItem(`student_${username}_questionnaire_${questionnaire.id}`, JSON.stringify(questionnaire));
    }
}

export const checkQuestionnaire = async (questionnaireId, username) => {
    if (questionnaireId && username) {
        return await getItem(`student_${username}_questionnaire_${questionnaireId}`);
    }
}

export const deleteQuestionnaire = async (questionnaireId, username) => {
    removeItem(`student_${username}_questionnaire_${questionnaireId}`);
}

export const saveInfo = async (info, username) => {
    setItem(`q_${username}_info`, JSON.stringify(info));
}

export const checkInfo = async (username) => {
    return await getItem(`q_${username}_info`);
}

export const removeInfo = async (username) => {
    return await removeItem(`q_${username}_info`);
}

export const saveClasses = async (classes, username) => {
    setItem(`q_${username}_classes`, JSON.stringify(classes));
}

export const checkClasses = async (username) => {
    return await getItem(`q_${username}_classes`);
}

export const removeClasses = async (username) => {
    return await removeItem(`q_${username}_classes`);
}

export const saveQuestions = async (questions, username) => {
    setItem(`q_${username}_questions`, JSON.stringify(questions));
}

export const checkQuestions = async (username) => {
    return await getItem(`q_${username}_questions`);
}

export const removeQuestions = async (username) => {
    return await removeItem(`q_${username}_questions`);
}