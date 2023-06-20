import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { baseUrl } from '@/base/config';
import Main from "@/mb/views/Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: Main,
    redirect: "/Home",
    meta: {
      requiresAuth: true
    },
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
  },
  {
    path: "/Register",
    name: "Register",
    component: () => import("@/mb/views/Register/Register.vue"),
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   redirect: 'Home',
  // },
];

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if(to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ name: 'Login' });
  }
  else next();
});

export default router;
