import React from "react";
import { Modal } from "react-bootstrap";

const ClassQuestionnaireModal = ({ show, setShow, classes }) => {
  return classes ? (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <div style={{ fontFamily: "Lato" }}>
        <Modal.Header>
          <Modal.Title>
            <div style={{ fontSize: "20px" }}>
              Clases asignadas al cuestionario
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ fontSize: "17px" }}>
            {classes.map((c) => {
              return <span key={c.id} style={{marginLeft: "10px", background: "#1f8757", color: "white"}} className="badge rounded-pill"> {c.class?.grade + " " + c.class?.year?.grade}</span>;
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

export default ClassQuestionnaireModal;
