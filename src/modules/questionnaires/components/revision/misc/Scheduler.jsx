import React, { useEffect, useState } from "react";
import Introduction from "../../Introduction/Introduction";
import SelectOption from "../SelectOptions/SelectOption";
import SelectOptions from "../SelectOptions/SelectOptions";
import FillText from "../FillText/FillText";
import DropdownOption from "../SelectOptions/DropdownOption";
import FillTextDropdown from "../FillText/FillTextDropdown";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import DragAndDropImg from "../DragAndDrop/DragAndDropImg";
import JoinDragAndDrop from "../DragAndDrop/JoinDragAndDrop";
import JoinDragAndDropImg from "../DragAndDrop/JoinDragAndDropImg";

const Scheduler = ({currentQuestionnaire, setCurrentQuestionnaire}) => {
  const [currentQuestion, setCurrentQuestion] = useState();

  useEffect(() => {
    if (currentQuestionnaire?.question_id !== -1) {
      setCurrentQuestion(currentQuestionnaire?.questions[currentQuestionnaire?.question_id]);
    }
  }, [currentQuestionnaire]);

  return (
    <div style={{ paddingBottom: "100px" }}>
      {currentQuestionnaire?.question_id === -1 ? (
        <Introduction text={currentQuestionnaire?.description_test} setCurrentQuestionnaire={setCurrentQuestionnaire} />
      ) : currentQuestion ? (
        currentQuestion.type === "MONO_TEST" ? (
          <SelectOption setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "MULTI_TEST" ? (
          <SelectOptions setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "FILL_TEXT" ? (
          <FillText setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "DROPDOWN_SELECT" ? (
          <DropdownOption setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "FILL_DROPDOWN" ? (
          <FillTextDropdown setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "DRAG_CATEGORIES" ? (
          <DragAndDrop setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "DRAG_CATEGORIES_IMG" ? (
          <DragAndDropImg setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "JOIN_DRAG" ? (
          <JoinDragAndDrop setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "JOIN_DRAG_IMG" ? (
          <JoinDragAndDropImg setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Scheduler;
