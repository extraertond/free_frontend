import React, { useEffect, useState } from "react";
import { getClassesByTeacher } from "../../../../../backend/classService";
import { getEnabledSubjects } from "../../../../../backend/subjectService";
import ClassesModal from "../../../../utils/components/Modals/ClassesModal";
import BasicModal from "../../../../utils/components/Modals/BasicModal";
import { createQuestionnaire, updateQuestionnaire } from "../../../../../backend/questionnaireService";
import { validateQuestionnaireInfo } from "../utils/validationService";
import { useHistory } from "react-router";
import { removeClasses, removeInfo, removeQuestions, saveInfo } from "../../../../../backend/backupService";
import "../../../../../index.css"
;
const MIN_QUESTIONS = 5;
const CreationHeader = ({
  username,
  edition = false,
  questions,
  questionnaireInfo,
  setDefinitiveClasses,
  definitiveClasses,
  setQuestionnaireInfo,
}) => {
  const history = useHistory();
  useEffect(() => {
    getEnabledSubjects()
      .then((response) => {
        if (response.data) setSubjects(response.data.data.subjects);
      })
      .catch((e) => console.log(e));
    getClassesByTeacher()
      .then((response) => {
        if (response.data) setClasses(response.data.data.classes);
      })
      .catch((e) => console.log(e));
  }, []);

  const finishQuestionnaire = () => {
    if (_validateAllQuestions() && validateQuestionnaireInfo(questionnaireInfo)) {
      setShowFinish(true);
    } else {
      setErrorBody(
        "No se puede crear el cuestionario hasta que todas las cuestiones estén validadas (aparezca validada en verde), se haya seleccionado asignatura y completado el título del cuestionario"
      );
      setShowErrorModal(true);
    }
  };

  const _validateAllQuestions = () => {
    let valid = true;
    questions.forEach((q) => {
      if (!q.validated) {
        valid = false;
      }
    });
    return valid;
  };

  const sendQuestionnaire = () => {
    if (!edition) {
      createQuestionnaire(
        questions.map((q, index) => {
          q.id = index;
          return q;
        }),
        questionnaireInfo,
        definitiveClasses
      )
        .then((response) => {
          if (response?.data?.code === "OK") {
            removeInfo(username);
            removeClasses(username);
            removeQuestions(username);
            setShowFinishModal(true);
          } else {
            setErrorBody("Se ha producido un error creando el cuestionario, por favor intentelo más tarde");
            setShowErrorModal(true);
          }
        })
        .catch((e) => {
          setErrorBody("Se ha producido un error creando el cuestionario, por favor intentelo más tarde");
          setShowErrorModal(true);
          console.log(e);
        });
    } else {
      updateQuestionnaire(
        questions.map((q, index) => {
          q.id = index;
          return q;
        }),
        questionnaireInfo,
        definitiveClasses
      )
        .then((response) => {
          if (response?.data?.code === "OK") {
            setShowFinishModal(true);
          } else {
            setErrorBody("Se ha producido un error editando el cuestionario, por favor intentelo más tarde");
            setShowErrorModal(true);
          }
        })
        .catch((e) => {
          setErrorBody("Se ha producido un error editando el cuestionario, por favor intentelo más tarde");
          setShowErrorModal(true);
          console.log(e);
        });
    }
  };

  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showClasses, setShowClasses] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showDiscard, setShowDiscard] = useState(false);
  const [errorBody, setErrorBody] = useState("");

  return (
    <>
      <BasicModal
        title={edition ? "Descartar cambios" : "Descartar cuestionario"}
        body={`¿Seguro qué deseas descartar ${ edition ? 'los cambios' : 'el cuestionario'}? No podrá recuperarse.`}
        show={showDiscard}
        setShow={setShowDiscard}
        acceptCallback={() => {
          if (!edition) {
            removeInfo(username);
            removeClasses(username);
            removeQuestions(username);
          }
          history.push("/questionnaires")
        }}
      ></BasicModal>
      <BasicModal
        title="Finalizar cuestionario"
        body="¿Estás seguro que quieres modificar el cuestionario? Las revisiones para los cuestionarios hechos por los alumnos se perderán."
        acceptCallback={sendQuestionnaire}
        show={showFinish}
        setShow={setShowFinish}
      ></BasicModal>
      <BasicModal
        title="Error"
        showCancel={false}
        body={errorBody}
        show={showErrorModal}
        setShow={setShowErrorModal}
      ></BasicModal>
      <BasicModal
        title={edition ? "Cuestionario modificado" : "Cuestionario creado"}
        body={edition ? "Se ha modificado el cuestionario correctamente." : "Se ha creado el cuestionario, recuerda que de momento está invisble para los alumnos, puedes activarlo en el listado de cuestionarios."}
        show={showFinishModal}
        setShow={setShowFinishModal}
        acceptCallback={() => history.push("/questionnaires")}
        cancelCallback={() => history.push("/questionnaires")}
        showCancel={false}
      ></BasicModal>
      <ClassesModal
        username={username}
        edition={edition}
        definitiveClasses={definitiveClasses}
        setDefinitiveClasses={setDefinitiveClasses}
        setShow={setShowClasses}
        show={showClasses}
        classes={classes}
      ></ClassesModal>
      <div className="row m-1" style={{ textAlign: "center" }}>
        <div className="col">
          <h3>Nuevo cuestionario ({questions?.length} preguntas)</h3>
        </div>
        <div className="col-3">
          <button
            className="btn btn-success btn-lg"
            disabled={questions?.length < MIN_QUESTIONS}
            onClick={finishQuestionnaire}
            style={{ background: "#0b1643", color: "white", borderColor: "#0b1643" }}
          >
            <span>{ edition ? 'Guardar cambios' : 'Finalizar'}</span>
            {questions?.length < MIN_QUESTIONS ? (
              <span
                style={{ fontSize: "12px", color: "red", marginLeft: "10px" }}
              >{`Mínimo ${MIN_QUESTIONS} preguntas`}</span>
            ) : (
              <></>
            )}
          </button>
        </div>
        <div className="col-2">
          <button className="btn btn-danger btn-lg" onClick={() => setShowDiscard(true)}>
            Descartar
          </button>
        </div>
      </div>
      <div className="row m-2 mt-2" style={{ textAlign: "unset", fontSize: "18px", marginBottom: "20px" }}>
        <div className="col">
          <label className="form-label form-title">Título del cuestionario</label>
          <input
            onChange={(e) => setQuestionnaireInfo((oldInfo) => {
              saveInfo({ ...oldInfo, title: e.target.value }, username);
              return { ...oldInfo, title: e.target.value };
            }
              )}
            type="text"
            className="form-control"
            placeholder="Tema 1 de naturaleza..."
            value={questionnaireInfo.title}
          />
        </div>
        <div className="col">
          <label className="form-label form-title">Asignatura</label>
          <select
            className="form-select"
            value={questionnaireInfo.subject}
            onChange={(e) => setQuestionnaireInfo((oldInfo) => {
              saveInfo({ ...oldInfo, subject: e.target.value }, username);
              return { ...oldInfo, subject: e.target.value };
            })}
          >
            <option defaultValue value="-1">
              Elegir...
            </option>
            {subjects.map((q) => {
              return (
                <option key={q.id} value={q.id}>
                  {q.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col">
          <div style={{ display: "block !important" }}>
            <div>
              <label className="form-label form-title">Clases asignadas al cuestionario</label>
            </div>
            <div>
              <button
                style={{ width: "100%", background: "#0b1643", color: "white", borderColor: "#0b1643" }}
                className="btn"
                onClick={() => {
                  setShowClasses(true);
                }}
              >
                Seleccionar clases
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreationHeader;
