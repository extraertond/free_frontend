import React, { useEffect } from "react";
import { useState } from "react";
import { MdAdd, MdDelete, MdPeople } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import backend from "../../backend";
import { createClass } from "../../backend/classService";
import BasicModal from "../utils/components/Modals/BasicModal";
import InfoModal from "../utils/components/Modals/InfoModal";
import TeachersModal from "../utils/components/Modals/TeachersModal";
import StudentsModal from "../utils/components/Modals/StudentsModal";

const AdminClass = () => {
  const [classes, setClasses] = useState([]);
  const [years, setYears] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirm2, setShowConfirm2] = useState(false);
  const [className, setClassName] = useState("");
  const [yearId, setYearId] = useState("-1");
  const [nameError, setNameError] = useState("");
  const [addClass, setAddClass] = useState(false);
  const [teacherModal, setTeacherModal] = useState(false);
  const [studentModal, setStudentModal] = useState(false);
  const [currentClass, setCurrentClass] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [removeId, setRemoveId] = useState();

  useEffect(() => {
    backend.classService
      .getClasses()
      .then((response) => {
        if (response.data.code === "OK") {
          setClasses(response.data.data.classes);
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((e) => {
        setShowErrorModal(true);
      });

    backend.yearService
      .getYears()
      .then((response) => {
        if (response.data.code === "OK") {
          setYears(response.data.data.years);
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((e) => {
        setShowErrorModal(true);
      });
  }, []);

  const validateName = (string, minLength, setError) => {
    let isValid = true;
    const pattern = new RegExp("^[A-Z0-9]*$", "i");
    if (string.length < minLength) {
      setError("La longitud mínima son " + minLength + " carácteres");
      isValid = false;
    } else if (!pattern.test(string)) {
      setError("Debe tener la forma de número + letra: 3A, 6D, etc.");
      isValid = false;
    } else {
      setError("");
    }
    return isValid;
  };

  const openTeachersModal = (auxClass) => {
    setCurrentClass(auxClass);
    setTeacherModal(true);
  };

  const openStudentsModal = (auxClass) => {
    setCurrentClass(auxClass);
    setStudentModal(true);
  };

  const removeClass = () => {
    backend.classService
      .deleteClass(removeId)
      .then((response) => {
        if (response.data.code === "OK") {
          window.location.reload();
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((e) => {
        setShowErrorModal(true);
      });
  };

  return (
    <>
      <BasicModal
        title="¡Atención!"
        body="¿Seguro que deseas eliminar la clase? Desaparecerá toda la información relacionada."
        show={showConfirmDelete}
        setShow={setShowConfirmDelete}
        acceptCallback={removeClass}
      ></BasicModal>
      <TeachersModal show={teacherModal} setShow={setTeacherModal} Class={currentClass} />
      <StudentsModal show={studentModal} setShow={setStudentModal} Class={currentClass} />
      <InfoModal
        show={showErrorModal}
        setShow={setShowErrorModal}
        title="Error"
        body="No se han podido obtener las clases, inténtalo más tarde."
        accepText="Aceptar"
      />
      <BasicModal
        show={showConfirm2}
        setShow={setShowConfirm2}
        title="Confirmar"
        body="Ahora podrás asignar profesores a esta clase. Por favor, no crees clases duplicadas."
        acceptText="Aceptar"
        cancelText="Cancelar"
        acceptCallback={() => {
          const auxClass = { grade: className, yearId: yearId };
          createClass(auxClass)
            .then((response) => {
              if (response.data && response.data.code === "OK") {
                window.location.reload();
              } else if (response.data.message) {
                setNameError(response.data.message);
              }
            })
            .catch((e) => console.log(e));
        }}
        cancelCallback={() => {}}
      />
      {true ? (
        <div
          style={{
            width: "95%",
            textAlign: "center",
            margin: "auto",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <table
            className="table table-striped"
            style={{ fontSize: "15px", background: "#ffffff", borderRadius: "20px" }}
          >
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Curso</th>
                <th scope="col">Profesores</th>
                <th scope="col">Alumnos</th>
                <th scope="col">Borrar</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((auxClass) => (
                <tr key={auxClass?.id}>
                  <td>{auxClass.grade}</td>
                  <td>{auxClass.year.grade}</td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        openTeachersModal(auxClass);
                      }}
                      style={{ background: "#0b1643", color: "white" }}
                    >
                      <GiTeacher size="1.2em" />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        openStudentsModal(auxClass);
                      }}
                      style={{ background: "#0b1643", color: "white" }}
                    >
                      <MdPeople size="1.2em" />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setRemoveId(auxClass.id);
                        setShowConfirmDelete(true);
                      }}
                    >
                      <MdDelete size="1.2em" />
                    </button>
                  </td>
                </tr>
              ))}
              {addClass ? (
                <tr>
                  <td>
                    <input
                      className={nameError === "" ? "form-control" : "form-control is-invalid"}
                      style={{ textAlign: "center" }}
                      type="text"
                      maxLength="2"
                      value={className}
                      onChange={(e) => setClassName(e.target.value.toUpperCase())}
                      placeholder="Por ejemplo: 3A, 5B, 1C..."
                    ></input>
                    <div className="invalid-feedback">{nameError}</div>
                  </td>
                  <td>
                    <div style={{ display: "inline-flex" }}>
                      <select
                        className="form-select"
                        style={{ maxWidth: "150px" }}
                        value={yearId}
                        onChange={(e) => setYearId(e.target.value)}
                      >
                        <option defaultValue value="-1">
                          Elegir...
                        </option>
                        {years.map((q) => {
                          return (
                            <option key={q.id} value={q.id}>
                              {q.grade}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      className="btn"
                      style={{ background: "white", color: "#0b1643", border: "1.5px solid #0b1643" }}
                      onClick={(e) => {
                        if (validateName(className, 2, setNameError)) setShowConfirm2(true);
                      }}
                    >
                      Guardar
                    </button>
                  </td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </table>
          <div>
            {addClass ? (
              <></>
            ) : (
              <button
                onClick={() => setAddClass(true)}
                style={{ background: "#0b1643", color: "white" }}
                className="btn"
              >
                <MdAdd size="1.5em" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className="spinner-border"
          role="status"
          style={{
            width: "100px",
            height: "100px",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
};
export default AdminClass;
