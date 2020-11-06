<template>
  <div>
    <a-table
      :dataSource="evaluates"
      :columns="columns"
      bordered
      :pagination="{ pageSize: 10 }"
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
        <span>{{ text.modelName }}</span>
      </template>
      <template #remark="{text}">
        <a-tooltip>
          <template v-slot:title>
            {{ text }}
          </template>
          <span>{{ text }}</span>
        </a-tooltip>
      </template>
      <template #action="{text}">
        <a-button type="danger" @click="deleteEvaluate(text)">delete</a-button>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { EvaluateProp } from "@/store/evaluate";
import { computed, defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "Evaluate",
  setup() {
    const evaluates = ref<EvaluateProp[]>([]);
    const columns = computed(() => store.state.evaluate.columns);
    const searchKeyword = ref<string>("");
    const findEvaluates = async () => {
      await store.dispatch("evaluate/findEvaluates");
      evaluates.value = store.state.evaluate.evaluates;
    };
    const deleteEvaluate = async (context: EvaluateProp) => {
      await store.dispatch("evaluate/deleteEvaluate", context.id);
      findEvaluates();
    };
    const searchData = () => {
      if (searchKeyword.value.length > 0) {
        evaluates.value = evaluates.value.filter((item) => {
          return (
            item.modelId?.modelName
              ?.toLocaleLowerCase()
              .indexOf(searchKeyword.value.toLocaleLowerCase()) !== -1
          );
        });
      } else {
        findEvaluates();
      }
    };
    onMounted(() => {
      findEvaluates();
    });
    return {
      evaluates,
      columns,
      deleteEvaluate,
      searchData,
      searchKeyword,
    };
  },
});
</script>
<style lang="scss"></style>
