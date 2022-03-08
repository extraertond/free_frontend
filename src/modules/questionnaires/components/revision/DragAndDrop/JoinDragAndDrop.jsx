import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FcInfo } from "react-icons/fc";
import InfoModal from "../../../../utils/components/Modals/InfoModal";
import { MdCheckCircle } from "react-icons/md";
import Grade from "../misc/Grade";
import "../../../../../index.css";

const JoinDragAndDrop = ({ currentQuestionnaire }) => {
  useEffect(() => {
    setCurrentQuestion(currentQuestionnaire?.questions[currentQuestionnaire?.question_id]);
  }, [currentQuestionnaire]);

  const [currentQuestion, setCurrentQuestion] = useState();
  const [showClue, setShowClue] = useState(false);

  const onDragEnd = () => {
    return;
  };

  return (
    <div>
      <InfoModal
        show={showClue}
        setShow={setShowClue}
        title={"Ayuda"}
        body={currentQuestion?.clue}
        accepText={"Aceptar"}
      />
      <DragDropContext onDragEnd={onDragEnd}>
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
                <div className="col">
                  {currentQuestion?.targetCategories.map((category, index) => {
                    return (
                      <Droppable key={index} droppableId={category.id.toString()} direction="horizontal">
                        {(droppableProvided) => (
                          <ul
                            {...droppableProvided.droppableProps}
                            ref={droppableProvided.innerRef}
                            className="task-container-join"
                          >
                            <div
                              style={{
                                fontSize: "15px",
                                marginTop: "-7px",
                                marginBottom: "-4px",
                              }}
                            >
                              {category.name}
                            </div>
                            {currentQuestion?.targetCategories[index].values.map((e) => (
                              <li className="task-item-revision">
                                {e.text}
                                <MdCheckCircle
                                  style={{ marginLeft: "5px", marginRight: "5px" }}
                                  size="1em"
                                  color="green"
                                ></MdCheckCircle>
                              </li>
                            ))}
                            {droppableProvided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default JoinDragAndDrop;
