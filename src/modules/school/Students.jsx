import React, { useEffect } from "react";
import { useState } from "react";
import { MdSchool } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import backend from "../../backend";
import ClassModal from "../utils/components/Modals/ClassModal";
import InfoModal from "../utils/components/Modals/InfoModal";
import GradeForQuestionnaireModal from "../utils/components/Modals/GradeForQuestionnaireModal";
import { getGradesByUser } from "../../backend/questionnaireService";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [visibleStudents, setVisibleStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [student, setStudent] = useState();
  const [showClasses, setShowClasses] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState();
  const [showGrades, setShowGrades] = useState(false);
  const [questionnaireGrades ,setQuestionnaireGrades] = useState([]);

  useEffect(() => {
    backend.teacherService
      .getStudentsByClass()
      .then((response) => {
        if (response.data.code === "OK") {
          setStudents(response.data.data.users);
          setVisibleStudents(response.data.data.users);
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((e) => {
        setShowErrorModal(true);
      });
    backend.classService
      .getBasicClasses()
      .then((response) => {
        if (response.data.code === "OK") {
          setClasses(response.data.data.classes);
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((e) => {
        setShowErrorModal(true);
      });
  }, []);

  const searchStudents = (text) => {
    setSearchText(text);
    setVisibleStudents(
      students.filter((student) =>
        (student.name + " " + student.lastname1 + " " + student.lastname2).toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const filterStudentsByClass = (auxClass) => {
    auxClass = parseInt(auxClass);
    setSearchText("");
    setSelectedClass(auxClass);
    if (auxClass === -1) {
      setVisibleStudents(students);
    } else {
      setVisibleStudents(students.filter((student) => student.classes.find((c) => c.id === auxClass) != undefined));
    }
  };

  const showStudentGrades = (userId) => {
    getGradesByUser(userId).then((response) => {
        if (response.data && response.data.code === "OK") {
          setQuestionnaireGrades(response.data.data.grades);
          setShowGrades(true);
        }
    }).catch((e) => console.log(e));
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Lato" }}>
      <InfoModal
        show={showErrorModal}
        setShow={setShowErrorModal}
        title="Error"
        body="No se han podido obtener los alumnos, inténtalo más tarde."
        accepText="Aceptar"
      />
      <ClassModal show={showClasses} setShow={setShowClasses} student={student} />
      <GradeForQuestionnaireModal show={showGrades} setShow={setShowGrades} grades={questionnaireGrades}></GradeForQuestionnaireModal>
      {students.length > 0 || true ? (
        <div
          style={{
            width: "95%",
            textAlign: "center",
            margin: "auto",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <div style={{ display: "inline-flex", marginBottom: "10px" }}>
            <input
              className="form-control"
              placeholder="Buscar por nombre..."
              value={searchText}
              onChange={(e) => searchStudents(e.target.value)}
            ></input>
            <select
              style={{ marginLeft: "20px" }}
              value={selectedClass}
              className="form-select"
              onChange={(e) => filterStudentsByClass(e.target.value)}
            >
              <option defaultValue value="-1">
                Todas las clases...
              </option>
              {classes.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.grade + " " + c.year.grade}
                  </option>
                );
              })}
            </select>
          </div>
          <table className="table table-striped" style={{fontSize: "15px", background: "#ffffff", borderRadius: "10px" }}>
            <thead>
              <tr>
              <th scope="col">Nombre de usuario</th>
                <th scope="col">Nombre</th>
                <th scope="col">Primer Apellido</th>
                <th scope="col">Segundo Apellido</th>
                <th scope="col">Clases Matriculadas</th>
                <th scope="col">Ver Calificaciones</th>
              </tr>
            </thead>
            <tbody>
              {visibleStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.username}</td>
                  <td>{student.name}</td>
                  <td>{student.lastname1}</td>
                  <td>{student.lastname2}</td>
                  <td>
                    <button
                      className="btn"
                      style={{background: "#0b1643", color: "white"}}
                      onClick={() => {
                        setStudent(student);
                        setShowClasses(true);
                      }}
                    >
                      <SiGoogleclassroom size="1.5em" />
                    </button>
                  </td>
                  <td>
                    <button style={{background: "#0b1643", color: "white"}} className="btn" onClick={() => {showStudentGrades(student.id)}}>
                      <MdSchool size="1.5em" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
export default Students;
