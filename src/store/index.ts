import { Commit, createStore } from "vuex";
import axios, { AxiosRequestConfig } from "axios";
import ModuleLogin, { GlobalLoginStore } from "./login";
import ModuleLoading, { GlobalLoadingStore } from "./loading";
import ModuleUser, { GlobalUserStore, MessageResult } from "./user";
import { message } from "ant-design-vue";
import router from "@/router";
import ModuleReg, { GlobalRegStore } from "./Reg";

export interface GlobalStore {
  login: GlobalLoginStore;
  loading: GlobalLoadingStore;
  user: GlobalUserStore;
  reg: GlobalRegStore;
}
export const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: "get" },
  extraData?: unknown
) => {
  const { data } = await axios(url, config);
  if (extraData) {
    commit(mutationName, { data, extraData });
  } else {
    commit(mutationName, data);
  }
  return data;
};
export const returnMessage = async (res: MessageResult) => {
  if (res.statusCode === 200) {
    message.success(res.message);
  } else if (res.statusCode === 500) {
    message.error(res.message);
  }
};
export default createStore<GlobalStore>({
  mutations: {
    BackToGo() {
      router.go(-1);
    },
  },
  actions: {
  },
  modules: {
    login: ModuleLogin,
    loading: ModuleLoading,
    user: ModuleUser,
    reg: ModuleReg,
  },
  getters: {
    createdTimeYear: (state) => {
      return state.user.user.createdTime?.slice(0, 10);
    },
    HideCardNo: (state) => {
      return state.user.user.cardNo?.length === 18
        ? state.user.user.cardNo?.slice(0, 14) + "####"
        : "";
    },
  },
});
