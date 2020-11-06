<template>
  <div>
    <a-table :dataSource="malos" :columns="columns" :pagination="pagination">
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
      <template #malfunctionId="{text}">
        <a-tooltip>
          <template #title>
            {{ text.title }}
          </template>
          <span>{{ text.title }}</span>
        </a-tooltip>
      </template>
      <template #action="{text}">
        <a-button type="primary" @click="goToMalo(text)">
          Edit
        </a-button>
      </template>
      <template #processType="{text}">
        <div class="d-flex justify-content-center">
          <a-button
            class="mr-2"
            :type="text.processType == 1 ? 'primary' : ''"
            @click="toggleProcessType(text)"
            :value="1"
          >
            维修
          </a-button>
          <a-button
            @click="toggleProcessType(text)"
            :type="text.processType == 2 ? 'primary' : ''"
            :value="2"
          >
            更换配件
          </a-button>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import store from "@/store";
import { MaloProps } from "@/store/malo";
import { computed, defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "Malo",
  setup() {
    const malos = ref<MaloProps[]>([]);
    const searchKeyword = ref<string>("");
    const model = ref();
    const columns = computed(() => store.state.malo.columns);
    const pagination = computed(() => store.state.malo.pagination);
    const findMalos = async () => {
      await store.dispatch("malo/findMalos");
      malos.value = store.state.malo.malos;
    };
    const searchData = () => {
      if (searchKeyword.value.length > 0) {
        malos.value = malos.value.filter((item) => {
          return (
            item.modelId?.modelName
              ?.toLocaleLowerCase()
              .indexOf(searchKeyword.value.toLocaleLowerCase()) !== -1
          );
        });
      } else {
        findMalos();
      }
    };
    const toggleProcessType = async (malo: MaloProps) => {
      if (malo.processType == 1) {
        malo.processType = 2;
      } else {
        malo.processType = 1;
      }
      delete malo.key;
      await store.dispatch("malo/updateMalo", {
        id: malo.id,
        data: {
          ...malo,
          processType: malo.processType,
          malfunctionId: malo.malfunctionId?.id,
          modelId: malo.modelId?.id,
        },
      });
      findMalos();
    };
    const goToMalo = (context: MaloProps) => {
      model.value = context?.modelId;
      router.push(`/malo/edit/${model.value.id}/${context.id}`);
    };
    onMounted(() => {
      findMalos();
    });
    return {
      malos,
      columns,
      pagination,
      searchData,
      searchKeyword,
      goToMalo,
      toggleProcessType,
    };
  },
});
</script>
<style lang="scss"></style>
