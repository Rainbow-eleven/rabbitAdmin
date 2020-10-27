import { createStore } from "vuex";
export interface LoginInfo {
  account: string;
  password: string;
}
export interface UserInfo {
  isLogin: boolean;
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
}
export interface GlobalLoginStore {
  fromInput: LoginInfo;
  token: string;
  rules?: {};
  user: UserInfo;
}
const ModuleLogin = createStore<GlobalLoginStore>({
  state: {
    user: { isLogin: false },
    token: localStorage.getItem("token") || "",
    rules: {
      account: [
        {
          required: true,
          type: "email",
          message: "Please enter your email",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Please enter your password",
          trigger: "blur",
        },
      ],
    },
    fromInput: {
      account: "",
      password: "",
    },
  },
  mutations: {},
  getters: {},
});
export default ModuleLogin;
