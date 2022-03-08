const getModule = (state) => state.users;

export const getUser = (state) => getModule(state).user;
export const isLoggedIn = (state) => getUser(state) !== null;
