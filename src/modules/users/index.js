import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import reducer from "./reducer";
import * as selectors from "./selectors";

export { default as Login } from "./components/Login";
export { default as Logout } from "./components/Logout";
export { default as UserAdministration } from "./components/UserAdministration";

const redux = { actions, actionTypes, selectors, reducer };
export default redux;
