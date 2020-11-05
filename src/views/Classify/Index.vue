<template>
  <div>
    <a-button class="mb-3" size="large"
      ><router-link to="/classify/edit">Create</router-link></a-button
    >
    <a-table
      bordered
      :pagination="pagination"
      :data-source="dataSource"
      :columns="columns"
    >
      <template #classifyName="{text}">
        <h5 class="text-center">{{ text }}</h5>
      </template>
      <template #icon="{text}">
        <img
          :src="text"
          width="75"
          height="75"
          class="hover-hand table-avatar"
          alt="icon"
        />
      </template>
      <template #status="{text}">
        <a-switch
          @click="toggleStatus(text)"
          :checked="text.status == 1 ? true : false"
        />
      </template>
      <template #isDelete="{text}">
        <a-switch
          @click="toggleIsDelete(text)"
          class="delete"
          :checked="text.isDelete == 1 ? true : false"
        />
      </template>
      <template #action="{text}">
        <a-button type="primary" @click="goToEdit(text)">Edit </a-button>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import store from "@/store";
import { ClassifyProp } from "@/store/classify";
import { computed, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "Classify",
  setup() {
    const dataSource = computed(() => store.getters.classifys);
    const columns = computed(() => store.state.classify.columns);
    const pagination = computed(() => store.state.classify.pagination);
    const findClassifys = async () => {
      await store.dispatch("classify/findClassifys");
    };
    const goToEdit = (context: ClassifyProp) => {
      router.push(`/classify/edit/${context.id}`);
    };
    const toggleStatus = async (context: ClassifyProp) => {
      await store.dispatch("classify/findClassify", context.id);
      await store.commit("classify/toggleStatus", context.status == 1 ? 0 : 1);
      await store.dispatch("classify/updateClassify", {
        id: context.id,
        res: store.state.classify.classifyUpdate,
      });
      findClassifys();
    };
    const toggleIsDelete = async (context: ClassifyProp) => {
      await store.dispatch("classify/findClassify", context.id);
      await store.commit(
        "classify/toggleIsDelete",
        context.isDelete == 1 ? 0 : 1
      );
      await store.dispatch("classify/updateClassify", {
        id: context.id,
        res: store.state.classify.classifyUpdate,
      });
      findClassifys();
    };
    onMounted(() => {
      findClassifys();
    });
    return {
      dataSource,
      columns,
      pagination,
      goToEdit,
      toggleStatus,
      toggleIsDelete,
    };
  },
});
</script>
<style lang="scss">
</style>
