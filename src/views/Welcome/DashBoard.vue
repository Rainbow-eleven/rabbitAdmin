<template>
  <div class="dashBoard">
    <VEcharts :option="option" style="height:25rem" class="canvas"></VEcharts>
    <div class="d-flex mt-2 justify-content-center align-items-center">
      <h3 class="fs-2 font-weight-bold mr-2">privated by</h3>
      <h1
        class="fs-2-25 text-center text-black-50 font-weight-bold font-italic"
      >
        Muddyrain
      </h1>
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { defineComponent, onMounted, ref } from "vue";
import { VEcharts } from "vue3-echarts";

export default defineComponent({
  name: "Echars",
  components: {
    VEcharts,
  },
  setup() {
    const option = ref({});
    const findOption = async () => {
      await store.dispatch("dashBoard/FindUser");
      option.value = store.state.dashBoard.option;
    };
    onMounted(() => {
      findOption();
    });
    return { option };
  },
});
</script>
<style lang="scss">
.dashBoard {
  flex: 1;
  width: 50%;
  float: left;
}
</style>
