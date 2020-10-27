<template>
  <teleprot to="#loading">
    <div
      class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
    >
      <div class="loading-content">
        <a-spin size="large"></a-spin>
      </div>
    </div>
  </teleprot>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useNodeDocument from "../hooks/NodeDocument";
export default defineComponent({
  name: "Loading",
  setup() {
    useNodeDocument("loading");
    return {};
  },
});
</script>
<style lang="scss">
.loading-container {
  background: rgba(255, 255, 255, 0.5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-container {
  text-align: center;
}
</style>
