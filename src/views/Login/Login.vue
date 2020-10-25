<template>
  <div class="loginBox">
    <div class="login d-flex">
      <Left></Left>
      <Right></Right>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Left from "./Left.vue";
import Right from "./Right.vue";
export default defineComponent({
  name: "Login",
  components: {
    Left,
    Right
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss">
@import "@/assets/css/login.scss";
</style>
