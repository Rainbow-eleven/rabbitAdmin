import { asyncAndCommit, GlobalStore } from "./index";
import axios from "axios";
import { message } from "ant-design-vue";
import { ActionContext, Module } from "vuex";
import { ActionMutationsProp } from "./user";
export interface LoginInfo {
  account: string;
  password: string;
}
export interface UserInfo {
  isLogin?: boolean;
  id?: number;
  account?: string;
  cardNo?: string;
  password?: string;
  username?: string;
  isAuthentication?: number;
  name?: string;
  faceUrl?: string;
  createdTime?: string;
  updatedTime?: string;
}
export interface GlobalLoginStore {
  fromInput: LoginInfo;
  token: string;
  rules?: {};
  user: UserInfo;
  isShowResetPass: boolean;
  isSend: boolean;
  email: string;
  routerNum: number;
  accountInfo: UserInfo;
  uploadUrl: string;
}
const ModuleLogin: Module<GlobalLoginStore, GlobalStore> = {
  state: {
    isSend: false,
    uploadUrl: "http://127.0.0.1:3000/upload",
    accountInfo: {},
    routerNum: 0,
    user: { isLogin: false },
    token: localStorage.getItem("token") || "",
    isShowResetPass: false,
    email: "",
    rules: {
      account: [
        {
          required: true,
          type: "email",
          message: "Please enter your email",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "Please enter your password",
          trigger: "change",
        },
      ],
    },
    fromInput: {
      account: "qiu3291002845@gmail.com",
      password: "123456",
    },
  },
  mutations: {
    logout(state: GlobalLoginStore) {
      state.token = "";
      state.user = { isLogin: false };
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    },
    LoginUserInfo(state: GlobalLoginStore, user: UserInfo) {
      state.user = user;
    },
    LoginChangeShowModal(state: GlobalLoginStore, bool: boolean) {
      state.isShowResetPass = bool;
    },
    LoginChangeIsSend(state: GlobalLoginStore, bool: boolean) {
      state.isSend = bool;
    },
    LoginChangeRouterNum(state: GlobalLoginStore, res: number) {
      state.routerNum = res;
    },
    UserFindAccount(state, res) {
      state.accountInfo = res.data;
    },
    LoginFinish(
      state: GlobalLoginStore,
      res: { statusCode: number; data: { token: string } }
    ) {
      if (res.statusCode === 200) {
        message.success("login successful");
        const { token } = res.data;
        state.token = token;
        state.user = { isLogin: true };
        localStorage.setItem("token", token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        message.error("Login failed, please re-enter account or password");
      }
    },
  },
  actions: {
    async UserFindAccount({ commit }, account: string) {
      return asyncAndCommit(
        `/user/account/${account}`,
        "login/UserFindAccount",
        commit
      );
    },
    async UserInfoFind({ commit }, arg: ActionMutationsProp) {
      return asyncAndCommit(`/user/${arg.id}`, arg.mutations, commit, {
        method: "get",
      });
    },
    async ToLogin(
      context: ActionContext<GlobalLoginStore, GlobalStore>,
      loginInfo: LoginInfo
    ) {
      const { account, password } = loginInfo;
      return asyncAndCommit(
        `/login/${account}/${password}`,
        "LoginFinish",
        context.commit,
        {
          method: "post",
        }
      );
    },
  },
  getters: {},
  namespaced: true,
};
export default ModuleLogin;
