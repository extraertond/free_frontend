import React from "react";
import "../../../../../index.css";

const QuestionFooter = ({ questionType, validate }) => {
  return (
    <div className="row" style={{ textAlign: "center", marginTop: "20px" }}>
      <div className="col">
        <button disabled={questionType === "-1"} className="btn" onClick={validate} style={{border: "1.5px solid #0b1643", background: "#f4f3ef", color: "#0b1643"}}>
          Guardar cuestión
        </button>
      </div>
    </div>
  );
};
export default QuestionFooter;
