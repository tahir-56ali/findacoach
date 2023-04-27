import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachDetail from "./pages/coaches/CoachDetail.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import ReceivedRequests from "./pages/requests/ReceivedRequests.vue";
import RegisterCoach from "./pages/coaches/RegisterCoach.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import NotFound from "./pages/NotFound.vue";

import store from "./store/index.js";

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
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

// Using Global Navigation Guard
router.beforeEach(function (to, from, next) {
  if (to.meta.requireAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requireUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
