<template>
  <div class="welHeader d-flex justify-content-between align-items-center">
    <h1 class="rabbit font-weight-bolder">Backstage Bunny</h1>
    <div class="d-flex">
      <a-button
        size="large"
        class="d-flex justify-content-center align-items-center dateBtn font-weight-bold"
        ><span class="mr-2">{{ nowMonth }} </span><span> {{ nowDay }}</span
        ><span>,{{ nowYear }}</span></a-button
      >
      <a-button
        class="ml-4 printBtn d-flex justify-content-center align-items-center"
        @click="openPrint"
        ><PrinterFilled
      /></a-button>
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { PrinterFilled } from "@ant-design/icons-vue";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "WelcomeHeader",
  components: {
    PrinterFilled,
  },
  setup() {
    const nowYear = new Date().getFullYear();
    const nowMonth = computed(() => store.getters.getMonth);
    const nowDay = new Date().getDate();
    const openPrint = () => {
      window.print();
    };
    return {
      nowYear,
      nowMonth,
      nowDay,
      openPrint,
    };
  },
});
</script>
<style lang="scss">
.welHeader {
  .rabbit {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-size: 2rem;
  }
  .ant-btn {
    height: 3.75rem;
  }
  .dateBtn {
    background: #f6f5fb;
    border: none;
    padding: 0.575rem 2.25rem;
    font-size: 1.375rem;
    border-radius: 0.475rem;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
  .printBtn {
    background: #f6f5fb;
    border: none;
    padding: 1.255rem;
    font-size: 1.375rem;
    border-radius: 0.475rem;
  }
}
</style>
