import React, { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import InfoModal from "../../../../utils/components/Modals/InfoModal";
import Grade from "../misc/Grade";
import "../../../../../index.css";

const DragAndDrop = ({ currentQuestionnaire }) => {
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
        <div className="col">
          <div className="container" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <label className="form-label question-title">
              {currentQuestion?.title}{" "}
              {currentQuestion?.have_clue === true ? <FcInfo style={{cursor: "pointer"}} size="1em" onClick={() => setShowClue(true)} /> : null}
            </label>
            <Grade grade={currentQuestion?.grade} />
            <div className="row">
              <div className="col-4" style={{ textAlign: "center" }}>
                <ul className="task-container-vertical">
                </ul>
              </div>
              <div className="col" style={{ textAlign: "center" }}>
                {currentQuestion?.targetCategories.map((category, index) => {
                  return (
                    <div className="row categories-row">
                      <label style={{ fontSize: "20px" }}>
                        <b>{category.name}</b>
                      </label>

                      <ul className="task-container-horizontal">
                        {currentQuestion?.targetCategories[index].values.map((e) => (
                          <li className="task-item-revision">{e.text}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
