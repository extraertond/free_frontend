import React, { useEffect } from "react";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import backend from "../../backend";
import { changeEnabled, createSubject } from "../../backend/subjectService";
import BasicModal from "../utils/components/Modals/BasicModal";
import InfoModal from "../utils/components/Modals/InfoModal";

const AdminSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirm2, setShowConfirm2] = useState(false);
  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("");
  const [nameError, setNameError] = useState("");
  const [addSubject, setAddSubject] = useState(false);
  const [editedSubject, setEditedSubject] = useState();
  useEffect(() => {
    backend.subjectService
      .getSubjects()
      .then((response) => {
        if (response.data.code === "OK") {
          setSubjects(response.data.data.subjects);
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((e) => {
        setShowErrorModal(true);
      });
  }, []);

  const enableSubject = (id, enabled, name) => {
    setShowConfirm(true);
    setEditedSubject({ id, enabled: !enabled, name });
    if (enabled) {
      setBody(
        "Si desactivas la asignatura los profesores no podrán crear cuestionarios de dicha asignatura, pero los cuestionarios ya creados seguirán estando activos"
      );
    } else {
      setBody("Si activas la asignatura será los profesores podrán crear cuestionarios para la misma");
    }
  };

  const validateName = (string, minLength, setError) => {
    let isValid = true;
    const pattern = new RegExp("^[A-Z ÁÉÍÓÚÑ]*$", "i");
    if (string.length < minLength) {
      setError("La longitud mínima son " + minLength + " carácteres");
      isValid = false;
    } else if (!pattern.test(string)) {
      setError("Solo puede contener letras");
      isValid = false;
    } else {
      setError("");
    }
    return isValid;
  };

  return (
    <>
      <InfoModal
        show={showErrorModal}
        setShow={setShowErrorModal}
        title="Error"
        body="No se han podido obtener las asignaturas, inténtalo más tarde."
        accepText="Aceptar"
      />
      <BasicModal
        show={showConfirm}
        setShow={setShowConfirm}
        title="Confirmar"
        body={body}
        acceptText="Aceptar"
        cancelText="Cancelar"
        acceptCallback={() => {
          changeEnabled(editedSubject).then((response) => {
            if (response.data.code === "OK") {
              window.location.reload();
            }
          });
        }}
        cancelCallback={() => {}}
      />
      <BasicModal
        show={showConfirm2}
        setShow={setShowConfirm2}
        title="Confirmar"
        body="Vas a crear una asignatura nueva, por favor, no crees asignaturas duplicadas."
        acceptText="Aceptar"
        cancelText="Cancelar"
        acceptCallback={() => {
          createSubject(subject)
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
                <th scope="col">Activa</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td>{subject.name}</td>
                  <td>{subject.enabled ? "Sí" : "No"}</td>
                  <td>
                    <button
                      className="btn"
                      style={{ background: "#0b1643", color: "white" }}
                      onClick={() => enableSubject(subject.id, subject.enabled, subject.name)}
                    >
                      {subject.enabled ? "Desactivar" : "Activar"}
                    </button>
                  </td>
                </tr>
              ))}
              {addSubject ? (
                <tr>
                  <td>
                    <input
                      className={nameError === "" ? "form-control" : "form-control is-invalid"}
                      style={{ textAlign: "center" }}
                      type="text"
                      maxLength="40"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Nombre de la asignatura..."
                    ></input>
                    <div className="invalid-feedback">{nameError}</div>
                  </td>
                  <td></td>
                  <td>
                    <button
                      className="btn"
                      style={{ background: "white", color: "#0b1643", border: "1.5px solid #0b1643" }}
                      onClick={(e) => {
                        if (validateName(subject, 5, setNameError)) setShowConfirm2(true);
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
            {addSubject ? (
              <></>
            ) : (
              <button
                onClick={() => setAddSubject(true)}
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
export default AdminSubject;
