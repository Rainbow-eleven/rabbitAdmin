import router from "@/router";
import { message } from "ant-design-vue";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:3000";
import store from "../store/index";
// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    store.commit("loading/ChangeLoading", true);
    config.headers.common.Authorization = `Bearer ${store.state.login.token}`;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    store.commit("loading/ChangeLoading", true);
    store.state.login.user.isLogin = false;
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    store.commit("loading/ChangeLoading", false);
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    store.commit("loading/ChangeLoading", false);
    if (error.response.status === 401) {
      const data = {
        code: 500,
        message: "登录时长已失效,请重新登陆",
      };
      message.info(data.message);
      localStorage.removeItem("token");
      router.push("/login");
      return Promise.reject(data);
    }
    if (error.response.status === 500) {
      const data = {
        code: -1,
        message: "该用户正在与其他数据进行关联,请取消关联再进行操作",
      };
      message.info("该用户正在与其他数据进行关联,请取消关联再进行操作");
      return Promise.reject(data);
    }
    return Promise.reject(error);
  }
);
