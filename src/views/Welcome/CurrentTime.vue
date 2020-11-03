<template>
  <div class="currentTimeBox">
    <div class="title"><h4 class="font-weight-bolder">Current Time</h4></div>
    <div class="btnBox d-flex mt-5">
      <a-button
        ><div class="time">
          <span>{{ hr }}</span> hr
        </div>
        <div class="desc">Render hours in real time</div></a-button
      >
      <a-button
        ><div class="time">
          <span>{{ min }}</span> min
        </div>
        <div class="desc">Real-time rendering in minutes</div></a-button
      >
      <a-button
        ><div class="time">
          <span>{{ sec }}</span> sec
        </div>
        <div class="desc">Render in real time for seconds</div></a-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "CurrentTime",
  data() {
    return {
      date: new Date(),
    };
  },
  setup() {
    const hr = ref<number | string>(0);
    const min = ref(0);
    const sec = ref(0);
    onMounted(() => {
      store.commit("wel/getTime");
      setInterval(async () => {
        await store.commit("wel/getTime");
        if (store.state.wel.time.slice(0, 2) == "下午") {
          if (parseInt(store.state.wel.time.slice(2, 4)) !== 12) {
            if (parseInt(store.state.wel.time.slice(2, 4)) < 10) {
              hr.value = parseInt(store.state.wel.time.slice(2, 4)) + 12;
              min.value = parseInt(store.state.wel.time.slice(4, 6));
              sec.value = parseInt(store.state.wel.time.slice(7, 9));
            } else {
              hr.value = parseInt(store.state.wel.time.slice(2, 4)) + 12;
              min.value = parseInt(store.state.wel.time.slice(5, 7));
              sec.value = parseInt(store.state.wel.time.slice(8, 10));
            }
          } else {
            hr.value = parseInt(store.state.wel.time.slice(2, 4));
            min.value = parseInt(store.state.wel.time.slice(5, 7));
            sec.value = parseInt(store.state.wel.time.slice(8, 10));
          }
        } else {
          if (parseInt(store.state.wel.time.slice(2, 4)) >= 10) {
            if (parseInt(store.state.wel.time.slice(2, 4)) == 12) {
              hr.value = "00";
              min.value = parseInt(store.state.wel.time.slice(5, 7));
              sec.value = parseInt(store.state.wel.time.slice(8, 10));
            } else {
              hr.value = parseInt(store.state.wel.time.slice(2, 4));
              min.value = parseInt(store.state.wel.time.slice(5, 7));
              sec.value = parseInt(store.state.wel.time.slice(8, 10));
            }
          } else {
            hr.value = parseInt(store.state.wel.time.slice(2, 4));
            min.value = parseInt(store.state.wel.time.slice(4, 6));
            sec.value = parseInt(store.state.wel.time.slice(7, 9));
          }
        }
      }, 1000);
    });
    return {
      hr,
      min,
      sec,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/welcome/cureentBox.scss";
</style>
