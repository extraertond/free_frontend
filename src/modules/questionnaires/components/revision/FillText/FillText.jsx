import React, { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import InfoModal from "../../../../utils/components/Modals/InfoModal";
import Grade from "../misc/Grade";

const FillText = ({ currentQuestionnaire }) => {
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
            <label className="form-label question-title">
              {currentQuestion?.title}{" "}
              {currentQuestion?.have_clue === true ? <FcInfo style={{cursor: "pointer"}} size="1em" onClick={() => setShowClue(true)} /> : null}
            </label>
            <Grade grade={currentQuestion?.grade} />

            <div className="input-group input-group-sm mb-3" style={{ fontSize: "17px" }}>
              {currentQuestion?.tokens.map((token, index) => {
                return token.type === "input" ? (
                  <div
                    key={index}
                    style={{
                      height: "25px",
                      minWidth: "70px",
                      marginRight: "10px",
                      marginLeft: "10px",
                      marginBottom: "5px",
                      display: "inline-block",
                      background: "white",
                      color: "#0b1643",
                      borderRadius: "5px",
                      border: "solid 1px",
                      fontWeight: "600",
                      cursor: "not-allowed",
                    }}
                  >
                    {token.errored && !!token.wrong ? (
                      <>
                        <span className="wrong-grade" style={{ textDecoration: "line-through" }}>
                          {token.wrong}
                        </span>
                        <MdCancel style={{ marginLeft: "15px", marginRight: "15px" }} size="1em" color="red"></MdCancel>
                      </>
                    ) : (
                      <></>
                    )}
                    <span className="good-grade">{token.good}</span>
                    <MdCheckCircle
                      style={{ marginLeft: "15px", marginRight: "5px" }}
                      size="1em"
                      color="green"
                    ></MdCheckCircle>
                  </div>
                ) : (
                  <p key={index} style={{ display: "inline-block" }}>
                    {token.text}
                  </p>
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
