import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import users from "../../../users";
import QuestionForm from "./QuestionForm";
import CreationHeader from "./components/CreationHeader";
import { getQuestionnaire } from "../../../../backend/questionnaireService";
import { useParams } from "react-router";
import "../../../../index.css";

const Edition = () => {
  const params = useParams();
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
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (userLogged && userLogged.role.name === "teacher") {
      getQuestionnaire(params.id)
        .then((response) => {
          if (response.data && response.data.code === "OK") {
            const { raw_data, subject, title, questionnaire_classes } = response.data.data.questionnaire;
            setQuestionnaireInfo({ subject: subject.id, title, id: params.id });
            setQuestions(raw_data);
            setDefinitiveClasses(questionnaire_classes);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [userLogged]);

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
      return auxArray;
    });
  };

  return (
    <>
      {userLogged && userLogged.role.name === "teacher" ? (
        <div
          style={{
            marginTop: "10px",
            fontFamily: "Lato",
          }}
        >
          <CreationHeader
            edition={true}
            questions={questions}
            questionnaireInfo={questionnaireInfo}
            setDefinitiveClasses={setDefinitiveClasses}
            setQuestionnaireInfo={setQuestionnaireInfo}
            definitiveClasses={definitiveClasses}
          ></CreationHeader>
          {questions.map((q, index) => (
            <QuestionForm
              edition={true}
              key={index}
              question={q}
              setQuestions={setQuestions}
              deleteQuestion={deleteQuestion}
              index={index}
            ></QuestionForm>
          ))}
        </div>
      ) : (
        <></>
      )}
      <div className="row">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <button
            disabled={questions.length >= 20}
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
export default Edition;
