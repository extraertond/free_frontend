import React, { useEffect } from "react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import backend from "../../backend";
import InfoModal from "../utils/components/Modals/InfoModal";
import BasicModal from "../utils/components/Modals/BasicModal";

const AdminTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [removeId, setRemoveId] = useState();
  useEffect(() => {
    backend.teacherService
      .getTeachers()
      .then((response) => {
        if (response.data && response.data.code === "OK") {
          setTeachers(response.data.data.users);
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setShowErrorModal(true);
      });
  }, []);

  const removeUser = () => {
    backend.teacherService
      .deleteUser(removeId)
      .then((response) => {
        if (response.data.code === "OK") {
          window.location.reload();
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((e) => {
        setShowErrorModal(true);
      });
  };

  return (
    <>
      <BasicModal
        title="¡Atención!"
        body="¿Seguro que deseas eliminar el usuario? Desaparecerá toda la información relacionada, como los cuestionarios creados por este profesor."
        show={showConfirmDelete}
        setShow={setShowConfirmDelete}
        acceptCallback={removeUser}
      ></BasicModal>
      <InfoModal
        show={showErrorModal}
        setShow={setShowErrorModal}
        title="Error"
        body="No se ha realizar la acción, inténtalo más tarde."
        accepText="Aceptar"
      />

      {true ? (
        <div
          style={{
            width: "95%",
            textAlign: "center",
            margin: "auto",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <table
            className="table table-striped"
            style={{ fontSize: "15px", background: "#ffffff", borderRadius: "20px" }}
          >
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Primer Apellido</th>
                <th scope="col">Segundo Apellido</th>
                <th scope="col">Username</th>
                <th scope="col">Borrar</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.lastname1}</td>
                  <td>{teacher.lastname2}</td>
                  <td>{teacher.username}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setRemoveId(teacher.id);
                        setShowConfirmDelete(true);
                      }}
                    >
                      <MdDelete size="1.2em" />
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
    </>
  );
};
export default AdminTeacher;
