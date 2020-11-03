import { asyncAndCommit, returnMessage } from "./index";
import { UserInfo } from "./login";
import { Module } from "vuex";
import { GlobalStore } from ".";
export interface RegProp {
  account?: string;
  password?: string;
  username?: string;
  code?: string;
}
export interface GlobalRegStore {
  bgList: string[];
  dataSource: string[];
  isSend: boolean;
  regForm: RegProp;
  rules: {};
  accountInfo: UserInfo;
}
const ModuleReg: Module<GlobalRegStore, GlobalStore> = {
  state: {
    rules: {
      username: [
        {
          required: true,
          message: "Please input Nick name",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "Please input Password",
          trigger: "change",
        },
      ],
      account: [
        {
          required: true,
          message: "Please input Account Email",
          trigger: "change",
          type: "email",
        },
      ],
      code: [
        {
          required: true,
          message: "Please input Verification code",
          trigger: "change",
        },
      ],
    },
    regForm: {
      account: "",
      password: "",
      username: "",
      code: "",
    },
    accountInfo: {},
    bgList: [
      "https://czh1010.oss-cn-beijing.aliyuncs.com/01-1.jpg",
      "https://czh1010.oss-cn-beijing.aliyuncs.com/01-2.jpg",
      "https://czh1010.oss-cn-beijing.aliyuncs.com/01-3.jpg",
      "https://czh1010.oss-cn-beijing.aliyuncs.com/01-4.jpg",
    ],
    dataSource: [],
    isSend: false,
  },
  mutations: {
    changeData(state, value: string) {
      state.dataSource =
        !value || value.indexOf("@") >= 0
          ? []
          : [
              `${value}@gmail.com`,
              `${value}@163.com`,
              `${value}@qq.com`,
              `${value}@126.com`,
              `${value}@sohu.com`,
            ];
    },
    showCode(state, bool: boolean) {
      state.isSend = bool;
    },
    UserFindAccount(state, res) {
      state.accountInfo = res.data;
    },
    UserCreate(state, res) {
      returnMessage(res);
    },
  },
  actions: {
    async RegFindAccount({ commit }, account: string) {
      return asyncAndCommit(
        `/user/account/${account}`,
        "UserFindAccount",
        commit
      );
    },
    async RegUser({ commit }, reg: RegProp) {
      return asyncAndCommit(`/user`, "UserCreate", commit, {
        method: "post",
        data: reg,
      });
    },
  },
  namespaced: true,
};
export default ModuleReg;
