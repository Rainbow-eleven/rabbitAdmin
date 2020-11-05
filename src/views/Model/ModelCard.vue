<template>
  <a-card hoverable class="my-2 mx-3 cardBox" style="width: 14rem;">
    <template #cover>
      <img alt="example" :src="model.faceImg" />
    </template>
    <template class="ant-card-actions" v-slot:actions>
      <edit-outlined key="edit" @click="editModel" />
      <slot
        name="delete"
        :model="model"
        :status="status"
        :classify="classify"
        :brand="brand"
      ></slot>
      <a-popover
        v-model:visible="visible"
        title="Select configuration"
        trigger="click"
      >
        <template #content>
          <a-button class="my-2 w-100" @click="goToMalfunctionCreate"
            >Malfunction</a-button
          ><br />
          <a-button class="my-2 w-100" @click="goToMaloCreate">Malo</a-button>
        </template>
        <ellipsis-outlined key="ellipsis" />
      </a-popover>
    </template>
    <a-card-meta
      :title="model.modelName"
      :description="brand.brandName + ' - ' + classify.classifyName"
    >
      <template #avatar>
        <a-avatar :src="brand.logo" class="avatar" />
      </template>
    </a-card-meta>
  </a-card>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons-vue";
import { ModelProps } from "@/store/model";
import router from "@/router";
export default defineComponent({
  name: "ModelCard",
  props: {
    ModelProps: {} as PropType<ModelProps>,
  },
  components: {
    EditOutlined,
    EllipsisOutlined,
  },
  setup(props) {
    const model = ref(props.ModelProps);
    const brand = ref(model.value?.brandId);
    const classify = ref(model.value?.classifyId);
    const status = ref(model.value?.status);
    const visible = ref<boolean>(false);
    const editModel = () => {
      router.push(`/model/edit/${props.ModelProps?.id}`);
    };
    const goToMalfunctionCreate = () => {
      router.push(`/malfunction/edit/${model.value?.id}`);
    };
    const goToMaloCreate = () => {
      router.push(`/malo/edit/${model.value?.id}`);
    };
    return {
      model,
      brand,
      status,
      classify,
      visible,
      editModel,
      goToMalfunctionCreate,
      goToMaloCreate,
    };
  },
});
</script>
