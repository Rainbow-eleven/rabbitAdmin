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
  Spin,
  Table,
  Tag,
  PageHeader,
  Tooltip,
  Upload,
  Modal,
  Radio,
} from "ant-design-vue";

createApp(App)
  .use(Layout)
  .use(Menu)
  .use(Spin)
  .use(Upload)
  .use(Table)
  .use(Tag)
  .use(PageHeader)
  .use(Tooltip)
  .use(Dropdown)
  .use(Button)
  .use(Input)
  .use(Modal)
  .use(Radio)
  .use(Form)
  .use(Checkbox)
  .use(store)
  .use(router)
  .mount("#app");
