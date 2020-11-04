<template>
  <div class="ClassifyCreateBox">
    <a-page-header title="Classify" sub-title="Information" @back="backToGo" />
    <a-form class="mt-3">
      <a-form-item
        label="classify name"
        v-bind="validateInfos.classifyName"
        v-if="!id"
      >
        <a-input
          class="w-50"
          v-model:value="classify.classifyName"
          placeholder="Please input classify name"
          allow-clear
        ></a-input>
      </a-form-item>
      <a-form-item label="classify name" v-else>
        <a-input
          class="w-50"
          v-model:value="classifyUpdate.classifyName"
          placeholder="Please input classify name"
          allow-clear
        ></a-input>
      </a-form-item>

      <a-form-item
        label="description"
        v-bind="validateInfos.description"
        v-if="!id"
      >
        <a-textarea
          class="w-50"
          v-model:value="classify.description"
          placeholder="Please input classify description"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="description" v-else>
        <a-textarea
          class="w-50"
          v-model:value="classifyUpdate.description"
          placeholder="Please input classify description"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="icon" v-bind="validateInfos.icon">
        <a-upload
          name="file"
          list-type="picture-card"
          class="avatarUploaderBox"
          :show-upload-list="false"
          :headers="HeaderStatus"
          :action="uploadUrl"
          :before-upload="beforeUpload"
          @change="uploadedIcon"
        >
          <div v-if="classifyUpdate.icon || classify.icon">
            <img v-if="id" :src="classifyUpdate.icon" alt="icon" />
            <img v-if="!id" :src="classify.icon" alt="icon" />
          </div>
          <div v-else>
            <!-- todo -->
            <LoadingOutlined v-if="loading" />
            <PlusOutlined v-else />
            <div class="ant-upload-text">Upload Icon</div>
          </div>
        </a-upload>
        <a-upload
          name="file"
          list-type="picture-card"
          class="avatarUploaderBox ml-4"
          :show-upload-list="false"
          :headers="HeaderStatus"
          :action="uploadUrl"
          :before-upload="beforeUpload"
          @change="uploadedBigIcon"
        >
          <div v-if="classifyUpdate.bigIcon || classify.bigIcon">
            <img v-if="id" :src="classifyUpdate.bigIcon" alt="icon" />
            <img v-if="!id" :src="classify.bigIcon" alt="icon" />
          </div>
          <div v-else>
            <!-- todo -->
            <LoadingOutlined v-if="loading" />
            <PlusOutlined v-else />
            <div class="ant-upload-text">Upload BigIcon</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item v-if="!id">
        <a-button type="primary" @click="onSubmit">
          Create
        </a-button>
        <a-button style="margin-left: 10px;" @click="onCancel">
          Cancel
        </a-button>
      </a-form-item>
      <a-form-item v-else>
        <a-button type="primary" @click="onUpdate">
          Update
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { UploadChangeParam, UploadFile } from "ant-design-vue/types/upload";
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
} from "vue";
import { useForm } from "@ant-design-vue/use";
import router from "@/router";
export default defineComponent({
  name: "ClassifyCreate",
  components: {
    LoadingOutlined: LoadingOutlined,
    PlusOutlined: PlusOutlined,
  },
  props: {
    id: Number,
  },
  setup(props) {
    const { resetFields, validate, validateInfos } = useForm(
      reactive(store.state.classify.classify),
      reactive(store.state.classify.rules ? store.state.classify.rules : {})
    );
    const uploadUrl = computed(() => store.state.login.uploadUrl);
    const HeaderStatus = computed(() => store.getters.headerStatus);
    const classify = computed(() => store.state.classify.classify);
    const classifyUpdate = computed(() => store.state.classify.classifyUpdate);
    const icon = computed(() => store.state.classify.classify.icon);
    const bigIcon = computed(() => store.state.classify.classify.bigIcon);
    const onUpdate = async (e: Event) => {
      e.preventDefault();
      if (
        classifyUpdate.value.classifyName == "" ||
        classifyUpdate.value.description == ""
      ) {
        message.info("Input box cannot be empty");
      } else {
        await store.dispatch("classify/updateClassify", {
          id: props.id,
          res: {
            ...classifyUpdate.value,
            updatedUserId: store.state.login.user.id,
          },
        });
        store.commit("classify/clearClassify");
        router.push("/classify");
      }
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      validate()
        .then(async () => {
          await store.dispatch("classify/createClassify", {
            ...classify.value,
            createdUserId: store.state.login.user.id,
          });
          store.commit("classify/clearClassify");
          router.push("/classify");
        })
        .catch(() => {
          message.error("Please check the data you want to pass");
        });
    };
    const backToGo = () => {
      store.commit("BackToGo");
    };
    const uploadedIcon = (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status == "done") {
        store.commit("classify/changeUploadIcon", info.file.response);
      }
    };
    const uploadedBigIcon = (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status == "done") {
        store.commit("classify/changeUploadBigIcon", info.file.response);
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
    const findClassify = async () => {
      await store.dispatch("classify/findClassify", props.id);
    };
    onMounted(() => {
      if (props.id) {
        findClassify();
      }
    });
    onUnmounted(() => {
      store.commit("classify/clearClassify");
    });
    const onCancel = () => {
      resetFields();
    };
    return {
      uploadUrl,
      HeaderStatus,
      backToGo,
      onUpdate,
      beforeUpload,
      uploadedIcon,
      uploadedBigIcon,
      classify,
      onCancel,
      bigIcon,
      icon,
      validateInfos,
      onSubmit,
      classifyUpdate,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/inputUpload.scss";
.ClassifyCreateBox {
  @include input-upload(10rem, 10rem);
}
</style>
