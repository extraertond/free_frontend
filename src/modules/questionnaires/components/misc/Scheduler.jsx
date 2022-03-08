import React, { useEffect, useState } from "react";
import Introduction from "../Introduction/Introduction";
import SelectOption from "../SelectOptions/SelectOption";
import SelectOptions from "../SelectOptions/SelectOptions";
import FillText from "../FillText/FillText";
import DropdownOption from "../SelectOptions/DropdownOption";
import FillTextDropdown from "../FillText/FillTextDropdown";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import DragAndDropImg from "../DragAndDrop/DragAndDropImg";
import JoinDragAndDrop from "../DragAndDrop/JoinDragAndDrop";
import JoinDragAndDropImg from "../DragAndDrop/JoinDragAndDropImg";
import { useSelector } from "react-redux";
import users from "../../../users";


const Scheduler = ({currentQuestionnaire, setCurrentQuestionnaire}) => {
  const [currentQuestion, setCurrentQuestion] = useState();
  const userLogged = useSelector(users.selectors.getUser);
  

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
          <SelectOption username={userLogged?.username} setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "MULTI_TEST" ? (
          <SelectOptions username={userLogged?.username} setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "FILL_TEXT" ? (
          <FillText username={userLogged?.username} setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "DROPDOWN_SELECT" ? (
          <DropdownOption username={userLogged?.username} setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "FILL_DROPDOWN" ? (
          <FillTextDropdown username={userLogged?.username} setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "DRAG_CATEGORIES" ? (
          <DragAndDrop username={userLogged?.username} setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "DRAG_CATEGORIES_IMG" ? (
          <DragAndDropImg username={userLogged?.username} setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "JOIN_DRAG" ? (
          <JoinDragAndDrop username={userLogged?.username} setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
        ) : currentQuestion.type === "JOIN_DRAG_IMG" ? (
          <JoinDragAndDropImg username={userLogged?.username} setCurrentQuestionnaire={setCurrentQuestionnaire} currentQuestionnaire={currentQuestionnaire} />
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
