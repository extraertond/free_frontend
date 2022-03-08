import React from "react";
import "../../../../../index.css";

const AltImage = ({ question, setQuestionValue }) => {
  return (
    <div className="row" style={{ textAlign: "unset", fontSize: "18px", marginTop: "10px" }}>
      <div className="col">
        <div style={{ display: "block !important" }}>
          <div>
            <label className="form-label form-question-title">¿Incluir imagen?</label>
          </div>
          <div className="form-check form-switch form-switch">
            <input
              onChange={() => {
                setQuestionValue("", "imageUrl");
                setQuestionValue(!question.image, "image");
              }}
              className="form-check-input"
              type="checkbox"
              checked={question.image}
            />
          </div>
        </div>
      </div>
      <div className="col-10">
        <label className="form-label form-question-title">Url de la imagen</label>
        <input
          onChange={(e) => setQuestionValue(e.target.value, "imageUrl")}
          value={question.imageUrl}
          disabled={!question.image}
          type="url"
          className={`form-control ${question.imageErrored ? "input-error" : ""}`}
          placeholder="https://imagenes.com/tigre.jpg..."
        />
      </div>
    </div>
  );
};
export default AltImage;
