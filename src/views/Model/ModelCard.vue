<template>
  <a-card hoverable class="my-2 mx-3 cardBox" style="width: 14rem;">
    <template #cover>
      <img alt="example" :src="model.faceImg" />
    </template>
    <template class="ant-card-actions" v-slot:actions>
      <edit-outlined key="edit" />
      <DeleteOutlined key="setting" />
    </template>
    <a-card-meta
      :title="model.modelName"
      :description="brand.brandName + ' - ' + classify.classifyName"
    >
      <template #avatar>
        <a-avatar :src="brand.logo" />
      </template>
    </a-card-meta>
  </a-card>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { ModelProps } from "@/store/model";
export default defineComponent({
  name: "ModelCard",
  props: {
    ModelProps: {} as PropType<ModelProps>,
  },
  components: {
    DeleteOutlined,
    EditOutlined,
  },
  setup(props) {
    const model = ref(props.ModelProps);
    const brand = ref(model.value?.brandId);
    const classify = ref(model.value?.classifyId);
    return {
      model,
      brand,
      classify,
    };
  },
});
</script>
<style lang="scss"></style>
