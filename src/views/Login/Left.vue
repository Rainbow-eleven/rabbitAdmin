<template>
  <div class="left text-center">
    <div class="logo">
      <img
        class="w-100"
        src="https://czh1010.oss-cn-beijing.aliyuncs.com/RC-1%281%29.png"
        alt=""
      />
    </div>
    <h5 class="mt-4">Sign in to dashboard</h5>
    <a-form layout="vertical">
      <a-form-item class="input" label="Email" v-bind="validateInfos.account">
        <a-input
          v-model:value="formInput.account"
          placeholder="Type your email"
        >
          <template v-slot:prefix
            ><UserOutlined style="color:rgba(0,0,0,.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="Password"
        class="mt-2 input"
        v-bind="validateInfos.password"
      >
        <a-input
          v-model:value="formInput.password"
          type="password"
          placeholder="Type your password"
        >
          <template v-slot:prefix
            ><LockOutlined style="color:rgba(0,0,0,.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item class="mt-1">
        <a-button type="link" class="float-left mt-1" @click="onResetForm">
          Reset Form
        </a-button>
        <a-button class="float-right" type="link">
          Reset Password!
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          class="w-100 mt-1 submit"
          type="primary"
          @click="handleSubmit"
        >
          Log in
        </a-button>
      </a-form-item>
    </a-form>
    <div class="reg mt-5 d-flex justify-content-center align-items-center">
      <div>Don't hava an account?</div>
      <a-button type="link">register now!</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { GlobalLoginStore } from "@/store/login";
import { useForm } from "@ant-design-vue/use";
import { notification } from "ant-design-vue";
interface UserInfo {
  account: string;
  password: string;
}
interface VuxModule {
  login: GlobalLoginStore;
}
export default defineComponent({
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const store = useStore<VuxModule>();
    console.log(store);
    const rules = computed(() => store.state.login.rules);
    const formInput = reactive(store.state.login.fromInput);
    const { resetFields, validate, validateInfos } = useForm(
      formInput,
      reactive({
        account: [
          {
            required: true,
            type: "email",
            message: "Please enter your email",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please enter your password",
            trigger: "blur",
          },
        ],
      })
    );
    const onResetForm = () => {
      resetFields();
    };
    const handleSubmit = (e: Event) => {
      e.preventDefault();
      validate()
        .then((res) => {
          console.log(res);
        })
        .catch(() => {
          notification.info({
            message: "Please input and submit again",
            description:
              "Who can come to the front of the time, help me find the next screen.",
          });
        });
    };
    return {
      formInput,
      rules,
      handleSubmit,
      validateInfos,
      onResetForm,
    };
  },
});
</script>
<style lang="scss"></style>
