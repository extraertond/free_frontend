import fetching from "./fetching";

export const getRoles = (onSuccess, onErrors) => {
  fetching("roles", "GET", undefined, onSuccess, onErrors);
};
