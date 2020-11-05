<template>
  <div class="malfunctionEditBox">
    <a-page-header
      title="Malfunction"
      sub-title="Information"
      @back="backToGo"
    />
    <a-form class="mt-3" :label-col="{ span: 3 }" :wrapperCol="{ span: 14 }">
      <a-form-item label="title" v-bind="validateInfos.title">
        <a-input
          v-model:value="malfunction.title"
          placeholder="please input title"
        ></a-input>
      </a-form-item>
      <a-form-item label="model" v-bind="validateInfos.modelId">
        <a-input :placeholder="model.modelName" :disabled="model.id"> </a-input>
      </a-form-item>
      <a-form-item label="hintTitle" v-bind="validateInfos.hintTitle">
        <a-input
          v-model:value="malfunction.hintTitle"
          placeholder="please change hintTitle"
        ></a-input>
      </a-form-item>
      <a-form-item label="hintInfo" v-bind="validateInfos.hintInfo">
        <a-textarea
          v-model:value="malfunction.hintInfo"
          placeholder="please change hintInfo"
        ></a-textarea>
      </a-form-item>
      <a-form-item
        label="maintainTopPrice"
        v-bind="validateInfos.maintainTopPrice"
      >
        <a-input-number
          v-model:value="malfunction.maintainTopPrice"
          class="w-100"
          :min="1"
          placeholder="please change maintainTopPrice"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="hintImg" v-bind="validateInfos.hintImg">
        <a-upload
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :headers="HeaderStatus"
          :action="uploadUrl"
          :before-upload="beforeUpload"
          @change="handleChangeUpload"
        >
          <img
            v-if="malfunction.hintImg"
            :src="malfunction.hintImg"
            alt="avatar"
          />
          <div v-else>
            <!-- todo -->
            <loading-outlined v-if="loading" />
            <plus-outlined v-else />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="action" v-if="!id">
        <a-button
          class="w-25 mr-4"
          style="height:3.25rem;"
          type="primary"
          @click="onSubmit"
        >
          Create
        </a-button>
        <a-button class="w-25" style="height:3.25rem;" @click="onCancel">
          Cancel
        </a-button>
      </a-form-item>
      <a-form-item label="action" v-else>
        <a-button
          class="w-25"
          style="height:3.25rem;"
          type="primary"
          @click="onUpdate"
        >
          Update
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import router from "@/router";
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
  ref,
} from "vue";
import { useForm } from "@ant-design-vue/use";
import { ModelProps } from "@/store/model";
export default defineComponent({
  name: "MalfunctionEdit",
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  props: {
    modelId: {
      required: true,
      type: Number,
    },
    id: {
      type: Number,
    },
  },
  setup(props) {
    const uploadUrl = computed(() => store.state.login.uploadUrl);
    const HeaderStatus = computed(() => store.getters.headerStatus);
    const malfunction = computed(() => store.state.malfunction.malfunction);
    const model = ref<ModelProps>({});
    const { resetFields, validate, validateInfos } = useForm(
      reactive(store.state.malfunction.malfunction),
      reactive(store.state.malfunction.rules)
    );
    const backToGo = () => {
      router.go(-1);
    };
    const onCancel = () => {
      resetFields();
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      validate()
        .then(async () => {
          await store.dispatch(
            "malfunction/createMalfunction",
            malfunction.value
          );
          router.push("/model");
        })
        .catch(() => {
          message.error("Please check the data you want to pass");
        });
    };
    const onUpdate = async (e: Event) => {
      e.preventDefault();
      if (
        malfunction.value.title == "" ||
        malfunction.value.hintTitle == "" ||
        malfunction.value.hintInfo == ""
      ) {
        message.info("Input box cannot be empty");
      } else {
        await store.dispatch("malfunction/updateMalfunction", {
          id: props.id,
          data: malfunction.value,
        });
        router.push("/malfunction");
      }
    };
    const handleChangeUpload = (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status == "done") {
        store.commit("malfunction/changeUploadedFaceImg", info.file.response);
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
    const findMalfunction = async () => {
      await store.dispatch("malfunction/findMalfunction", props.id);
    };
    onMounted(async () => {
      if (props.id) {
        await findMalfunction();
      }
      if (props.modelId) {
        store.commit("malfunction/changeModelId", props.modelId);
        await store.dispatch("model/findModel", props.modelId);
        model.value = store.state.model.model;
      }
    });
    onUnmounted(() => {
      store.commit("malfunction/clearMalfunction");
    });
    document.onkeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === "c") || (e.ctrlKey && e.key === "C")) {
        e.preventDefault();
      }
    };
    return {
      backToGo,
      uploadUrl,
      HeaderStatus,
      beforeUpload,
      handleChangeUpload,
      malfunction,
      validateInfos,
      onCancel,
      onSubmit,
      model,
      onUpdate,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/inputUpload.scss";
.malfunctionEditBox {
  @include input-upload(10rem, 10rem);
  .ant-input-number {
    font-size: 1.125rem;
    height: 3.275rem;
    border-radius: 0.375rem;
    .ant-input-number-input-wrap {
      line-height: 3.275rem;
    }
  }
}
</style>
