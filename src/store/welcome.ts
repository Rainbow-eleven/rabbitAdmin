import { asyncAndCommit } from "./index";
import { Module } from "vuex";
import { GlobalStore } from ".";
export interface GlobalWelStore {
  isShowCard: boolean;
  time: string;
}
export const ModuleWelcome: Module<GlobalWelStore, GlobalStore> = {
  mutations: {
    toggleShow(state, bool: boolean) {
      state.isShowCard = bool;
    },
    getTime(state) {
      state.time = new Date().toLocaleTimeString();
    },
  },
  state: {
    time: "2020/11/2 下午3:17:50",
    isShowCard: true,
  },
  namespaced: true,
};
