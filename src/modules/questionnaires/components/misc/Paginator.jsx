import React from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import ButtonPaginator from "./ButtonPaginator";
import { useState } from "react";
import BasicModal from "../../../utils/components/Modals/BasicModal";
import { evaluateQuestionnaire } from "../../../../backend/questionnaireService";
import { useHistory } from "react-router";
import { deleteQuestionnaire } from "../../../../backend/backupService";

const Paginator = ({ username, currentQuestionnaire, setCurrentQuestionnaire, userRole }) => {
  const [showConfirmSend, setShowConfirmSend] = useState(false);
  const [modalBody, setModalBody] = useState("Se va a enviar el cuestionario para ser corregido. ¿Confirmar?");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const history = useHistory();

  const handleFinish = () => {
    const numberAnswered = currentQuestionnaire?.questions.filter((q) => q.answered === true).length;
    setModalBody(
      numberAnswered === currentQuestionnaire?.questions_number
        ? "Se va a enviar el cuestionario para ser corregido. ¿Confirmar?"
        : "Quedan " +
            (currentQuestionnaire?.questions_number - numberAnswered) +
            " preguntas sin contestar. ¿Quieres enviar el cuestionario para ser corregido?"
    );
    setShowConfirmSend(true);
  };

  const nextQuestion = () => {
    setCurrentQuestionnaire((oldQuestionnaire) => ({
      ...oldQuestionnaire,
      question_id: currentQuestionnaire?.question_id + 1,
    }));
  };

  const previousQuestion = () => {
    setCurrentQuestionnaire((oldQuestionnaire) => ({
      ...oldQuestionnaire,
      question_id: currentQuestionnaire?.question_id - 1,
    }));
  };

  const sendQuestionnaire = () => {
    evaluateQuestionnaire(currentQuestionnaire)
      .then((response) => {
        if (response?.data?.code === "OK") {
          deleteQuestionnaire(currentQuestionnaire.id, username);
          history.push("/questionnaires");
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((e) => {
        setShowErrorModal(true);
        console.log(e);
      });
  };

  return (
    <>
      <BasicModal
        title="Enviar Cuestionario"
        body={modalBody}
        show={showConfirmSend}
        setShow={setShowConfirmSend}
        acceptCallback={sendQuestionnaire}
        acceptText={"Enviar"}
      ></BasicModal>
      <BasicModal
        title="Error"
        showCancel={false}
        body={"Se ha producido un error enviando el cuestionario, por favor inténtalo más tarde"}
        show={showErrorModal}
        setShow={setShowErrorModal}
      ></BasicModal>
      {currentQuestionnaire?.question_id === -1 ? null : (
        <>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: "auto",
              }}
            >
              <div>
                {Array.from({ length: currentQuestionnaire?.questions_number }, (v, k) => k).map((id) => {
                  return (
                    <ButtonPaginator
                      key={id}
                      id={id}
                      currentQuestionnaire={currentQuestionnaire}
                      setCurrentQuestionnaire={setCurrentQuestionnaire}
                    />
                  );
                })}
              </div>
              <div style={{ marginTop: "4px", marginLeft: "100px" }}>
                <button
                  style={{ marginRight: "0.6rem" }}
                  className="btn btn-info btn-paginator"
                  disabled={currentQuestionnaire?.question_id === 0}
                  onClick={previousQuestion}
                >
                  <GrCaretPrevious size="1.4em" />
                </button>
                <span style={{ color: "white" }}>
                  {currentQuestionnaire?.question_id + 1}/{currentQuestionnaire?.questions_number}
                </span>
                <button
                  style={{ marginLeft: "0.6rem" }}
                  className="btn btn-info btn-paginator"
                  disabled={currentQuestionnaire?.question_id === currentQuestionnaire?.questions_number - 1}
                  onClick={nextQuestion}
                >
                  <GrCaretNext size="1.4em" />
                </button>
                {userRole === "student" ? (
                  <button style={{ marginLeft: "20px" }} className="btn btn-info btn-fin" onClick={() => handleFinish()}>
                    Finalizar
                  </button>
                ) : (
                  <button style={{ marginLeft: "20px" }} onClick={() => history.push("/questionnaires")} className="btn btn-info btn-fin">
                    Salir
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Paginator;
