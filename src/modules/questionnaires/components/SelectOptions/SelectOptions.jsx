import React, { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import { saveQuestionnaire } from "../../../../backend/backupService";
import InfoModal from "../../../utils/components/Modals/InfoModal";

const SelectOptions = ({ username, currentQuestionnaire, setCurrentQuestionnaire }) => {
  const selectOptionMultiTest = (questionId, optionId) => {
    setCurrentQuestionnaire((oldQuestionnaire) => {

      const auxQuestions = oldQuestionnaire.questions;
      let question = auxQuestions.find(e => e.id === questionId);
      let found = question.options_id_selected.find((e) => e === optionId) === undefined;
      if (found) {
        question.options_id_selected.push(optionId);
        question.answered = true;
      } else {
        question.options_id_selected = question.options_id_selected.filter((e) => e !== optionId);
        if (question.options_id_selected.length === 0) question.answered = false;
      }
      setCurrentQuestion({ ...question });
      oldQuestionnaire.questions = auxQuestions;
      saveQuestionnaire(oldQuestionnaire, username);
      return oldQuestionnaire;
    });
  };

  useEffect(() => {
    setCurrentQuestion(currentQuestionnaire?.questions[currentQuestionnaire?.question_id]);
  }, [currentQuestionnaire]);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [showClue, setShowClue] = useState(false);
  return (
    <div>
      <InfoModal
        show={showClue}
        setShow={setShowClue}
        title={"Ayuda"}
        body={currentQuestion?.clue}
        accepText={"Aceptar"}
      />
      <div className="row">
        <div className={currentQuestion?.image === true && window?.screen?.width > 760 ? "col-6" : "col-12"}>
          <div className="container">
            <label className="form-label question-title">
              {currentQuestion?.title}{" "}
              {currentQuestion?.have_clue === true ? <FcInfo style={{cursor: "pointer"}} size="1em" onClick={() => setShowClue(true)} /> : null}
            </label>
            {currentQuestion?.options.map((option) => {
              return (
                <button
                  className={
                    currentQuestion?.options_id_selected.find((t) => t === option.id) !== undefined
                      ? "btn btn-dark btn-lg selected-boot"
                      : "btn btn-secondary btn-lg select-boot"
                  }
                  key={option.id}
                  style={{
                    fontSize: "20px",
                    width: "100%",
                    marginTop: "5px",
                    display: "inline-flex",
                    justifyContent: "space-between",
                    border: "solid 1px",
                  }}
                  onClick={() => selectOptionMultiTest(currentQuestion?.id, option.id)}
                >
                  <label className="form-check-label">{option.text}</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    key={option.id}
                    checked={currentQuestion?.options_id_selected.find((t) => t === option.id) !== undefined}
                    onChange={() => selectOptionMultiTest(currentQuestion?.id, option.id)}
                  />
                </button>
              );
            })}
          </div>
        </div>
        {currentQuestion?.image === true && window?.screen?.width > 760 ? (
          <div className="col-6">
            <img src={currentQuestion?.image_url} className="img-fluid rounded" alt="help_image" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SelectOptions;
