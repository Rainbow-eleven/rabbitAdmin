import { message } from "ant-design-vue";
import { asyncAndCommit, ColumnProp } from "./index";
import { Module } from "vuex";
import { GlobalStore, StatusType } from ".";
import { PaginationProp } from "./user";
import { ModelProps } from "./model";
export interface MalfunctionProp {
  id?: string;
  modelId?: ModelProps;
  title?: string;
  isHint?: StatusType;
  hintTitle?: string;
  hintInfo?: string;
  hintImg?: string;
  maintainTopPrice?: number;
}
export interface GlobalMalfunction {
  malfunctions: MalfunctionProp[];
  malfunction: MalfunctionProp;
  rules: {};
  columns: ColumnProp[];
  pagination: PaginationProp;
}
export const ModuleMalfunction: Module<GlobalMalfunction, GlobalStore> = {
  mutations: {
    changeUploadedFaceImg(state, response) {
      state.malfunction.hintImg = response.src;
    },
    changeModelId(state, id) {
      state.malfunction.modelId = id;
    },
    createMalfunction(state, res) {
      if (res.statusCode == 200) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    },
    updateMalfunction(state, res) {
      if (res.statusCode == 200) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    },
    clearMalfunction(state) {
      state.malfunction = {
        modelId: undefined,
        title: "",
        hintTitle: "",
        hintInfo: "",
        hintImg: "",
        maintainTopPrice: undefined,
      };
    },
    findMalfunctions(state, res) {
      state.malfunctions = res.data;
      state.malfunctions.map((item: MalfunctionProp, index: number) => {
        return Object.assign(item, { key: index });
      });
    },
    findMalfunction(state, res) {
      state.malfunction = res.data;
    },
    toggleIsHint(state, num) {
      state.malfunction.isHint = num;
    },
  },
  actions: {
    createMalfunction({ commit }, data) {
      return asyncAndCommit("/malfunction", "createMalfunction", commit, {
        method: "post",
        data,
      });
    },
    findMalfunctions({ commit }) {
      return asyncAndCommit("/malfunction", "findMalfunctions", commit);
    },
    findMalfunction({ commit }, id) {
      return asyncAndCommit(`/malfunction/${id}`, "findMalfunction", commit);
    },
    updateMalfunction({ commit }, res) {
      return asyncAndCommit(
        `/malfunction/${res.id}`,
        "updateMalfunction",
        commit,
        {
          data: res.data,
          method: "put",
        }
      );
    },
  },
  state: {
    pagination: {
      pageSize: 8,
      total: 0,
      hideOnSinglePage: true,
      simple: true,
    },
    columns: [
      {
        title: "model",
        align: "center",
        dataIndex: "modelId",
        ellipsis: true,
        width: "10%",
        slots: { customRender: "modelId" },
      },
      {
        title: "titleName",
        align: "center",
        dataIndex: "title",
        ellipsis: true,
        width: "10%",
        slots: { customRender: "titleName" },
      },
      {
        title: "hintTitle",
        align: "center",
        dataIndex: "hintTitle",
        width: "10%",
        ellipsis: true,
        slots: { customRender: "hintTitle" },
      },
      {
        title: "hintInfo",
        align: "center",
        dataIndex: "hintInfo",
        width: "15%",
        ellipsis: true,
        slots: { customRender: "hintInfo" },
      },
      {
        title: "isHint",
        align: "center",
        dataIndex: "",
        width: "10%",
        slots: { customRender: "isHint" },
      },
      {
        title: "hintImg",
        align: "center",
        dataIndex: "hintImg",
        width: "15%",
        slots: { customRender: "hintImg" },
      },
      {
        title: "maintainTopPrice",
        align: "center",
        dataIndex: "maintainTopPrice",
        width: "15%",
        slots: { customRender: "maintainTopPrice" },
      },
      {
        title: "Action",
        align: "center",
        dataIndex: "",
        key: "x",
        slots: { customRender: "action" },
      },
    ],
    malfunctions: [],
    malfunction: {
      modelId: undefined,
      title: "",
      hintTitle: "",
      hintInfo: "",
      hintImg: "",
      maintainTopPrice: undefined,
    },
    rules: {
      modelId: [
        {
          required: true,
          message: "please input title",
          trigger: "change",
        },
      ],
      title: [
        {
          required: true,
          message: "please input title",
          trigger: "change",
        },
      ],
      hintTitle: [
        {
          required: true,
          message: "please input hintTitle",
          trigger: "change",
        },
      ],
      hintInfo: [
        {
          required: true,
          message: "please input hintInfo",
          trigger: "change",
        },
      ],
      hintImg: [
        {
          required: true,
          message: "please input hintImg",
          trigger: "change",
        },
      ],
      maintainTopPrice: [
        {
          required: true,
          message: "please input maintainTopPrice",
          trigger: "change",
          type: "number",
        },
      ],
    },
  },
  namespaced: true,
};
