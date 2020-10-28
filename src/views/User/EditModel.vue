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
  <a-modal
    title="Update Password"
    :visible="visiblePass"
    @ok="PassOk"
    @cancel="PassCancel"
    keyboard="true"
  >
    <h6>Please enter your old password to update the password :</h6>
    <a-form class="mt-4 pass">
      <a-form-item class="verifyPassword">
        <a-input placeholder="Please enter your old password" @blur="SendOldPass"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          :disabled="!isCorrect"
          placeholder="Please enter your new password"
        ></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import router from "@/router";
import store, { MessageResult } from "@/store";
import { message } from "ant-design-vue";
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "EditModel",
  props: {
    id: {
      type: Number,
    },
  },
  setup(props) {
    const visible = computed(() => store.state.user.isShow);
    const visiblePass = ref(false);
    const isCorrect = computed(() => store.state.user.isCorrect);
    const findUser = () => {
      store.dispatch("UserInfoFind", {
        id: props.id,
        mutations: "UserInfoFindEdit",
      });
    };
    const userEditInfo = computed(() => store.state.user.userEdit);
    const handleCancel = () => {
      store.commit("UserChangeShowModel", false);
      findUser();
    };
    const EditCallback = async () => {
      const res: MessageResult = await store.dispatch(`UserInfoEdit`, {
        user: userEditInfo.value,
        id: props.id,
      });
      if (res.statusCode === 200) {
        store.commit("UserChangeShowModel", false);
        router.push("/user");
      }
    };
    const watchCardNo = () => {
      if (userEditInfo.value.cardNo) {
        if (userEditInfo.value.cardNo.length === 18) {
          store.commit("UserEditChangeVerified", 1);
        } else {
          store.commit("UserEditChangeVerified", 0);
        }
      } else {
        store.commit("UserEditChangeVerified", 0);
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
        store.commit("UserEditChangeVerified", 0);
      }
    };
    const showPass = () => {
      visiblePass.value = true;
    };
    const PassCancel = () => {
      visiblePass.value = false;
    };
    onMounted(() => {
      findUser();
    });
    return {
      handleCancel,
      visible,
      visiblePass,
      watchCardNo,
      userEditInfo,
      handleOk,
      showPass,
      PassCancel,
      isCorrect,
    };
  },
});
</script>
<style lang="scss">
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
