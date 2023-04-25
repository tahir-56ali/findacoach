import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachDetail from "./pages/coaches/CoachDetail.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import ReceivedRequests from "./pages/requests/ReceivedRequests.vue";
import RegisterCoach from "./pages/coaches/RegisterCoach.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [{ path: "contact", component: ContactCoach }],
    },
    {
      path: "/requests",
      component: ReceivedRequests,
      meta: { requireAuth: true },
    },
    {
      path: "/register",
      component: RegisterCoach,
      meta: { requireAuth: true },
    },
    {
      path: "/auth",
      component: UserAuth,
      meta: { requireUnauth: true },
    },
    { path: "/:NotFound(.*)", component: NotFound },
  ],
});

export default router;
