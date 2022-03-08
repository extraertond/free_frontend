import React, { useState } from "react";
import { MdCancel, MdCheckCircle, MdDelete, MdOpenInFull } from "react-icons/md";

import MonoTestBody from "./components/monoTest/MonoTestBody";
import MultiTestBody from "./components/multiTest/MultiTestBody";
import FillTextBody from "./components/fillText/FillTextBody";
import DropdownSelectBody from "./components/dropdownSelect/DropdownSelectBody";
import FillDropdownBody from "./components/fillDropdown/FillDropdownBody";

import AltImage from "./components/AltImage";
import HelpText from "./components/HelpText";
import QuestionHeader from "./components/QuestionHeader";
import QuestionFooter from "./components/QuestionFooter";
import {
  validateDragCategories,
  validateDragCategoriesImg,
  validateDropdownSelect,
  validateFillDropdown,
  validateFillText,
  validateJoinDrag,
  validateJoinDragImg,
  validateMonoTest,
  validateMultiTest,
} from "./utils/validationService";
import BasicModal from "../../../utils/components/Modals/BasicModal";
import DragCategoriesBody from "./components/dragCategories/DragCategoriesBody";
import DragCategoriesImgBody from "./components/dragCategoriesImg/DragCategoriesImgBody";
import JoinDragBody from "./components/joinDrag/JoinDragBody";
import JoinDragImgBody from "./components/joinDragImg/JoinDragImgBody";
import { saveQuestions } from "../../../../backend/backupService";
import "../../../../index.css";

