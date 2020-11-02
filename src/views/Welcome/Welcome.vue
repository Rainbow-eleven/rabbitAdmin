<template>
  <div class="d-flex welBox">
    <div class="left p-5">
      <WelcomeHeader></WelcomeHeader>
      <div class="d-flex pt-5 justify-content-between">
        <DashBoard></DashBoard>
        <TipCard></TipCard>
      </div>
      <CurrentTime></CurrentTime>
    </div>
    <div class="right"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import WelcomeHeader from "./Header.vue";
import DashBoard from "./DashBoard.vue";
import TipCard from "./TipCard.vue";
import CurrentTime from "./CurrentTime.vue";
export default defineComponent({
  name: "Welcome",
  components: {
    WelcomeHeader,
    DashBoard,
    TipCard,
    CurrentTime,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss">
.welBox {
  .left {
    flex: 2;
  }
  .right {
    background-color: #f6f5fb;
    border-radius: 0 3rem 0 3rem;
    flex: 1;
  }
}
</style>
