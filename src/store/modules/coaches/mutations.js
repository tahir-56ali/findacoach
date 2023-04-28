export default {
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  addCoach(state, payload) {
    state.coaches.push(payload);
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
