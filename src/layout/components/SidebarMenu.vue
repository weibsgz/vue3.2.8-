<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :uniqueOpened="true"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <!-- 子集 menu 菜单 -->
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { filterRouters, generateMenus, generateMenus1} from "@/utils/route";
import SidebarItem from "./SidebarItem.vue";

const route = useRoute(); //.query .params matched当前匹配得路由 等参数
const router = useRouter(); // push replace getRoutes back等操作

// console.log(route, router);
console.log("router.getRoutes()", router.getRoutes());

const routes = computed(() => {
//   使用route.getRoutes() 返回得是完成得路由表 存在两个问题

// 1，存在重复的路由数据（因为完整的路由表会把路由一级的和二级的（children）都放在一个一维数组里，所以我们要去重）
// 2，不满足该条件 meta && meta.title && meta.icon 的数据不应该存在
  const filterRoutes = filterRouters(router.getRoutes());
  console.log("filterRoutes", filterRoutes);
  return generateMenus(filterRoutes);
});

//默认激活项(页面刷新后停留在当前菜单)
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});

console.log("最终形成的menu表", routes.value);
</script>
