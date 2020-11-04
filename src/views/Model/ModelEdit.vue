<template>
  <div>
    模型编辑
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ModelEdit",
  setup() {
    document.onkeydown = (e: KeyboardEvent) => {
      console.log(e.key);
    };
    return {};
  },
});
</script>
<style lang="scss"></style>
