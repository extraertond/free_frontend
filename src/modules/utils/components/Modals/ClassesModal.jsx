import React from "react";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { saveClasses } from "../../../../backend/backupService";


const ClassesModal = ({ username, edition = false, show, setShow, classes, setDefinitiveClasses, definitiveClasses }) => {
  const [assignedSearchText, setAssignedSearchText] = useState("");
  const [availableSearchText, setAvailableSearchText] = useState("");
  const [selectedAvailable, setSelectedAvailable] = useState();
  const [selectedAssigned, setSelectedAssigned] = useState();
  const [assignClasses, setAssignClasses] = useState([]);
  const [assignVisibleClasses, setAssignVisibleClasses] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableVisibleClasses, setAvailableVisibleClasses] = useState([]);

  useEffect(() => {
    let selectedClasses = [];
    definitiveClasses.forEach((c) => {
      const x = classes.find((cl) => cl.classId === c.classId);
      if (x) {
        selectedClasses.push(x);
      }
    });
    setAssignClasses(selectedClasses);
    setAssignVisibleClasses(selectedClasses);
    const selected = selectAvailableClasses(classes, definitiveClasses);
    setAvailableVisibleClasses(selected);
    setAvailableClasses(selected);
  }, [classes, definitiveClasses]);

  const selectAvailableClasses = (c1, c2) => {
    let aux = [];
    c1.forEach((c) => {
      if (!c2.find((cc) => cc.classId === c.classId)) {
        aux.push(c);
      }
    });
    return aux;
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleAccept = () => {
    if (!edition && assignClasses?.length !== 0) {
      saveClasses(assignClasses, username)
    }
    setDefinitiveClasses(assignClasses);
    setShow(false);
  };

  const searchClasses = (text, classes, setClasses, setText, setSelected) => {
    setSelected();
    setText(text);
    setClasses(
      classes.filter((c) => (c.class?.grade + " " + c.class?.year?.grade).toLowerCase().includes(text.toLowerCase()))
    );
  };

  const freeClass = (c) => {
    setAssignedSearchText("");
    setAvailableSearchText("");
    let aux = assignClasses.filter((cl) => cl.id !== c.id);
    setAssignClasses(aux);
    setAssignVisibleClasses(aux);
    let aux2 = [...availableClasses];
    aux2.push(c);
    setAvailableClasses(aux2);
    setAvailableVisibleClasses(aux2);
    setSelectedAvailable();
    setSelectedAssigned();
  };

  const assignClass = (c) => {
    setAssignedSearchText("");
    setAvailableSearchText("");
    let aux = availableClasses.filter((cl) => cl.id !== c.id);
    setAvailableClasses(aux);
    setAvailableVisibleClasses(aux);
    let aux2 = [...assignClasses];
    aux2.push(c);
    setAssignClasses(aux2);
    setAssignVisibleClasses(aux2);
    setSelectedAvailable();
  };

  return classes && assignClasses ? (
    <Modal size="lg" show={show} onHide={handleClose}>
      <div style={{ fontFamily: "Lato" }}>
        <Modal.Header>
          <Modal.Title>
            <div style={{ fontSize: "20px" }}>Clases asignadas al cuestionario</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-5 text-center">
              <div style={{ fontSize: "19px" }}>Clases asignadas</div>
              <input
                placeholder="Buscar..."
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
                value={assignedSearchText}
                onChange={(e) =>
                  searchClasses(
                    e.target.value,
                    assignClasses,
                    setAssignVisibleClasses,
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
                {assignVisibleClasses.map((c) => (
                  <button
                    key={c.id}
                    className={
                      selectedAssigned && selectedAssigned.id === c.id
                        ? "list-group-item list-group-item-action self-active"
                        : "list-group-item list-group-item-action"
                    }
                    href={"#list-" + c.id}
                    onClick={() => setSelectedAssigned(c)}
                  >
                    {c.class?.grade + " " + c.class?.year?.grade}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-2">
              <div style={{ textAlign: "center", marginTop: "34px" }}>
                <button
                  className="btn"
                  style={{ marginTop: "15px", fontSize: "20px", background: "#0b1643", color: "white" }}
                  disabled={!selectedAssigned}
                  onClick={() => freeClass(selectedAssigned)}
                >
                  {">"}
                </button>
              </div>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button
                  className="btn"
                  style={{ fontSize: "20px", background: "#0b1643", color: "white" }}
                  disabled={!selectedAvailable}
                  onClick={() => assignClass(selectedAvailable)}
                >
                  {"<"}
                </button>
              </div>
            </div>
            <div className="col-5 text-center">
              <div style={{ fontSize: "19px" }}>Clases disponibles</div>
              <input
                placeholder="Buscar..."
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
                value={availableSearchText}
                onChange={(e) =>
                  searchClasses(
                    e.target.value,
                    availableClasses,
                    setAvailableVisibleClasses,
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
                {availableVisibleClasses.map((c) => (
                  <button
                    key={c.id}
                    className={
                      selectedAvailable && selectedAvailable.id === c.id
                        ? "list-group-item list-group-item-action self-active"
                        : "list-group-item list-group-item-action"
                    }
                    onClick={() => setSelectedAvailable(c)}
                  >
                    {c?.class?.grade + " " + c?.class?.year?.grade}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
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

export default ClassesModal;
