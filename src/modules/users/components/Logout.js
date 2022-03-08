import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import users from "..";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(users.actions.logout());
    setTimeout(() => history.push("/"), 1000);
  });

  return null;
};

export default Logout;
