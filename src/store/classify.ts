import { message } from "ant-design-vue";
import { asyncAndCommit } from "./index";
import { PaginationProp } from "./user";
import { GlobalStore, ColumnProp } from ".";
import { Module } from "vuex";
type boolType = 0 | 1;
export interface ClassifyProp {
  id?: string;
  classifyName?: string;
  icon?: string;
  bigIcon?: string;
  description?: string;
  status?: boolType;
  createdUserId?: null;
  updatedUserId?: null;
  createdTime?: string;
  updatedTime?: string;
  isDelete?: boolType;
}
export interface GlobalClassifyProp {
  pagination: PaginationProp;
  dataSource: ClassifyProp[];
  columns: ColumnProp[];
  classify: ClassifyProp;
  classifyUpdate: ClassifyProp;
  rules: {};
}
export const ModuleClassify: Module<GlobalClassifyProp, GlobalStore> = {
  state: {
    rules: {
      classifyName: [
        {
          required: true,
          message: "Please input classifyName",
          trigger: "change",
        },
      ],
      description: [
        {
          required: true,
          message: "Please input description",
          trigger: "change",
        },
      ],
      icon: [
        {
          required: true,
          message: "Please change icon",
          trigger: "change",
        },
      ],
      bigIcon: [
        {
          required: true,
          message: "Please change bigIcon",
          trigger: "change",
        },
      ],
    },
    classify: {
      classifyName: "",
      description: "",
      icon: "",
      bigIcon: "",
    },
    classifyUpdate: {},
    pagination: {
      pageSize: 6,
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
        dataIndex: "",
        width: "15%",
        slots: { customRender: "status" },
      },
      {
        title: "isDelete",
        align: "center",
        dataIndex: "",
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
    findClassifys(state, res) {
      state.dataSource = res.data;
      state.dataSource.map((item: ClassifyProp, index: number) => {
        return Object.assign(item, { key: index });
      });
    },
    findClassify(state, res) {
      state.classifyUpdate = res.data;
      delete state.classifyUpdate.updatedTime;
      delete state.classifyUpdate.createdTime;
    },
    changeUploadIcon(state, response) {
      state.classify.icon = response.src;
      state.classifyUpdate.icon = response.src;
    },
    changeUploadBigIcon(state, response) {
      state.classify.bigIcon = response.src;
      state.classifyUpdate.bigIcon = response.src;
    },
    createClassify(state, res) {
      if (res.statusCode == 200) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    },
    toggleStatus(state, num) {
      state.classifyUpdate.status = num;
    },
    toggleIsDelete(state, num) {
      state.classifyUpdate.isDelete = num;
    },
    clearClassify(state) {
      state.classify = {
        classifyName: "",
        description: "",
        icon: "",
        bigIcon: "",
      };
      state.classifyUpdate = {};
    },
  },
  actions: {
    findClassifys({ commit }) {
      return asyncAndCommit(`/classify`, "findClassifys", commit);
    },
    findClassify({ commit }, id) {
      return asyncAndCommit(`/classify/${id}`, "findClassify", commit);
    },
    createClassify({ commit }, data) {
      return asyncAndCommit(`/classify`, "createClassify", commit, {
        method: "post",
        data,
      });
    },
    updateClassify({ commit }, data) {
      return asyncAndCommit(`/classify/${data.id}`, "createClassify", commit, {
        method: "put",
        data: data.res,
      });
    },
  },
  namespaced: true,
};
