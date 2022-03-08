import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import "../../../../../../index.css";

const FillDropdownBody = ({ tokensFill, setTokensFill }) => {
  const [inputFillValue, setInputFillValue] = useState("");
  const [inputOptionValue, setInputOptionValue] = useState("");
  const [editedFill, setEditedFill] = useState(false);
  const [editedInput, setEditedInput] = useState(false);
  const [editedTokenIndex, setEditedTokenIndex] = useState();
  const [fillWidth, setFillWidth] = useState(10);
  const [optionWidth, setOptionWidth] = useState(10);
  const [temporalOptions, setTemporalOptions] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [tokenWarning, setTokenWarning] = useState(true);
  const [temporalDisabled, setTemporalDisabled] = useState(true);

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

  const enableEditOptions = (index) => {
    setEditedTokenIndex(index);
    setEditedInput(true);
    let aux = tokensFill[index];
    setInputOptionValue("");
    aux.editing = true;
    setTokensFill((oldValues) => {
      let auxArray = [...oldValues];
      auxArray[index] = aux;
      return auxArray;
    });
    setTemporalOptions([...aux.options]);
  };

  const manageTokenFill = (index, text, input) => {
    if (index !== null) {
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

  const manageOptionFill = (index, text) => {
    if (index !== null) {
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
      setTemporalOptions((oldValues) => {
        let aux;
        if (checkboxValue) {
          aux = [];
          oldValues.forEach((o) => {
            aux.push({ text: o.text, correct: false });
          });
        } else {
          aux = [...oldValues];
        }
        aux.push({ text, correct: checkboxValue });
        setTemporalDisabled(aux.length < 2 || aux.filter((o) => o.correct).length !== 1);
        setTokenWarning(verifyValidation(aux));
        return aux;
      });
      setCheckboxValue(false);
    }
    setInputOptionValue("");
    setTemporalDisabled(false);
  };

  const addInput = () => {
    setTokensFill((oldValues) => {
      let auxArray = [...oldValues];
      auxArray.push({ input: true, editing: false, options: temporalOptions });
      setTokenWarning(verifyValidation(auxArray));
      setTemporalOptions([]);
      setOptionWidth(10);
      setTemporalDisabled(false);
      setCheckboxValue(false);
      return auxArray;
    });
  };

  const editInput = () => {
    setTokensFill((oldValues) => {
      let auxArray = [...oldValues];
      const auxToken = auxArray[editedTokenIndex];
      auxToken.options = temporalOptions;
      auxToken.editing = false;
      auxArray[editedTokenIndex] = auxToken;
      setTemporalOptions([]);
      setOptionWidth(10);
      setTemporalDisabled(false);
      setCheckboxValue(false);
      setEditedInput(false);
      return auxArray;
    });
  };

  const changeHandler = (e) => {
    setFillWidth(5 + e.target.value.length);
    setInputFillValue(e.target.value);
  };

  const changeOptionHandler = (e) => {
    setOptionWidth(5 + e.target.value.length);
    setInputOptionValue(e.target.value);
  };

  const disableEditing = () => {
    setEditedTokenIndex();
    setEditedFill(false);
    setEditedInput(false);
    setTemporalOptions([]);
    setFillWidth(10);
    setInputFillValue("");
  };

  const verifyValidation = (tokens) => {
    return tokens.length >= 3 && tokens.length <= 30 && tokens.filter((o) => o.input).length !== 0;
  };

  const deleteOption = (optionIndex) => {
    setTemporalOptions((oldValues) => {
      let aux = [...oldValues];
      aux.splice(optionIndex, 1);
      return aux;
    });
  };

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
        marginRight: "0px"
      }}
    >
      <div>
        {tokensFill.map((t, index) => {
          return t.input ? (
            <>
              {t.options.map((option, i) => {
                return (
                  <>
                    <span
                    key={i}
                      style={{
                        padding: "2.25px 3px",
                        textDecoration: option.correct ? "underline" : "",
                        color: "#36b318",
                      }}
                    >
                      {option.text}
                    </span>
                    {i >= t.options.length - 1 ? (
                      <span
                        style={{
                          padding: "2.25px 3px",
                        }}
                      >
                        {!(editedFill || editedInput) && (
                          <>
                            <MdEdit
                              onClick={() => enableEditOptions(index)}
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
                    ) : (
                      <span
                        style={{
                          padding: "2.25px 3px",
                        }}
                      >
                        /
                      </span>
                    )}
                  </>
                );
              })}
            </>
          ) : (
            <>
              <span
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
                {!(editedFill || editedInput) && (
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
            <button className="btn btn-sm" style={{ marginLeft: "10px", background: "white", color: "#0b1643", border: "1.5px solid #0b1643" }} onClick={disableEditing}>
              Descartar
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: editedInput ? "none" : "flex", justifyContent: "center", marginTop: "20px" }}>
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
                style={{ marginLeft: "10px", background: "#0b1643", color: "white", borderColor: "#0b1643" }}
                onClick={() => manageTokenFill(null, inputFillValue, false)}
              >
                Añadir texto
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              {temporalOptions.map((option, j) => {
                return (
                  <>
                    <span key={j} style={{ marginLeft: "5px", textDecoration: option.correct ? "underline" : "" }}>
                      {option.text}
                    </span>
                    <MdDelete
                      onClick={() => deleteOption(j)}
                      style={{ cursor: "pointer", marginTop: "7px", marginLeft: "3px" }}
                      size="15px"
                      color="#DC3545"
                    />
                  </>
                );
              })}
              <input
                style={{ width: optionWidth + "ch", marginLeft: "10px" }}
                type="text"
                className="form-control"
                placeholder="Texto..."
                value={inputOptionValue}
                onChange={changeOptionHandler}
              />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "4px" }}>
                <label style={{ fontSize: "14px" }}>¿Correcta?</label>
                <input
                  onChange={() => {
                    setCheckboxValue(!checkboxValue);
                  }}
                  className="form-check-input"
                  type="checkbox"
                  checked={checkboxValue}
                />
              </div>
              <button
                disabled={inputOptionValue === "" || temporalOptions.length > 5}
                className="btn btn-sm"
                style={{ marginLeft: "10px", background: "#0b1643", color: "white" }}
                onClick={() => manageOptionFill(null, inputOptionValue)}
              >
                Añadir opción
              </button>
              <button
                disabled={temporalDisabled}
                className="btn btn-sm"
                style={{ marginLeft: "10px", background: "#0b1643", color: "white" }}
                onClick={editedInput ? editInput : addInput}
              >
                {editedInput ? "Guardar" : "Añadir hueco"}
              </button>
              <button
                className="btn btn-sm"
                style={{ display: !editedInput ? "none" : "", marginLeft: "10px", background: "white", color: "#0b1643", border: "1.5px solid #0b1643" }}
                onClick={disableEditing}
              >
                Descartar
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
export default FillDropdownBody;
