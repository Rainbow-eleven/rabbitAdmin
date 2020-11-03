<template>
  <div class="d-flex welBox">
    <div class="left p-3">
      <WelcomeHeader></WelcomeHeader>
      <div class="d-flex pt-4 justify-content-between">
        <DashBoard></DashBoard>
        <TipCard></TipCard>
      </div>
      <CurrentTime></CurrentTime>
    </div>
    <div class="right">
      <AccountEmail></AccountEmail>
      <Ring></Ring>
      <TagModel
        :total="resValues[index]"
        :tag="item.tag"
        :color="item.color"
        v-for="(item, index) in tagsOption"
        :key="index"
      ></TagModel>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import WelcomeHeader from "./Header.vue";
import DashBoard from "./DashBoard.vue";
import TipCard from "./TipCard.vue";
import CurrentTime from "./CurrentTime.vue";
import AccountEmail from "./AccountTitle.vue";
import TagModel from "./TagModel.vue";
import Ring from "./Ring.vue";
import store from "@/store";
export default defineComponent({
  name: "Welcome",
  components: {
    AccountEmail,
    TagModel,
    WelcomeHeader,
    DashBoard,
    TipCard,
    CurrentTime,
    Ring,
  },
  setup() {
    const tagsOption = computed(() => store.state.wel.tagsOption);
    const resValues = ref<number[]>([]);
    const findTotal = async () => await store.dispatch("ring/findTotal");
    onMounted(async () => {
      await findTotal();
      resValues.value = store.state.ring.resValues;
    });
    return {
      tagsOption,
      resValues,
    };
  },
});
</script>
<style lang="scss">
.welBox {
  .left {
    flex: 2;
  }
  .right {
    padding: 3rem;
    background-color: #f6f5fb;
    border-radius: 0 3rem 0 3rem;
    flex: 1;
  }
}
</style>
