export default {
  requests(state) {
    return state.requests;
  },
  hasRequests(state) {
    return state.requests && state.requests.length > 0;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;

    if (!lastFetch) {
      return true;
    }

    const currentTimestamp = new Date().getTime();

    return (currentTimestamp - lastFetch) / 1000 > 60;
  },
};
