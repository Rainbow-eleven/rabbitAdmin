<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item
          class="justify-content-start"
          @click="routerPush(`/${item}`)"
          :key="item"
          v-for="item in menuData"
        >
          <user-outlined />
          <span>{{ item }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        class="d-flex justify-content-between align-items-center"
        style=" background: #fff; padding: 0"
      >
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <a-dropdown class="mr-2 hover-hand" :trigger="['click']">
          <template v-slot:overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1" @click="linkToInfo"
                ><UserOutlined />Person Info</a-menu-item
              >
              <a-menu-item key="2" @click="logout"
                ><UnlockOutlined />Sign out</a-menu-item
              >
            </a-menu>
          </template>
          <a-button style="margin-left: 8px">
            <span class="mr-2">{{
              user.username !== null ? user.username : "匿名用户"
            }}</span>
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DownOutlined,
  UnlockOutlined,
} from "@ant-design/icons-vue";
import store from "@/store";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Home",
  components: {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UnlockOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    DownOutlined,
  },
  setup() {
    const collapsed = ref(false);
    const router = useRouter();
    const selectedKeys = ref([]);
    const menuData = ref(["user", "model"]);
    const user = computed(() => store.state.login.user);
    const routerPush = (path: string) => {
      router.push(path);
    };
    const logout = () => {
      store.commit("logout");
      localStorage.removeItem("userId");
      location.href = "/login";
    };
    const linkToInfo = () => {
      routerPush(`/user/info/${user.value.id}`);
    };
    onMounted(async () => {
      await store.dispatch("login/UserInfoFind", {
        mutations: "LoginUserInfo",
        id: localStorage.getItem("userId"),
      });
    });
    return {
      collapsed,
      selectedKeys,
      routerPush,
      logout,
      menuData,
      user,
      linkToInfo,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/css/home.scss";
</style>
