import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { message } from "ant-design-vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/user",
        name: "User",
        component: () => import("../views/User/Index.vue"),
      },
      {
        path: "/user/create",
        name: "UserCreate",
        component: () => import("../views/User/Create.vue"),
      },
      {
        path: "/user/info/:id",
        name: "UserInfo",
        props: true,
        component: () => import("../views/User/Info.vue"),
      },
      {
        path: "/classify",
        name: "Classify",
        component: () => import("../views/Classify/Index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/Login.vue"),
    meta: { redirectAlreadyLogin: true },
  },
  {
    path: "/reg",
    name: "Reg",
    component: () => import("../views/Login/Reg.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (!to.meta.redirectAlreadyLogin && !localStorage.getItem("token")) {
    if (store.state.login.user.isLogin) {
      next();
    } else {
      if (to.path == "/reg") {
        next();
      } else {
        message.info("请您先登录再进入页面");
        next("/login");
      }
    }
  } else {
    next();
  }
});

export default router;
