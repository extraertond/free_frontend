import React from "react";
import "../../../../../index.css";

const HelpText = ({question, setQuestionValue}) => {
  return (
    <>
      <div className="row" style={{ textAlign: "unset", fontSize: "18px", marginTop: "10px" }}>
        <div className="col">
          <div style={{ display: "block !important" }}>
            <div>
              <label className="form-label form-question-title">¿Incluir ayuda?</label>
            </div>
            <div className="form-check form-switch form-switch">
              <input
                onChange={() => {
                  setQuestionValue("", "helpText");
                  setQuestionValue(!question.help, "help");
                }}
                className="form-check-input"
                type="checkbox"
                checked={question.help}
              />
            </div>
          </div>
        </div>
        <div className="col-10">
          <label className="form-label form-question-title">Texto de ayuda</label>
          <input
            onChange={(e) => setQuestionValue(e.target.value, "helpText")}
            value={question.helpText}
            disabled={!question.help}
            type="text"
            className={`form-control ${question.helpErrored ? "input-error" : ""}`}
            placeholder="Puedes buscar ayuda en el tema 2 del libro..."
          />
        </div>
      </div>
    </>
  );
};
export default HelpText;
