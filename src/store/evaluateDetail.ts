import { message } from "ant-design-vue";
import { asyncAndCommit, ColumnProp } from "./index";
import { Module } from "vuex";
import { GlobalStore } from ".";
import { EvaluateProp } from "./evaluate";
import { MalfunctionProp } from "./malfunction";
import { MaloProps } from "./malo";

export interface EvaluateDetailProp {
  id?: number;
  evaluateId?: EvaluateProp;
  malfId?: MalfunctionProp;
  optionId?: MaloProps;
}
export interface GlobalEvaluateDetail {
  columns: ColumnProp[];
  data: EvaluateDetailProp;
}
const ModuleEvaluateDetail: Module<GlobalEvaluateDetail, GlobalStore> = {
  mutations: {
    findData(state, res) {
      state.data = res.data;
    },
    deleteData(state, res) {
      res.statusCode == 200
        ? message.success(res.message)
        : message.error(res.message);
    },
  },
  actions: {
    findData({ commit }, id) {
      return asyncAndCommit(`/evaluate-detail/${id}`, "findData", commit);
    },
    deleteData({ commit }, id: number) {
      return asyncAndCommit(`/evaluate-detail/${id}`, "deleteData", commit, {
        method: "delete",
      });
    },
  },
  state: {
    data: {},
    columns: [
      {
        title: "evaluate",
        align: "center",
        dataIndex: "evaluateId",
        ellipsis: true,
        width: "15%",
        slots: { customRender: "modelId" },
      },
      {
        title: "malfunction",
        align: "center",
        dataIndex: "malfId",
        ellipsis: true,
        width: "15%",
        slots: { customRender: "malfId" },
      },
      {
        title: "option",
        align: "center",
        dataIndex: "optionId",
        ellipsis: true,
        width: "15%",
        slots: { customRender: "optionId" },
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
export default ModuleEvaluateDetail;
