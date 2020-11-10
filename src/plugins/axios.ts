import { message } from "ant-design-vue";
import axios from "axios";
axios.defaults.baseURL = "http://123.56.59.201/";
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
    setTimeout(() => {
      store.commit("loading/ChangeLoading", false);
    }, 500);
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    setTimeout(() => {
      store.commit("loading/ChangeLoading", false);
    }, 500);
    if (error.response.status === 401) {
      const data = {
        code: 500,
        message: "The login time has expired, please log in again",
      };
      message.info(data.message);
      localStorage.clear();
      location.href = "/";
      return Promise.reject(data);
    }
    if (error.response.status === 500) {
      const data = {
        code: -1,
        message: "The data request failed, please check the code and try again",
      };
      message.info(
        "The data request failed, please check the code and try again"
      );
      return Promise.reject(data);
    }
    return Promise.reject(error);
  }
);
