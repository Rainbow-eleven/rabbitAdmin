import { createStore } from "vuex";
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
interface SlotProp {
  customRender: string;
}
export interface OssResult {
  message: string;
  path: string;
  src: string;
  srcSign: string;
  uploaded: boolean;
}
interface ColumnProp {
  title?: string;
  dataIndex?: string;
  width?: string;
  slots: SlotProp;
  key?: string;
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
  pagination: PaginationProp;
  isShow: boolean;
  userEdit: UserInfo;
}
const ModuleUser = createStore<GlobalUserStore>({
  state: {
    userEdit:{},
    isShow:false,
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
        title: "username",
        dataIndex: "username",
        width: "10%",
        slots: { customRender: "username" },
      },
      {
        title: "actual name",
        dataIndex: "name",
        width: "10%",
        slots: { customRender: "actualName" },
      },
      {
        title: "isAuthentication",
        dataIndex: "isAuthentication",
        slots: { customRender: "isAuthentication" },
      },
      {
        title: "Action",
        width: "12.5%",
        dataIndex: "",
        key: "x",
        slots: { customRender: "action" },
      },
    ],
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
        {
          min: 6,
          max: 24,
          message: "Length should be 6 to 24",
          trigger: "blur",
        },
      ],
    },
    pagination: {
      pageSize: 5,
      total: 0,
      hideOnSinglePage: true,
      simple: true,
    },
  },
});
export default ModuleUser;
