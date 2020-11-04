<template>
  <div class="BrandCreateBox">
    <a-page-header title="Brand" sub-title="Information" @back="backToGo" />
    <a-form class="mt-3" :model="brand">
      <a-form-item label="brandName" v-bind="validateInfos.brandName">
        <a-input
          class="w-50"
          v-model:value="brand.brandName"
          placeholder="Please input brandName"
          allow-clear
        ></a-input>
      </a-form-item>
      <a-form-item label="description" v-bind="validateInfos.description">
        <a-textarea
          class="w-50"
          v-model:value="brand.description"
          placeholder="Please input description"
        ></a-textarea>
      </a-form-item>
      <a-form-item
        label="classify"
        v-if="!id"
        v-bind="validateInfos.classifyId"
      >
        <a-select
          placeholder="Please Change classify"
          class="w-25"
          v-model:value="brand.classifyId"
          @dropdownVisibleChange="handleSelect"
        >
          <a-select-option
            :label="item.classifyName"
            :value="item.id"
            v-for="item in classifyOption"
            :key="item.id"
          >
            {{ item.classifyName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="classify" v-else>
        <a-select
          :placeholder="classifyUpdate.classifyName"
          @change="changeClassify"
          class="w-25"
        >
          <a-select-option
            :label="item.classifyName"
            :value="item.id"
            v-for="item in classifyOption"
            :key="item.id"
          >
            {{ item.classifyName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="logo" v-bind="validateInfos.logo">
        <a-upload
          name="file"
          list-type="picture-card"
          class="avatarUploaderBox"
          :show-upload-list="false"
          :headers="HeaderStatus"
          :action="uploadUrl"
          :before-upload="beforeUpload"
          @change="uploaded"
        >
          <img v-if="brand.logo" :src="brand.logo" alt="avatar" />
          <div v-else>
            <!-- todo -->
            <loading-outlined v-if="loading" />
            <plus-outlined v-else />
            <div class="ant-upload-text">Upload</div>
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
  ref,
} from "vue";
import { useForm } from "@ant-design-vue/use";
import router from "@/router";
import { ClassifyProp } from "@/store/classify";

export default defineComponent({
  name: "BrandEdit",
  props: {
    id: Number,
  },
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  setup(props) {
    const uploadUrl = computed(() => store.state.login.uploadUrl);
    const HeaderStatus = computed(() => store.getters.headerStatus);
    const brand = computed(() => store.state.brand.brand);
    const num = ref<number>(0);
    const classifyUpdate = ref<ClassifyProp>({});
    const classifyOption = ref<ClassifyProp[]>([]);
    const { resetFields, validate, validateInfos } = useForm(
      reactive(store.state.brand.brand),
      reactive(store.state.brand.rules)
    );
    const uploaded = (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status == "done") {
        store.commit("brand/changeUploaded", info.file.response);
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
    const onUpdate = async (e: Event) => {
      e.preventDefault();
      if (brand.value.brandName == "" || brand.value.description == "") {
        message.info("Input box cannot be empty");
      } else {
        await store.dispatch("brand/updateBrand", {
          id: props.id,
          res: {
            ...brand.value,
            updatedUserId: store.state.login.user.id,
          },
        });
        store.commit("brand/clearBrand");
        router.push("/brand");
      }
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      validate()
        .then(async () => {
          await store.dispatch("brand/createBrand", {
            ...brand.value,
            createdUserId: store.state.login.user.id,
          });
          store.commit("brand/clearBrand");
          router.push("/brand");
        })
        .catch(() => {
          message.error("Please check the data you want to pass");
        });
    };
    const backToGo = () => {
      store.commit("BackToGo");
    };
    const onCancel = () => resetFields();
    const findBrand = async () => {
      await store.dispatch("brand/findBrand", props.id);
    };
    const handleSelect = async (open: boolean) => {
      num.value++;
      if (open === true && num.value <= 1) {
        await store.dispatch("classify/findClassifys");
        classifyOption.value = store.state.classify.dataSource;
      }
    };
    const findClassify = async () => {
      await store.dispatch("classify/findClassify", brand.value.classifyId);
      classifyUpdate.value = store.state.classify.classifyUpdate;
    };
    onMounted(async () => {
      if (props.id) {
        await findBrand();
        await findClassify();
        await store.dispatch("classify/findClassifys");
        classifyOption.value = store.state.classify.dataSource;
      }
    });
    const changeClassify = (e: number) => {
      brand.value.classifyId = e;
    };
    document.onkeydown = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        backToGo();
      }
    };
    onUnmounted(() => {
      store.commit("brand/clearBrand");
      store.commit("classify/clearClassify");
    });
    return {
      uploadUrl,
      beforeUpload,
      HeaderStatus,
      uploaded,
      changeClassify,
      brand,
      handleSelect,
      classifyOption,
      onCancel,
      onSubmit,
      validateInfos,
      backToGo,
      onUpdate,
      classifyUpdate,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/inputUpload.scss";
.BrandCreateBox {
  @include input-upload(10rem, 10rem);
}
</style>
