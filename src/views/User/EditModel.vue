<template>
  <a-modal
    title="Edit User"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    keyboard="true"
  >
    <a-form :label-col="4" :model="userEditInfo">
      <a-form-item label="account">
        <a-input allowClear v-model:value="userEditInfo.account"></a-input>
      </a-form-item>
      <a-form-item label="username">
        <a-input allowClear v-model:value="userEditInfo.username"></a-input>
      </a-form-item>
      <a-form-item label="actualName">
        <a-input allowClear v-model:value="userEditInfo.name"></a-input>
      </a-form-item>
      <a-form-item label="cardNo">
        <a-input
          @input="watchCardNo"
          allowClear
          v-model:value="userEditInfo.cardNo"
        ></a-input>
      </a-form-item>
      <a-form-item label="Verified">
        <a-radio-group
          v-model:value="userEditInfo.isAuthentication"
          button-style="solid"
        >
          <a-radio-button
            :value="0"
            :disabled="userEditInfo.cardNo.length == 18"
          >
            No
          </a-radio-button>
          <a-radio-button
            :value="1"
            :disabled="userEditInfo.cardNo.length !== 18"
          >
            Yes
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="password">
        <a-button @click="showPass" type="danger">UpdatePassword</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
  <UpdatePassword :id="id"></UpdatePassword>
</template>
<script lang="ts">
import router from "@/router";
import store from "@/store";
import { MessageResult } from "@/store/user";
import { message } from "ant-design-vue";
import { computed, defineComponent, onMounted } from "vue";
import UpdatePassword from "./UpdatePassword.vue";

export default defineComponent({
  name: "EditModel",
  props: {
    id: {
      type: Number,
    },
  },
  components: { UpdatePassword },
  setup(props) {
    const visible = computed(() => store.state.user.isShow);
    const findUser = () => {
      store.dispatch("user/UserInfoFind", {
        id: props.id,
        mutations: "UserInfoFindEdit",
      });
    };
    const userEditInfo = computed(() => store.state.user.userEdit);
    const handleCancel = () => {
      store.commit("user/UserChangeShowModel", false);
      findUser();
    };
    const showPass = () => {
      store.commit("user/UserChangeShowPassModel", true);
    };
    const EditCallback = async () => {
      const res: MessageResult = await store.dispatch(`user/UserInfoEdit`, {
        user: userEditInfo.value,
        id: props.id,
      });
      if (res.statusCode === 200) {
        store.commit("user/UserChangeShowModel", false);
        router.push("/user");
      }
    };
    const watchCardNo = () => {
      if (userEditInfo.value.cardNo) {
        if (userEditInfo.value.cardNo.length === 18) {
          store.commit("user/UserEditChangeVerified", 1);
        } else {
          store.commit("user/UserEditChangeVerified", 0);
        }
      } else {
        store.commit("user/UserEditChangeVerified", 0);
      }
    };
    const handleOk = async (e: Event) => {
      e.preventDefault();
      if (userEditInfo.value.cardNo) {
        if (userEditInfo.value.cardNo.length !== 18) {
          message.info("The ID number must be 18 digits");
          // store.commit("UserEditClearCardNo");
        } else if (userEditInfo.value.cardNo.length == 18) {
          EditCallback();
        }
      } else {
        EditCallback();
        store.commit("user/UserEditChangeVerified", 0);
      }
    };

    onMounted(() => {
      findUser();
    });
    return {
      handleCancel,
      visible,
      showPass,
      watchCardNo,
      userEditInfo,
      handleOk,
    };
  },
});
</script>
<style lang="scss" scoped>
.pass {
  input,
  button {
    height: 3.25rem;
  }
}
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
