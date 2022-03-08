import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FcInfo } from "react-icons/fc";
import InfoModal from "../../../../utils/components/Modals/InfoModal";
import Grade from "../misc/Grade";
import { MdCheckCircle } from "react-icons/md";
import "../../../../../index.css";

const DragAndDropImg = ({ currentQuestionnaire, setCurrentQuestionnaire }) => {
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
                <div className="col-4" style={{ textAlign: "center" }}>
                  <Droppable droppableId="options">
                    {(droppableProvided) => (
                      <ul
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        className="task-container-vertical"
                      >
                        {droppableProvided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>
                <div className="col" style={{ textAlign: "center" }}>
                  {currentQuestion?.targetCategories.map((category, index) => {
                    return (
                      <div className="row categories-row">
                        <label style={{ fontSize: "17px" }}>
                          <b>{category.name}</b>
                        </label>
                        <Droppable
                          droppableId={category.id.toString()}
                          direction={window?.screen?.width > 768 ? "horizontal" : "vertical"}
                        >
                          {(droppableProvided) => (
                            <ul
                              {...droppableProvided.droppableProps}
                              ref={droppableProvided.innerRef}
                              className="task-container-horizontal"
                            >
                              {currentQuestion?.targetCategories[index].values.map((e, index) => (
                                <li className="task-item-img">
                                  <div
                                    className="img-fluid rounded img-item"
                                    style={{
                                      backgroundImage: `url("${e.image_url}")`,
                                      width: "120px",
                                      height: "80px",
                                      backgroundRepeat: "no-repeat",
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
                                </li>
                              ))}
                            </ul>
                          )}
                        </Droppable>
                      </div>
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

export default DragAndDropImg;
