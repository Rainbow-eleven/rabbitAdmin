import { createStore } from "vuex";
export interface UserInfo {
  account: string;
  password: string;
}
export interface GlobalLoginStore {
  rules?: {};
  fromInput: UserInfo;
  rememberPassword: boolean;
}
const ModuleLogin = createStore<GlobalLoginStore>({
  state: {
    rules: {
      account: [
        {
          required: true,
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
    rememberPassword: false,
    fromInput: {
      account: "",
      password: "",
    },
  },
  mutations: {
    changeRememberPassword(state) {
      state.rememberPassword = !state.rememberPassword;
    },
  },
  actions: {},
  getters: {},
});
export default ModuleLogin;
