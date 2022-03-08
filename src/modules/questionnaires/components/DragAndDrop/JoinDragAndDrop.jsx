import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FcInfo } from "react-icons/fc";
import InfoModal from "../../../utils/components/Modals/InfoModal";
import { saveQuestionnaire } from "../../../../backend/backupService";
import "../../../../index.css";

const JoinDragAndDrop = ({ username, currentQuestionnaire, setCurrentQuestionnaire }) => {
  useEffect(() => {
    setCurrentQuestion(currentQuestionnaire?.questions[currentQuestionnaire?.question_id]);
  }, [currentQuestionnaire]);

  const [currentQuestion, setCurrentQuestion] = useState();
  const [showClue, setShowClue] = useState(false);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }
    dragElement(currentQuestion?.id, source, destination);
  };

  const dragElement = (questionId, source, destination) => {
    setCurrentQuestionnaire((oldQuestionnaire) => {
      const auxQuestions = oldQuestionnaire.questions;
      let question = auxQuestions.find((e) => e.id === questionId);
      const destiny = question.targetCategories.find((tc) => tc.id === parseInt(destination.droppableId));
      if (destination.droppableId !== "options" && destiny.values.length > 0) {
        return oldQuestionnaire;
      }
      if (source.droppableId === destination.droppableId) {
        if (source.droppableId === "options") {
          const result = [...question.options];
          const [removed] = result.splice(source.index, 1);
          result.splice(destination.index, 0, removed);
          question.options = result;
        } else {
          let auxTargetCategory = question.targetCategories.find((tc) => tc.id === parseInt(source.droppableId));
          const result = [...auxTargetCategory.values];
          const [removed] = result.splice(source.index, 1);
          result.splice(destination.index, 0, removed);
          auxTargetCategory.values = result;
        }
      } else {
        let auxSource = question.targetCategories.find((tc) => tc.id === parseInt(source.droppableId));
        let auxDestination = question.targetCategories.find((tc) => tc.id === parseInt(destination.droppableId));

        const sourceClone =
          source.droppableId === "options" ? Array.from(question.options) : Array.from(auxSource.values);
        const destClone =
          destination.droppableId === "options" ? Array.from(question.options) : Array.from(auxDestination.values);
        const [removed] = sourceClone.splice(source.index, 1);
        destClone.splice(destination.index, 0, removed);

        source.droppableId === "options" ? (question.options = sourceClone) : (auxSource.values = sourceClone);
        destination.droppableId === "options" ? (question.options = destClone) : (auxDestination.values = destClone);
      }
      if (question.options.length === 0) {
        question.answered = true;
      }
      setCurrentQuestion({ ...question });
      oldQuestionnaire.questions = auxQuestions;
      saveQuestionnaire(oldQuestionnaire, username);
      return oldQuestionnaire;
    });
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
                {currentQuestion?.have_clue === true ? (
                  <FcInfo style={{ cursor: "pointer" }} size="1em" onClick={() => setShowClue(true)} />
                ) : null}
              </label>
              <div className="row">
                <div className="col" style={{ textAlign: "center" }}>
                  <Droppable droppableId="options">
                    {(droppableProvided) => (
                      <ul
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        className="task-container-vertical"
                      >
                        {currentQuestion?.options.map((e, index) => (
                          <Draggable key={e.id} draggableId={e.id.toString()} index={index}>
                            {(draggableProvided) => (
                              <li
                                {...draggableProvided.draggableProps}
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.dragHandleProps}
                                className="task-item"
                              >
                                {e.text}
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {droppableProvided.placeholder}
                      </ul>
                    )}
                  </Droppable>
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
                            {currentQuestion?.targetCategories[index].values.map((e, index) => (
                              <Draggable key={e.id} draggableId={e.id.toString()} index={index}>
                                {(draggableProvided) => (
                                  <li
                                    {...draggableProvided.draggableProps}
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.dragHandleProps}
                                    className="task-item"
                                  >
                                    {e.text}
                                  </li>
                                )}
                              </Draggable>
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
