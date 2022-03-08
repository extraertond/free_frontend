import React, { useEffect } from "react";
import CreateUser from "./CreateUser";
import ResetPassword from "./ResetPassword";
import users from "../../users";
import { useSelector } from "react-redux";
import Spinner from "../../utils/components/Spinner";
import AdminSubject from "../../school/AdminSubject";
import AdminTeacher from "../../school/AdminTeacher";
import AdminClass from "../../school/AdminClass";
import AdminStudent from "../../school/AdminStudent";
import Students from "../../school/Students";
import "../../../index.css";

const UserAdministration = () => {
  useEffect(() => {
    let tab = document.getElementById("adm-subject-tab");
    if (tab) tab.click();
  }, []);

  const user = useSelector(users.selectors.getUser);
  const tabs = [
    {
      id: "adm-subject",
      component: AdminSubject,
      title: "Asignaturas",
    },
    {
      id: "adm-teacher",
      component: AdminTeacher,
      title: "Profesores",
    },
    { id: "adm-student", component: AdminStudent, title: "Alumnos" },
    { id: "adm-class", component: AdminClass, title: "Clases" },
    { id: "create-user", component: CreateUser, title: "Crear usuarios" },
    {
      id: "reset-password",
      component: ResetPassword,
      title: "Restablecer usuarios",
    },
  ];
  return (
    <>
      {user && user.role.name === "admin" ? (
        <div
          style={{
            fontFamily: "Lato",
            margin: "20px",
            paddingBottom: "20px"
          }}
        >
          <ul className="nav nav-pills" id="myTab" role="tablist" style={{display: "flex", justifyContent: "space-around"}}>
            {tabs.map((tab, idx) => (
              <li key={idx} className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id={`${tab.id}-tab`}
                  data-bs-toggle="tab"
                  data-bs-target={`#${tab.id}`}
                  type="button"
                  role="tab"
                  style={{border: "none", marginTop: "10px", color: "white", background: "#0b1643"}}
                  aria-controls={tab.id}
                  aria-selected="true"
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
          <div className="tab-content" id="myTabContent">
            {tabs.map((tab, idx) => (
              <div key={idx} className="tab-pane fade question-container" id={tab.id} role="tabpanel" aria-labelledby={`${tab.id}-tab`}>
                {<tab.component />}
              </div>
            ))}
          </div>
        </div>
      ) : user && user.role.name === "teacher" ? (
        <Students />
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default UserAdministration;
