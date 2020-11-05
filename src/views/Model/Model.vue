<template>
  <div class="ModelListBox">
    <a-modal
      title="Search"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      centered
      class="searchModel"
      @ok="onSearch"
      keyboard
      @cancel="handleCancel"
      :maskClosable="false"
    >
      <a-input
        @keydown="onSearch"
        v-model:value="keyword"
        allow-clear
        autofocus
        placeholder="Please enter the model you want to search"
      ></a-input>
    </a-modal>
    <div class="modelTableBox mx-auto" v-if="models.length > 0">
      <div
        class="modelCardBox mx-auto d-flex justify-content-center align-items-center flex-wrap"
      >
        <ModelCard v-for="item in models" :key="item.id" :ModelProps="item">
          <template #delete="text">
            <DeleteOutlined
              :class="{ deleteColor: item.status == 0 }"
              key="setting"
              @click="deleteModel(text)"
            />
          </template>
        </ModelCard>
      </div>
      <div class="page mx-5 mt-3">
        <a-pagination
          @change="changePageSize"
          v-model:current="current"
          :pageSize="12"
          :total="total"
          simple
        />
      </div>
    </div>
    <div v-else>
      <NoData />
    </div>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import store from "@/store";
import { DeleteModelProps, ModelProps } from "@/store/model";
import { defineComponent, onMounted, ref } from "vue";
import ModelCard from "./ModelCard.vue";
import NoData from "../NoData.vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "Model",
  components: {
    ModelCard,
    NoData,
    DeleteOutlined,
  },
  setup() {
    const models = ref<ModelProps[]>([]);
    const total = ref<number>(0);
    const current = ref<number>(1);
    const visible = ref<boolean>(false);
    const keyword = ref<string>("");
    const findModelsTotal = async () => {
      await store.dispatch("model/findTotal");
      await store.dispatch("model/findModels", {
        count: current.value,
        pageSize: 12,
        keyword: "",
      });
      models.value = store.state.model.models;
      total.value = store.state.model.total;
    };
    const findTotal = async (keyword?: string) => {
      await store.dispatch("model/findTotalSearch", {
        keyword,
      });
      total.value = store.state.model.total;
    };
    const findModels = async (keyword?: string, page?: number) => {
      await store.dispatch("model/findModels", {
        count: page ? page : current.value,
        pageSize: 12,
        keyword,
      });
      models.value = store.state.model.models;
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
      keyword.value = "";
    };
    const changePageSize = async (page: number) => {
      if (keyword.value == "") {
        await store.dispatch("model/findModels", {
          count: page,
          pageSize: 12,
          keyword: "",
        });
        models.value = store.state.model.models;
      } else {
        findModels(keyword.value, page);
      }
    };
    const onSearch = (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        current.value = 1;
        findModels(keyword.value);
        findTotal(keyword.value);
      }
    };
    const deleteModel = async (context: DeleteModelProps) => {
      if (context.model?.status == 1) {
        context.model.status = 0;
      } else {
        context.model.status = 1;
      }
      store.commit("model/toggleStatus", context.model.status);
      await store.dispatch("model/updateModel", {
        id: context.model?.id,
        data: {
          ...context.model,
          status: context.model.status,
          classifyId: context.classify?.id,
          brandId: context.brand?.id,
        },
      });
      await findModelsTotal();
    };
    document.onkeydown = (e: KeyboardEvent) => {
      if (("f" == e.key && e.ctrlKey) || (e.ctrlKey && e.key === "F")) {
        if (visible.value == false) {
          visible.value = true;
        } else {
          visible.value = false;
        }
      }
      if ((e.ctrlKey && e.key === "f") || (e.ctrlKey && e.key === "F")) {
        e.preventDefault();
      }
      if ((e.ctrlKey && e.key === "c") || (e.ctrlKey && e.key === "C")) {
        router.push("/model/edit");
      }
    };
    onMounted(() => {
      findModelsTotal();
    });
    return {
      models,
      total,
      current,
      changePageSize,
      visible,
      handleCancel,
      onSearch,
      keyword,
      deleteModel,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/model.scss";
</style>
