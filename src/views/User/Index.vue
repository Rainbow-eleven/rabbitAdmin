<template>
  <div>
    <a-button class="mb-2"
      ><router-link to="/user/create">Create</router-link></a-button
    >
    <a-table :pagination="pagination" :columns="columns" :data-source="data">
      <template #avatar="{text}">
        <img
          class="hover-hand"
          style="border-radius:0.275rem"
          :src="text"
          width="50"
          height="50"
          alt=""
        />
      </template>
      <template #username="{text}">
        <a>
          {{ text == null ? "匿名用户" : text }}
        </a>
      </template>
      <template #actualName="{text}">
        <a>
          {{ text == "" ? "未署名" : text }}
        </a>
      </template>
      <template #isAuthentication="{text}">
        <a-tag :color="text === 1 ? 'blue' : 'red'">
          {{ text == 0 ? "未实名" : "已实名" }}
        </a-tag>
      </template>
      <template #action="{text}">
        <div class="d-flex align-items-center justify-content-around">
          <a-button @click="viewUser(text)" type="primary">View</a-button>
          <a-button @click="deleteUser(text)" type="danger">Delete</a-button>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import store from "@/store";
import { UserInfo } from "@/store/login";
import { message, Modal } from "ant-design-vue";
import { computed, defineComponent, onBeforeMount, ref } from "vue";

export default defineComponent({
  setup() {
    const columns = computed(() => store.state.user.columns);
    const data = computed(() => store.state.user.users);
    const pagination = ref({
      pageSize: 5,
      total: data.value.length,
    });
    const findUser = async () => {
      const { total } = await store.dispatch("FindUser");
      store.commit("UserChangeTotal", total);
    };
    const deleteUser = (user: UserInfo) => {
      Modal.confirm({
        title: "Do you want to delete this user?",
        content:
          "If you delete this user, the user may be bound to other modules.",
        async onOk() {
          await store.dispatch("UserDeleteUser", user);
          await findUser();
        },
        onCancel() {
          message.info("取消删除");
        },
      });
    };
    const viewUser = (user: UserInfo) => {
      router.push({
        name: "UserInfo",
        params: {
          id: user.id ? user.id : 1,
        },
      });
    };
    onBeforeMount(async () => {
      await findUser();
    });
    return {
      columns,
      data,
      pagination,
      deleteUser,
      viewUser,
    };
  },
});
</script>
<style lang="scss"></style>
