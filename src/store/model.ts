import { asyncAndCommit } from "./index";
import { Module } from "vuex";
import { GlobalStore, StatusType } from ".";
import { BrandProp } from "./brand";
import { ClassifyProp } from "./classify";
export interface ModelProps {
  id?: number;
  modelName?: string;
  exchangePrice?: string;
  topPrice?: string;
  faceImg?: string;
  contentImg?: string;
  description?: string;
  status?: StatusType;
  createdUserId?: null;
  updatedUserId?: null;
  createdTime?: string;
  updatedTime?: string;
  brandId?: string | BrandProp;
  classifyId?: string | ClassifyProp;
}
export interface GlobalModelStore {
  models: [];
  total: number;
}
export const ModuleModel: Module<GlobalModelStore, GlobalStore> = {
  mutations: {
    findModels(state, res) {
      state.models = res.data;
    },
    findTotal(state, res) {
      state.total = res.total;
    },
    findTotalSearch(state, res) {
      state.models = res.data;
      state.total = res.total;
    },
  },
  actions: {
    findModels({ commit }, params) {
      return asyncAndCommit("/model", "findModels", commit, {
        params,
      });
    },
    findTotal({ commit }) {
      return asyncAndCommit("/model", "findTotal", commit);
    },
    findTotalSearch({ commit }, params) {
      return asyncAndCommit("/model", "findTotalSearch", commit, {
        params,
      });
    },
  },
  state: {
    models: [],
    total: 0,
  },
  namespaced: true,
};
