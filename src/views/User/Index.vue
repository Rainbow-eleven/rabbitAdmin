<template>
  <div>
    <!-- <a-button class="mb-2"
      ><router-link to="/user/create">Create</router-link></a-button
    > -->
    <a-table
      bordered
      :pagination="pagination"
      :columns="columns"
      :data-source="data"
    >
      <template #avatar="{text}">
        <img
          class="hover-hand table-avatar"
          :src="text"
          width="75"
          height="75"
          alt="avatar"
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
        </div>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import store from "@/store";
import { UserInfo } from "@/store/login";
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
      const { total } = await store.dispatch("user/FindUser");
      store.commit("user/UserChangeTotal", total);
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
      viewUser,
    };
  },
});
</script>
