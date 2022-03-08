import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import "../../../../../../index.css";

const DragCategoriesImgBody = ({ setQuestionValue, dragCategories, setDragCategories }) => {
  const [countWarning, setCountWarning] = useState(true);

  const editTitle = (index, value) => {
    setQuestionValue(false, "validated");
    setDragCategories((oldCategories) => {
      let auxArray = [...oldCategories];
      let aux = auxArray[index];
      aux.title = value;
      auxArray[index] = aux;
      return auxArray;
    });
  };

  const editOption = (categoryIndex, optionIndex, attribute, value) => {
    setQuestionValue(false, "validated");
    setDragCategories((oldCategories) => {
      let auxCategories = [...oldCategories];
      let auxCategory = auxCategories[categoryIndex];
      let auxOptions = [...auxCategory.options];
      let auxOption = auxOptions[optionIndex];
      auxOption[attribute] = value;
      auxOptions[optionIndex] = auxOption;
      auxCategory.options = auxOptions;
      auxCategories[categoryIndex] = auxCategory;

      return auxCategories;
    });
  };

  const addOption = (categoryIndex) => {
    setQuestionValue(false, "validated");
    setDragCategories((oldCategories) => {
      let auxCategories = [...oldCategories];
      let auxCategory = { ...auxCategories[categoryIndex] };
      let auxOptions = [...auxCategory.options];
      auxOptions.push({ option_id: auxOptions.length, text: "", deletable: true, errored: false });
      auxCategory.options = [...auxOptions];
      auxCategories[categoryIndex] = { ...auxCategory };
      _countOptions(auxCategories);
      return auxCategories;
    });
  };

  const deleteOption = (categoryIndex, optionIndex) => {
    setQuestionValue(false, "validated");
    setDragCategories((oldCategories) => {
      let auxCategories = [...oldCategories];
      let auxCategory = { ...auxCategories[categoryIndex] };
      let auxOptions = [...auxCategory.options];
      auxOptions.splice(optionIndex, 1);
      auxCategory.options = [...auxOptions];
      auxCategories[categoryIndex] = { ...auxCategory };
      _countOptions(auxCategories);
      return auxCategories;
    });
  };

  const addCategory = () => {
    setQuestionValue(false, "validated");
    setDragCategories((oldCategories) => {
      let auxCategories = [...oldCategories];
      auxCategories.push({
        id: oldCategories[oldCategories.length - 1].id + 1,
        title: "",
        deletable: true,
        titleErrored: false,
        options: [{ text: "", deletable: true, errored: false }],
      });
      _countOptions(auxCategories);
      return auxCategories;
    });
  };

  const deleteCategory = (categoryIndex) => {
    setQuestionValue(false, "validated");
    setDragCategories((oldCategories) => {
      let auxCategories = [...oldCategories];
      auxCategories.splice(categoryIndex, 1);
      _countOptions(auxCategories);
      return auxCategories;
    });
  };

  const _countOptions = (categories) => {
    let totalOptions = 0;
    categories.forEach((category) => {
      totalOptions += category.options.length;
    });
    setCountWarning(totalOptions < 3 || totalOptions > 10);
  };

  return (
    <>
      {dragCategories.map((q, index) => {
        return (
          <div key={index} className="row" style={{ marginTop: "10px" }}>
            <div className="col-4" style={{ display: "flex", flexDirection: "column" }}>
              <label className="form-label form-question-title">{`Categoría ${index + 1} - Nombre`}</label>
              <input
                type="text"
                className={`form-control ${q.titleErrored ? "input-error" : ""}`}
                placeholder="Nombre de la categoría..."
                onChange={(e) => editTitle(index, e.target.value)}
                value={q.title}
              />
            </div>
            <div className="col-1">
              {q.deletable ? (
                <button
                  onClick={() => deleteCategory(index)}
                  className="btn btn-danger btn-sm"
                  style={{ marginTop: "35px" }}
                >
                  <MdDelete size="1.5em" />
                </button>
              ) : (
                <></>
              )}
            </div>
            <div className="col-7">
              <div className="row">
                <div className="col">
                  <label className="form-label form-question-title">Imágenes (Entre 0 y 4)</label>
                </div>
              </div>
              {q.options.map((o, i) => {
                return (
                  <div key={i} className="row">
                    <div className="col-10">
                      <input
                        type="text"
                        className={`form-control ${o.errored ? "input-error" : ""}`}
                        placeholder={`Url de la imagen...`}
                        style={{ marginBottom: "5px" }}
                        onChange={(e) => editOption(index, i, "text", e.target.value)}
                        value={o.text}
                      />
                    </div>
                    <div className="col-2">
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
              <div
                className="row"
                style={{ justifyContent: "space-between", display: q.options.length > 3 ? "none" : "flex" }}
              >
                <div className="col">
                  <button onClick={() => addOption(index)} style={{background: "#0b1643", color: "white"}} className="btn btn-sm">
                    Añadir imagen
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div style={{ display: dragCategories.length > 4 ? "none" : "flex", marginTop: "20px" }}>
      <button onClick={addCategory} style={{background: "#0b1643", color: "white"}} className="btn btn-sm">
          Añadir categoría
        </button>
      </div>
      <div
        hidden={!countWarning}
        style={{ display: "flex", justifyContent: "center", color: "red", fontSize: "14px", marginTop: "10px" }}
      >
        En total debe haber entre 3 y 10 opciones
      </div>
    </>
  );
};

export default DragCategoriesImgBody;
