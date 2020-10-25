<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style lang="scss">
@import "./assets/css/fade.scss";
@import "./assets/css/global.scss";
</style>
