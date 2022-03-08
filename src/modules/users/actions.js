import * as actionTypes from "./actionTypes";
import backend from "../../backend";

const loginCompleted = (user) => ({
  type: actionTypes.LOGIN_COMPLETED,
  user,
});

export const login = (username, password, onSuccess, onErrors) => (dispatch) => {
  backend.userService.login(
    username,
    password,
    ({ code, message, data }) => {
      dispatch(loginCompleted({ ...data, username }));
      onSuccess({ code, message, data });
    },
    onErrors
  );
};

export const logout = () => {
  backend.userService.logout();
  return { type: actionTypes.LOGOUT };
};

const getDataWithTokenCompleted = (user) => ({
  type: actionTypes.GET_DATA_WITH_TOKEN,
  user,
});

export const getDataWithToken = () => (dispatch) => {
  backend.userService.getDataByToken(
    ({ code, message, data }) => {
      dispatch(getDataWithTokenCompleted(data));
    },
    () => {}
  );
};
