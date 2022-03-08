import React, { useState } from "react";
import { useSelector } from "react-redux";
import users from "../../../users";
import { MdDelete, MdEdit, MdPlayCircle } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { RiSlideshow2Line } from "react-icons/ri";
import { useEffect } from "react";
import { useHistory } from "react-router";
import {
  changeQuestionnaireOption,
  deleteQuestionnaire,
  getQuestionnairesForStudents,
  getQuestionnairesForTeachers,
  getGrades
} from "../../../../backend/questionnaireService";
import GradeModal from "../../../utils/components/Modals/GradeModal";
import { SiGoogleclassroom } from "react-icons/si";
import ClassQuestionnaireModal from "../../../utils/components/Modals/ClassQuestionnaireModal";
import BasicModal from "../../../utils/components/Modals/BasicModal";
import GradeForQuestionnaireModal from "../../../utils/components/Modals/GradeForQuestionnaireModal";
import { getEnabledSubjects } from "../../../../backend/subjectService";

const QuestionnairesHome = () => {
  const userLogged = useSelector(users.selectors.getUser);
  const history = useHistory();
  const [teachersQuestionnaires, setTeachersQuestionnaires] = useState([]);
  const [visibleTeachersQuestionnaires, setVisibleTeachersQuestionnaires] = useState([]);
  const [studentsQuestionnaires, setStudentsQuestionnaires] = useState([]);
  const [visibleStudentsQuestionnaires, setVisibleStudentsQuestionnaires] = useState([]);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [grades, setGrades] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showClasses, setShowClasses] = useState(false);
  const [questionnaireRemoveId, setQuestionnaireRemoveId] = useState();
  const [showQuestionnaireDelete, setShowQuestionnaireDelete] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showGrades, setShowGrades] = useState(false);
  const [questionnaireGrades ,setQuestionnaireGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(-1);

  useEffect(() => {
    getEnabledSubjects().then((response) => {
      if (response.data) setSubjects(response.data.data.subjects);
    }).catch((e) => console.log(e));
    if (userLogged && userLogged.role.name === "teacher") {
      getQuestionnairesForTeachers()
        .then((response) => {
          if (response.data && response.data.code === "OK") {
            setVisibleTeachersQuestionnaires(response.data.data.questionnaires);
            setTeachersQuestionnaires(response.data.data.questionnaires);
          }
        })
        .catch((e) => console.log(e));
    } else if (userLogged && userLogged.role.name === "student") {
      getQuestionnairesForStudents()
        .then((response) => {
          if (response.data && response.data.code === "OK") {
            setVisibleStudentsQuestionnaires(response.data.data.questionnaires);
            setStudentsQuestionnaires(response.data.data.questionnaires);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [userLogged]);

  const changeOptions = (id, value, option) => {
    changeQuestionnaireOption(id, !value, option)
      .then((response) => {
        if (response.data && response.data.code === "OK") {
          setTeachersQuestionnaires((oldQuestionnaires) => {
            let aux = [];
            oldQuestionnaires.forEach((o) => {
              if (o.id === id) {
                o[option] = !value;
              }
              aux.push({...o});
            });
            setVisibleTeachersQuestionnaires(aux.filter((q) => q.title.toLowerCase().includes(searchText.toLowerCase())));
            return aux;
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const removeQuestionnaire = (id) => {
    deleteQuestionnaire(id, userLogged.username)
      .then((response) => {
        if (response.data && response.data.code === "OK") {
          getQuestionnairesForTeachers()
            .then((response) => {
              if (response.data && response.data.code === "OK")
                setTeachersQuestionnaires(response.data.data.questionnaires);
            })
            .catch((e) => console.log(e));
        }
      })
      .catch((e) => console.log(e));
    setTeachersQuestionnaires((oldQuestionnaires) => {
      const aux = oldQuestionnaires.filter((o) => o.id !== id);
      setVisibleTeachersQuestionnaires(aux.filter((q) => q.title.toLowerCase().includes(searchText.toLowerCase())));
      return aux;
    });
  };

  const searchQuestionnaires = (text) => {
    setSearchText(text);
    if (userLogged.role.name === "student") {
      setVisibleStudentsQuestionnaires(
        studentsQuestionnaires.filter((q) => q.title.toLowerCase().includes(text.toLowerCase()))
      );
    } else {
      setVisibleTeachersQuestionnaires(
        teachersQuestionnaires.filter((q) => q.title.toLowerCase().includes(text.toLowerCase()))
      );
    }
  };

  const filterBySubject = (subjectId) => {
    subjectId = parseInt(subjectId);
    setSelectedSubject(subjectId);
    setSearchText("");
    if (userLogged.role.name === "teacher") {
      setVisibleTeachersQuestionnaires(subjectId === -1 ? teachersQuestionnaires : teachersQuestionnaires.filter(q => q.subject.id === subjectId));
    } else if (userLogged.role.name === "student") {
      setVisibleStudentsQuestionnaires(subjectId === -1 ? studentsQuestionnaires : studentsQuestionnaires.filter(q => q.subject.id === subjectId));
    }
  };

  const showStudentGrades = (questionnaireId) => {
    getGrades(questionnaireId).then((response) => {
        if (response.data && response.data.code === "OK") {
          setQuestionnaireGrades(response.data.data.grades);
          setShowGrades(true);
        }
    }).catch((e) => console.log(e));
  }

  return (
    <div>
      <ClassQuestionnaireModal show={showClasses} setShow={setShowClasses} classes={classes} />
      <GradeModal show={showGradeModal} setShow={setShowGradeModal} grades={grades}></GradeModal>
      <BasicModal show={showQuestionnaireDelete} setShow={setShowQuestionnaireDelete} acceptCallback={() => removeQuestionnaire(questionnaireRemoveId)} title={'Eliminar cuestionario'} body={'¿Seguro que quieres eliminar el cuestionario? no se podrá recuperar y se perderán las calificaciones.'} />
      <GradeForQuestionnaireModal show={showGrades} setShow={setShowGrades} grades={questionnaireGrades}></GradeForQuestionnaireModal>
      <div
        style={{
          width: "95%",
          textAlign: "center",
          margin: "auto",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "inline-flex", marginBottom: "10px" }}>
          <input
            className="form-control"
            placeholder="Buscar por título..."
            value={searchText}
            onChange={(e) => searchQuestionnaires(e.target.value)}
          ></input>
          <select
            className="form-select"
            style={{marginLeft: "10px"}}
            value={selectedSubject}
            onChange={(e) => filterBySubject(e.target.value)}
          >
            <option defaultValue value="-1">
              Todas las asignaturas...
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
        {userLogged && userLogged.role.name === "teacher" ? (
          <>
            <table
              className="table table-striped"
              style={{
                fontFamily: "Lato",
                fontSize: "15px",
                background: "#ffffff",
                borderRadius: "10px"
              }}
            >
              <thead>
                <tr>
                  <th scope="col">Título</th>
                  <th scope="col">Asignatura</th>
                  <th scope="col">Clases</th>
                  <th scope="col">Visible</th>
                  <th scope="col">Revisable</th>
                  <th scope="col">Permite repetir</th>
                  <th scope="col">Ver nota</th>
                  <th scope="col">Calificaciones</th>
                  <th scope="col">Ver</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Borrar</th>
                </tr>
              </thead>
              <tbody>
                {visibleTeachersQuestionnaires.map((questionnaire) => (
                  <tr id={questionnaire.id}>
                    <td>{questionnaire.title}</td>
                    <td>{questionnaire.subject.name}</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        style={{ background: "#0b1643", color: "white" }}
                        onClick={() => {
                          setClasses(questionnaire.questionnaire_classes);
                          setShowClasses(true);
                        }}
                      >
                        <SiGoogleclassroom size="1.2em" />
                      </button>
                    </td>

                    <td>
                      <div className="form-switch form-switch">
                        <input
                          onChange={() => changeOptions(questionnaire.id, questionnaire.visible, "visible")}
                          disabled={!questionnaire.owner}
                          className="form-check-input"
                          color="#0b1643"
                          type="checkbox"
                          checked={questionnaire.visible}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="form-switch form-switch">
                        <input
                          onChange={() => changeOptions(questionnaire.id, questionnaire.reviewable, "reviewable")}
                          disabled={!questionnaire.owner}
                          className="form-check-input"
                          type="checkbox"
                          checked={questionnaire.reviewable}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="form-switch form-switch">
                        <input
                          onChange={() => changeOptions(questionnaire.id, questionnaire.can_remake, "can_remake")}
                          disabled={!questionnaire.owner}
                          className="form-check-input"
                          type="checkbox"
                          checked={questionnaire.can_remake}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="form-switch form-switch">
                        <input
                          onChange={() => changeOptions(questionnaire.id, questionnaire.view_grade, "view_grade")}
                          disabled={!questionnaire.owner}
                          className="form-check-input"
                          type="checkbox"
                          checked={questionnaire.view_grade}
                        />
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-sm" style={{ background: "#0b1643", color: "white" }}>
                        <FaUserGraduate onClick={() => showStudentGrades(questionnaire.id)} size="1.2em" />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm"
                        style={{ background: "#0b1643", color: "white" }}
                        onClick={() => history.push(`/questionnaire/${questionnaire.id}`)}
                      >
                        <RiSlideshow2Line size="1.2em" />
                      </button>
                    </td>
                    <td>
                      <button
                        disabled={!questionnaire.owner}
                        onClick={() => history.push(`/questionnaire/edit/${questionnaire.id}`)}
                        className="btn btn-sm"
                        style={{ background: "#0b1643", color: "white" }}
                      >
                        <MdEdit size="1.2em" />
                      </button>
                    </td>
                    <td>
                      <button
                        disabled={!questionnaire.owner}
                        onClick={() => {
                          setQuestionnaireRemoveId(questionnaire.id);
                          setShowQuestionnaireDelete(true);
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        <MdDelete size="1.2em" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => history.push("/questionnaire-creation")}
              className="btn btn-lg"
              style={{ fontFamily: "Lato", fontSize: "20px", background: "#0B1643", color: "white" }}
            >
              Crear cuestionario
            </button>
          </>
        ) : userLogged && userLogged.role.name === "student" ? (
          <table
            className="table table-striped"
            style={{
              fontFamily: "Lato",
              fontSize: "15px",
              background: "#ffffff",
              borderRadius: "10px"
            }}
          >
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Asignatura</th>
                <th scope="col">Notas</th>
                <th scope="col">Realizar</th>
              </tr>
            </thead>
            <tbody>
              {visibleStudentsQuestionnaires.map((questionnaire) => (
                <tr id={questionnaire.id}>
                  <td>{questionnaire.title}</td>
                  <td>{questionnaire.subject.name}</td>
                  <td>
                    <button
                      disabled={!questionnaire.view_grade}
                      onClick={() => {
                        setGrades(questionnaire.grades);
                        setShowGradeModal(true);
                      }}
                      style={{ background: "#0b1643", color: "white" }}
                      className="btn btn-sm"
                    >
                      <FaUserGraduate size="1.2em" />
                    </button>
                  </td>
                  <td>
                    <button
                      style={{ background: "#0b1643", color: "white" }}
                      onClick={() => history.push(`/questionnaire/${questionnaire.id}`)}
                      className="btn btn-sm"
                    >
                      <MdPlayCircle size="1.2em" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  );
};
export default QuestionnairesHome;
