<template>
  <div class="modelEditBox mb-3">
    <a-page-header title="Model" sub-title="Information" @back="backToGo" />
    <a-form class="mt-3" :label-col="{ span: 3 }" :wrapperCol="{ span: 14 }">
      <a-form-item label="modelName" v-bind="validateInfos.modelName">
        <a-input
          placeholder="Please input modelName"
          v-model:value="model.modelName"
        ></a-input>
      </a-form-item>
      <a-form-item label="description" v-bind="validateInfos.description">
        <a-textarea
          v-model:value="model.description"
          placeholder="Please input description"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="classify" v-bind="validateInfos.classifyId">
        <a-select
          v-if="!id"
          placeholder="Please input classify"
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
        <a-select
          v-else
          :placeholder="classifyUpdate.classifyName"
          @change="changeClassifyId"
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
      <a-form-item label="brand" v-bind="validateInfos.brandId">
        <a-select
          v-if="!id"
          placeholder="Please input brand"
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
        <a-select
          v-else
          :placeholder="brandUpdate.brandName"
          @change="changeBrandId"
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
      <a-form-item label="exchangePrice" v-bind="validateInfos.exchangePrice">
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
              v-model:value="model.exchangePrice"
              :min="1"
              :max="50000"
              style="marginLeft: 1rem"
              @blur="changeNum"
            />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="topPrice" v-bind="validateInfos.topPrice">
        <a-row>
          <a-col :span="20">
            <a-slider v-model:value="model.topPrice" :min="1" :max="50000" />
          </a-col>
          <a-col :span="4">
            <a-input-number
              v-model:value="model.topPrice"
              :min="1"
              :max="50000"
              style="marginLeft: 1rem"
              @blur="changeNum"
            />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="faceImg" v-bind="validateInfos.faceImg">
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
      <a-form-item label="contentImg" v-bind="validateInfos.contentImg">
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
          class="w-25 mr-4"
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
import { BrandProp } from "@/store/brand";
import { ClassifyProp } from "@/store/classify";
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
export default defineComponent({
  name: "ModelEdit",
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  props: {
    id: Number,
  },
  setup(props) {
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
    const classifyUpdate = ref<ClassifyProp>({});
    const brandUpdate = ref<BrandProp>({});
    const { resetFields, validate, validateInfos } = useForm(
      reactive(store.state.model.model),
      reactive(store.state.model.rules)
    );
    const onCancel = () => {
      resetFields();
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
      validate()
        .then(async () => {
          await store.dispatch("model/createModel", {
            ...model.value,
            createdUserId: store.state.login.user.id,
          });
          store.commit("model/clearModel");
          router.push("/model");
        })
        .catch(() => {
          message.error("Please check the data you want to pass");
        });
    };
    const changeNum = () => {
      if (model.value.topPrice == null) {
        model.value.topPrice = 0;
      }
      if (model.value.exchangePrice == null) {
        model.value.exchangePrice = 0;
      }
    };
    document.onkeydown = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        backToGo();
      }
    };
    const findModel = async () => {
      await store.dispatch("model/findModel", props.id);
    };
    const onUpdate = async () => {
      if (
        model.value.modelName == "" ||
        model.value.description == "" ||
        model.value.classifyId == "" ||
        model.value.brandId == ""
      ) {
        message.info("Input box cannot be empty");
      } else {
        await store.dispatch("model/updateModel", {
          id: props.id,
          data: model.value,
        });
        router.push("/model");
      }
    };
    const findClassify = async () => {
      await store.dispatch("classify/findClassify", model.value.classifyId);
      classifyUpdate.value = store.state.classify.classifyUpdate;
    };
    const findBrand = async () => {
      await store.dispatch("brand/findBrand", model.value.brandId);
      brandUpdate.value = store.state.brand.brand;
    };
    onMounted(async () => {
      if (props.id) {
        await findModel();
        await findBrand();
        await findClassify();
      }
    });
    onUnmounted(() => {
      store.commit("model/clearModel");
      store.commit("classify/clearClassify");
      store.commit("brand/clearBrand");
    });
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
      onCancel,
      validateInfos,
      classifyUpdate,
      brandUpdate,
      changeNum,
      onUpdate,
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
