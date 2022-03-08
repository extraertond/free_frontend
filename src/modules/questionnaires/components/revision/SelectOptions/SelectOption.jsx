import React, { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import InfoModal from "../../../../utils/components/Modals/InfoModal";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import Grade from "../misc/Grade";
import "../../../../../index.css";

const SelectOption = ({ currentQuestionnaire }) => {

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
            <Grade grade={currentQuestion?.grade} />
            {currentQuestion?.options.map((option) => {
              return (
                <div style={{ marginBottom: "5px" }} className="form-check" key={option.id}>
                  <button
                    style={{ width: "100%", border: "solid 2px", cursor: "not-allowed" }}
                    className={`btn btn-secondary btn-lg select-boot ${option.correct ? "mono-test-correct"  : option.errored ? "mono-test-errored" : ""}`
                    }
                  >
                    {option.text}
                    {option.correct ?
                      <MdCheckCircle style={{ marginLeft: "15px", marginRight: "5px" }} size="1.4em" color="green"></MdCheckCircle>
                    : option.errored ?
                      <MdCancel style={{ marginLeft: "15px", marginRight: "5px" }} size="1.4em" color="red"></MdCancel>
                    : <></>
                    }
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
