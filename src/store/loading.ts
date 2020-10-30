import { Module } from "vuex";
import { GlobalStore } from ".";

export interface GlobalLoadingStore {
  isLoading: boolean;
}
const ModuleLoading: Module<GlobalLoadingStore, GlobalStore> = {
  state: {
    isLoading: false,
  },
  mutations: {
    ChangeLoading(state: GlobalLoadingStore, bool: boolean) {
      state.isLoading = bool;
    },
  },
  namespaced: true,
};
export default ModuleLoading;
