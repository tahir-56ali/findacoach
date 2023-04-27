export default {
  isAuthenticated(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
};
