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
  Carousel,
  Tooltip,
  Upload,
  Modal,
  Radio,
  AutoComplete,
  Switch,
  Card,
  Avatar,
  Select,
  Pagination,
  Slider,
  InputNumber,
  Row,
  Col,
  Popover,
} from "ant-design-vue";

createApp(App)
  .use(Layout)
  .use(Menu)
  .use(Spin)
  .use(Upload)
  .use(Table)
  .use(Tag)
  .use(Slider)
  .use(AutoComplete)
  .use(Switch)
  .use(Carousel)
  .use(Card)
  .use(InputNumber)
  .use(Select)
  .use(Row)
  .use(Col)
  .use(Popover)
  .use(PageHeader)
  .use(Radio)
  .use(Pagination)
  .use(Avatar)
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
