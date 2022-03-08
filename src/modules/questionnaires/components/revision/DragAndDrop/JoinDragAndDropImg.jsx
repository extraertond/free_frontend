import React, { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import InfoModal from "../../../../utils/components/Modals/InfoModal";
import Grade from "../misc/Grade";
import { MdCheckCircle } from "react-icons/md";
import "../../../../../index.css";

const JoinDragAndDropImg = ({ currentQuestionnaire }) => {
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
          <div className="container">
            <label className="form-label question-title">
              {currentQuestion?.title}{" "}
              {currentQuestion?.have_clue === true ? <FcInfo style={{cursor: "pointer"}} size="1em" onClick={() => setShowClue(true)} /> : null}
            </label>
            <Grade grade={currentQuestion?.grade} />
            <div className="row">
              <div className="col" style={{ textAlign: "center" }}>
                <ul className="task-container-vertical"></ul>
              </div>
              <div className="col" style={{ textAlign: "center" }}>
                {currentQuestion?.targetCategories.map((category, index) => {
                  return (
                    <ul className="task-container-join-img">
                      <div
                        style={{
                          fontSize: "15px",
                          marginTop: "-7px",
                          marginBottom: "4px",
                        }}
                      >
                        {category.name}
                      </div>
                      {currentQuestion?.targetCategories[index].values.map((e) => (
                       
                          <div
                            className="img-fluid rounded img-item"
                            style={{
                              backgroundImage: `url("${e.image_url}")`,
                              width: "120px",
                              height: "80px",
                              cursor: "not-allowed",
                              backgroundSize: "cover",
                              display: "flex",
                            }}
                          >
                            <MdCheckCircle
                              style={{ marginLeft: "5px", marginRight: "5px" }}
                              size="1em"
                              color="green"
                            ></MdCheckCircle>
                          </div>
                       
                      ))}
                    </ul>
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

export default JoinDragAndDropImg;
