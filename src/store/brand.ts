import { message } from "ant-design-vue";
import { asyncAndCommit, StatusType } from "./index";
import { ColumnProp, GlobalStore } from ".";
import { Module } from "vuex";
import { PaginationProp } from "./user";
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
  classifyId?: number | string;
}
export interface GlobalBrandStore {
  columns: ColumnProp[];
  data: BrandProp[];
  pagination: PaginationProp;
  brand: BrandProp;
  rules: {};
}
export const ModuleBrand: Module<GlobalBrandStore, GlobalStore> = {
  mutations: {
    toggleStatus(state, num) {
      state.brand.status = num;
    },
    toggleIsDelete(state, num) {
      state.brand.isDelete = num;
    },
    changeUploaded(state, response) {
      state.brand.logo = response.src;
    },
    findBrands(state, res) {
      state.data = res.data;
      state.data.map((item: BrandProp, index: number) => {
        return Object.assign(item, { key: index });
      });
    },
    findBrand(state, res) {
      state.brand = res.data;
      delete state.brand.updatedTime;
      delete state.brand.createdTime;
    },
    createBrand(state, res) {
      if (res.statusCode == 200) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    },
    clearBrand(state) {
      state.brand = {
        logo: "",
        brandName: "",
        description: "",
      };
    },
  },
  actions: {
    findBrands({ commit }) {
      return asyncAndCommit("/brand", "findBrands", commit);
    },
    findBrand({ commit }, id) {
      return asyncAndCommit(`/brand/${id}`, "findBrand", commit);
    },
    createBrand({ commit }, data) {
      return asyncAndCommit("/brand", "createBrand", commit, {
        method: "post",
        data,
      });
    },
    updateBrand({ commit }, data) {
      return asyncAndCommit(`/brand/${data.id}`, "createBrand", commit, {
        method: "put",
        data: data.res,
      });
    },
  },
  state: {
    brand: {
      logo: "",
      brandName: "",
      description: "",
      classifyId: undefined,
    },
    data: [],
    pagination: {
      pageSize: 6,
      total: 0,
      hideOnSinglePage: true,
      simple: true,
    },
    rules: {
      brandName: [
        {
          required: true,
          message: "Please change brandName",
          trigger: "change",
        },
      ],
      description: [
        {
          required: true,
          message: "Please change description",
          trigger: "change",
        },
      ],
      classifyId: [
        {
          required: true,
          message: "Please change classifyId",
          trigger: "change",
        },
      ],
      logo: [
        {
          required: true,
          message: "Please change logo",
          trigger: "change",
        },
      ],
    },
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
        title: "classifyId",
        align: "center",
        dataIndex: "classifyId",
        width: "15%",
        slots: { customRender: "classifyId" },
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
