import { message } from "ant-design-vue";
import { asyncAndCommit } from "./index";
import { Module } from "vuex";
import { GlobalStore, StatusType } from ".";
import { MalfunctionProp } from "./malfunction";
import { ModelProps } from "./model";
interface MaloProps {
  id?: string;
  modelId?: ModelProps;
  malfunctionId?: number | MalfunctionProp;
  optionName?: string;
  processType?: StatusType;
  ratio?: number;
}
export interface GlobalMalo {
  malo: MaloProps;
  malfunctionOptions: [];
  vRules: {};
}
export const ModuleMalo: Module<GlobalMalo, GlobalStore> = {
  mutations: {
    changeModelId(state, id) {
      state.malo.modelId = id;
    },
    findModelMalfunctions(state, res) {
      state.malfunctionOptions = res.data.malfunctions;
    },
    createMalo(state, res) {
      if (res.statusCode == 200) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    },
    changeMalfId(state, id) {
      state.malo.malfunctionId = id;
    },
    updateMalo(state, res) {
      if (res.statusCode == 200) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    },
    clearMalo(state) {
      state.malo = {
        malfunctionId: undefined,
        optionName: "",
        ratio: 1,
      };
    },
  },
  actions: {
    findModelMalfunctions({ commit }, id) {
      return asyncAndCommit(
        `/malfunction/model/${id}`,
        "findModelMalfunctions",
        commit
      );
    },
    createMalo({ commit }, data) {
      return asyncAndCommit(`/malo`, "createMalo", commit, {
        data,
        method: "post",
      });
    },
  },
  state: {
    malfunctionOptions: [],
    malo: {
      optionName: "",
      malfunctionId: undefined,
    },
    vRules: {
      optionName: [
        {
          required: true,
          message: "please input optionName",
          trigger: "change",
        },
      ],
      malfunctionId: [
        {
          required: true,
          message: "Please change malf",
          trigger: "change",
          type: "number",
        },
      ],
    },
  },
  namespaced: true,
};
