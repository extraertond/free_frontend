import React from "react";
import { Modal } from "react-bootstrap";

const InfoModal = ({ show, setShow, title, body, accepText }) => {
  return (
    <>
      <Modal size="lg" show={show} onHide={() => setShow(false)}>
        <div style={{ fontFamily: "Lato" }}>
          <Modal.Header>
            <Modal.Title>
              <div style={{ fontSize: "20px" }}>{title}</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ fontSize: "17px" }}>{body}</div>
          </Modal.Body>
          <Modal.Footer>
            <button
              style={{ background: "#0b1643", color: "white" }}
              className="btn btn-lg"
              onClick={() => setShow(false)}
            >
              {accepText}
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default InfoModal;
