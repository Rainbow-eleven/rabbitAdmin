import { ColumnProp } from "./index";
import { LoginInfo } from "./login";
import { message } from "ant-design-vue";
import { Module } from "vuex";
import { GlobalStore, asyncAndCommit, returnMessage, MessageResult } from ".";
export interface UserInfo {
  isLogin?: boolean;
  id?: number;
  account?: string;
  cardNo?: string;
  password?: string;
  username?: string;
  isAuthentication?: number;
  name?: string;
  faceUrl?: string;
  createdTime?: string;
  updatedTime?: string;
  key?: number;
}
export interface OssResult {
  message: string;
  path: string;
  src: string;
  srcSign: string;
  uploaded: boolean;
}
export interface UserEdit {
  user: UserInfo;
  id: number;
}
export interface ActionMutationsProp {
  mutations: string;
  id: number;
}
export interface PasswordProp {
  id: number;
  pass: string;
}
export interface PaginationProp {
  pageSize: number;
  total: number;
  current?: number;
  hideOnSinglePage?: boolean;
  simple?: boolean;
}
export interface GlobalUserStore {
  users: UserInfo[];
  user: UserInfo;
  columns: Array<ColumnProp>;
  rules?: {};
  userRules?: {};
  pagination: PaginationProp;
  isShow: boolean;
  userEdit: UserInfo;
  isCorrect: boolean;
  isShowPass: boolean;
}
const ModuleUser: Module<GlobalUserStore, GlobalStore> = {
  mutations: {
    UserFind(state, res) {
      state.users = res.data;
      state.users.map((item: UserInfo, index: number) => {
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
      state.pagination.total = num;
    },
    UserChangeCurrent(state, num) {
      state.pagination.current = num;
    },
    UserUploadedAvatar(state, file: OssResult) {
      state.user.faceUrl = file.src;
    },
    UserInfoFind(state, user: UserInfo) {
      state.user = user;
    },
    UserInfoFindEdit(state, user: UserInfo) {
      state.userEdit = user;
    },
    UserChangeShowModel(state, bool: boolean) {
      state.isShow = bool;
    },
    UserChangeShowPassModel(state, bool: boolean) {
      state.isShowPass = bool;
    },
    UserInfoEdit(state, user) {
      state.user = user;
    },
    UserEditChangeVerified(state, Num: number) {
      state.userEdit.isAuthentication = Num;
    },
    UserEditClearCardNo(state) {
      state.userEdit.cardNo = "";
    },
    UserChangeIsCorrect(state, bool: boolean) {
      state.isCorrect = bool;
    },
    UserVolidatePass(state, res: MessageResult) {
      if (res.statusCode == 200) {
        message.success("Fully match the old password");
        state.isCorrect = true;
      } else {
        message.error("Does not match the old password");
        state.isCorrect = false;
      }
    },
    UserUpdatePassword() {
      message.success("Successfully modified");
    },
    UserSendEmail(state, res) {
      sessionStorage.setItem("emailCode", res.data.code);
    },
  },
  actions: {
    async FindUser({ commit }) {
      return asyncAndCommit("/user", "UserFind", commit, {
        method: "get",
      });
    },
    async UserDeleteUser({ commit }, id: number) {
      return asyncAndCommit(`/user/${id}`, "UserDelete", commit, {
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
    async UserVolidatePass({ commit }, oldPass: PasswordProp) {
      return asyncAndCommit(
        `/user/volidateOldPass`,
        "UserVolidatePass",
        commit,
        {
          method: "post",
          data: oldPass,
        }
      );
    },
    async UserUpdatePassword({ commit }, newPass: PasswordProp) {
      return asyncAndCommit(`/user/updatePass`, "UserUpdatePassword", commit, {
        method: "post",
        data: newPass,
      });
    },
    async UserSendEmail({ commit }, account: string) {
      return asyncAndCommit(`/email/${account}`, "UserSendEmail", commit);
    },
  },
  state: {
    userEdit: {},
    isShow: false,
    isShowPass: false,
    users: [],
    user: {},
    columns: [
      {
        title: "avatar",
        dataIndex: "faceUrl",
        width: "10%",
        slots: { customRender: "avatar" },
      },
      {
        title: "account",
        dataIndex: "account",
        width: "15%",
        slots: { customRender: "account" },
      },
      {
        title: "nickName",
        dataIndex: "username",
        width: "15%",
        slots: { customRender: "username" },
      },
      {
        title: "actual name",
        dataIndex: "name",
        width: "15%",
        slots: { customRender: "actualName" },
      },
      {
        title: "isAuthentication",
        dataIndex: "isAuthentication",
        width: "15%",
        slots: { customRender: "isAuthentication" },
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        slots: { customRender: "action" },
      },
    ],
    userRules: {
      account: [
        {
          required: true,
          type: "email",
          message: "Please enter your email",
          trigger: "change",
        },
      ],
      username: [
        {
          required: true,
          message: "Please enter your username",
          trigger: "change",
        },
      ],
      name: [
        {
          required: true,
          message: "Please enter your actualName",
          trigger: "change",
        },
      ],
      cardNo: [
        {
          required: false,
          type: "string",
          message: "Please enter your actualName",
          trigger: "change",
        },
        {
          min: 18,
          max: 18,
          message: "Length should be 18",
          trigger: "change",
        },
      ],
    },
    rules: {
      account: [
        {
          required: true,
          type: "email",
          message: "Please enter your email",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "Please enter your password",
          trigger: "change",
        },
        {
          min: 6,
          max: 24,
          message: "Length should be 6 to 24",
          trigger: "change",
        },
      ],
    },
    pagination: {
      pageSize: 5,
      total: 0,
      hideOnSinglePage: true,
      simple: true,
    },
    isCorrect: false,
  },
  namespaced: true,
};
export default ModuleUser;
