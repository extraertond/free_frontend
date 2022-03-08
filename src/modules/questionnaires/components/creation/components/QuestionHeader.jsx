import React, { useState } from "react";
import { MdCancel, MdCheckCircle, MdCloseFullscreen, MdDelete, MdOpenInFull } from "react-icons/md";
import BasicModal from "../../../../utils/components/Modals/BasicModal";
import "../../../../../index.css";

const QuestionHeader = ({
  question,
  index,
  questionType,
  setQuestionType,
  cleanForm,
  setQuestionValue,
  deleteQuestion,
}) => {
  const question_types = [
    { type: "MONO_TEST", name: "Tipo test con una opción" },
    { type: "MULTI_TEST", name: "Tipo test con múltiples opciones" },
    { type: "FILL_TEXT", name: "Rellenar huecos en un texto escribiendo" },
    { type: "FILL_DROPDOWN", name: "Rellenar huecos en un texto seleccionado de un desplegable" },
    { type: "DROPDOWN_SELECT", name: "Seleccionar de un desplegable" },
    { type: "DRAG_CATEGORIES", name: "Mover opciones a sus categorías" },
    { type: "DRAG_CATEGORIES_IMG", name: "Mover imágenes a sus categorías" },
    { type: "JOIN_DRAG", name: "Relacionar opción con su destino" },
    { type: "JOIN_DRAG_IMG", name: "Relacionar imagen con su destino" },
  ];
  const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);

  return (
    <>
      <BasicModal
        title="Descartar pregunta"
        body="¿Seguro que deseas descartar la pregunta? No podrá recuperarse."
        show={showDeleteQuestionModal}
        setShow={setShowDeleteQuestionModal}
        acceptCallback={() => deleteQuestion(index)}
      ></BasicModal>
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
          {question.open ? (
            <>
              <button
                style={{ background: "#0b1643", color: "white" }}
                onClick={() => setQuestionValue(false, "open")}
                className="btn btn-sm"
              >
                <MdCloseFullscreen size="1.3em"></MdCloseFullscreen>
              </button>
              <button
                style={{ marginLeft: "15px" }}
                onClick={() => setShowDeleteQuestionModal(true)}
                className="btn btn-danger btn-sm"
              >
                <MdDelete size="1.3em"></MdDelete>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setQuestionValue(true, "open")} className="btn btn-sm">
                <MdOpenInFull size="1.3em"></MdOpenInFull>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="row" style={{ textAlign: "unset", fontSize: "18px" }}>
        <div className="col">
          <label className="form-label form-question-title">Tipo de pregunta</label>
          <select
            className="form-select"
            value={questionType}
            onChange={(e) => {
              cleanForm();
              setQuestionType(e.target.value, "type");
            }}
          >
            <option defaultValue value="-1">
              Elegir...
            </option>
            {question_types.map((q) => {
              return (
                <option key={q.type} value={q.type}>
                  {q.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col">
          <label className="form-label form-question-title">Título de la pregunta</label>
          <input
            type="text"
            className={`form-control ${question.titleErrored ? "input-error" : ""}`}
            placeholder="Título de la pregunta..."
            value={question.title}
            onChange={(e) => setQuestionValue(e.target.value, "title")}
          />
        </div>
      </div>
    </>
  );
};
export default QuestionHeader;
