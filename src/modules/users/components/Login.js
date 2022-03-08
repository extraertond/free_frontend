import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../actions";
import { Message } from "../../utils";

const style = (margin, padding) => ({
  margin: `${margin}px 0px`,
  padding: `${padding}px 10px`,
  fontSize: "17px",
  height: "35px",
  minWidth: "200px",
});

const Login = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setMessage({message: "Ingresa el usuario y la contraseña", code: "ERROR"});
    } else {
      dispatch(actions.login(username, password,
          (_) => {},
          ({ code, message }) => { setMessage({ code, message }); })
      );
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        fontFamily: "Lato",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <img src="school.png" alt="logo" style={{width: "250px"}}/>
      <form onSubmit={login} style={{ width: "100%", maxWidth: "700px" }}>
      <div style={{ fontSize: "40px", fontWeight: "600", textAlign: "center", color: "#0B1643" }}>INICIAR SESIÓN</div>
        <div
          className="question-container"
          style={{
            padding: "20px 30px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginRight: "20px",
            marginLeft: "20px",
            border: "1.5px solid #0B1643",
          }}
        >
          <input
            placeholder="Usuario"
            type="text"
            value={username}
            style={style(10, 7)}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            style={style(10, 7)}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="row justify-content-center">
            <button
              type="submit"
              value="submit"
              className="btn"
              style={{ fontSize: "20px", width: "100px", background: "#0B1643", color: "white" }}
            >
              Entrar
            </button>
          </div>
        </div>
      </form>
      {message && (
        <div className="row" style={{ marginTop: "20px" }}>
          <Message code={message.code} message={message.message} />
        </div>
      )}
    </div>
  );
};
export default Login;
