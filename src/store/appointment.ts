import { asyncAndCommit } from "./index";
import { Module } from "vuex";
import { GlobalStore, StatusType } from ".";
import { UserInfo } from "./login";
export interface AppoProp {
  id?: number;
  email?: string;
  temporalInterval?: 1 | 2 | 3 | 4;
  adress?: string;
  status?: StatusType;
  userId?: UserInfo;
  appointCode?: string;
  appintDate?: string;
}
export interface GlobalAppointment {
  appo: AppoProp;
}
export const ModuleAppointment: Module<GlobalAppointment, GlobalStore> = {
  mutations: {
    findData(state, res) {
      state.appo = res.data;
    },
  },
  actions: {
    findData({ commit }, id: number) {
      return asyncAndCommit(`/appointment/${id}`, "findData", commit);
    },
  },
  state: {
    appo: {},
  },
  namespaced: true,
};
