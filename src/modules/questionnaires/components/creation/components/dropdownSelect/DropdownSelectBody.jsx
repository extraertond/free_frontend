import React from "react";
import { MdDelete } from "react-icons/md";

import "../../../../../../index.css";

const DropdownSelectBody = ({ setQuestionValue, dropdownSelectQuestions, setDropdownSelectQuestions }) => {
  const editTitle = (index, value) => {
    setQuestionValue(false, "validated");
    setDropdownSelectQuestions((oldQuestions) => {
      let auxArray = [...oldQuestions];
      let aux = auxArray[index];
      aux.title = value;
      auxArray[index] = aux;
      return auxArray;
    });
  };

  const editOption = (questionIndex, optionIndex, attribute, value) => {
    setQuestionValue(false, "validated");
    setDropdownSelectQuestions((oldQuestions) => {
      let auxQuestions = [...oldQuestions];
      let auxQuestion = auxQuestions[questionIndex];
      let auxOptions = [...auxQuestion.options];
      let auxOption = auxOptions[optionIndex];
      if (attribute === "correct") {
        let auxArray = [];
        auxOptions.forEach((option) => {
          option.correct = false;
          auxArray.push(option);
        });
        auxOptions = [...auxArray];
      }
      auxOption[attribute] = value;
      auxOptions[optionIndex] = auxOption;
      auxQuestion.options = auxOptions;
      auxQuestions[questionIndex] = auxQuestion;

      return auxQuestions;
    });
  };

  const addOption = (questionIndex) => {
    setQuestionValue(false, "validated");
    setDropdownSelectQuestions((oldQuestions) => {
      let auxQuestions = [...oldQuestions];
      let auxQuestion = { ...auxQuestions[questionIndex] };
      let auxOptions = [...auxQuestion.options];
      auxOptions.push({ text: "", deletable: auxOptions.length >= 2, correct: false, errored: false });
      auxQuestion.options = [...auxOptions];
      auxQuestions[questionIndex] = { ...auxQuestion };
      return auxQuestions;
    });
  };

  const deleteOption = (questionIndex, optionIndex) => {
    setQuestionValue(false, "validated");
    setDropdownSelectQuestions((oldQuestions) => {
      let auxQuestions = [...oldQuestions];
      let auxQuestion = { ...auxQuestions[questionIndex] };
      let auxOptions = [...auxQuestion.options];
      auxOptions.splice(optionIndex, 1);
      auxQuestion.options = [...auxOptions];
      auxQuestions[questionIndex] = { ...auxQuestion };
      return auxQuestions;
    });
  };

  const addQuestion = () => {
    setQuestionValue(false, "validated");
    setDropdownSelectQuestions((oldQuestions) => {
      let auxQuestions = [...oldQuestions];

      auxQuestions.push({
        title: "",
        titleErrored: false,
        correctOptionErrored: false,
        deletable: true,
        options: [
          { text: "", deletable: false, correct: true, errored: false },
          { text: "", deletable: false, correct: false, errored: false },
        ],
      });
      return auxQuestions;
    });
  };

  const deleteQuestion = (questionIndex) => {
    setQuestionValue(false, "validated");
    setDropdownSelectQuestions((oldQuestions) => {
      let auxQuestions = [...oldQuestions];
      auxQuestions.splice(questionIndex, 1);
      return auxQuestions;
    });
  };

  return (
    <>
      {dropdownSelectQuestions.map((q, index) => {
        return (
          <div key={index} className="row" style={{ marginTop: "20px" }}>
            <div className="col-3" style={{ display: "flex", flexDirection: "column" }}>
              <label className="form-label form-question-title">{`Pregunta ${index + 1} - Título`}</label>
              <textarea
                type="text"
                className={`form-control ${q.titleErrored ? "input-error" : ""}`}
                placeholder="Título de la pregunta..."
                onChange={(e) => editTitle(index, e.target.value)}
                value={q.title}
              ></textarea>
            </div>
            <div className="col-1">
              {q.deletable ? (
                <button
                  onClick={() => deleteQuestion(index)}
                  className="btn btn-danger btn-sm"
                  style={{ marginTop: "35px" }}
                >
                  <MdDelete size="1.5em" />
                </button>
              ) : (
                <></>
              )}
            </div>
            <div className="col-8">
              <div className="row">
                <div className="col-8">
                  <label className="form-label form-question-title">Opciones (Mínimo 2 y máximo 10)</label>
                </div>
                <div className="col-2">
                  <label className="form-label form-question-title">Opción correcta</label>
                </div>
              </div>
              {q.options.map((o, i) => {
                return (
                  <div key={i} className="row">
                    <div className="col-8">
                      <input
                        type="text"
                        className={`form-control ${o.errored ? "input-error" : ""}`}
                        placeholder={`Opción ${i + 1}`}
                        style={{ marginBottom: "5px" }}
                        onChange={(e) => editOption(index, i, "text", e.target.value)}
                        value={o.text}
                      />
                    </div>
                    <div className="col-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`exampleRadios${index}`}
                        id={index}
                        checked={o.correct}
                        onClick={() => {
                          editOption(index, i, "correct", true);
                        }}
                      />
                    </div>
                    <div className="col">
                      {o.deletable ? (
                        <button
                          onClick={() => deleteOption(index, i)}
                          className="btn btn-danger btn-sm"
                          style={{ marginTop: "5px" }}
                        >
                          <MdDelete size="1.5em" />
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="row" style={{ justifyContent: "space-between", display: q.options.length > 9 ? "none" : "flex" }}>
                <div className="col-8">
                  <button onClick={() => addOption(index)} style={{background: "#0b1643", color: "white"}} className="btn btn-sm">
                    Añadir opción
                  </button>
                </div>
                <div className="col">
                  <div style={{display: q.correctOptionErrored ? 'flex' : 'none', color: "red", marginTop: "10px"}}>
                    Debes seleccionar una opción
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div style={{ display: dropdownSelectQuestions.length > 5 ? "none" : "flex", marginTop: "20px" }}>
        <button onClick={addQuestion} style={{background: "#0b1643", color: "white"}} className="btn btn-sm">
          Añadir pregunta
        </button>
      </div>
    </>
  );
};
export default DropdownSelectBody;