const QuestionForm = ({ edition = false, username, question, setQuestions, index, deleteQuestion }) => {
  const [dropdownSelectQuestions, setDropdownSelectQuestions] = useState(
    question?.data?.dropdownSelectQuestions ? question.data.dropdownSelectQuestions : [
    {
      title: "",
      titleErrored: false,
      correctOptionErrored: false,
      deletable: false,
      options: [
        { text: "", deletable: false, correct: true, errored: false },
        { text: "", deletable: false, correct: false, errored: false },
      ],
    },
  ]);
  const [optionsMonoTest, setOptionsMonoTest] = useState(
    question?.data?.optionsMonoTest ? question.data.optionsMonoTest :
    [
    { option_id: 0, text: "", deletable: false, correct: true, errored: false },
    { option_id: 1, text: "", deletable: false, correct: false, errored: false },
    { option_id: 2, text: "", deletable: false, correct: false, errored: false },
  ]);
  const [optionsMultiTest, setOptionsMultiTest] = useState(
    question?.data?.optionsMultiTest ? question.data.optionsMultiTest :
    [
    { option_id: 0, text: "", deletable: false, correct: false, errored: false },
    { option_id: 1, text: "", deletable: false, correct: false, errored: false },
    { option_id: 2, text: "", deletable: false, correct: false, errored: false },
  ]);
  const [tokensFill, setTokensFill] = useState(question?.data?.tokensFill ? question.data.tokensFill : []);
  const [dragCategories, setDragCategories] = useState(
    question?.data?.dragCategories ? question.data.dragCategories :
    [
    {
      id: 0,
      title: "",
      deletable: false,
      titleErrored: false,
      options: [{ text: "", deletable: false, errored: false, option_id: 0 }],
    },
    {
      id: 1,
      title: "",
      deletable: false,
      titleErrored: false,
      options: [],
    },
  ]);
  const [joinDrag, setJoinDrag] = useState(
    question?.data?.joinDrag ? question.data.joinDrag :
    [
    { id: 0, from: "", fromErrored: false, to: "", toErrored: false, deletable: false },
    { id: 1, from: "", fromErrored: false, to: "", toErrored: false, deletable: false },
    { id: 2, from: "", fromErrored: false, to: "", toErrored: false, deletable: false },
  ]);
  const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);


  const setQuestionValue = (value, attribute) => {
    setQuestions((oldQuestions) => {
      let auxArray = [...oldQuestions];
      let auxQuestion = auxArray[index];
      auxQuestion[attribute] = value;
      if (attribute !== "validated" && attribute !== "open" && attribute !== "data") {
        auxQuestion.validated = false;
      }
      auxArray[index] = auxQuestion;
      if (!edition && attribute === 'validated' && value) {
        saveQuestions(auxArray.filter(a => a.type !== '-1' && a.validated), username);
      }
      return auxArray;
    });
  };

  const validate = () => {
    switch (question.type) {
      case "MONO_TEST":
        const validated = validateMonoTest(question, setQuestionValue, { optionsMonoTest, setOptionsMonoTest });
        setQuestionValue(validated, "validated");
        if (validated) {
          setQuestionValue({ optionsMonoTest }, "data");
          setQuestionValue(false, "open");
        }
        break;
      case "MULTI_TEST":
        const validated2 = validateMultiTest(question, setQuestionValue, { optionsMultiTest, setOptionsMultiTest });
        setQuestionValue(validated2, "validated");
        if (validated2) {
          setQuestionValue({ optionsMultiTest }, "data");
          setQuestionValue(false, "open");
        }
        break;
      case "FILL_TEXT":
        const validated3 = validateFillText(question, setQuestionValue, { tokensFill });
        setQuestionValue(validated3, "validated");
        if (validated3) {
          setQuestionValue({ tokensFill }, "data");
          setQuestionValue(false, "open");
        }
        break;
      case "DROPDOWN_SELECT":
        const validated4 = validateDropdownSelect(question, setQuestionValue, {
          dropdownSelectQuestions,
        });
        setQuestionValue(validated4, "validated");
        if (validated4) {
          setQuestionValue({ dropdownSelectQuestions }, "data");
          setQuestionValue(false, "open");
        }
        break;
      case "FILL_DROPDOWN":
        const validated5 = validateFillDropdown(question, setQuestionValue, { tokensFill });
        setQuestionValue(validated5, "validated");
        if (validated5) {
          setQuestionValue({ tokensFill }, "data");
          setQuestionValue(false, "open");
        }
        break;
      case "DRAG_CATEGORIES":
        const validated6 = validateDragCategories(question, setQuestionValue, { dragCategories });
        setQuestionValue(validated6, "validated");
        if (validated6) {
          setQuestionValue({ dragCategories }, "data");
          setQuestionValue(false, "open");
        }
        break;
      case "DRAG_CATEGORIES_IMG":
        const validated7 = validateDragCategoriesImg(question, setQuestionValue, { dragCategories });
        setQuestionValue(validated7, "validated");
        if (validated7) {
          setQuestionValue({ dragCategories }, "data");
          setQuestionValue(false, "open");
        }
        break;
      case "JOIN_DRAG":
        const validated8 = validateJoinDrag(question, setQuestionValue, { joinDrag });
        setQuestionValue(validated8, "validated");
        if (validated8) {
          setQuestionValue({ joinDrag }, "data");
          setQuestionValue(false, "open");
        }
        break;
      case "JOIN_DRAG_IMG":
        const validated9 = validateJoinDragImg(question, setQuestionValue, { joinDrag });
        setQuestionValue(validated9, "validated");
        if (validated9) {
          setQuestionValue({ joinDrag }, "data");
          setQuestionValue(false, "open");
        }
        break;
      default:
        break;
    }
  };

  const cleanForm = () => {
    setOptionsMultiTest([
      { option_id: 0, text: "", deletable: false, correct: false, errored: false },
      { option_id: 1, text: "", deletable: false, correct: false, errored: false },
      { option_id: 2, text: "", deletable: false, correct: false, errored: false },
    ]);
    setOptionsMonoTest([
      { option_id: 0, text: "", deletable: false, correct: true, errored: false },
      { option_id: 1, text: "", deletable: false, correct: false, errored: false },
      { option_id: 2, text: "", deletable: false, correct: false, errored: false },
    ]);
    setDropdownSelectQuestions([
      {
        title: "",
        titleErrored: false,
        correctOptionErrored: false,
        deletable: false,
        options: [
          { text: "", deletable: false, correct: true, errored: false },
          { text: "", deletable: false, correct: false, errored: false },
        ],
      },
    ]);
    setDragCategories([
      {
        id: 0,
        title: "",
        deletable: false,
        titleErrored: false,
        options: [{ text: "", deletable: false, errored: false, option_id: 0 }],
      },
      {
        id: 1,
        title: "",
        deletable: false,
        titleErrored: false,
        options: [],
      },
    ]);
    setJoinDrag([
      { id: 0, from: "", fromErrored: false, to: "", toErrored: false, deletable: false },
      { id: 1, from: "", fromErrored: false, to: "", toErrored: false, deletable: false },
      { id: 2, from: "", fromErrored: false, to: "", toErrored: false, deletable: false },
    ]);
    setTokensFill([]);
    setQuestionValue("-1", "type");
    setQuestionValue("", "title");
    setQuestionValue("", "helpText");
    setQuestionValue(false, "help");
    setQuestionValue(false, "helpErrored");
    setQuestionValue(false, "imageErrored");
    setQuestionValue(false, "titleErrored");
    setQuestionValue(false, "image");
    setQuestionValue("", "imageUrl");
  };

  return (
    <div className="question-container">
      <BasicModal
        title="Descartar pregunta"
        body="¿Seguro que deseas descartar la pregunta? No podrá recuperarse."
        show={showDeleteQuestionModal}
        setShow={setShowDeleteQuestionModal}
        acceptCallback={() => deleteQuestion(index)}
      ></BasicModal>
      {question.open ? (
        <>
          <QuestionHeader
            question={question}
            index={index}
            questionType={question.type}
            setQuestionType={setQuestionValue}
            cleanForm={cleanForm}
            setQuestionValue={setQuestionValue}
            deleteQuestion={deleteQuestion}
          ></QuestionHeader>
          <HelpText question={question} setQuestionValue={setQuestionValue}></HelpText>
          {question.type === "MONO_TEST" ? (
            <>
              <AltImage question={question} setQuestionValue={setQuestionValue}></AltImage>
              <MonoTestBody
                optionsMonoTest={optionsMonoTest}
                setOptionsMonoTest={setOptionsMonoTest}
                setQuestionValue={setQuestionValue}
              ></MonoTestBody>
            </>
          ) : question.type === "MULTI_TEST" ? (
            <>
              <AltImage question={question} setQuestionValue={setQuestionValue}></AltImage>
              <MultiTestBody
                optionsMultiTest={optionsMultiTest}
                setOptionsMultiTest={setOptionsMultiTest}
                setQuestionValue={setQuestionValue}
              ></MultiTestBody>
            </>
          ) : question.type === "FILL_TEXT" ? (
            <>
              <AltImage question={question} setQuestionValue={setQuestionValue}></AltImage>
              <FillTextBody tokensFill={tokensFill} setTokensFill={setTokensFill}></FillTextBody>
            </>
          ) : question.type === "DROPDOWN_SELECT" ? (
            <>
              <AltImage question={question} setQuestionValue={setQuestionValue}></AltImage>
              <DropdownSelectBody
                setQuestionValue={setQuestionValue}
                dropdownSelectQuestions={dropdownSelectQuestions}
                setDropdownSelectQuestions={setDropdownSelectQuestions}
              ></DropdownSelectBody>
            </>
          ) : question.type === "FILL_DROPDOWN" ? (
            <>
              <AltImage question={question} setQuestionValue={setQuestionValue}></AltImage>
              <FillDropdownBody tokensFill={tokensFill} setTokensFill={setTokensFill}></FillDropdownBody>
            </>
          ) : question.type === "DRAG_CATEGORIES" ? (
            <DragCategoriesBody
              setQuestionValue={setQuestionValue}
              dragCategories={dragCategories}
              setDragCategories={setDragCategories}
            ></DragCategoriesBody>
          ) : question.type === "DRAG_CATEGORIES_IMG" ? (
            <DragCategoriesImgBody
              setQuestionValue={setQuestionValue}
              dragCategories={dragCategories}
              setDragCategories={setDragCategories}
            ></DragCategoriesImgBody>
          ) : question.type === "JOIN_DRAG" ? (
            <>
              <JoinDragBody
                setQuestionValue={setQuestionValue}
                joinDrag={joinDrag}
                setJoinDrag={setJoinDrag}
              ></JoinDragBody>
            </>
          ) : question.type === "JOIN_DRAG_IMG" ? (
            <>
              <JoinDragImgBody
                setQuestionValue={setQuestionValue}
                joinDrag={joinDrag}
                setJoinDrag={setJoinDrag}
              ></JoinDragImgBody>
            </>
          ) : question.type === "JOIN_ARROWS" ? (
            <></>
          ) : (
            <></>
          )}
          <QuestionFooter questionType={question.type} validate={validate}></QuestionFooter>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h4>
              <u>Cuestión {index + 1}</u>
              {question.validated ? (
                <>
                  <MdCheckCircle style={{ marginLeft: "15px", marginRight: "5px" }} color="green"></MdCheckCircle>
                  <span style={{ color: "green", fontSize: "15px" }}>Pregunta validada</span>
                </>
              ) : (
                <>
                  <MdCancel style={{ marginLeft: "15px", marginRight: "5px" }} size="0.7em" color="red"></MdCancel>
                  <span style={{ color: "red", fontSize: "15px" }}>Pregunta no validada</span>
                </>
              )}
            </h4>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => setQuestionValue(true, "open")} style={{background: "#0b1643", color: "white"}} className="btn btn-sm">
              <MdOpenInFull size="1.3em"></MdOpenInFull>
            </button>
            <button
              style={{ marginLeft: "15px" }}
              onClick={() => {setShowDeleteQuestionModal(true)}}
              className="btn btn-danger btn-sm"
            >
              <MdDelete size="1.3em"></MdDelete>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default QuestionForm;
