<template>
  <div>
    <a-page-header
      title="Create"
      sub-title="Create New User"
      @back="backToGo"
    />
    <a-form layout="vertical" class="pt-3">
      <a-form-item label="account" v-bind="validateInfos.account">
        <a-input @pressEnter="onSubmit" v-model:value="modelRef.account" />
      </a-form-item>
      <a-form-item label="password" v-bind="validateInfos.password">
        <a-input-password
          @pressEnter="onSubmit"
          v-model:value="modelRef.password"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">
          Create
        </a-button>
        <a-button style="margin-left: 10px;" @click="reset">
          Reset
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "@ant-design-vue/use";
import store, { MessageResult } from "@/store";
import { LoginInfo } from "@/store/login";

export default defineComponent({
  setup() {
    const router = useRouter();
    const backToGo = () => {
      store.commit("BackToGo");
    };
    const modelRef = reactive({
      account: "",
      password: "",
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      reactive(store.state.user.rules ? store.state.user.rules : {})
    );
    const onSubmit = (e: Event) => {
      e.preventDefault();
      validate()
        .then(async (res: LoginInfo) => {
          const { statusCode }: MessageResult = await store.dispatch(
            "UserCreateUser",
            res
          );
          if (statusCode === 200) {
            router.push("/user");
            const { total } = await store.dispatch("FindUser");
            store.commit("UserChangeTotal", total);
          }
        })
        .catch(() => {
          console.log("error");
        });
    };
    const reset = () => {
      resetFields();
    };
    return {
      backToGo,
      validateInfos,
      reset,
      modelRef,
      onSubmit,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/createUser.scss";
</style>
