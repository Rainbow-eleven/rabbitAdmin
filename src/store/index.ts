import { Commit, createStore } from "vuex";
import axios, { AxiosRequestConfig } from "axios";
import ModuleLogin, { GlobalLoginStore, LoginInfo } from "./login";
import ModuleLoading, { GlobalLoadingStore } from "./loading";
import ModuleUser, { GlobalUserStore, OssResult, UserInfo } from "./user";
import { message } from "ant-design-vue";
import router from "@/router";

export interface GlobalStore {
  login: GlobalLoginStore;
  loading: GlobalLoadingStore;
  user: GlobalUserStore;
}
const asyncAndCommit = async (
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
export interface MessageResult {
  statusCode: number;
  data?: unknown;
  message: string;
}
export interface UserEdit {
  user: UserInfo;
  id: number;
}
export interface ActionMutationsProp {
  mutations: string;
  id: number;
}
const returnMessage = async (res: MessageResult) => {
  if (res.statusCode === 200) {
    message.success(res.message);
  } else if (res.statusCode === 500) {
    message.error(res.message);
  }
};
export default createStore<GlobalStore>({
  mutations: {
    LoadingChangeLoading(state, bool) {
      state.loading.isLoading = bool;
    },
    LoginFinish(state, res) {
      if (res.statusCode === 200) {
        message.success(res.message);
        const { token } = res.data;
        state.login.token = token;
        state.login.user = { isLogin: true };
        localStorage.setItem("token", token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        message.error(res.message);
      }
    },
    logout(state) {
      state.login.token = "";
      state.login.user = { isLogin: false };
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    },
    UserFind(state, res) {
      state.user.users = res.data;
      state.user.users.map((item: UserInfo, index: number) => {
        return Object.assign(item, { key: index });
      });
    },
    UserDelete(state, res) {
      returnMessage(res);
    },
    UserCreate(state, res) {
      returnMessage(res);
    },
    UserChangeTotal(state, num) {
      state.user.pagination.total = num;
    },
    UserChangeCurrent(state, num) {
      state.user.pagination.current = num;
    },
    BackToGo() {
      router.go(-1);
    },
    UserUploadedAvatar(state, file: OssResult) {
      state.user.user.faceUrl = file.src;
    },
    UserInfoFind(state, user: UserInfo) {
      state.user.user = user;
    },
    UserInfoFindEdit(state, user: UserInfo) {
      state.user.userEdit = user;
    },
    UserChangeShowModel(state, bool: boolean) {
      state.user.isShow = bool;
    },
    UserInfoEdit(state, user) {
      state.user.user = user;
    },
    UserEditChangeVerified(state, Num: number) {
      state.user.userEdit.isAuthentication = Num;
    },
    UserEditClearCardNo(state) {
      state.user.userEdit.cardNo = "";
    },
    UserChangeIsCorrect(state, bool: boolean) {
      state.user.isCorrect = bool;
    },
  },
  actions: {
    async ToLogin({ commit }, loginInfo: LoginInfo) {
      return asyncAndCommit("/login", "LoginFinish", commit, {
        method: "post",
        data: loginInfo,
      });
    },
    async FindUser({ commit }) {
      return asyncAndCommit("/user", "UserFind", commit, {
        method: "get",
      });
    },
    async UserDeleteUser({ commit }, user: UserInfo) {
      return asyncAndCommit(`/user/${user.id}`, "UserDelete", commit, {
        method: "delete",
      });
    },
    async UserCreateUser({ commit }, user: LoginInfo) {
      return asyncAndCommit(`/user`, "UserCreate", commit, {
        method: "post",
        data: user,
      });
    },
    async UserInfoFind({ commit }, arg: ActionMutationsProp) {
      return asyncAndCommit(`/user/${arg.id}`, arg.mutations, commit, {
        method: "get",
      });
    },
    async UserInfoEdit({ commit }, userEdit: UserEdit) {
      return asyncAndCommit(`/user/${userEdit.id}`, "UserInfoEdit", commit, {
        method: "put",
        data: userEdit.user,
      });
    },
  },
  modules: { login: ModuleLogin, loading: ModuleLoading, user: ModuleUser },
  getters: {
    createdTimeYear: (state) => {
      return state.user.user.createdTime?.slice(0, 10);
    },
    HideCardNo: (state) => {
      return state.user.user.cardNo?.length === 18
        ? state.user.user.cardNo?.slice(0, 14) + "####"
        : "";
    },
  },
});
