import React, { useState } from "react";
import { useSelector } from "react-redux";
import Paginator from "./Paginator";
import Scheduler from "./Scheduler";
import users from "../../../users";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { getStudentQuestionnaire } from "../../../../backend/questionnaireService";
import { checkQuestionnaire, deleteQuestionnaire } from "../../../../backend/backupService";
import BasicModal from "../../../utils/components/Modals/BasicModal";

const Questionnaire = () => {
  const params = useParams();
  const history = useHistory();
  const userLogged = useSelector(users.selectors.getUser);
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState();
  const [showResume, setShowResume] = useState(false);

  const resumeQuestionnaire = () => {
    checkQuestionnaire(params.id, userLogged.username).then((r) => {
      setCurrentQuestionnaire(JSON.parse(r));
    });
  };

  const discardQuestionnaire = () => {
    deleteQuestionnaire(params.id, userLogged.username);
    fetchQuestionnaire();
  };

  const fetchQuestionnaire = () => {
    getStudentQuestionnaire(params.id).then((response) => {
      const { title, student_data } = response.data.data.questionnaire;
      if (response.data && response.data.code === "OK") {
        const TEST = {
          id: response.data.data.questionnaire.id,
          description_test: title,
          questions_number: student_data.length,
          question_id: -1,
          questions: student_data,
        };
        setCurrentQuestionnaire(TEST);
      }
  }).catch((e) => {
    console.log(e);
    history.push('/questionnaires');
  }
  );
  }

  useEffect(() => {
    if (userLogged && params.id) {
      checkQuestionnaire(params.id, userLogged.username).then((r) => {
        if (r) {
          setShowResume(true);
        } else {
          fetchQuestionnaire();
        }
      });
    }
  }, [params.id, userLogged]);

  return (
    <div>
      {userLogged ? (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            margin: "auto",
            marginTop: "10px",
          }}
        >
          <BasicModal
            show={showResume}
            setShow={setShowResume}
            acceptCallback={resumeQuestionnaire}
            cancelCallback={discardQuestionnaire}
            title={"Continuar cuestionario"}
            body={"Se ha encontrado un intento de este cuestionario sin terminar ¿Quieres continuarlo?"}
          />
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              fontFamily: "Lato",
            }}
          >
            <Scheduler currentQuestionnaire={currentQuestionnaire} setCurrentQuestionnaire={setCurrentQuestionnaire} />
          </div>
          <div
            style={{
              position: "fixed",
              width: "100%",
              bottom: " 0",
              backgroundColor: "#0b1643",
              fontFamily: "Lato",
              fontSize: "25px",
              paddingBottom: "10px",
              paddingTop: "5px",
            }}
          >
            <Paginator
              username={userLogged?.username}
              currentQuestionnaire={currentQuestionnaire}
              setCurrentQuestionnaire={setCurrentQuestionnaire}
              userRole={userLogged?.role?.name}
            />
          </div>
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
    </div>
  );
};
export default Questionnaire;
