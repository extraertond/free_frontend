import React from "react";
import { MdDelete } from "react-icons/md";
import "../../../../../../index.css";

const MonoTestBody = ({ optionsMonoTest, setOptionsMonoTest, setQuestionValue }) => {
  return (
    <>
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-6">
          <label className="form-label form-question-title">Opciones (mínimo 3, máximo 6) máximo 100 carácteres</label>
          <button
            onClick={() =>
              setOptionsMonoTest((oldOptions) => {
                let aux = [...oldOptions];
                aux.push({
                  option_id: oldOptions[oldOptions.length - 1].option_id + 1,
                  text: "",
                  deletable: true,
                  correct: false,
                });
                setQuestionValue(false, "validated");
                return aux;
              })
            }
            disabled={optionsMonoTest.length >= 6}
            className="btn btn-sm"
            style={{ width: "55px", height: "25px", marginLeft: "10px",background: "#0b1643", color: "white", fontSize: "12px"}}
          >
            Añadir
          </button>
        </div>
        <div className="col-4">
          <label className="form-label form-question-title">Opción correcta</label>
        </div>
      </div>
      {optionsMonoTest.map((q, index) => {
        return (
          <div key={index} className="row" style={{ marginTop: "5px" }}>
            <div className="col-6">
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  style={{ width: "80%" }}
                  className={`form-control ${q.errored ? "input-error" : ""}`}
                  placeholder={`Opción ${index + 1}...`}
                  maxLength={100}
                  value={q.text}
                  onChange={(e) => {
                    setOptionsMonoTest((oldOptions) => {
                      let aux = [...oldOptions];
                      setQuestionValue(false, "validated");
                      aux.forEach((a, index) => {
                        if (a.option_id === q.option_id) aux[index].text = e.target.value;
                      });
                      return aux;
                    });
                  }}
                />
                {q.deletable ? (
                  <button
                    onClick={() =>
                      setOptionsMonoTest((oldOptions) => {
                        setQuestionValue(false, "validated");
                        return oldOptions.filter((option) => option.option_id !== q.option_id);
                      })
                    }
                    className="btn btn-danger btn-sm"
                    style={{ marginLeft: "10px" }}
                  >
                    <MdDelete size="1.5em" />
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  checked={q.correct}
                  id={q.option_id}
                  value={q.option_id}
                  onChange={() => {
                    setOptionsMonoTest((oldOptions) => {
                      let aux = [...oldOptions];
                      aux.forEach((o, index) => {
                        if (o.option_id === q.option_id) aux[index].correct = true;
                        else aux[index].correct = false;
                      });
                      setQuestionValue(false, "validated");
                      return aux;
                    });
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default MonoTestBody;
