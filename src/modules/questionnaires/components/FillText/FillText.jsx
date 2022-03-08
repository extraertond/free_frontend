import React, { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import { saveQuestionnaire } from "../../../../backend/backupService";
import InfoModal from "../../../utils/components/Modals/InfoModal";

const FillText = ({ username, currentQuestionnaire, setCurrentQuestionnaire }) => {
  const selectInputFillText = (questionId, tokenId, tokenValue) => {
    setCurrentQuestionnaire((oldQuestionnaire) => {
      const auxQuestions = oldQuestionnaire.questions;
      let question = auxQuestions.find(e => e.id === questionId);
      question.tokens[tokenId].value = tokenValue;

      question.answered = question.tokens.filter((e) => e.type === "input" && e.value === "").length === 0;
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
        <div>
          <div className="container">
            <label className="form-label question-title">
              {currentQuestion?.title}{" "}
              {currentQuestion?.have_clue === true ? <FcInfo style={{cursor: "pointer"}} size="1em" onClick={() => setShowClue(true)} /> : null}
            </label>
            <div className="input-group input-group-sm mb-3" style={{ fontSize: "17px" }}>
              {currentQuestion?.tokens.map((token, index) => {
                return token.type === "input" ? (
                  <input
                  key={index}
                    style={{
                      height: "25px",
                      minWidth: "70px",
                      maxWidth: "100px",
                      marginRight: "10px",
                      marginLeft: "10px",
                      marginBottom: "5px",
                      display: "inline-block",
                      color: "#0b1643",
                      borderRadius: "5px",
                      border: "solid 1px",
                      fontWeight: "600",
                      background: "white"
                    }}
                    type="text"
                    value={token.value}
                    onChange={(e) =>selectInputFillText(currentQuestion?.id, token.id, e.target.value)}
                  />
                ) : (
                  <p key={index} style={{ display: "inline-block" }}>{token.text}</p>
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

export default FillText;
