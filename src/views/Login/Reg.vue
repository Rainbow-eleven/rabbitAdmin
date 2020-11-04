<template>
  <div class="d-flex regBox">
    <a-carousel class="swiper" effect="fade" autoplay :dots="false">
      <div class="bgBox" v-for="item in bgList" :key="item">
        <div class="bg" :style="`background-image: url(${item})`"></div>
      </div>
    </a-carousel>
    <div class="reg">
      <div class="center">
        <h1>Welcome to Rabbit</h1>
        <h3 class="mt-3 mb-2">Everyday, enjoy your communication</h3>
        <a-form class="mt-5">
          <a-form-item v-bind="validateInfos.username">
            <a-input
              placeholder="NickName"
              v-model:value="regForm.username"
              allow-clear
            ></a-input>
          </a-form-item>
          <a-form-item v-bind="validateInfos.password">
            <a-input-password
              placeholder="Password"
              v-model:value="regForm.password"
              allow-clear
            ></a-input-password>
          </a-form-item>
          <a-form-item v-bind="validateInfos.account">
            <a-auto-complete
              class="searchEmail"
              @focus="showHideCode(true)"
              @blur="volidateEmail"
              allow-clear
              v-model:value="regForm.account"
              :data-source="dataSource"
              style="width:
            200px"
              placeholder="Email"
              @change="changeData"
            >
            </a-auto-complete>
          </a-form-item>
          <a-form-item v-bind="validateInfos.code" class="code">
            <a-input placeholder="Code" v-model:value="regForm.code"></a-input>
            <a-button class="ml-2" @click="sendCode" :disabled="!isLoading"
              ><span>{{ num == 60 ? "" : num }}</span>
              <span> Send</span></a-button
            >
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onSubmit" class="submit"
              >Sign up now</a-button
            >
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model:checked="checked" @click="checked = !checked">
              I have read and agreed to the Service Agreement and the Privacy
              Policy
            </a-checkbox>
          </a-form-item>
        </a-form>
        <div class="mt-5 pt-5 text-center text-black-50">
          Copyright © 2019-2020 Muddyrain All Rights Reserved
        </div>
      </div>
      <div class="logo">
        <img
          src="https://czh1010.oss-cn-beijing.aliyuncs.com/RC-1%281%29.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { message, notification } from "ant-design-vue";
import { computed, defineComponent, reactive, ref } from "vue";
import { mapMutations } from "vuex";
import { useForm } from "@ant-design-vue/use";
import router from "@/router";
export default defineComponent({
  name: "Reg",
  methods: {
    ...mapMutations("reg", { changeData: "changeData" }),
  },
  setup() {
    const { validate, validateInfos } = useForm(
      reactive(store.state.reg.regForm),
      reactive(store.state.reg.rules ? store.state.reg.rules : {})
    );
    const bgList = computed(() => store.state.reg.bgList);
    const isSend = computed(() => store.state.reg.isSend);
    const regForm = computed(() => store.state.reg.regForm);
    const checked = ref(true);
    const num = ref(60);
    const isLoading = ref(false);
    const dataSource = computed(() => store.state.reg.dataSource);
    const showHideCode = (bool: boolean) => {
      store.commit("reg/showCode", bool);
    };
    const volidateEmail = () => {
      if (num.value == 60) {
        if (regForm.value.account) {
          if (regForm.value.account.indexOf("@") !== -1) {
            showHideCode(true);
            isLoading.value = true;
            notification.success({
              message: "Email format is correct",
              description:
                "Who can come to the front of the time, help me find the next screen.",
            });
          } else {
            showHideCode(false);
            isLoading.value = false;
            notification.error({
              message: "E-mail format is incorrect",
              description:
                "Who can come to the front of the time, help me find the next screen.",
            });
          }
        }
        if (
          regForm.value.account === undefined ||
          regForm.value.account == ""
        ) {
          showHideCode(false);
        }
      } else {
        isLoading.value = false;
      }
    };
    const sendCode = async () => {
      if (regForm.value.account !== "") {
        const res = await store.dispatch(
          "reg/RegFindAccount",
          regForm.value.account
        );
        if (res.statusCode == 500) {
          await store.dispatch("user/UserSendEmail", regForm.value.account);
          showHideCode(true);
          isLoading.value = false;
          const timer = setInterval(() => {
            num.value--;
            if (num.value == 0) {
              num.value = 60;
              isLoading.value = true;
              clearInterval(timer);
            }
          }, 1000);
        } else {
          message.info("This user is already registered");
        }
      }
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      validate()
        .then(async () => {
          if (regForm.value.code !== sessionStorage.getItem("emailCode")) {
            message.error("Incorrect verification code");
          } else {
            const res = await store.dispatch("reg/RegUser", regForm.value);
            if (res.statusCode == 200) {
              router.push("/login");
              message.success("Registration success");
            }
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    return {
      bgList,
      dataSource,
      checked,
      isSend,
      regForm,
      showHideCode,
      sendCode,
      isLoading,
      volidateEmail,
      num,
      onSubmit,
      validateInfos,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/reg.scss";
</style>
