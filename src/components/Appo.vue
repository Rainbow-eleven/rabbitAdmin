<template>
  <div>
    <h4 class="my-4">
      Appointment
    </h4>
    <div v-if="data.appointments?.length > 0">
      <div
        class="d-flex my-3 appoOrderBox justify-content-around align-items-center"
        v-for="(item, i) in data.appointments"
        :key="item.appointCode"
      >
        <div class="index">序号: {{ i + 1 }}</div>
        <div class="no">订单号: {{ item.appointCode }}</div>
        <div class="status">状态: {{ item.status }}</div>
        <div class="date">预约时间:{{ item.date }}</div>
        <div class="email">联系方式: {{ item.email }}</div>
        <div class="adress">地址: {{ item.adress }}</div>
        <div class="action">
          <a-button>
            详情
          </a-button>
        </div>
      </div>
    </div>
    <div v-else class=" d-flex mt-5 justify-content-around align-items-center">
      <div class="h5 text-dark-50">No Data</div>
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { UserInfo } from "@/store/login";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "Appo",
  props: {
    id: Number,
  },
  components: {},
  setup(props) {
    const data = ref<UserInfo>({});
    const findData = async () => {
      await store.dispatch("appo/findData", props.id);
      data.value = store.state.appo.appo;
    };
    onMounted(() => {
      findData();
    });
    return {
      data,
    };
  },
});
</script>
<style lang="scss">
.appoOrderBox {
  height: 5rem;
  border: 1px solid #ccc;
  padding: 1.25rem;
}
</style>
