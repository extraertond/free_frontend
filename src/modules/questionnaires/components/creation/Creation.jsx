import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import users from "../../../users";
import QuestionForm from "./QuestionForm";
import CreationHeader from "./components/CreationHeader";
import { checkClasses, checkInfo, checkQuestions, removeClasses, removeInfo, removeQuestions, saveQuestions } from "../../../../backend/backupService";
import BasicModal from "../../../utils/components/Modals/BasicModal";
import "../../../../index.css";

const Creation = () => {
  const QUESTION_TEMPLATE = {
    type: "-1",
    title: "",
    titleErrored: false,
    open: true,
    help: false,
    helpText: "",
    helpErrored: false,
    image: false,
    imageUrl: "",
    imageErrored: false,
    validated: false,
    data: undefined,
  };
  const userLogged = useSelector(users.selectors.getUser);
  const [questionnaireInfo, setQuestionnaireInfo] = useState({ subject: "-1", title: "" });
  const [definitiveClasses, setDefinitiveClasses] = useState([]);
  const [questions, setQuestions] = useState();
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (userLogged) {
      checkInfo(userLogged.username).then(i => { if (i) { setShowResume(true); } });
      checkClasses(userLogged.username).then(c => { if (c) { setShowResume(true); } });
      checkQuestions(userLogged.username).then(q => {
        if (q) {
          setShowResume(true); 
        } else {
          setQuestions([{ ...QUESTION_TEMPLATE }]);
        }
      });
    }
  }, [userLogged]);

  const resumeQuestionnaire = () => {
    checkInfo(userLogged.username).then(i => { if (i) setQuestionnaireInfo(JSON.parse(i)) });
    checkClasses(userLogged.username).then(c => { if (c) setDefinitiveClasses(JSON.parse(c)) });
    checkQuestions(userLogged.username).then(q => { if (q) setQuestions(JSON.parse(q)) });
  };

  const discardQuestionnaire = () => {
    removeInfo(userLogged.username);
    removeClasses(userLogged.username);
    removeQuestions(userLogged.username);
    setQuestions([{ ...QUESTION_TEMPLATE }]);
  };

  const addNewQuestion = () => {
    setQuestions((oldQuestions) => {
      let auxArray = [...oldQuestions];
      auxArray.push({ ...QUESTION_TEMPLATE });
      return auxArray;
    });
  };

  const deleteQuestion = (index) => {
    setQuestions((oldQuestions) => {
      let auxArray = [...oldQuestions];
      auxArray.splice(index, 1);
      if (oldQuestions[index].validated) { saveQuestions(auxArray.filter(a => a.type !== '-1'), userLogged.username); }
      return auxArray;
    });
  };

  return (
    <>
    <BasicModal
            show={showResume}
            setShow={setShowResume}
            acceptCallback={resumeQuestionnaire}
            cancelCallback={discardQuestionnaire}
            title={"Continuar cuestionario"}
            body={"Se ha encontrado un cuestionario sin terminar ¿Quieres continuarlo?"}
          />
      {userLogged && userLogged.role.name === "teacher" ? (
        <div
          style={{
            marginTop: "10px",
            fontFamily: "Lato",
          }}
        >
          <CreationHeader
            username={userLogged.username}
            questions={questions}
            questionnaireInfo={questionnaireInfo}
            setDefinitiveClasses={setDefinitiveClasses}
            setQuestionnaireInfo={setQuestionnaireInfo}
            definitiveClasses={definitiveClasses}
          ></CreationHeader>
          {questions && questions.map((q, index) => (
            <QuestionForm
              username={userLogged?.username}
              key={index}
              question={q}
              setQuestions={setQuestions}
              deleteQuestion={deleteQuestion}
              index={index}
            ></QuestionForm>
          ))}
        </div>
      ) : (
        <div
          className="spinner-border"
          role="status"
          style={{
            width: "100px",
            height: "100px",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <div className="row">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <button
            disabled={questions?.length >= 20}
            onClick={addNewQuestion}
            className="btn"
            style={{ background: "#0b1643", color: "white", marginTop: "20px" }}
          >
            Añadir pregunta
          </button>
        </div>
      </div>
    </>
  );
};
export default Creation;
