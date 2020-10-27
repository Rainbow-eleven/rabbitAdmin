<template>
  <a-modal
    title="Edit User"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    keyboard="true"
  >
    <a-form :label-col="4">
      <a-form-item label="account">
        <a-input v-model="userEditInfo.account"></a-input>
      </a-form-item>
      <a-form-item label="username">
        <a-input v-model="userEditInfo.username"></a-input>
      </a-form-item>
      <a-form-item label="actualName">
        <a-input v-model="userEditInfo.name"></a-input>
      </a-form-item>
      <a-form-item label="cardNo">
        <a-input v-model="userEditInfo.cardNo"></a-input>
      </a-form-item>
      <a-form-item label="Verified ">
        <a-radio-group v-model:value="userEditInfo.isAuthentication" button-style="solid">
          <a-radio-button value="0">
            No
          </a-radio-button>
          <a-radio-button value="1">
            Yes
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="password">
        <a-button type="danger">UpdatePassword</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "EditModel",
  setup() {
    const visible = computed(() => store.state.user.isShow);
    const handleCancel = () => {
      store.commit("UserChangeShowModel", false);
    };
    const userEditInfo = computed(() => store.state.user.userEdit);
    return {
      handleCancel,
      visible,
      userEditInfo,
    };
  },
});
</script>
<style lang="scss">
.ant-form-item {
  display: flex;
  .ant-form-item-label {
    flex: 4;
  }
  .ant-form-item-control-wrapper {
    flex: 12;
  }
}
</style>
