import React from "react";
import { Modal } from "react-bootstrap";

const GradeForQuestionnaireModal = ({ show, setShow, grades }) => {
  return (
    <>
      <Modal size="lg" show={show} onHide={() => setShow(false)}>
        <div style={{ fontFamily: "Lato" }}>
          <Modal.Header>
            <Modal.Title>
              <div style={{ fontSize: "20px" }}>Calificaciones</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ fontSize: "17px" }}>
              <table
                className="table table-striped"
                style={{
                  fontSize: "15px",
                  background: "#ffffff",
                  borderRadius: "20px",
                }}
              >
                <tr>
                  <th>Fecha</th>
                  <th>Alumno</th>
                  <th>Nº contestadas</th>
                  <th>Nota</th>
                </tr>
                <tbody>
                  {grades.map((g) => (
                    <tr key={g.id}>
                      <td>{new Date(g.created_at).toLocaleString()}</td>
                      <td>{`${g.user.name} ${g.user.lastname1} ${g.user.lastname2}`}</td>
                      <td>{g.questions_answered}</td>
                      <td>
                      {g.grade >= 5 ? (
                          <span style={{ fontWeight: "bold", color: "green" }}>{g.grade}</span>
                        ) : (
                          <span style={{ fontWeight: "bold", color: "red" }}>{g.grade}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {grades.length < 1 ? (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                  <span>No hay calificaciones</span>
                </div>
              ) : (
                <></>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              style={{ background: "#0b1643", color: "white" }}
              className="btn btn-lg"
              onClick={() => setShow(false)}
            >
              Aceptar
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default GradeForQuestionnaireModal;
