<template>
  <div>
    <a-button class="mb-3" size="large"
      ><router-link to="/classify/edit">Create</router-link></a-button
    >
    <a-table :columns="columns" :data-source="data" bordered>
      <template #logo="{ text }">
        <img
          :src="text"
          width="75"
          height="75"
          class="hover-hand table-avatar"
          alt="logo"
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
import store from "@/store";
import { computed, defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "Brand",
  setup() {
    const columns = computed(() => store.state.brand.columns);
    const data = computed(() => store.getters.brands);

    const findBrands = async () => {
      await store.dispatch("brand/findBrands");
    };
    onMounted(() => {
      findBrands();
    });
    return {
      columns,
      data,
    };
  },
});
</script>
<style lang="scss"></style>
