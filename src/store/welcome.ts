import { Module } from "vuex";
import { GlobalStore } from ".";
interface TagOption {
  tag: string;
  total: number;
  color: string;
}
export interface GlobalWelStore {
  isShowCard: boolean;
  time: string;
  tagsOption: TagOption[];
  modelTotal: number[];
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
    modelTotal: [],
    time: "2020/11/2 下午3:17:50",
    isShowCard: true,
    tagsOption: [
      { color: "#6236ff", tag: "Model Data Total", total: 50 },
      { color: "#fac223", tag: "Classify Data Total", total: 50 },
      { color: "#df2020", tag: "Brand Data Total", total: 50 },
      { color: "#6dd400", tag: "MalFun Data Total", total: 50 },
      { color: "#c4bfdf", tag: "MalO Data Total", total: 50 },
    ],
  },
  namespaced: true,
};
