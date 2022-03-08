import React from "react";
import { Modal } from "react-bootstrap";

const ClassModal = ({ show, setShow, student }) => {
  return student ? (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <div style={{ fontFamily: "Lato" }}>
        <Modal.Header>
          <Modal.Title>
            <div style={{ fontSize: "20px" }}>
              Clases de {student.name + " " + student.lastname1 + " " + student.lastname2}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ fontSize: "17px" }}>
            {student.classes.map((c) => {
              return <span key={c.id} style={{marginLeft: "10px", background: "#1f8757", color: "white"}} className="badge rounded-pill"> {c.grade + " " + c.year.grade}</span>;
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-lg" style={{background: "#0b1643", color: "white"}} onClick={() => setShow(false)}>
            Aceptar
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  ) : (
    <></>
  );
};

export default ClassModal;
