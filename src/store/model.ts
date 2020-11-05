import { message } from "ant-design-vue";
import { asyncAndCommit } from "./index";
import { Module } from "vuex";
import { GlobalStore, StatusType } from ".";
import { BrandProp } from "./brand";
import { ClassifyProp } from "./classify";
export interface ModelProps {
  id?: number;
  modelName?: string;
  exchangePrice?: number;
  topPrice?: number;
  faceImg?: string;
  contentImg?: string;
  description?: string;
  status?: StatusType;
  createdUserId?: null;
  updatedUserId?: null;
  createdTime?: string;
  updatedTime?: string;
  brandId?: BrandProp;
  classifyId?: ClassifyProp;
}
export interface DeleteModelProps {
  brand: BrandProp;
  classify: ClassifyProp;
  model: ModelProps;
  status: StatusType;
}
export interface GlobalModelStore {
  models: [];
  total: number;
  model: ModelProps;
  rules: {};
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
    clearModel(state) {
      state.model = {
        modelName: undefined,
        faceImg: undefined,
        contentImg: undefined,
        brandId: undefined,
        classifyId: undefined,
        description: undefined,
        exchangePrice: undefined,
        topPrice: undefined,
      };
    },
    changeUploadedFaceImg(state, response) {
      state.model.faceImg = response.src;
    },
    changeUploadedContentImg(state, response) {
      state.model.contentImg = response.src;
    },
    createModel(state, res) {
      if (res.statusCode == 200) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    },
    updateModel(state, res) {
      if (res.statusCode == 200) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    },
    findModel(state, res) {
      state.model = res.data;
    },
    toggleStatus(state, num) {
      state.model.status = num;
    },
  },
  actions: {
    findModels({ commit }, params) {
      return asyncAndCommit("/model", "findModels", commit, {
        params,
      });
    },
    findModel({ commit }, id: number) {
      return asyncAndCommit(`/model/${id}`, "findModel", commit);
    },
    findTotal({ commit }) {
      return asyncAndCommit("/model", "findTotal", commit);
    },
    findTotalSearch({ commit }, params) {
      return asyncAndCommit("/model", "findTotalSearch", commit, {
        params,
      });
    },
    createModel({ commit }, data: ModelProps) {
      return asyncAndCommit("/model", "createModel", commit, {
        method: "post",
        data,
      });
    },
    updateModel({ commit }, res) {
      return asyncAndCommit(`/model/${res.id}`, "updateModel", commit, {
        method: "put",
        data: res.data,
      });
    },
  },
  state: {
    model: {
      modelName: "",
      faceImg: "",
      contentImg: "",
      brandId: undefined,
      classifyId: undefined,
      description: "",
      exchangePrice: 0,
      topPrice: 0,
    },
    rules: {
      modelName: [
        {
          required: true,
          message: "Please input modelName",
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
      classifyId: [
        {
          required: true,
          message: "Please change classify",
          trigger: "change",
        },
      ],
      brandId: [
        {
          required: true,
          message: "Please change brand",
          trigger: "change",
        },
      ],
      topPrice: [
        {
          required: true,
          message: "Please change topPrice",
          trigger: "change",
          type: "number",
        },
      ],
      exchangePrice: [
        {
          required: true,
          message: "Please change exchangePrice",
          trigger: "change",
          type: "number",
        },
      ],
      faceImg: [
        {
          required: true,
          message: "Please change faceImg",
          trigger: "change",
        },
      ],
      contentImg: [
        {
          required: true,
          message: "Please change contentImg",
          trigger: "change",
        },
      ],
    },
    models: [],
    total: 0,
  },
  namespaced: true,
};
