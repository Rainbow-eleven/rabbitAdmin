<template>
  <div class="modelEditBox mb-3">
    <a-page-header title="Model" sub-title="Information" @back="backToGo" />
    <a-form class="mt-3" :label-col="{ span: 3 }" :wrapperCol="{ span: 14 }">
      <a-form-item label="modelName">
        <a-input
          placeholder="Please input modelName"
          v-model:value="model.modelName"
        ></a-input>
      </a-form-item>
      <a-form-item label="description">
        <a-textarea
          v-model:value="model.description"
          placeholder="Please input description"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="classify">
        <a-select
          placeholder="Please Change classify"
          v-model:value="model.classifyId"
          @dropdownVisibleChange="handleSelectClassify"
        >
          <a-select-option
            :value="item.id"
            :label="item.classifyName"
            v-for="item in classifyOption"
            :key="item.id"
          >
            {{ item.classifyName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="brandId">
        <a-select
          placeholder="Please Change brand"
          v-model:value="model.brandId"
          @dropdownVisibleChange="handleSelectBrand"
        >
          <a-select-option
            :value="item.id"
            :label="item.brandName"
            v-for="item in brandOption"
            :key="item.id"
          >
            {{ item.brandName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="exchangePrice">
        <a-row>
          <a-col :span="20">
            <a-slider
              v-model:value="model.exchangePrice"
              :min="1"
              :max="50000"
            />
          </a-col>
          <a-col :span="4">
            <a-input-number
              placeholder="￥"
              v-model:value="model.exchangePrice"
              :min="1"
              :max="50000"
              style="marginLeft: 1rem"
            />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="topPrice">
        <a-row>
          <a-col :span="20">
            <a-slider v-model:value="model.topPrice" :min="1" :max="50000" />
          </a-col>
          <a-col :span="4">
            <a-input-number
              placeholder="￥"
              v-model:value="model.topPrice"
              :min="1"
              :max="50000"
              style="marginLeft: 1rem"
            />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="faceImg">
        <a-upload
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :action="uploadUrl"
          :headers="HeaderStatus"
          :before-upload="beforeUpload"
          @change="handleChangeFaceImg"
        >
          <img v-if="model.faceImg" :src="model.faceImg" alt="avatar" />
          <div v-else>
            <!-- todo -->
            <loading-outlined v-if="loading" />
            <plus-outlined v-else />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="contentImg">
        <a-upload
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :action="uploadUrl"
          :headers="HeaderStatus"
          :before-upload="beforeUpload"
          @change="handleChangeContentImg"
        >
          <img v-if="model.contentImg" :src="model.contentImg" alt="avatar" />
          <div v-else>
            <!-- todo -->
            <loading-outlined v-if="loading" />
            <plus-outlined v-else />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="action">
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
    </a-form>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import store from "@/store";
import { BrandProp } from "@/store/brand";
import { ClassifyProp } from "@/store/classify";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { UploadChangeParam, UploadFile } from "ant-design-vue/types/upload";
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "ModelEdit",
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  setup() {
    const backToGo = () => {
      router.go(-1);
    };
    const model = computed(() => store.state.model.model);
    const uploadUrl = computed(() => store.state.login.uploadUrl);
    const HeaderStatus = computed(() => store.getters.headerStatus);
    const numClassify = ref<number>(0);
    const numBrand = ref<number>(0);
    const classifyOption = ref<ClassifyProp[]>([]);
    const brandOption = ref<BrandProp[]>([]);
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
    const handleChangeFaceImg = (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status == "done") {
        store.commit("model/changeUploadedFaceImg", info.file.response);
      }
    };
    const handleChangeContentImg = (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status == "done") {
        store.commit("model/changeUploadedContentImg", info.file.response);
      }
    };
    const handleSelectClassify = async (open: boolean) => {
      numClassify.value++;
      if (open === true && numClassify.value <= 1) {
        await store.dispatch("classify/findClassifys");
        classifyOption.value = store.state.classify.dataSource;
      }
    };
    const handleSelectBrand = async (open: boolean) => {
      numBrand.value++;
      if (open === true && numBrand.value <= 1) {
        await store.dispatch("brand/findBrands");
        brandOption.value = store.state.brand.data;
      }
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      console.log(model.value);
    };
    document.onkeydown = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        backToGo();
      }
    };
    return {
      backToGo,
      model,
      uploadUrl,
      beforeUpload,
      HeaderStatus,
      handleChangeFaceImg,
      handleChangeContentImg,
      handleSelectClassify,
      handleSelectBrand,
      brandOption,
      classifyOption,
      onSubmit,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/inputUpload.scss";
.modelEditBox {
  background: #fff;
  @include input-upload(10rem, 10rem);
  .ant-slider {
    margin-top: 1.25rem;
  }
  .ant-input-number {
    margin-top: 0.35rem;
    height: 2.5rem;
    input {
      height: 2.5rem;
      font-size: 1.25rem;
    }
  }
}
</style>
