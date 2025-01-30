import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import AdminPage from "../views/AdminPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
    {
      path: "/admin",
      component: AdminPage,
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return nextTick().then(() => {
        const element = document.querySelector(to.hash);
        if (element) {
          return {
            el: to.hash,
            behavior: "smooth",
          };
        }
        return { top: 0 };
      });
    }
    return { top: 0 };
  },
});

export default router;
