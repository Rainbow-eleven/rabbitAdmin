<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Button>你好</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button } from "ant-design-vue";
export default defineComponent({
  name: "Home",
  components: {
    Button,
  },
});
</script>
