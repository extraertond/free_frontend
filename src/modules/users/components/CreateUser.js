import React, { useEffect, useState } from "react";
import backend from "../../../backend";
import { Message } from "../../utils";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastname1, setLastname1] = useState("");
  const [lastname1Error, setLastname1Error] = useState("");
  const [lastname2, setLastname2] = useState("");
  const [lastname2Error, setLastname2Error] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [role, setRole] = useState("-1");
  const [roleError, setRoleError] = useState("");

  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState();

  useEffect(() => {
    backend.roleService.getRoles(({ code, data, message }) => {
      if (code === "OK") {
        setRoles(data.roles.filter((r) => r.name !== "admin"));
      } else setMessage({ code, message });
    }, setMessage);
  }, []);

  const createUser = async (name, lastname1, lastname2, username, password, role) => {
    let v1 = validateName(name, 2, setNameError);
    let v2 = validateName(lastname1, 3, setLastname1Error);
    let v3 = validateName(lastname2, 0, setLastname2Error);
    let v4 = validateUsername(username, 3, setUsernameError);
    let v5 = validatePassword(password, 6, setPasswordError);
    let v6 = validateRole(role, setRoleError);
    if (v1 && v2 && v3 && v4 && v5 && v6) {
      await backend.userService.createUser(
        name,
        lastname1,
        lastname2,
        username,
        password,
        role,
        setMessage,
        setMessage
      );
      window.location.reload();
      cleanForm();
    }
  };

  const cleanForm = () => {
    setName("");
    setLastname1("");
    setLastname2("");
    setUsername("");
    setPassword("");
    setRole("-1");
  };
  const validateRole = (role, setError) => {
    let isValid = true;
    if (role === "-1") {
      isValid = false;
      setError("Debes seleccionar una opción");
    } else {
      setError("");
    }
    return isValid;
  };

  const validateName = (string, minLength, setError) => {
    let isValid = true;
    const pattern = new RegExp("^[A-Z ÁÉÍÓÚÑ ]*$", "i");
    if (string.length < minLength) {
      setError("La longitud mínima son " + minLength + " carácteres");
      isValid = false;
    } else if (!pattern.test(string)) {
      setError("Solo puede contener letras");
      isValid = false;
    } else {
      setError("");
    }
    return isValid;
  };

  const validateUsername = (string, minLength, setError) => {
    let isValid = true;
    const pattern = new RegExp("^[1-9A-Z]+$", "i");
    if (!string || string === "" || string.length < minLength) {
      setError("La longitud mínima son " + minLength + " carácteres");
      isValid = false;
    } else if (!pattern.test(string)) {
      setError("Solo puede contener letras y números");
      isValid = false;
    } else {
      setError("");
    }
    return isValid;
  };

  const validatePassword = (string, minLength, setError) => {
    let isValid = true;
    if (!string || string === "" || string.length < minLength) {
      setError("La longitud mínima son " + minLength + " carácteres");
      isValid = false;
    } else if(password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
    } else {
      setError("");
    }
    return isValid;
  };

  return (
    <div className="container-lg">
      <div className="row m-2 mt-5">
        <div className="col">
          <label>Nombre</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={nameError === "" ? "form-control" : "form-control is-invalid"}
            type="text"
            maxLength="25"
            placeholder="Nombre"
          />
          <div className="invalid-feedback">{nameError}</div>
        </div>
      </div>
      <div className="row m-2">
        <div className="col">
          <label>Primer Apellido</label>
          <input
            onChange={(e) => setLastname1(e.target.value)}
            value={lastname1}
            className={lastname1Error === "" ? "form-control" : "form-control is-invalid"}
            type="text"
            placeholder={"Primer apellido"}
          />
          <div className="invalid-feedback">{lastname1Error}</div>
        </div>
        <div className="col">
          <label>Segundo Apellido</label>
          <input
            onChange={(e) => setLastname2(e.target.value)}
            value={lastname2}
            className={lastname2Error === "" ? "form-control" : "form-control is-invalid"}
            type="text"
            placeholder={"Segundo apellido"}
          />
          <div className="invalid-feedback">{lastname2Error}</div>
        </div>
      </div>
      <div className="row m-2">
        <div className="col">
          <label>Nombre de Usuario</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className={usernameError === "" ? "form-control" : "form-control is-invalid"}
            type="text"
            placeholder={"usuario"}
          />
          <div className="invalid-feedback">{usernameError}</div>
        </div>
        <div className="col">
          <label>Rol</label>
          <select
            value={role}
            className={roleError === "" ? "form-select" : "form-select is-invalid"}
            onChange={(e) => setRole(e.target.value)}
          >
            <option defaultValue={"-1"} value={"-1"}>
              Seleccione...
            </option>
            {roles.map((role, idx) => (
              <option key={idx} value={role.name}>
                {role.name}
              </option>
            ))}{" "}
          </select>
          <div className="invalid-feedback">{roleError}</div>
        </div>
      </div>
      <div className="row m-2">
      <div className="col">
          <label>Constraseña</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={passwordError === "" ? "form-control" : "form-control is-invalid"}
            type="password"
            placeholder={"contraseña"}
          />
          <div className="invalid-feedback">{passwordError}</div>
        </div>
        <div className="col">
          <label>Confirmar contraseña</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className={passwordError === "" ? "form-control" : "form-control is-invalid"}
            type="password"
            placeholder={"contraseña"}
          />
        </div>
      </div>
      <div className="row justify-content-center m-4">
        <button
          type="button"
          className="btn p-2 my-2 col-6"
          style={{ background: "#0b1643", color: "white"}}
          onClick={(e) => {
            e.preventDefault();
            createUser(name, lastname1, lastname2, username, password, role);
          }}
        >
          Crear
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
export default CreateUser;
