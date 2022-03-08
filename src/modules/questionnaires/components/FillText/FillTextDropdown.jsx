import React, { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import { saveQuestionnaire } from "../../../../backend/backupService";
import InfoModal from "../../../utils/components/Modals/InfoModal";

const FillTextDropdown = ({ username, currentQuestionnaire, setCurrentQuestionnaire }) => {
  const selectOptionFillTextDropdown = (questionId, tokenId, selectedOptionId) => {
    setCurrentQuestionnaire((oldQuestionnaire) => {
      const auxQuestions = oldQuestionnaire.questions;
      let question = auxQuestions.find(e => e.id === questionId);
      let token = question.tokens.find(t => t.id === tokenId);
      token.option_id_selected = selectedOptionId === -1 ? null : selectedOptionId;
      question.answered =
        question.tokens.filter((e) => e.type === "input" && e.option_id_selected === null).length === 0;
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
        <div>
          <div className="container">
            <label className="form-label" style={{ fontSize: "30px" }}>
              {currentQuestion?.title}{" "}
              {currentQuestion?.have_clue === true ? <FcInfo style={{cursor: "pointer"}} size="1em" onClick={() => setShowClue(true)} /> : null}
            </label>
            <div className="input-group input-group-sm mb-3" style={{ fontSize: "17px" }}>
              {currentQuestion?.tokens.map((token, i) => {
                return token.type === "input" ? (
                  <select
                    key={i}
                    className="form-select form-select-sm select-boot"
                    value={token.option_id_selected}
                    style={{
                      color: "white",
                      marginLeft: "10px",
                      marginRight: "10px",
                      height: "30px",
                      minWidth: "120px",
                      maxWidth: "150px",
                    }}
                    onChange={(e) =>
                      selectOptionFillTextDropdown(currentQuestion?.id, token.id, parseInt(e.target.value))
                    }
                  >
                    <option defaultValue value="-1">
                      Elegir...
                    </option>
                    {token.options.map((q) => {
                      return (
                        <option key={q.id} value={q.id}>
                          {q.value}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <p style={{ display: "inline-block" }}>{token.text}</p>
                );
              })}
            </div>
          </div>
        </div>
        {currentQuestion?.image === true ? (
          <div style={{ textAlign: "center" }} className="row">
            <div className="col-5 justify-content-center container">
              <img src={currentQuestion?.image_url} className="img-fluid rounded" alt="help_image" />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FillTextDropdown;
