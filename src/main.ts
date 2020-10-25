import "./plugins/axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Layout,
  Menu,
  Dropdown,
  Button,
  Form,
  Input,
  Checkbox,
} from "ant-design-vue";

createApp(App)
  .use(Layout)
  .use(Menu)
  .use(Dropdown)
  .use(Button)
  .use(Input)
  .use(Form)
  .use(Checkbox)
  .use(store)
  .use(router)
  .mount("#app");
