<template>
  <div
    class="text-center m-auto noDataBox d-flex justify-content-center align-items-center flex-column"
  >
    <img
      src="https://czh1010.oss-cn-beijing.aliyuncs.com/images/20201104/21540541.png"
      alt=""
    />
    <h3 class="text-black-50 my-4">No Data</h3>
    <span>Please check the data again</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NoData",
  setup() {
    return {};
  },
});
</script>
<style lang="scss">
.noDataBox {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
</style>
