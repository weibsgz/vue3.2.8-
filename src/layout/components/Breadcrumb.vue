<template>
  <el-breadcrumb id="guide-breadcrumb" class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
        <router-link v-if="index !== breadList.length - 1" :to="item.path">{{
          item.meta.title
        }}</router-link>
        <span class="no-click" v-else>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const breadList = ref([]);
const store = useStore();

//将来换肤用  vue3.2的动态CSS渲染组件
const hoverColor = ref(store.getters.cssVar.menuBg);
watch(
  route,
  () => {
    console.log("route.matched",route.matched);
    //route.matched 获取当前路由的路由链表
    breadList.value = route.matched.filter((v) => v.meta && v.meta.title);
    console.log("route.matched", breadList.value);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .no-click {
    cursor: pointer;
    color: v-bind(hoverColor);
  }
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  display: inline-block; /* 加上这一句防止布局方式变化引起的最左侧重影问题 */
  position: absolute;
}
</style>
