import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import configureStore from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "./modules/app";
import users, { Login } from "./modules/users";

const store = configureStore();

const MainRouting = () => {
  const dispatch = useDispatch();
  dispatch(users.actions.getDataWithToken());
  const logged = useSelector(users.selectors.isLoggedIn);
  return logged ? <App /> : <Login />;
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <MainRouting />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
