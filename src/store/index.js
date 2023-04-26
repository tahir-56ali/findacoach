import { createStore } from "vuex";

import authModule from "./modules/auth/index.js";
import coachesModule from "./modules/coaches/index.js";
import requestsModule from "./modules/requests/index.js";

export default createStore({
  modules: {
    auth: authModule,
    coaches: coachesModule,
    requests: requestsModule,
  },
});
