<template>
  <div>
    <a-button class="mb-3" size="large"
      ><router-link to="/classify/edit">Create</router-link></a-button
    >
    <a-table bordered :data-source="dataSource" :columns="columns">
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
        <a-switch :checked="text == 1 ? true : false" />
      </template>
      <template #isDelete="{text}">
        <a-switch class="delete" :checked="text == 1 ? true : false" />
      </template>
      <template #action>
        <a-button type="primary">Edit</a-button>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { computed, defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "Classify",
  setup() {
    const dataSource = computed(() => store.getters.classifys);
    const columns = computed(() => store.state.classify.columns);
    const findClassifys = async () => {
      await store.dispatch("classify/findClassify");
    };
    onMounted(() => {
      findClassifys();
    });
    return {
      dataSource,
      columns,
    };
  },
});
</script>
<style lang="scss">
.delete.ant-switch-checked {
  background: #ff4d4f;
}
</style>
