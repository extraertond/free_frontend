import React, { useEffect, useState } from "react";
import users from "../../users";
import { useSelector } from "react-redux";
import BasicModal from "../../utils/components/Modals/BasicModal";
import { useHistory } from "react-router";

const Home = () => {
  const user = useSelector(users.selectors.getUser);
  const [show, setShow] = useState(false);
  const [secciones, setSecciones] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (user && !user.initialized) {
      setShow(true);
    }

    if (user) {
      switch (user.role?.name) {
        case "admin":
          setSecciones([{
            title: "Administración", url: "/user/admin"},
            { title: "Mis datos", url: "/user" }
          ]);
          break;
        case "teacher":
          setSecciones([
            { title: "Cuestionarios", url: "/questionnaires" },
            { title: "Mis datos", url: "/user" },
            { title: "Alumnos", url: "/user/admin" },
          ]);
          break;
        case "student":
          setSecciones([
            { title: "Cuestionarios", url: "/questionnaires" },
            { title: "Mis datos", url: "/user" },
          ]);
          break;
        default:
          setSecciones([]);
          break;
      }
    }
  }, [user]);

  return (
    <div className="container">
      <div className="row">
        <BasicModal
          show={show}
          setShow={setShow}
          title="Cambia la contraseña"
          body="Aún no has cambiado la contraseña por defecto que no es segura, cambiala por favor."
          acceptText="Cambiar contraseña"
          cancelText="Cancelar"
          acceptCallback={() => {
            setShow(false);
            history.push("/user");
          }}
          cancelCallback={() => {
            setShow(false);
          }}
        />
        <div className="question-container" style={{ marginTop: "20px" }}>
          <div style={{display: "flex", justifyContent: "center"}}>
          <img style={{width: "200px"}} alt="logo" src="school.png"/>
          </div>
          <div className="home-title">¡Bienvenido de nuevo, {user.name}!</div>
          <div
            style={{
              display: "flex",
              color: "#0b1643",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "20px",
              marginTop: "40px",
            }}
          >
            <div style={{ textDecoration: "underline" }}>Ya puedes navegar por las distintas secciones:</div>
            <div className="sections">
              {secciones.map((s) => (
                <button
                  key={s.url}
                  className="btn btn-section"
                  onClick={() => history.push(s.url)}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
