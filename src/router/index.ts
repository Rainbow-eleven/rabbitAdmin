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
        path: "/",
        name: "Welcome",
        component: () => import("../views/Welcome/Welcome.vue"),
      },
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
      {
        path: "/classify/edit",
        name: "ClassifyCreate",
        component: () => import("../views/Classify/Create.vue"),
      },
      {
        path: "/classify/edit/:id",
        name: "ClassifyEdit",
        props: true,
        component: () => import("../views/Classify/Create.vue"),
      },
      {
        path: "/brand",
        name: "Brand",
        component: () => import("../views/Brand/Brand.vue"),
      },
      {
        path: "/brand/edit",
        name: "BrandCreate",
        component: () => import("../views/Brand/BrandEdit.vue"),
      },
      {
        path: "/brand/edit/:id",
        name: "BrandEdit",
        props: true,
        component: () => import("../views/Brand/BrandEdit.vue"),
      },
      {
        path: "/model",
        name: "Model",
        component: () => import("../views/Model/Model.vue"),
      },
      {
        path: "/model/edit",
        name: "ModelCreate",
        component: () => import("../views/Model/ModelEdit.vue"),
      },
      {
        path: "/model/edit/:id",
        name: "ModelEdit",
        props: true,
        component: () => import("../views/Model/ModelEdit.vue"),
      },
      {
        path: "/malfunction",
        name: "Malfunction",
        component: () => import("../views/Malfunction/Malfunction.vue"),
      },
      {
        path: "/malfunction/edit/:modelId",
        name: "MalfunctionCreate",
        props: true,
        component: () => import("../views/Malfunction/MalfunctionEdit.vue"),
      },
      {
        path: "/malfunction/edit/:modelId/:id",
        name: "MalfunctionEdit",
        props: true,
        component: () => import("../views/Malfunction/MalfunctionEdit.vue"),
      },
      {
        path: "/malo/edit/:modelId",
        name: "MaloCreate",
        props: true,
        component: () => import("../views/Malo/MaloEdit.vue"),
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
