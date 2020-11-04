<template>
  <div>
    <a-button class="mb-3" size="large"
      ><router-link to="/brand/edit">Create</router-link></a-button
    >
    <a-table
      :pagination="pagination"
      :columns="columns"
      :data-source="data"
      bordered
    >
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
      <template #classifyId="{text}">
        <span>{{ text.classifyName }}</span>
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
import { BrandProp } from "@/store/brand";
import { computed, defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "Brand",
  setup() {
    const columns = computed(() => store.state.brand.columns);
    const data = computed(() => store.getters.brands);
    const pagination = computed(() => store.state.brand.pagination);
    const findBrands = async () => {
      await store.dispatch("brand/findBrands");
    };
    const goToEdit = (context: BrandProp) => {
      router.push(`/brand/edit/${context.id}`);
    };
    const toggleStatus = async (context: BrandProp) => {
      await store.dispatch("brand/findBrand", context.id);
      await store.commit("brand/toggleStatus", context.status == 1 ? 0 : 1);
      await store.dispatch("brand/updateBrand", {
        id: context.id,
        res: store.state.brand.brand,
      });
      findBrands();
    };
    const toggleIsDelete = async (context: BrandProp) => {
      await store.dispatch("brand/findBrand", context.id);
      await store.commit("brand/toggleIsDelete", context.isDelete == 1 ? 0 : 1);
      await store.dispatch("brand/updateBrand", {
        id: context.id,
        res: store.state.brand.brand,
      });
      findBrands();
    };
    onMounted(() => {
      findBrands();
    });
    return {
      columns,
      data,
      pagination,
      goToEdit,
      toggleStatus,
      toggleIsDelete,
    };
  },
});
</script>
<style lang="scss"></style>
