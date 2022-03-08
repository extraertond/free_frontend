import React, { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import InfoModal from "../../../../utils/components/Modals/InfoModal";
import Grade from "../misc/Grade";

const SelectOptions = ({ currentQuestionnaire }) => {
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
            <Grade grade={currentQuestion?.grade} />
            {currentQuestion?.options.map((option) => {
              return (
                <button
                  className={`btn btn-secondary btn-lg select-boot ${option.correct ? 'mono-test-correct' : !option.correct && option.selected ? 'mono-test-errored' : ''}`}
                  key={option.id}
                  style={{
                    fontSize: "20px",
                    width: "100%",
                    marginTop: "5px",
                    display: "inline-flex",
                    justifyContent: "space-between",
                    border: "solid 1px",
                    cursor: "not-allowed"
                  }}
                >
                  <label className="form-check-label">{option.text}</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    key={option.id}
                    checked={option.correct}
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
