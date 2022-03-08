import React from "react";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import backend from "../../../../backend";

const TeachersModal = ({ show, setShow, Class }) => {
  const [assignedSearchText, setAssignedSearchText] = useState("");
  const [availableSearchText, setAvailableSearchText] = useState("");
  const [assignedTeachers, setAssignedTeachers] = useState();
  const [assignedVisibleTeachers, setAssignedVisibleTeachers] = useState();
  const [availableTeachers, setAvailableTeachers] = useState();
  const [availableVisibleTeachers, setAvailableVisibleTeachers] = useState();
  const [selectedAvailable, setSelectedAvailable] = useState();
  const [selectedAssigned, setSelectedAssigned] = useState();

  useEffect(() => {
    setAssignedVisibleTeachers(Class.users);
    setAssignedTeachers(Class.users);
    setAvailableVisibleTeachers(Class.availableTeachers);
    setAvailableTeachers(Class.availableTeachers);
  }, [Class]);

  const handleClose = () => {
    setAssignedVisibleTeachers(Class.users);
    setAssignedTeachers(Class.users);
    setAvailableVisibleTeachers(Class.availableTeachers);
    setAvailableTeachers(Class.availableTeachers);
    setShow(false);
  };

  const handleAccept = () => {
    backend.classService.assignTeachers(Class.id, assignedTeachers).then(response => {
      if (response.data && response.data.code === "OK") window.location.reload();
      else  alert("error actualizando profesores para la clase")   
    }).catch((e) => {
      alert("error actualizando profesores para la clase")
        console.log(e);
      });
    setShow(false);
  };

  const searchTeachers = (text, teachers, setTeachers, setText, setSelected) => {
    setSelected();
    setText(text);
    setTeachers(
      teachers.filter((teacher) =>
        (teacher.name + " " + teacher.lastname1 + " " + teacher.lastname2).toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const freeTeacher = (user) => {
    setAssignedSearchText("");
    setAvailableSearchText("");
    let aux = assignedTeachers.filter(teacher => teacher.id !== user.id)
    setAssignedTeachers(aux);
    setAssignedVisibleTeachers(aux);
    let aux2 = [...availableTeachers];
    aux2.push(user);
    setAvailableTeachers(aux2);
    setAvailableVisibleTeachers(aux2);
    setSelectedAssigned();
  };

  const assignTeacher = (user) => {
        setAssignedSearchText("");
        setAvailableSearchText("");
        let aux = availableTeachers.filter(teacher => teacher.id !== user.id)
        setAvailableTeachers(aux);
        setAvailableVisibleTeachers(aux);
        let aux2 = [...assignedTeachers];
        aux2.push(user);
        setAssignedTeachers(aux2);
        setAssignedVisibleTeachers(aux2);
        setSelectedAvailable();
  };

  return Class && assignedTeachers ? (
    <Modal size="lg" show={show} onHide={handleClose}>
      <div style={{ fontFamily: "Lato" }}>
        <Modal.Header>
          <Modal.Title>
            <div style={{ fontSize: "20px" }}>
              Administración de profesores para la clase {Class.grade + " " + Class.year.grade}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-5 text-center">
              <div style={{ fontSize: "19px" }}>Profesores asignados</div>
              <input
                placeholder="Buscar..."
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
                value={assignedSearchText}
                onChange={(e) =>
                  searchTeachers(
                    e.target.value,
                    assignedTeachers,
                    setAssignedVisibleTeachers,
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
                {assignedVisibleTeachers.map((user) => (
                  <button
                  key={user.id}
                    className={
                      selectedAssigned && selectedAssigned.id === user.id
                        ? "list-group-item list-group-item-action active self-active"
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
                  style={{ fontSize: "20px", background: "#0b1643", color: "white", marginTop: "15px"}}
                  disabled={!selectedAssigned}
                  onClick={() => freeTeacher(selectedAssigned)}
                >
                  {">"}
                </button>
              </div>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button
                  style={{ fontSize: "20px", background: "#0b1643", color: "white"}}
                  className="btn"
                  disabled={!selectedAvailable}
                  onClick={() => assignTeacher(selectedAvailable)}
                >
                  {"<"}
                </button>
              </div>
            </div>
            <div className="col-5 text-center">
              <div style={{ fontSize: "19px" }}>Profesores disponibles</div>
              <input
                placeholder="Buscar..."
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
                value={availableSearchText}
                onChange={(e) =>
                  searchTeachers(
                    e.target.value,
                    availableTeachers,
                    setAvailableVisibleTeachers,
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
          <button className="btn btn-lg" style={{background: "white", color: "#0b1643", border: "1.5px solid #0b1643"}} onClick={handleClose}>
            Cancelar
          </button>
          <button style={{background: "#0b1643", color: "white"}} className="btn btn-lg" onClick={handleAccept}>
            Guardar
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  ) : (
    <></>
  );
};

export default TeachersModal;
