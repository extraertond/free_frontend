import React, { useState } from "react";
import { useSelector } from "react-redux";
import Paginator from "./Paginator";
import Scheduler from "./Scheduler";
import users from "../../../../users";
import { useEffect } from "react";
import { useParams } from "react-router";
import { getRevisionquestionnaire } from "../../../../../backend/questionnaireService";

const Revision = () => {
  const params = useParams();
  const userLogged = useSelector(users.selectors.getUser);
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState();

  useEffect(() => {
    if (userLogged && userLogged.role.name === "student" && params.id) {
      getRevisionquestionnaire(params.id).then((response) => {
        if (response.data && response.data.code === "OK") {
          setCurrentQuestionnaire(JSON.parse(response.data.data.revision));
        }
      })
      .catch((e) => console.log(e));
    }
  }, [params.id, userLogged]);

  return (
    <div>
      {userLogged && userLogged.role.name === "student" ? (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            margin: "auto",
            marginTop: "10px",
          }}
        >
          <>
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                fontFamily: "Lato",
              }}
            >
              <Scheduler
                currentQuestionnaire={currentQuestionnaire}
                setCurrentQuestionnaire={setCurrentQuestionnaire}
              />
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
                currentQuestionnaire={currentQuestionnaire}
                setCurrentQuestionnaire={setCurrentQuestionnaire}
              />
            </div>
          </>
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
export default Revision;
