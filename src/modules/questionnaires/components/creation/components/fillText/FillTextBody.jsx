import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import "../../../../../../index.css";

const FillTextBody = ({ tokensFill, setTokensFill }) => {
  const [inputFillValue, setInputFillValue] = useState("");
  const [editedFill, setEditedFill] = useState(false);
  const [editedTokenIndex, setEditedTokenIndex] = useState();
  const [fillWidth, setFillWidth] = useState(10);

  const enableEditTokenFill = (index) => {
    setEditedTokenIndex(index);
    setEditedFill(true);
    let aux = tokensFill[index];
    setInputFillValue(aux.text);
    setFillWidth(aux.text.length + 5);
    aux.editing = true;
    setTokensFill((oldValues) => {
      let auxArray = [...oldValues];
      auxArray[index] = aux;
      return auxArray;
    });
  };

  const manageTokenFill = (index, text, input) => {
    if (index != undefined) {
      setEditedTokenIndex();
      setEditedFill(false);
      let aux = tokensFill[index];
      aux.text = text;
      setTokensFill((oldValues) => {
        let auxArray = [...oldValues];
        auxArray[index] = aux;
        setTokenWarning(verifyValidation(auxArray));
        return auxArray;
      });
    } else {
      setTokensFill((oldValues) => {
        let aux = [...oldValues];
        aux.push({ text, input, editing: false });
        setTokenWarning(verifyValidation(aux));
        return aux;
      });
    }
    setInputFillValue("");
    setFillWidth(10);
  };

  const deleteTokenFill = (index) => {
    setTokensFill((oldValues) => {
      let aux = [...oldValues];
      aux.splice(index, 1);
      setTokenWarning(verifyValidation(aux));
      return aux;
    });
  };

  const changeHandler = (e) => {
    setFillWidth(5 + e.target.value.length);
    setInputFillValue(e.target.value);
  };

  const disableEditing = () => {
    setEditedTokenIndex();
    setEditedFill(false);
    setFillWidth(10);
    setInputFillValue("");
  };

  const verifyValidation = (tokens) => {
    return tokens.length >= 3 && tokens.length <= 30 && tokens.filter((o) => o.input).length !== 0;
  };

  const [tokenWarning, setTokenWarning] = useState(true);

  return (
    <div
      className="row"
      style={{
        textAlign: "unset",
        fontSize: "18px",
        marginTop: "20px",
        background: "#F6F6F6",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "20px",
        marginLeft: "0px",
        marginRight: "0px",
      }}
    >
      <div>
        {tokensFill.map((t, index) => {
          return t.input ? (
            <>
              <span
                key={index}
                style={{
                  padding: "2.25px 3px",
                  color: "#36b318",
                }}
              >
                {t.text}
              </span>
              <span
                style={{
                  padding: "2.25px 3px",
                }}
              >
                {!editedFill && (
                  <>
                    <MdEdit
                      onClick={() => enableEditTokenFill(index)}
                      style={{ cursor: "pointer" }}
                      size="15px"
                      color="#0B5ED7"
                    />
                    <MdDelete
                      onClick={() => deleteTokenFill(index)}
                      style={{ cursor: "pointer" }}
                      size="15px"
                      color="#DC3545"
                    />
                  </>
                )}
              </span>
            </>
          ) : (
            <>
              <span
                key={index}
                style={{
                  padding: "2.25px 3px",
                }}
              >
                {t.text}
              </span>
              <span
                style={{
                  padding: "2.25px 3px",
                }}
              >
                {!editedFill && (
                  <>
                    <MdEdit
                      onClick={() => enableEditTokenFill(index)}
                      style={{ cursor: "pointer" }}
                      size="15px"
                      color="#0B5ED7"
                    />
                    <MdDelete
                      onClick={() => deleteTokenFill(index)}
                      style={{ cursor: "pointer" }}
                      size="15px"
                      color="#DC3545"
                    />
                  </>
                )}
              </span>
            </>
          );
        })}
        {editedFill ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <input
              style={{ width: fillWidth + "ch", marginLeft: "10px" }}
              type="text"
              className="form-control"
              placeholder="Texto..."
              value={inputFillValue}
              onChange={changeHandler}
            />
            <button
              className="btn btn-sm"
              disabled={inputFillValue === ""}
              style={{ marginLeft: "10px", background: "#0b1643", color: "white" }}
              onClick={() => manageTokenFill(editedTokenIndex, inputFillValue, null)}
            >
              Guardar
            </button>
            <button
              className="btn btn-sm"
              style={{ marginLeft: "10px", background: "white", color: "#0b1643", border: "1.5px solid #0b1643" }}
              onClick={disableEditing}
            >
              Descartar
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <input
                style={{ width: fillWidth + "ch", marginLeft: "10px" }}
                type="text"
                className="form-control"
                placeholder="Texto..."
                value={inputFillValue}
                onChange={changeHandler}
              />
              <button
                disabled={inputFillValue === ""}
                className="btn btn-sm"
                style={{ marginLeft: "10px", background: "#0b1643", color: "white" }}
                onClick={() => manageTokenFill(null, inputFillValue, false)}
              >
                Añadir como texto
              </button>
              <button
                disabled={inputFillValue === ""}
                className="btn btn-sm"
                style={{ marginLeft: "10px", background: "#0b1643", color: "white" }}
                onClick={() => manageTokenFill(null, inputFillValue, true)}
              >
                Añadir como hueco
              </button>
            </div>
            <div
              hidden={tokenWarning}
              style={{ display: "flex", justifyContent: "center", color: "red", fontSize: "12px", marginTop: "10px" }}
            >
              Debes añadir entre 3 y 30 cadenas de texto y al menos uno debe ser como hueco
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FillTextBody;
