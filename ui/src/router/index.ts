import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "../views/LoginSection.vue";
import Demo from "../views/BlankView.vue";
import NotFound from "../views/NotFound.vue";
import { authGuard } from "../_helpers";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "empty" }
  },

  {
    path: "/demo",
    name: "Demo",
    beforeEnter: authGuard,
    component: Demo
  },
  { path: "/:pathMatch(.*)*", component: NotFound, meta: { layout: "empty" } }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
