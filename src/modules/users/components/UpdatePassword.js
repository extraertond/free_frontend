import React, { useState } from "react";
import { useSelector } from "react-redux";
import users from "..";
import backend from "../../../backend";
import { Message } from "../../utils";

const UpdatePassword = () => {
  const user = useSelector(users.selectors.getUser);
  const [password, setPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState();

  return (
    <div className="container-lg">
      <div className="row m-2 mt-5">
        <div className="col">
          <label>Contraseña actual</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="form-control"
            type="password"
            placeholder={"Cotraseña"}
          />
        </div>
      </div>
      <div className="row m-2">
        <div className="col">
          <label>Nueva contraseña</label>
          <input
            onChange={(e) => setNewPassword1(e.target.value)}
            value={newPassword1}
            className="form-control"
            type="password"
            placeholder={"Nueva contraseña"}
          />
        </div>
        <div className="col">
          <label>Repita contraseña</label>
          <input
            onChange={(e) => setNewPassword2(e.target.value)}
            value={newPassword2}
            className="form-control"
            type="password"
            placeholder={"Repita la nueva contraseña"}
          />
        </div>
      </div>

      <div className="row justify-content-center m-4">
        <button
          type="button"
          className="btn p-2 my-2 col-6"
          style={{color: "white", background: "#0b1643"}}
          onClick={(e) => {
            e.preventDefault();
            if (newPassword1 === newPassword2)
              backend.userService.changePassword(user.username, password, newPassword1, setMessage, setMessage);
            else {
              setMessage({ code: "ERROR", message: "Las contraseñas no coinciden." });
            }
          }}
        >
          Cambiar
        </button>
      </div>
      {message && (
        <div className="row">
          <Message code={message.code} message={message.message} />
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
