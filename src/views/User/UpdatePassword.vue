<template>
  <a-modal
    title="Update Password"
    :visible="visiblePass"
    @ok="UpdateNewPassword"
    @cancel="PassCancel"
    keyboard="true"
    centered
  >
    <h6>Please enter your old password to update the password :</h6>
    <a-form class="mt-4 pass">
      <a-form-item class="verifyPassword">
        <a-input-password
          placeholder="Please enter your old password"
          @blur="SendOldPass"
          @pressEnter="SendOldPass"
          v-model:value="oldPass"
        ></a-input-password>
      </a-form-item>
      <a-form-item>
        <a-input-password
          :disabled="!isCorrect"
          placeholder="Please enter your new password"
          v-model:value="newPass"
          @pressEnter="UpdateNewPassword"
        ></a-input-password>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import store from "@/store";
import { message } from "ant-design-vue";
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    id: {
      type: Number,
    },
  },
  setup(props) {
    const oldPass = ref("");
    const newPass = ref("");
    const visiblePass = computed(() => store.state.user.isShowPass);
    const isCorrect = computed(() => store.state.user.isCorrect);
    const PassCancel = () => {
      store.commit("UserChangeShowPassModel", false);
      newPass.value = "";
      oldPass.value = "";
      store.commit("UserChangeIsCorrect", false);
    };
    const SendOldPass = async () => {
      await store.dispatch("UserVolidatePass", {
        id: props.id,
        pass: oldPass.value,
      });
    };
    const UpdateNewPassword = async () => {
      if (!isCorrect.value || newPass.value === "") {
        message.info("Please enter the old password first");
      } else {
        await store.dispatch("UserUpdatePassword", {
          id: props.id,
          pass: newPass.value,
        });
        PassCancel();
      }
    };
    return {
      visiblePass,
      PassCancel,
      oldPass,
      newPass,
      SendOldPass,
      UpdateNewPassword,
      isCorrect,
    };
  },
});
</script>
<style lang="scss"></style>
