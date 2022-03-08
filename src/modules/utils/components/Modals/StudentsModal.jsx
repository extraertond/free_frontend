import React from "react";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import backend from "../../../../backend";

const StudentsModal = ({ show, setShow, Class }) => {
  const [assignedSearchText, setAssignedSearchText] = useState("");
  const [availableSearchText, setAvailableSearchText] = useState("");
  const [assignedStudents, setAssignedStudents] = useState();
  const [assignedVisibleStudents, setAssignedVisibleStudents] = useState();
  const [availableStudents, setAvailableStudents] = useState();
  const [availableVisibleTeachers, setAvailableVisibleStudents] = useState();
  const [selectedAvailable, setSelectedAvailable] = useState();
  const [selectedAssigned, setSelectedAssigned] = useState();

  useEffect(() => {
    setAssignedVisibleStudents(Class.assignedStudents);
    setAssignedStudents(Class.assignedStudents);
    setAvailableVisibleStudents(Class.availableStudents);
    setAvailableStudents(Class.availableStudents);
  }, [Class]);

  const handleClose = () => {
    setAssignedVisibleStudents(Class.assignedStudents);
    setAssignedStudents(Class.assignedStudents);
    setAvailableVisibleStudents(Class.availableStudents);
    setAvailableStudents(Class.availableStudents);
    setShow(false);
  };

  const handleAccept = () => {
    backend.classService
      .assignStudents(Class.id, assignedStudents)
      .then((response) => {
        if (response.data && response.data.code === "OK") window.location.reload();
        else alert("error actualizando alumnos de la clase");
      })
      .catch((e) => {
        alert("error actualizando alumnos de la clase");
        console.log(e);
      });
    setShow(false);
  };

  const searchStudents = (text, students, setStudents, setText, setSelected) => {
    setSelected();
    setText(text);
    setStudents(
      students.filter((student) =>
        (student.name + " " + student.lastname1 + " " + student.lastname2).toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const freeTeacher = (user) => {
    setAssignedSearchText("");
    setAvailableSearchText("");
    let aux = assignedStudents.filter((teacher) => teacher.id !== user.id);
    setAssignedStudents(aux);
    setAssignedVisibleStudents(aux);
    let aux2 = [...availableStudents];
    aux2.push(user);
    setAvailableStudents(aux2);
    setAvailableVisibleStudents(aux2);
    setSelectedAssigned();
  };

  const assignTeacher = (user) => {
    setAssignedSearchText("");
    setAvailableSearchText("");
    let aux = availableStudents.filter((teacher) => teacher.id !== user.id);
    setAvailableStudents(aux);
    setAvailableVisibleStudents(aux);
    let aux2 = [...assignedStudents];
    aux2.push(user);
    setAssignedStudents(aux2);
    setAssignedVisibleStudents(aux2);
    setSelectedAvailable();
  };

  return Class && assignedStudents ? (
    <Modal size="lg" show={show} onHide={handleClose}>
      <div style={{ fontFamily: "Lato" }}>
        <Modal.Header>
          <Modal.Title>
            <div style={{ fontSize: "20px" }}>
              Administración de alumnos de la clase {Class.grade + " " + Class.year.grade}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-5 text-center">
              <div style={{ fontSize: "19px" }}>Alumnos asignados</div>
              <input
                placeholder="Buscar..."
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
                value={assignedSearchText}
                onChange={(e) =>
                  searchStudents(
                    e.target.value,
                    assignedStudents,
                    setAssignedVisibleStudents,
                    setAssignedSearchText,
                    setSelectedAssigned
                  )
                }
              />
              <div
                className="list-group"
                style={{
                  overflow: "scroll",
                  overflowX: "hidden",
                  maxHeight: "15rem",
                  minHeight: "15rem",
                }}
              >
                {assignedVisibleStudents.map((user) => (
                  <button
                    key={user.id}
                    className={
                      selectedAssigned && selectedAssigned.id === user.id
                        ? "list-group-item list-group-item-action self-active"
                        : "list-group-item list-group-item-action"
                    }
                    href={"#list-" + user.id}
                    onClick={() => setSelectedAssigned(user)}
                  >
                    {user.name + " " + user.lastname1 + " " + user.lastname2}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-2">
              <div style={{ textAlign: "center", marginTop: "34px" }}>
                <button
                  className="btn"
                  style={{ fontSize: "20px", background: "#0b1643", color: "white", marginTop: "15px" }}
                  disabled={!selectedAssigned}
                  onClick={() => freeTeacher(selectedAssigned)}
                >
                  {">"}
                </button>
              </div>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button
                  className="btn"
                  style={{ fontSize: "20px", background: "#0b1643", color: "white" }}
                  disabled={!selectedAvailable}
                  onClick={() => assignTeacher(selectedAvailable)}
                >
                  {"<"}
                </button>
              </div>
            </div>
            <div className="col-5 text-center">
              <div style={{ fontSize: "19px" }}>Alumnos disponibles</div>
              <input
                placeholder="Buscar..."
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
                value={availableSearchText}
                onChange={(e) =>
                  searchStudents(
                    e.target.value,
                    availableStudents,
                    setAvailableVisibleStudents,
                    setAvailableSearchText,
                    setSelectedAvailable
                  )
                }
              />
              <div
                className="list-group"
                style={{
                  overflow: "scroll",
                  overflowX: "hidden",
                  maxHeight: "15rem",
                  minHeight: "15rem",
                }}
              >
                {availableVisibleTeachers.map((user) => (
                  <button
                  key={user.id}
                    className={
                      selectedAvailable && selectedAvailable.id === user.id
                        ? "list-group-item list-group-item-action self-active"
                        : "list-group-item list-group-item-action"
                    }
                    onClick={() => setSelectedAvailable(user)}
                  >
                    {user.name + " " + user.lastname1 + " " + user.lastname2}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-lg"
            style={{ background: "white", color: "#0b1643", border: "1.5px solid #0b1643" }}
            onClick={handleClose}
          >
            Cancelar
          </button>
          <button style={{ background: "#0b1643", color: "white" }} className="btn btn-lg" onClick={handleAccept}>
            Guardar
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  ) : (
    <></>
  );
};

export default StudentsModal;
