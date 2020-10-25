<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item class="justify-content-start" key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item class="justify-content-start" key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item class="justify-content-start" key="3">
          <upload-outlined />
          <span>nav 3</span>
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
              <a-menu-item key="1"><UserOutlined />个人资料</a-menu-item>
              <a-menu-item key="2"><UserOutlined />退出登录</a-menu-item>
            </a-menu>
          </template>
          <a-button style="margin-left: 8px">
            <span class="mr-2">管理员</span> <DownOutlined />
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
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "Home",
  components: {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    DownOutlined,
  },
  setup() {
    const collapsed = ref(false);
    const selectedKeys = ref(["1"]);
    return {
      collapsed,
      selectedKeys,
    };
  },
});
</script>

<style lang="scss">
#components-layout-demo-custom-trigger {
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>
