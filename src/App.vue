<template>
  <div>
    <Loading v-if="isLoading"></Loading>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import Loading from "./components/Loading.vue";
import { useStore } from "vuex";
import { GlobalStore } from "./store";
export default defineComponent({
  name: "App",
  components: {
    Loading,
  },
  setup() {
    const store = useStore<GlobalStore>();
    const isLoading = computed(() => store.state.loading.isLoading);
    return {
      isLoading,
    };
  },
});
</script>
<style lang="scss">
@import "./assets/css/transition/fade.scss";
@import "@/assets/css/transition/spin.scss";
@import "./assets/css/global.scss";
// @import "./assets/css/reset.scss";
</style>
