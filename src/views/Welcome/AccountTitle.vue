<template>
  <div class="AccountBox text-center">
    <div
      class="account fs-1-75 font-weight-bold d-flex justify-content-center align-items-center"
    >
      <div class="mr-2">Account Email</div>
      <GoogleOutlined class="fs-1-5" />
    </div>
    <div
      class="fs-1-75 mt-4 font-weight-bold d-flex justify-content-center align-items-center"
    >
      <div class="fs-1-5 mr-2">Total:</div>
      <div class="num">{{ total }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { GoogleOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "AccountEmail",
  components: {
    GoogleOutlined,
  },
  setup() {
    const total = ref();
    const findTotal = async () => await store.dispatch("ring/findTotal");
    onMounted(async () => {
      await findTotal();
      total.value = store.state.ring.total;
    });
    return { total };
  },
});
</script>
<style lang="scss">
.AccountBox {
  .account {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }
}
</style>
