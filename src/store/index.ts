import { ModuleBrand, GlobalBrandStore, BrandProp } from "./brand";
import { ModuleClassify, GlobalClassifyProp, ClassifyProp } from "./classify";
import { Commit, createStore } from "vuex";
import axios, { AxiosRequestConfig } from "axios";
import ModuleLogin, { GlobalLoginStore } from "./login";
import ModuleLoading, { GlobalLoadingStore } from "./loading";
import ModuleUser, { GlobalUserStore } from "./user";
import { message } from "ant-design-vue";
import router from "@/router";
import ModuleReg, { GlobalRegStore } from "./Reg";
import { GlobalWelStore, ModuleWelcome } from "./welcome";
import { ModuleDashBoard, GlobalDashBoardProps } from "./dashBoard";
import { GlobalRingStore, ModuleRing } from "./ring";

export interface GlobalStore {
  login: GlobalLoginStore;
  loading: GlobalLoadingStore;
  user: GlobalUserStore;
  reg: GlobalRegStore;
  classify: GlobalClassifyProp;
  wel: GlobalWelStore;
  dashBoard: GlobalDashBoardProps;
  ring: GlobalRingStore;
  brand: GlobalBrandStore;
}
export interface MessageResult {
  statusCode: number;
  data?: undefined;
  message: string;
}
interface SlotProp {
  customRender: string;
}
export type StatusType = 0 | 1;
export interface ColumnProp {
  title?: string;
  dataIndex?: string;
  width?: string;
  slots?: SlotProp;
  key?: string;
  align?: string;
}
export const mapTime = (item: ClassifyProp | BrandProp) => {
  return {
    ...item,
    createdTime:
      item.createdTime?.slice(0, 10) + " " + item.createdTime?.slice(11, 16),
    updatedTime:
      item.updatedTime?.slice(0, 10) + " " + item.updatedTime?.slice(11, 16),
  };
};
export const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: "get" },
  extraData?: unknown
) => {
  const { data } = await axios(url, config);
  if (extraData) {
    commit(mutationName, { data, extraData });
  } else {
    commit(mutationName, data);
  }
  return data;
};
export const returnMessage = async (res: MessageResult) => {
  if (res.statusCode === 200) {
    message.success(res.message);
  } else if (res.statusCode === 500) {
    message.error(res.message);
  }
};
export default createStore<GlobalStore>({
  mutations: {
    BackToGo() {
      router.go(-1);
    },
  },
  getters: {
    headerStatus: (state) => {
      return {
        Authorization: `bearer ${state.login.token}`,
      };
    },
    createdTimeYear: (state) => {
      return state.user.user.createdTime?.slice(0, 10);
    },
    classifys(state) {
      return state.classify.dataSource.map((item) => mapTime(item));
    },
    brands(state) {
      return state.brand.data.map((item) => mapTime(item));
    },
    HideCardNo: (state) => {
      return state.user.user.cardNo?.length === 18
        ? state.user.user.cardNo?.slice(0, 14) + "####"
        : "";
    },
    getMonth() {
      switch (new Date().getMonth() + 1) {
        case 1:
          return "Jan";
        case 2:
          return "Feb";
        case 3:
          return "Mar";
        case 4:
          return "Apr";
        case 5:
          return "May";
        case 6:
          return "Jun";
        case 7:
          return "Jul";
        case 8:
          return "Aug";
        case 9:
          return "Sept";
        case 10:
          return "Oct";
        case 11:
          return "Nov";
        case 12:
          return "Dec";
      }
    },
  },
  modules: {
    login: ModuleLogin,
    loading: ModuleLoading,
    user: ModuleUser,
    reg: ModuleReg,
    classify: ModuleClassify,
    wel: ModuleWelcome,
    dashBoard: ModuleDashBoard,
    ring: ModuleRing,
    brand: ModuleBrand,
  },
});
