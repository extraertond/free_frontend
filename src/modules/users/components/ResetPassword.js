import React, { useState } from "react";
import backend from "../../../backend";
import { Message } from "../../utils";

const ResetPassword = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="container-lg">
      <div className="row m-2 mt-5">
        <div className="col">
          <label>Nombre de usuario</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="form-control"
            type="text"
            placeholder={"Nombre"}
          />
        </div>
      </div>

      <div className="row justify-content-center m-4">
        <button
          type="button"
          style={{ background: "#0b1643", color: "white"}}
          className="btn p-2 my-2 col-6"
          onClick={(e) => {
            e.preventDefault();
            backend.userService.resetPassword(name, setMessage, setMessage);
          }}
        >
          Restablecer contraseña
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

export default ResetPassword;
