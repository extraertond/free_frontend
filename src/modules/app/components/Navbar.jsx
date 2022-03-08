import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import users from "../../users";

const NavigationItem = ({ items }) => {
  return (
    <div className="navbar-nav" style={{display: "flex", justifyContent: "space-evenly", width: "100%"}}>
      {items.map(({ onClick, elem }, idx) => (
        <button
          key={idx}
          className="nav-item"
          style={{
            background: "#0B1643",
            color: "white",
            paddingLeft: "20px",
            border: "none",
          }}
          onClick={onClick}
        >
          {elem}
        </button>
      ))}
    </div>
  );
};
const Navbar = () => {
  const user = useSelector(users.selectors.getUser);
  const history = useHistory();
  const navUserTeacher = [
    {
      elem: "Cuestionarios",
      onClick: () => {
        history.push("/questionnaires");
      },
      role: "all",
    },
    {
      elem: "Mis datos",
      onClick: () => {
        history.push("/user");
      },
      role: "all",
    },
    {
      elem: "Alumnos",
      onClick: () => {
        history.push("/user/admin");
      },
      role: "admin",
    },
    {
      elem: "Cerrar sesión",
      onClick: () => {
        history.push("/logout");
      },
      role: "all",
    },
  ];
  const navUserStudent = [
    {
      elem: "Cuestionarios",
      onClick: () => {
        history.push("/questionnaires");
      },
    },
    {
      elem: "Mis datos",
      onClick: () => {
        history.push("/user");
      },
    },
    {
      elem: "Cerrar sesión",
      onClick: () => {
        history.push("/logout");
      },
    },
  ];
  const navUserAdmin = [
    {
      elem: "Administración",
      onClick: () => {
        history.push("/user/admin");
      },
    },
    {
      elem: "Mis datos",
      onClick: () => {
        history.push("/user");
      },
    },
    {
      elem: "Cerrar sesión",
      onClick: () => {
        history.push("/logout");
      },
    },
  ];

  return (
    <>
      {user && user.role ? (
        <nav
          className="navbar navbar-expand-md navbar-light"
          style={{
            fontFamily: "Lato",
            fontSize: "20px",
            background: "#0B1643",
          }}
        >
          <div className="container-fluid">
            <button className="navbar-brand" style={{ border: "none", background: "#0B1643" }}>
              <img
                src="https://i.ibb.co/svpzWnG/school-white.png"
                onClick={() => {
                  history.push("/");
                }}
                style={{ width: "40px", height: "40px" }}
                alt="logo"
              />
            </button>
            <button
              className="navbar-toggler"
              style={{ background: "white" }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{ background: "#0B1643" }}>
              <NavigationItem
                style={{ background: "#0B1643" }}
                items={
                  user.role.name === "admin"
                    ? navUserAdmin
                    : user.role.name === "teacher"
                    ? navUserTeacher
                    : navUserStudent
                }
              />
            </div>
          </div>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
