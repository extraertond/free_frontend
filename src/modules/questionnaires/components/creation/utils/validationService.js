export const validateQuestionnaireInfo = (info) => {
  const subjectValid = info.subject && info.subject !== "-1";
  const titleValid = info.title && !!info.title;
  return subjectValid && titleValid;
};

export const validateMonoTest = (question, setQuestionValue, data) => {
  const { optionsMonoTest, setOptionsMonoTest } = data;
  let valid = true;

  const optionsQuantity = optionsMonoTest.length >= 3 && optionsMonoTest.length <= 6;

  const correctOptions = optionsMonoTest.filter((o) => o.correct);
  if (correctOptions.length !== 1) {
    valid = false;
  }

  optionsMonoTest.forEach((o, index) => {
    setOptionsMonoTest((oldOptions) => {
      let aux = [...oldOptions];
      let auxObj = aux[index];
      auxObj.errored = o.text === "";
      aux[index] = auxObj;
      return aux;
    });
    if (!o.text) {
      valid = false;
    }
  });

  return optionsQuantity && valid && _validateGeneralInfo(question, setQuestionValue);
};

export const validateMultiTest = (question, setQuestionValue, data) => {
  const { optionsMultiTest, setOptionsMultiTest } = data;
  let valid = true;

  const optionsQuantity = optionsMultiTest.length >= 3 && optionsMultiTest.length <= 6;

  const correctOptions = optionsMultiTest.filter((o) => o.correct);
  if (correctOptions.length < 1) {
    valid = false;
  }

  optionsMultiTest.forEach((o, index) => {
    setOptionsMultiTest((oldOptions) => {
      let aux = [...oldOptions];
      let auxObj = aux[index];
      auxObj.errored = o.text === "";
      aux[index] = auxObj;
      return aux;
    });
    if (!o.text) {
      valid = false;
    }
  });

  return optionsQuantity && valid && _validateGeneralInfo(question, setQuestionValue);
};

export const validateFillText = (question, setQuestionValue, data) => {
  const { tokensFill } = data;
  let valid = true;

  const optionsQuantity = tokensFill.length >= 3 && tokensFill.length <= 30;

  if (tokensFill.filter((o) => o.input).length === 0) {
    valid = false;
  }

  return optionsQuantity && valid && _validateGeneralInfo(question, setQuestionValue);
};

export const validateDropdownSelect = (question, setQuestionValue, data) => {
  const { dropdownSelectQuestions } = data;
  let valid = true;
  let auxQuestions = [];

  dropdownSelectQuestions.forEach(question => {
    if (!question.title) {
      valid = false;
      question.titleErrored = true;
    } else {
      question.titleErrored = false;
    }

    const correctOptions = question.options.filter(o => o.correct);
    if (correctOptions.length !== 1) {
      question.correctOptionErrored = true;
      valid = false;
    } else {
      question.correctOptionErrored = false;
    }

    let auxOptions = [];
    question.options.forEach(option => {
      if (!option.text) {
        valid = false;
        option.errored = true;
      } else {
        option.errored = false;
      }
      auxOptions.push(option);
    });

    question.options = auxOptions;
    auxQuestions.push(question);

  });
  

  return valid && _validateGeneralInfo(question, setQuestionValue);
};

export const validateFillDropdown = (question, setQuestionValue, data) => {
  const { tokensFill } = data;
  let valid = true;

  const optionsQuantity = tokensFill.length >= 3 && tokensFill.length <= 30;

  if (tokensFill.filter((o) => o.input).length === 0) {
    valid = false;
  }
  return optionsQuantity && valid && _validateGeneralInfo(question, setQuestionValue);
};

export const validateDragCategories = (question, setQuestionValue, data) => {
  const { dragCategories } = data;
  let valid = true;
  let auxQuestions = [];

  let totalOptions = 0;
  dragCategories.forEach(category => {
    if (!category.title) {
      valid = false;
      category.titleErrored = true;
    } else {
      category.titleErrored = false;
    }

    totalOptions += category.options.length;

    let auxOptions = [];
    category.options.forEach(option => {
      if (!option.text) {
        valid = false;
        option.errored = true;
      } else {
        option.errored = false;
      }
      auxOptions.push(option);
    });

    category.options = auxOptions;
    auxQuestions.push(category);

  });

  if (totalOptions < 3 || totalOptions > 10) { valid = false; }

  return valid && _validateGeneralInfo(question, setQuestionValue);
};

export const validateDragCategoriesImg = (question, setQuestionValue, data) => {
  const { dragCategories } = data;
  let valid = true;
  let auxQuestions = [];

  let totalOptions = 0;
  dragCategories.forEach(category => {

    if (!category.title) {
      valid = false;
      category.titleErrored = true;
    } else {
      category.titleErrored = false;
    }

    totalOptions += category.options.length;

    let auxOptions = [];
    category.options.forEach(option => {
      if (!option.text) {
        valid = false;
        option.errored = true;
      } else {
        option.errored = false;
      }
      auxOptions.push(option);
    });

    category.options = auxOptions;
    auxQuestions.push(category);

  });

  if (totalOptions < 3 || totalOptions > 10) { valid = false; }

  return valid && _validateGeneralInfo(question, setQuestionValue);
};

export const validateJoinDrag = (question, setQuestionValue, data) => {
  const { joinDrag } = data;
  let valid = true;
  let auxRelations = [];

  joinDrag.forEach(relation => {
    if (!relation.from) {
      valid = false;
      relation.fromErrored = true;
    } else {
      relation.fromErrored = false;
    }

    if (!relation.to) {
      valid = false;
      relation.toErrored = true;
    } else {
      relation.toErrored = false;
    }
    auxRelations.push(relation);
  });

  return valid && _validateGeneralInfo(question, setQuestionValue);
};

export const validateJoinDragImg = (question, setQuestionValue, data) => {
  const { joinDrag } = data;
  let valid = true;
  let auxRelations = [];

  joinDrag.forEach(relation => {
    if (!relation.from) {
      valid = false;
      relation.fromErrored = true;
    } else {
      relation.fromErrored = false;
    }

    if (!relation.to) {
      valid = false;
      relation.toErrored = true;
    } else {
      relation.toErrored = false;
    }
    auxRelations.push(relation);
  });

  return valid && _validateGeneralInfo(question, setQuestionValue);
};

const _validateGeneralInfo = (question, setQuestionValue) => {
  const validTitle = !!question.title;
  setQuestionValue(!validTitle, "titleErrored");

  const validHelp = !question.help || (question.help && question.helpText !== "");
  setQuestionValue(!validHelp, "helpErrored");

  const validImage = !question.image || (question.image && question.imageUrl !== "");
  setQuestionValue(!validImage, "imageErrored");

  return validTitle && validHelp && validImage;
};
