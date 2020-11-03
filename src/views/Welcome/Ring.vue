<template>
  <div class="ringBox mt-5 mb-5">
    <VEcharts :option="option" class="ring"> </VEcharts>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { defineComponent, onMounted, ref } from "vue";
import { VEcharts } from "vue3-echarts";
export default defineComponent({
  components: {
    VEcharts,
  },
  setup() {
    const option = ref({});
    const findTotal = async () => await store.dispatch("ring/findTotal");
    onMounted(async () => {
      await findTotal();
      option.value = await store.state.ring.option;
    });
    return { option };
  },
});
</script>
<style lang="scss">
.ringBox {
  .ring {
    height: 250px;
  }
}
</style>
