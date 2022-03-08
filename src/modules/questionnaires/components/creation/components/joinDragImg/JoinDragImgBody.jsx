import React from "react";
import { MdDelete } from "react-icons/md";
import "../../../../../../index.css";

const JoinDragImgBody = ({ setQuestionValue, joinDrag, setJoinDrag  }) => {
 
  const editTo = (index, value) => {
    setQuestionValue(false, "validated");
    setJoinDrag((oldRelations) => {
      let auxRelations = [...oldRelations];
      let aux = auxRelations[index];
      aux.to = value;
      auxRelations[index] = aux;
      return auxRelations;
    });
  };

  const editFrom = (index, value) => {
    setQuestionValue(false, "validated");
    setJoinDrag((oldRelations) => {
      let auxRelations = [...oldRelations];
      let aux = auxRelations[index];
      aux.from = value;
      auxRelations[index] = aux;
      return auxRelations;
    });
  };

  const addRelation = () => {
    setQuestionValue(false, "validated");
    setJoinDrag((oldRelations) => {
      let auxRelations = [...oldRelations];
      auxRelations.push({
        id: oldRelations[oldRelations.length - 1].id + 1,
        from: "",
        fromErrored: false,
        to: "",
        toErrored: false,
        deletable: true,
      });
      return auxRelations;
    });
  };

  const deleteRelation = (index) => {
    setQuestionValue(false, "validated");
    setJoinDrag((oldRelations) => {
      let auxRelations = [...oldRelations];
      auxRelations.splice(index, 1);
      return auxRelations;
    });
  };

  return (
    <>
      {joinDrag.map((q, index) => {
        return (
          <div key={index} className="row" style={{ marginTop: "10px" }}>
            <div className="col-8" style={{ display: "flex", flexDirection: "column" }}>
              <label className="form-label form-question-title">{`Imagen ${index + 1}`}</label>
              <input
                type="text"
                className={`form-control ${q.fromErrored ? "input-error" : ""}`}
                placeholder="Url de la imagen..."
                onChange={(e) => editFrom(index, e.target.value)}
                value={q.from}
              />
            </div>
            <div className="col-3" style={{ display: "flex", flexDirection: "column" }}>
              <label className="form-label form-question-title">{`Destino ${index + 1}`}</label>
              <input
                type="text"
                className={`form-control ${q.toErrored ? "input-error" : ""}`}
                placeholder="Destino de la imagen..."
                onChange={(e) => editTo(index, e.target.value)}
                value={q.to}
              />
            </div>

            <div className="col-1">
              {q.deletable ? (
                <button
                  onClick={() => deleteRelation(index)}
                  className="btn btn-danger btn-sm"
                  style={{ marginTop: "35px" }}
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
      <div style={{ display: joinDrag.length > 5 ? "none" : "flex", marginTop: "20px" }}>
      <button onClick={addRelation} style={{background: "#0b1643", color: "white"}}  className="btn btn-sm">
          Añadir relación
        </button>
      </div>
    </>
  );
};
export default JoinDragImgBody;
