import React, { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import InfoModal from "../../../utils/components/Modals/InfoModal";
import { saveQuestionnaire } from "../../../../backend/backupService";
import "../../../../index.css";

const SelectOption = ({ username, currentQuestionnaire, setCurrentQuestionnaire }) => {
  const selectOptionMonoTest = (questionId, optionId) => {
    setCurrentQuestionnaire((oldQuestionnaire) => {
      const auxQuestions = oldQuestionnaire.questions;
      let question = auxQuestions.find((e) => e.id === questionId);
      question.option_id_selected = optionId;
      question.answered = true;
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
        <div className={currentQuestion?.image === true && window?.screen?.width > 760 ? "col-7" : "col-12"}>
          <div className="container">
            <label className="form-label question-title">
              {currentQuestion?.title}{" "}
              {currentQuestion?.have_clue === true ? <FcInfo style={{cursor: "pointer"}} size="1em" onClick={() => setShowClue(true)} /> : null}
            </label>
            {currentQuestion?.options.map((option) => {
              return (
                <div style={{ marginBottom: "5px" }} className="form-check" key={option.id}>
                  <button
                    style={{ width: "100%", border: "solid 2px" }}
                    className={
                      currentQuestion?.option_id_selected === option.id
                        ? "btn btn-secondary btn-lg selected-boot"
                        : "btn btn-secondary btn-lg select-boot"
                    }
                    onClick={() => selectOptionMonoTest(currentQuestion?.id, option.id)}
                  >
                    {option.text}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {currentQuestion?.image === true && window?.screen?.width > 760 ? (
          <div className="col-5">
            <img src={currentQuestion?.image_url} className="img-fluid rounded" alt="help_image" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SelectOption;
