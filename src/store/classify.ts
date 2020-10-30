import { asyncAndCommit } from "./index";
import { PaginationProp } from "./user";
import { GlobalStore, ColumnProp } from ".";
import { Module } from "vuex";
type boolType = 0 | 1;
export interface ClassifyProp {
  id: string;
  classifyName: string;
  icon: string;
  bigIcon: string;
  description: string;
  status: boolType;
  createdUserId: null;
  updatedUserId: null;
  createdTime: string;
  updatedTime: string;
  isDelete: boolType;
}
export interface GlobalClassifyProp {
  pagination: PaginationProp;
  dataSource: ClassifyProp[];
  columns: ColumnProp[];
}
export const ModuleClassify: Module<GlobalClassifyProp, GlobalStore> = {
  state: {
    pagination: {
      pageSize: 10,
      total: 0,
      hideOnSinglePage: true,
      simple: true,
    },
    dataSource: [],
    columns: [
      {
        title: "classifyName",
        align: "center",
        dataIndex: "classifyName",
        width: "10%",
        slots: { customRender: "classifyName" },
      },
      {
        title: "icon",
        align: "center",
        dataIndex: "icon",
        width: "10%",
        slots: { customRender: "icon" },
      },
      {
        title: "description",
        align: "center",
        dataIndex: "description",
        width: "15%",
        slots: { customRender: "description" },
      },
      {
        title: "createdTime",
        align: "center",
        dataIndex: "createdTime",
        width: "15%",
        slots: { customRender: "createdTime" },
      },
      {
        title: "updatedTime",
        align: "center",
        dataIndex: "updatedTime",
        width: "15%",
        slots: { customRender: "updatedTime" },
      },
      {
        title: "status",
        align: "center",
        dataIndex: "status",
        width: "15%",
        slots: { customRender: "status" },
      },
      {
        title: "isDelete",
        align: "center",
        dataIndex: "isDelete",
        width: "15%",
        slots: { customRender: "isDelete" },
      },
      {
        title: "Action",
        align: "center",
        dataIndex: "",
        key: "x",
        slots: { customRender: "action" },
      },
    ],
  },
  mutations: {
    findClassify(state, res) {
      state.dataSource = res.data;
      state.dataSource.map((item: ClassifyProp, index: number) => {
        return Object.assign(item, { key: index });
      });
    },
  },
  actions: {
    findClassify({ commit }) {
      return asyncAndCommit(`/classify`, "findClassify", commit);
    },
  },
  namespaced: true,
};
