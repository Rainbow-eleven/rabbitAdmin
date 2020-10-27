<template>
  <div>
    <a-page-header title="User" sub-title="Information" @back="backToGo" />
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
export default defineComponent({
  name: "UserInfo",
  setup() {
    const backToGo = () => {
      store.commit("BackToGo");
    };
    return {
      backToGo,
    };
  },
});
</script>
<style lang="scss"></style>
