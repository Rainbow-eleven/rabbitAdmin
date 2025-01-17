<template>
  <div class="userInfoBox">
    <a-page-header title="User" sub-title="Information" @back="backToGo" />
    <div class="infoBox bg-light mt-3">
      <a-form layout="inline" class="d-flex align-items-center">
        <a-upload
          v-model:fileList="fileList"
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :headers="HeaderStatus"
          :action="uploadUrl"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="user.faceUrl" :src="user.faceUrl" alt="avatar" />
          <div v-else>
            <!-- todo -->
            <loading-outlined v-if="loading" />
            <plus-outlined v-else />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <div class="userInfo">
          <div class="userName d-flex align-items-center">
            <h1 class="u_name">
              {{ user.username ? user.username : "小兔子" }}
            </h1>
            <h6 class="w22rem">account : {{ user.account }}</h6>
            <a-button @click="showModal">Edit UserInfo</a-button>
            <EditModel :id="id"></EditModel>
          </div>
          <div class="userId mt-3 d-flex align-items-center">
            <h6 class="u_id">userNo : {{ user.id }}</h6>
            <h6>CreatedTime : {{ time }}</h6>
            <h6 class="tag">
              isAuthentication :
              <a-tag :color="user.isAuthentication === 1 ? 'blue' : 'red'">
                {{ user.isAuthentication === 1 ? "已实名" : "未实名" }}
              </a-tag>
            </h6>
          </div>
          <div class="name mt-3 d-flex align-items-center">
            <h6 class="u_name">
              ActualName :
              {{ user.name === null || user.name === "" ? "匿名" : user.name }}
            </h6>
            <h6 class="w22rem">CardNo : {{ cardNo }}</h6>
            <a-button @click="deleteUser" type="danger">Delete</a-button>
          </div>
        </div>
      </a-form>
    </div>
    <div class="appoBox">
      <Appo :id="id"></Appo>
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { computed, defineComponent, onMounted, ref } from "vue";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import { UploadChangeParam, UploadFile } from "ant-design-vue/types/upload";
import EditModel from "./EditModel.vue";
import Appo from "../../components/Appo.vue";
import router from "@/router";
export default defineComponent({
  name: "UserInfo",
  components: {
    LoadingOutlined,
    PlusOutlined,
    EditModel,
    Appo,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const user = computed(() => store.state.user.user);
    const uploadUrl = computed(() => store.state.login.uploadUrl);
    const backToGo = () => {
      store.commit("BackToGo");
    };
    const time = computed(() => {
      return store.getters.createdTimeYear;
    });
    const cardNo = computed(() => {
      return store.getters.HideCardNo;
    });
    const HeaderStatus = computed(() => store.getters.headerStatus);
    const findUser = async () => {
      await store.dispatch("user/UserInfoFind", {
        id: props.id,
        mutations: "UserInfoFind",
      });
    };
    const showModal = async () => {
      store.commit("user/UserChangeShowModel", true);
    };
    const deleteUser = () => {
      Modal.confirm({
        title: "Do you want to delete this user?",
        content:
          "If you delete this user, the user may be bound to other modules.",
        async onOk() {
          await store.dispatch("user/UserDeleteUser", props.id);
          router.push("/user");
        },
        onCancel() {
          message.info("取消删除");
        },
      });
    };
    onMounted(() => {
      findUser();
    });
    const handleChange = async (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status == "done") {
        await store.commit("user/UserUploadedAvatar", info.file.response);
        await store.dispatch(`user/UserInfoEdit`, {
          user: store.state.user.user,
          id: props.id,
        });
        findUser();
        message.info("上传成功");
      }
    };
    const beforeUpload = (file: File) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        message.error("Image must smaller than 5MB!");
      }
      return isJpgOrPng && isLt2M;
    };
    const fileList = ref([]);
    return {
      backToGo,
      fileList,
      loading: false,
      imageUrl: "",
      user,
      showModal,
      time,
      cardNo,
      HeaderStatus,
      handleChange,
      beforeUpload,
      deleteUser,
      uploadUrl,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/UserInfo.scss";
@import "@/assets/css/inputUpload.scss";
@include input-upload(15rem, 15rem, null, 1.25rem);
</style>
