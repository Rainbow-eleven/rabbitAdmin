import { message } from "ant-design-vue";
import { asyncAndCommit, ColumnProp } from "./index";
import { Module } from "vuex";
import { GlobalStore } from ".";
import { MalfunctionProp } from "./malfunction";
import { ModelProps } from "./model";
import { PaginationProp } from "./user";
export interface MaloProps {
  id?: string;
  modelId?: ModelProps;
  malfunctionId?: MalfunctionProp;
  optionName?: string;
  processType?: 1 | 2;
  ratio?: number;
  key?: number;
}
export interface GlobalMalo {
  malo: MaloProps;
  malfunctionOptions: [];
  vRules: {};
  columns: ColumnProp[];
  malos: MaloProps[];
  pagination: PaginationProp;
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
    findMalos(state, res) {
      state.malos = res.data;
      state.malos.map((item: MaloProps, index: number) => {
        return Object.assign(item, { key: index });
      });
    },
    findMalo(state, res) {
      state.malo = res.data;
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
    findMalos({ commit }) {
      return asyncAndCommit(`/malo`, "findMalos", commit);
    },
    findMalo({ commit }, id) {
      return asyncAndCommit(`/malo/${id}`, "findMalo", commit);
    },
    createMalo({ commit }, data) {
      return asyncAndCommit(`/malo`, "createMalo", commit, {
        data,
        method: "post",
      });
    },
    updateMalo({ commit }, res) {
      return asyncAndCommit(`/malo/${res.id}`, "updateMalo", commit, {
        data: res.data,
        method: "put",
      });
    },
  },
  state: {
    pagination: {
      pageSize: 8,
    },
    malfunctionOptions: [],
    malos: [],
    columns: [
      {
        title: "optionName",
        align: "center",
        dataIndex: "optionName",
        ellipsis: true,
        width: "20%",
        slots: { customRender: "optionName" },
      },
      {
        title: "model",
        align: "center",
        dataIndex: "modelId",
        ellipsis: true,
        width: "15%",
        slots: { customRender: "modelId" },
      },
      {
        title: "malfunction",
        align: "center",
        dataIndex: "malfunctionId",
        ellipsis: true,
        width: "15%",
        slots: { customRender: "malfunctionId" },
      },
      {
        title: "processType",
        align: "center",
        dataIndex: "",
        width: "15%",
        slots: { customRender: "processType" },
      },
      {
        title: "ratio",
        align: "center",
        dataIndex: "ratio",
        ellipsis: true,
        width: "10%",
        slots: { customRender: "ratio" },
      },
      {
        title: "action",
        align: "center",
        dataIndex: "",
        ellipsis: true,
        slots: { customRender: "action" },
      },
    ],
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
