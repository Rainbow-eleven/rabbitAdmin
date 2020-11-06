import { message } from "ant-design-vue";
import { asyncAndCommit, ColumnProp } from "./index";
import { Module } from "vuex";
import { GlobalStore } from ".";
import { ModelProps } from "./model";

export interface EvaluateProp {
  id?: number;
  modelId?: ModelProps;
  subscription?: number;
  price?: number;
  remark?: string;
}
export interface GlobalEvaluate {
  columns: ColumnProp[];
  evaluates: EvaluateProp[];
}
const ModuleEvaluate: Module<GlobalEvaluate, GlobalStore> = {
  mutations: {
    findEvaluates(state, res) {
      state.evaluates = res.data;
      state.evaluates.map((item: EvaluateProp, index: number) => {
        return Object.assign(item, { key: index });
      });
    },
    deleteEvaluate(state, res) {
      res.statusCode == 200
        ? message.success(res.message)
        : message.error(res.message);
    },
  },
  actions: {
    findEvaluates({ commit }) {
      return asyncAndCommit("/evaluate", "findEvaluates", commit);
    },
    deleteEvaluate({ commit }, id: number) {
      return asyncAndCommit(`/evaluate/${id}`, "deleteEvaluate", commit, {
        method: "delete",
      });
    },
  },
  state: {
    evaluates: [],
    columns: [
      {
        title: "model",
        align: "center",
        dataIndex: "modelId",
        ellipsis: true,
        width: "15%",
        slots: { customRender: "modelId" },
      },
      {
        title: "subscription",
        align: "center",
        dataIndex: "subscription",
        width: "10%",
        slots: { customRender: "subscription" },
      },
      {
        title: "price",
        align: "center",
        dataIndex: "price",
        width: "10%",
        slots: { customRender: "price" },
      },
      {
        title: "price",
        align: "center",
        dataIndex: "price",
        width: "10%",
        slots: { customRender: "price" },
      },
      {
        title: "remark",
        align: "center",
        dataIndex: "remark",
        width: "25%",
        ellipsis: true,
        slots: { customRender: "remark" },
      },
      {
        title: "action",
        align: "center",
        dataIndex: "",
        slots: { customRender: "action" },
      },
    ],
  },
  namespaced: true,
};
export default ModuleEvaluate;
