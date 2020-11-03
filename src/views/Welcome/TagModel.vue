<template>
  <div
    class="tagModelBox w-50 mt-4 mx-auto d-flex align-items-center justify-content-start"
  >
    <div class="heart fs-1-75">
      <AppstoreFilled :style="`color:${color}`" />
    </div>
    <div class="ml-4 w-75 tag text-left fs-1 font-weight-bolder">
      {{ tag }}
    </div>
    <div class="ml-3 total fs-1-25 font-weight-bolder">{{ total }}</div>
  </div>
</template>
<script lang="ts">
import { AppstoreFilled } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    color: String,
    tag: String,
    total: Number,
  },
  components: {
    AppstoreFilled,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss">
.tagModelBox {
  .heart {
    margin-top: -0.425rem;
  }
}
</style>
