<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧 menu -->
    <!-- 左侧 menu -->
    <sidebar class="sidebar-container" :style="{ backgroundColor: bgColor }" />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar />
        <tags-view></tags-view>
      </div>
      <!-- 内容区 -->
       
      <app-main />
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppMain from "./components/AppMain";
import tagsView from '@/components/tagsview'
import { computed } from "vue";
import { useStore } from "vuex";

import variables from "@/styles/variables.scss"; //JS中导入SCSS设置的变量

const store = useStore();

const bgColor = computed(() => {
  return store.getters.mainColor;
});
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
