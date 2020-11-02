<template>
  <div class="ClassifyCreateBox">
    <a-page-header title="Classify" sub-title="Information" @back="backToGo" />
    <a-form class="mt-3">
      <a-form-item label="classify name">
        <a-input
          class="w-50"
          placeholder="Please input classify name"
        ></a-input>
      </a-form-item>
      <a-form-item label="description">
        <a-textarea
          class="w-50"
          placeholder="Please input classify description"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="icon">
        <a-upload
          name="file"
          list-type="picture-card"
          class="avatarUploaderBox"
          :show-upload-list="false"
          :headers="HeaderStatus"
          action="http://127.0.0.1:3000/upload"
          :before-upload="beforeUploadIcon"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <!-- todo -->
            <LoadingOutlined v-if="loading" />
            <PlusOutlined v-else />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "ClassifyCreate",
  components: {
    LoadingOutlined: LoadingOutlined,
    PlusOutlined: PlusOutlined,
  },
  setup() {
    const HeaderStatus = computed(() => store.getters.headerStatus);
    const backToGo = () => {
      store.commit("BackToGo");
    };
    return {
      HeaderStatus,
      backToGo,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/inputUpload.scss";
.ClassifyCreateBox {
  @include input-upload();
}
</style>
