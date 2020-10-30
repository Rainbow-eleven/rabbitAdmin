<template>
  <a-modal
    title="Reset Password"
    v-model:visible="visible"
    @ok="handleOk"
    centered
    @cancel="handleCancel"
  >
    <transition name="fade" mode="out-in">
      <a-form v-if="routerNum === 0">
        <a-form-item>
          <a-input
            placeholder="Please enter your e-mail address"
            type="email"
            @blur="findAccount"
            v-model:value="email"
          ></a-input>
        </a-form-item>
        <a-form-item class="SendEmail">
          <a-input
            placeholder="Please enter your verification code"
            :disabled="isDis"
            v-model:value="emailCode"
          ></a-input>
          <a-button class="ml-2" @click="SendEmail" :disabled="isSendOf">
            <span v-if="num !== 60">{{ num }}s </span>
            <span class="ml-1">SendEmail</span>
          </a-button>
        </a-form-item>
      </a-form>
      <div v-else>
        <a-form class="mt-4 pass">
          <a-form-item>
            <a-input-password
              placeholder="Please enter your new password"
              v-model:value="newPass"
              @pressEnter="UpdateNewPassword"
            ></a-input-password>
          </a-form-item>
        </a-form>
      </div>
    </transition>
  </a-modal>
</template>
<script lang="ts">
import store from "@/store";
import { message } from "ant-design-vue";
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const num = ref(60);
    const isSendOf = computed(() => store.state.login.isSend);
    const visible = computed(() => store.state.login.isShowResetPass);
    const routerNum = computed(() => store.state.login.routerNum);
    const email = ref(store.state.login.email);
    const isDis = ref(true);
    const emailCode = ref();
    const newPass = ref("");
    const findAccount = async () => {
      if (email.value.length > 0) {
        const user = await store.dispatch("UserFindAccount", email.value);
        if (user.statusCode !== 200) {
          isDis.value = true;
        } else {
          isDis.value = false;
        }
      }
    };
    const SendEmail = async () => {
      if (email.value.length > 0) {
        if (email.value.indexOf("@") == -1 || isDis.value == true) {
          message.info("E-mail format is incorrect");
        } else {
          const timer = setInterval(() => {
            num.value--;
            store.commit("login/LoginChangeIsSend", true);
            if (num.value == 0) {
              store.commit("login/LoginChangeIsSend", false);
              num.value = 60;
              clearInterval(timer);
            }
          }, 1000);
          await store.dispatch("UserSendEmail", email.value);
        }
      } else {
        message.info("E-mail can not be empty");
      }
    };
    const handleCancel = () => {
      store.commit("login/LoginChangeShowModal", false);
      store.commit("login/LoginChangeIsSend", false);
      store.commit("login/LoginChangeRouterNum", 0);
      // email.value = "";
      emailCode.value = "";
    };
    const UpdateNewPassword = async () => {
      await store.dispatch("UserUpdatePassword", {
        id: store.state.login.accountInfo.id,
        pass: newPass.value,
      });
      handleCancel();
    };
    const handleOk = () => {
      const code = sessionStorage.getItem("emailCode");
      if (store.state.login.routerNum == 0) {
        if (emailCode.value == code) {
          store.commit("login/LoginChangeRouterNum", 1);
        } else {
          message.info("Please confirm your verification code");
        }
      } else {
        UpdateNewPassword();
      }
    };

    return {
      visible,
      handleCancel,
      num,
      SendEmail,
      isSendOf,
      email,
      newPass,
      findAccount,
      isDis,
      handleOk,
      emailCode,
      routerNum,
      UpdateNewPassword,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/fade.scss";
.ant-form {
  input,
  button {
    height: 2.75rem;
  }
}
.SendEmail {
  .ant-form-item-children {
    display: flex;
  }
}
</style>
