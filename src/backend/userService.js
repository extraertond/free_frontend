import fetching from "./fetching";
import { removeServiceToken } from "./tokenService";

export const login = (username, password, onSuccess, onErrors) => {
  fetching(
    "users/login",
    "POST",
    {
      user: { username, password },
    },
    onSuccess,
    onErrors
  );
};

export const createUser = async (name, lastname1, lastname2, username, password, role, onSuccess, onErrors) => {
  return await fetching(
    "users/r1/create",
    "POST",
    {
      user: {
        name,
        lastname1,
        lastname2,
        username,
        password,
        role,
      },
    },
    onSuccess,
    onErrors
  );
};

export const changePassword = (username, password, newPassword, onSuccess, onErrors) => {
  fetching(
    "users/change_password",
    "POST",
    {
      user: {
        username,
        password,
        newPassword,
      },
    },
    onSuccess,
    onErrors
  );
};

export const resetPassword = (username, onSuccess, onErrors) => {
  fetching("users/adm/reset_password", "POST", { user: { username } }, onSuccess, onErrors);
};

export const getDataByToken = (onSuccess, onErrors) => {
  fetching("users/data", "POST", {}, onSuccess, onErrors);
};

export const logout = () => {
  removeServiceToken();
};
