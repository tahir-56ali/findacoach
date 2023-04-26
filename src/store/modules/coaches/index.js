import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: "c1",
          firstName: "Tahir",
          lastName: "Ali",
          description: "I am backend developer!",
          hourlyRate: 45,
          areas: ["backend"],
        },
        {
          id: "c2",
          firstName: "Max",
          lastName: "Mallian",
          description: "I am online isntructor and developer!",
          hourlyRate: 100,
          areas: ["frontend", "backend", "career"],
        },
      ],
      lastFetch: null,
    };
  },
  actions,
  mutations,
  getters,
};
