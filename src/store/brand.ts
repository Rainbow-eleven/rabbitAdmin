import { asyncAndCommit, StatusType } from "./index";
import { ColumnProp, GlobalStore } from ".";
import { Module } from "vuex";
export interface BrandProp {
  id?: string;
  brandName?: string;
  logo?: string;
  description?: string;
  status?: StatusType;
  createdUserId?: null;
  updatedUserId?: null;
  createdTime?: string;
  updatedTime?: string;
  isDelete?: StatusType;
}
export interface GlobalBrandStore {
  columns: ColumnProp[];
  data: BrandProp[];
}
export const ModuleBrand: Module<GlobalBrandStore, GlobalStore> = {
  mutations: {
    findBrands(state, res) {
      state.data = res.data;
      state.data.map((item: BrandProp, index: number) => {
        return Object.assign(item, { key: index });
      });
    },
  },
  actions: {
    findBrands({ commit }) {
      return asyncAndCommit("/brand", "findBrands", commit);
    },
  },
  state: {
    data: [],
    columns: [
      {
        title: "brandName",
        dataIndex: "brandName",
        align: "center",
        width: "10%",
        slots: { customRender: "brandName" },
      },
      {
        title: "logo",
        dataIndex: "logo",
        align: "center",
        width: "10%",
        slots: { customRender: "logo" },
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
        dataIndex: "",
        width: "10%",
        slots: { customRender: "status" },
      },
      {
        title: "isDelete",
        align: "center",
        dataIndex: "",
        width: "10%",
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
  namespaced: true,
};
