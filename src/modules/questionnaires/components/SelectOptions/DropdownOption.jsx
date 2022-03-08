import React, { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import InfoModal from "../../../utils/components/Modals/InfoModal";
import { saveQuestionnaire } from "../../../../backend/backupService";
import "../../../../index.css";

const DropdownOption = ({ username, currentQuestionnaire, setCurrentQuestionnaire }) => {
  const selectOptionTestDropdown = (questionId, dropdownId, optionId) => {
    setCurrentQuestionnaire((oldQuestionnaire) => {
      const auxQuestions = oldQuestionnaire.questions;
      let question = auxQuestions.find(e => e.id === questionId);
      let auxDropArray = question.questions;
      let auxDrop = auxDropArray.find(e => e.id === dropdownId);
      auxDrop.option_id_selected = optionId === -1 ? null : optionId;
      question.questions = auxDropArray;
      question.answered = question.questions.filter((e) => e.option_id_selected === null).length === 0;
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
      <InfoModal show={showClue} setShow={setShowClue} title={"Ayuda"} body={currentQuestion?.clue} accepText={"Aceptar"} />
      <div className="row">
        <div className={currentQuestion?.image === true && window?.screen?.width > 760 ? "col-6" : "col-12"}>
          <div className="container">
            <form>
              <label className="form-label question-title">
                {currentQuestion?.title}{" "}
                {currentQuestion?.have_clue === true ? <FcInfo style={{cursor: "pointer"}} size="1em" onClick={() => setShowClue(true)} /> : null}
              </label>
              {currentQuestion?.questions.map((q) => {
                return (
                  <div className="form-check" key={q.id}>
                    <label className="form-check-label" style={{ fontSize: "23px", fontWeight: "500" }}>
                      {q.text}
                    </label>
                    <select
                      style={{ fontSize: "20px", color: "white" }}
                      className="form-select form-select select-boot"
                      value={q.option_id_selected}
                      onChange={(e) =>selectOptionTestDropdown(currentQuestion.id, q.id, parseInt(e.target.value))}
                    >
                      <option defaultValue value="-1">
                        Elegir...
                      </option>
                      {q.options.map((q) => {
                        return (
                          <option key={q.id} value={q.id}>
                            {q.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              })}
            </form>
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

export default DropdownOption;
