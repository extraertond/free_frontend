import React, { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import { BsChevronDown } from "react-icons/bs";
import InfoModal from "../../../../utils/components/Modals/InfoModal";
import Grade from "../misc/Grade";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import "../../../../../index.css";

const DropdownOption = ({ currentQuestionnaire }) => {
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
            <form>
              <label className="form-label question-title">
                {currentQuestion?.title}{" "}
                {currentQuestion?.have_clue === true ? <FcInfo style={{cursor: "pointer"}} size="1em" onClick={() => setShowClue(true)} /> : null}
              </label>
              <Grade grade={currentQuestion?.grade} />

              {currentQuestion?.questions.map((q) => {
                return (
                  <div className="form-check" key={q.id}>
                    <label className="form-check-label" style={{ fontSize: "23px", fontWeight: "500" }}>
                      {q.text}
                    </label>
                    <div className="select-revision">
                      {q.option.errored && !!q.option.wrong ? (
                        <>
                          <div style={{ marginLeft: "10px" }}>
                            <span className="wrong-grade" style={{ textDecoration: "line-through" }}>
                              {q.option.wrong}
                            </span>
                            <MdCancel
                              style={{ marginLeft: "15px", marginRight: "15px" }}
                              size="1.2em"
                              color="red"
                            ></MdCancel>
                            <span className="good-grade">{q.option.good}</span>
                            <MdCheckCircle
                              style={{ marginLeft: "15px", marginRight: "5px" }}
                              size="1.2em"
                              color="green"
                            ></MdCheckCircle>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ marginLeft: "10px" }}>
                            <span className="wrong-grade" style={{ textDecoration: "line-through" }}>
                              {q.option.wrong}
                            </span>
                            <span className="good-grade">{q.option.good}</span>
                            <MdCheckCircle
                              style={{ marginLeft: "15px", marginRight: "5px" }}
                              size="1.2em"
                              color="green"
                            ></MdCheckCircle>
                          </div>
                        </>
                      )}
                      <BsChevronDown style={{ marginRight: "10px" }} />
                    </div>
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
