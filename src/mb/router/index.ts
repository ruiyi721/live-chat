import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { baseUrl } from '@/base/config';
import Main from "@/mb/views/Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: Main,
    redirect: "/Home",
    children: [
      {
        path: "/Home",
        name: "Home",
        component: () => import("@/mb/views/Home/Home.vue"),
        meta: { authRequired: true }
      },
    ],
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/mb/views/Login/Login.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if(to.name !== 'Login' && !token) next({ name: 'Login' });
  else next();
});

export default router;
