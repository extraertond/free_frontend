import React from "react";
import { Modal } from "react-bootstrap";

const BasicModal = ({
  show,
  setShow,
  acceptCallback,
  cancelCallback,
  title,
  body,
  showCancel = true,
  cancelText = "Cancelar",
  acceptText = "Aceptar",
}) => {
  const handleClose = () => {
    if (cancelCallback) cancelCallback();
    setShow(false);
  };

  const handleAccept = () => {
    if (acceptCallback) acceptCallback();
    setShow(false);
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <div style={{ fontFamily: "Lato" }}>
          <Modal.Header>
            <Modal.Title>
              <div 
              style={{ fontSize: "20px", color: "black" }}>{title}</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ fontSize: "17px" }}>{body}</div>
          </Modal.Body>
          <Modal.Footer>
            { showCancel ? (
              <button className="btn btn-lg" style={{border: "2px solid #0b1643", background: "white", color: "#0b1643"}} onClick={handleClose}>
                {cancelText}
              </button>
            ) : (
              <></>
            )}
            <button className="btn btn-lg" style={{background: "#0b1643", color: "white"}} onClick={handleAccept}>
              {acceptText}
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default BasicModal;
