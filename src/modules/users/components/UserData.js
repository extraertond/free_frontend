import React from "react";
import { useSelector } from "react-redux";
import users from "..";
import UpdatePassword from "./UpdatePassword";

const MisDatos = () => {
  const user = useSelector(users.selectors.getUser);
  return (
    <div className="container-lg">
      <div className="row m-2 mt-5">
        <div className="col">
          <label>Nombre</label>
          <input value={user.name} className="form-control" type="text" placeholder={"Nombre"} disabled />
        </div>
      </div>
      <div className="row m-2">
        <div className="col">
          <label>Primer Apellido</label>
          <input value={user.lastname1} className="form-control" type="text" placeholder={"Primer apellido"} disabled />
        </div>
        <div className="col">
          <label>Segundo Apellido</label>
          <input
            value={user.lastname2}
            className="form-control disabled"
            type="text"
            placeholder={"Segundo apellido"}
            disabled
          />
        </div>
      </div>
      <div className="row m-2 my-5">
        <div className="col">
          <label>Nombre de usuario</label>
          <input
            value={user.username}
            className="form-control"
            type="text"
            placeholder={"Nombre de usuario"}
            disabled
          />
        </div>
      </div>
      <div className="row m-2">
        <div className="col">
          <label>Rol</label>
          <input value={user.role.name} className="form-control" type="text" placeholder={"rol"} disabled />
        </div>
      </div>
    </div>
  );
};

const UserData = () => {
  const tabs = [
    { id: "user-info", component: MisDatos, title: "Tus datos" },
    { id: "change-password", component: UpdatePassword, title: "Cambiar contraseña" },
  ];
  return (
    <div>
      <ul className="nav" id="myTab" role="tablist" style={{display: "flex", justifyContent: "space-around"}}>
        {tabs.map((tab, idx) => (
          <li key={idx} className="nav-item" role="presentation">
            <button
              className="nav-link btn"
              id={`${tab.id}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#${tab.id}`}
              type="button"
              role="tab"
              aria-controls={tab.id}
              aria-selected="true"
              style={{border: "none", marginTop: "10px", color: "white", background: "#0b1643"}}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content" id="myTabContent">
        {tabs.map((tab, idx) => (
          <div className="tab-pane fade question-container" style={{paddingTop: 0}} key={idx} id={tab.id} role="tabpanel" aria-labelledby={`${tab.id}-tab`}>
            {<tab.component />}
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserData;
