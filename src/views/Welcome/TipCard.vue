<template>
  <div class="tipCardBox">
    <transition name="spin" mode="out-in">
      <div class="mr-card p-4" v-if="isShow">
        <div
          class="tipsHeader d-flex align-items-center justify-content-around"
        >
          <div class="left d-flex align-items-center">
            <div class="tipsLogo">
              <BulbFilled class="bg-dark" style="color:white" />
            </div>
            <div class="tipsTitle ml-2">
              <span class="font-weight-bold">Tips</span>
            </div>
          </div>
          <div class="close">
            <a-button type="link" @click="toggleShow"
              ><CloseOutlined
            /></a-button>
          </div>
        </div>
        <div class="tipsContent pt-4">
          <div class="mt-4 font-weight-bolder">
            Welcome to MuddyRain, find yourself, pursue excellence, you must be
            the best!
          </div>
        </div>
        <div
          class="tipsFooter mt-4 d-flex align-items-center justify-content-start"
        >
          <h5 class="mr-4 pt-2 font-weight-bolder">See More</h5>
          <a-button type="link"
            ><RightOutlined class="font-weight-bolder"
          /></a-button>
        </div>
      </div>
      <div class="mr-card p-4" v-else>
        <div
          class="tipsHeader d-flex align-items-center justify-content-around"
        >
          <div class="left d-flex align-items-center">
            <div class="tipsLogo">
              <BulbFilled class="bg-dark" style="color:white" />
            </div>
            <div class="tipsTitle ml-2">
              <span class="font-weight-bold">Tips</span>
            </div>
          </div>
          <div class="close">
            <a-button type="link" @click="toggleShow"
              ><CloseOutlined
            /></a-button>
          </div>
        </div>
        <div class="tipsContent pt-4">
          <div class="mt-4 font-weight-bolder">
            Welcome to MuddyRain, find yourself, pursue excellence, you must be
            the best!
          </div>
        </div>
        <div
          class="tipsFooter mt-4 d-flex align-items-center justify-content-start"
        >
          <h5 class="mr-4 pt-2 font-weight-bolder">See More</h5>
          <a-button type="link"
            ><RightOutlined class="font-weight-bolder"
          /></a-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import {
  BulbFilled,
  CloseOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "TipCard",
  components: {
    BulbFilled,
    CloseOutlined,
    RightOutlined,
  },
  setup() {
    const isShow = computed(() => store.state.wel.isShowCard);
    const toggleShow = () => {
      store.commit("wel/toggleShow", !isShow.value);
    };
    return { isShow, toggleShow };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/welcome/tipCard.scss";
</style>
