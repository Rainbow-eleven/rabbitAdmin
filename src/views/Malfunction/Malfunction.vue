<template>
  <div>
    <a-table
      :columns="columns"
      :dataSource="malfunctions"
      :pagination="pagination"
      bordered
    >
      <template #title>
        <a-input
          placeholder="Please enter what you want"
          v-model:value="searchKeyword"
          @pressEnter="searchData"
          @input="searchData"
        ></a-input>
      </template>
      <template #modelId="{text}">
        <a-tooltip>
          <template #title>
            {{ text.modelName }}
          </template>
          <span>{{ text.modelName }}</span>
        </a-tooltip>
      </template>
      <template #titleName="{text}">
        <a-tooltip>
          <template #title>
            {{ text }}
          </template>
          <span>{{ text }}</span>
        </a-tooltip>
      </template>
      <template #hintInfo="{text}">
        <a-tooltip placement="topLeft">
          <template #title>
            {{ text }}
          </template>
          <span>{{ text }}</span>
        </a-tooltip>
      </template>
      <template #isHint="{text}">
        <a-switch
          @click="toggleIsHint(text)"
          :checked="text.isHint == 1 ? true : false"
        />
      </template>
      <template #hintImg="{text}">
        <img :src="text" class="hover-hand table-avatar" alt="hintImg" />
      </template>
      <template #action="{text}">
        <a-button type="primary" @click="goToMal(text)">
          Edit
        </a-button>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import store from "@/store";
import { MalfunctionProp } from "@/store/malfunction";
import { computed, defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "Malfunction",
  setup() {
    const malfunctions = ref<MalfunctionProp[]>([]);
    const columns = computed(() => store.state.malfunction.columns);
    const pagination = computed(() => store.state.malfunction.pagination);
    const model = ref();
    const searchKeyword = ref<string>("");
    const findMalfunctions = async () => {
      await store.dispatch("malfunction/findMalfunctions");
      malfunctions.value = store.state.malfunction.malfunctions;
    };
    const goToMal = (context: MalfunctionProp) => {
      model.value = context?.modelId;
      router.push(`/malfunction/edit/${model.value.id}/${context.id}`);
    };
    const toggleIsHint = async (context: MalfunctionProp) => {
      await store.dispatch("malfunction/findMalfunction", context.id);
      await store.commit(
        "malfunction/toggleIsHint",
        context.isHint == 1 ? 0 : 1
      );
      await store.dispatch("malfunction/updateMalfunction", {
        id: context.id,
        data: store.state.malfunction.malfunction,
      });
      findMalfunctions();
    };
    const searchData = () => {
      if (searchKeyword.value.length > 0) {
        malfunctions.value = malfunctions.value.filter((item) => {
          return (
            item.modelId?.modelName
              ?.toLocaleLowerCase()
              .indexOf(searchKeyword.value.toLocaleLowerCase()) !== -1
          );
        });
      } else {
        findMalfunctions();
      }
    };
    onMounted(() => {
      findMalfunctions();
    });
    return {
      malfunctions,
      columns,
      pagination,
      goToMal,
      toggleIsHint,
      searchKeyword,
      searchData,
    };
  },
});
</script>
<style lang="scss"></style>
