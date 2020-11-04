<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item
          class="justify-content-start"
          @click="linkRouter(index)"
          :key="item"
          v-for="(item, index) in menuData"
        >
          <AndroidOutlined v-if="index == 0" />
          <user-outlined v-if="index == 1" />
          <BarsOutlined v-if="index == 2" />
          <HeatMapOutlined v-if="index == 3" />
          <ReconciliationOutlined v-if="index == 4" />
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
            <a-menu>
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
          margin: '1rem 1rem',
          background: '#fff',
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
  AndroidOutlined,
  BarsOutlined,
  HeatMapOutlined,
  ReconciliationOutlined,
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
    AndroidOutlined,
    BarsOutlined,
    HeatMapOutlined,
    ReconciliationOutlined,
  },
  setup() {
    const collapsed = ref(false);
    const router = useRouter();
    const selectedKeys = ref([]);
    const menuData = ref(["home", "user", "classify", "brand", "model"]);
    const routerData = ref(["/", "/user", "/classify", "/brand", "/model"]);
    const user = computed(() => store.state.login.user);
    const routerPush = (path: string) => {
      router.push(path);
    };
    const linkRouter = (index: number) => {
      router.push(routerData.value[index]);
    };
    const logout = () => {
      store.commit("login/logout");
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
      linkRouter,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/css/home.scss";
</style>
